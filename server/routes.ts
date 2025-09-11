import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { type QualificationFormData, type Course } from "@shared/schema";

// Qualification matching algorithm
function matchCourses(qualificationData: QualificationFormData, allCourses: Course[]): Course[] {
  // Filter courses by study level
  const levelMatchedCourses = allCourses.filter(course => course.level === qualificationData.studyLevel);
  
  const matchedCourses: Array<{ course: Course; score: number }> = [];
  
  for (const course of levelMatchedCourses) {
    let score = 0;
    const requirements = course.requirements as any;
    
    if (qualificationData.studyLevel === 'undergraduate' && requirements?.minGrades) {
      // For undergraduate: check if user's grades meet minimum requirements
      const userGradeMap = new Map(qualificationData.qualifications.map(q => [q.subject, q.grade]));
      
      let meetsRequirements = true;
      for (const [subject, minGrade] of Object.entries(requirements.minGrades)) {
        const userGrade = userGradeMap.get(subject);
        if (!userGrade || !gradeComparison(userGrade, minGrade as string)) {
          meetsRequirements = false;
          break;
        }
      }
      
      if (meetsRequirements) {
        score += 100; // Base score for meeting requirements
        
        // Bonus points for better grades
        for (const qual of qualificationData.qualifications) {
          if (requirements.subjects?.includes(qual.subject)) {
            score += gradeToPoints(qual.grade);
          }
        }
      }
    } else if (qualificationData.studyLevel === 'postgraduate') {
      // For postgraduate: more flexible matching based on degree field and experience
      score += 50; // Base score for postgraduate
      
      // Match study area with completed degree
      if (qualificationData.undergradDegreeCompleted?.toLowerCase().includes(course.studyArea.toLowerCase())) {
        score += 30;
      }
      
      // Bonus for work experience if required
      if (requirements?.workExperience && qualificationData.workExperience) {
        score += 20;
      }
      
      // Grade matching (basic classification check)
      if (qualificationData.undergradGradeReceived?.toLowerCase().includes('first') || 
          qualificationData.undergradGradeReceived?.toLowerCase().includes('2:1') ||
          qualificationData.undergradGradeReceived?.includes('3.')) {
        score += 15;
      }
    } else {
      // Fallback: if no specific requirements, give some score based on level match
      if (!requirements || Object.keys(requirements).length === 0) {
        score += 25; // Basic score for level match
      }
    }
    
    if (score > 0) {
      matchedCourses.push({ course, score });
    }
  }
  
  // Sort by score (highest first) and return courses
  return matchedCourses
    .sort((a, b) => b.score - a.score)
    .map(item => item.course);
}

// Helper function to compare grades (A > B > C > D > E)
function gradeComparison(userGrade: string, minGrade: string): boolean {
  const gradeOrder = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1 };
  return (gradeOrder[userGrade as keyof typeof gradeOrder] || 0) >= (gradeOrder[minGrade as keyof typeof gradeOrder] || 0);
}

// Convert grade to points for scoring
function gradeToPoints(grade: string): number {
  const points = { 'A': 20, 'B': 15, 'C': 10, 'D': 5, 'E': 2 };
  return points[grade as keyof typeof points] || 0;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all courses
  app.get('/api/courses', async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  });
  
  // Get courses by level
  app.get('/api/courses/level/:level', async (req, res) => {
    try {
      const { level } = req.params;
      const courses = await storage.getCoursesByLevel(level);
      res.json(courses);
    } catch (error) {
      console.error('Error fetching courses by level:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  });
  
  // Submit qualifications and get matching courses
  app.post('/api/match-courses', async (req, res) => {
    try {
      // Validate the request body
      const qualificationData = req.body as QualificationFormData;
      // Store the qualification submission
      const submissionData = {
        studyLevel: qualificationData.studyLevel,
        country: qualificationData.country,
        qualifications: qualificationData.qualifications,
        additionalInfo: {
          undergradDegree: qualificationData.undergradDegree,
          undergradGrade: qualificationData.undergradGrade,
          undergradDegreeCompleted: qualificationData.undergradDegreeCompleted,
          undergradGradeReceived: qualificationData.undergradGradeReceived,
          undergradInstitution: qualificationData.undergradInstitution,
          workExperience: qualificationData.workExperience,
          researchInterest: qualificationData.researchInterest
        }
      };
      
      await storage.createQualificationSubmission(submissionData);
      
      // Get all courses and find matches
      const allCourses = await storage.getAllCourses();
      const matchedCourses = matchCourses(qualificationData, allCourses);
      
      res.json({
        qualificationData,
        matchedCourses,
        totalMatches: matchedCourses.length
      });
    } catch (error) {
      console.error('Error matching courses:', error);
      res.status(500).json({ error: 'Failed to match courses' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
