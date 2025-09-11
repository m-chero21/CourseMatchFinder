import { type User, type InsertUser, type Course, type InsertCourse, type QualificationSubmission, type InsertQualificationSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Course operations
  getAllCourses(): Promise<Course[]>;
  getCourseById(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  getCoursesByLevel(level: string): Promise<Course[]>;
  
  // Qualification submission operations
  createQualificationSubmission(submission: InsertQualificationSubmission): Promise<QualificationSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<string, Course>;
  private qualificationSubmissions: Map<string, QualificationSubmission>;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.qualificationSubmissions = new Map();
    this.seedCourses();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourseById(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }

  async getCoursesByLevel(level: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.level === level);
  }

  async createQualificationSubmission(insertSubmission: InsertQualificationSubmission): Promise<QualificationSubmission> {
    const id = randomUUID();
    const submission: QualificationSubmission = { ...insertSubmission, id };
    this.qualificationSubmissions.set(id, submission);
    return submission;
  }

  private seedCourses() {
    const sampleCourses = [
      {
        title: "Computer Science BSc",
        institution: "University of Cambridge",
        country: "United Kingdom",
        city: "Cambridge",
        level: "undergraduate",
        studyArea: "Computer Science",
        intakeDate: "September 2024",
        applicationDeadline: "January 15, 2024",
        tuitionCost: "£9,250/year",
        requirements: { minGrades: { Mathematics: "A", Physics: "B" }, subjects: ["Mathematics", "Physics"] },
        description: "A comprehensive computer science program covering algorithms, software engineering, and artificial intelligence."
      },
      {
        title: "Engineering MEng",
        institution: "Imperial College London",
        country: "United Kingdom",
        city: "London",
        level: "undergraduate",
        studyArea: "Engineering",
        intakeDate: "September 2024",
        applicationDeadline: "January 15, 2024",
        tuitionCost: "£9,250/year",
        requirements: { minGrades: { Mathematics: "A", Physics: "A" }, subjects: ["Mathematics", "Physics"] },
        description: "Four-year integrated masters program in engineering with specialization options."
      },
      {
        title: "Business Management BA",
        institution: "University of Oxford",
        country: "United Kingdom",
        city: "Oxford",
        level: "undergraduate",
        studyArea: "Business",
        intakeDate: "September 2024",
        applicationDeadline: "January 15, 2024",
        tuitionCost: "£9,250/year",
        requirements: { minGrades: { Mathematics: "B", English: "B" }, subjects: ["Mathematics", "English"] },
        description: "Strategic business management program with focus on leadership and innovation."
      },
      {
        title: "Psychology BSc",
        institution: "University College London",
        country: "United Kingdom",
        city: "London",
        level: "undergraduate",
        studyArea: "Psychology",
        intakeDate: "September 2024",
        applicationDeadline: "January 15, 2024",
        tuitionCost: "£9,250/year",
        requirements: { minGrades: { Biology: "B", Psychology: "B" }, subjects: ["Biology", "Psychology"] },
        description: "Evidence-based psychology program covering cognitive, social, and clinical psychology."
      },
      {
        title: "Data Science MSc",
        institution: "University of Edinburgh",
        country: "United Kingdom",
        city: "Edinburgh",
        level: "postgraduate",
        studyArea: "Computer Science",
        intakeDate: "September 2024",
        applicationDeadline: "March 31, 2024",
        tuitionCost: "£25,000/year",
        requirements: { undergradRequirement: "Upper Second Class or equivalent in Computer Science, Mathematics, or related field" },
        description: "Advanced data science program focusing on machine learning and big data analytics."
      },
      {
        title: "MBA Executive",
        institution: "London Business School",
        country: "United Kingdom",
        city: "London",
        level: "postgraduate",
        studyArea: "Business",
        intakeDate: "January 2024",
        applicationDeadline: "October 31, 2023",
        tuitionCost: "£87,900/year",
        requirements: { workExperience: "5+ years management experience", undergradRequirement: "Any bachelor degree" },
        description: "Executive MBA program for senior professionals with significant management experience."
      },
      {
        title: "Medicine MBBS",
        institution: "University of Toronto",
        country: "Canada",
        city: "Toronto",
        level: "undergraduate",
        studyArea: "Medicine",
        intakeDate: "September 2024",
        applicationDeadline: "October 1, 2023",
        tuitionCost: "CAD $58,160/year",
        requirements: { minGrades: { Biology: "A", Chemistry: "A", Physics: "B", Mathematics: "B" }, subjects: ["Biology", "Chemistry", "Physics", "Mathematics"] },
        description: "Six-year medical degree program leading to medical licensure in Canada."
      },
      {
        title: "Artificial Intelligence MS",
        institution: "Stanford University",
        country: "United States",
        city: "Stanford",
        level: "postgraduate",
        studyArea: "Computer Science",
        intakeDate: "September 2024",
        applicationDeadline: "December 15, 2023",
        tuitionCost: "$58,080/year",
        requirements: { undergradRequirement: "Bachelor's in Computer Science, Mathematics, or Engineering with 3.5+ GPA" },
        description: "Cutting-edge AI program covering machine learning, neural networks, and robotics."
      }
    ];

    sampleCourses.forEach(courseData => {
      const id = randomUUID();
      const course: Course = { 
        ...courseData, 
        id,
        description: courseData.description || null
      };
      this.courses.set(id, course);
    });
  }
}

export const storage = new MemStorage();
