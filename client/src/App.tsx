import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import NotFound from "@/pages/not-found";
import HeroSection from "@/components/HeroSection";
import StudyLevelSelector from "@/components/StudyLevelSelector";
import QualificationForm from "@/components/QualificationForm";
import CourseResults from "@/components/CourseResults";
import { StudyLevel, QualificationFormData, Course } from "@shared/schema";

type AppStep = 'hero' | 'study-level' | 'qualifications' | 'results';

function CourseMatchingApp() {
  const [currentStep, setCurrentStep] = useState<AppStep>('hero');
  const [selectedStudyLevel, setSelectedStudyLevel] = useState<StudyLevel>('undergraduate');
  const [qualificationData, setQualificationData] = useState<QualificationFormData | null>(null);

  // Todo: remove mock functionality - replace with real API call
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Computer Science BSc',
      institution: 'University of Cambridge',
      country: 'United Kingdom',
      city: 'Cambridge',
      level: 'undergraduate',
      studyArea: 'Computer Science',
      intakeDate: 'September 2024',
      applicationDeadline: 'January 15, 2024',
      tuitionCost: '£9,250/year',
      requirements: { minGrade: 'A', subjects: ['Mathematics', 'Physics'] },
      description: 'A comprehensive computer science program covering algorithms, software engineering, and artificial intelligence.'
    },
    {
      id: '2',
      title: 'Engineering MEng',
      institution: 'Imperial College London',
      country: 'United Kingdom',
      city: 'London',
      level: 'undergraduate',
      studyArea: 'Engineering',
      intakeDate: 'September 2024',
      applicationDeadline: 'January 15, 2024',
      tuitionCost: '£9,250/year',
      requirements: { minGrade: 'A', subjects: ['Mathematics', 'Physics'] },
      description: 'Four-year integrated masters program in engineering with specialization options.'
    },
    {
      id: '3',
      title: 'Business Management BA',
      institution: 'University of Oxford',
      country: 'United Kingdom',
      city: 'Oxford',
      level: 'undergraduate',
      studyArea: 'Business',
      intakeDate: 'September 2024',
      applicationDeadline: 'January 15, 2024',
      tuitionCost: '£9,250/year',
      requirements: { minGrade: 'B', subjects: ['Mathematics', 'English'] },
      description: 'Strategic business management program with focus on leadership and innovation.'
    },
    {
      id: '4',
      title: 'Psychology BSc',
      institution: 'University College London',
      country: 'United Kingdom',
      city: 'London',
      level: 'undergraduate',
      studyArea: 'Psychology',
      intakeDate: 'September 2024',
      applicationDeadline: 'January 15, 2024',
      tuitionCost: '£9,250/year',
      requirements: { minGrade: 'B', subjects: ['Biology', 'Psychology'] },
      description: 'Evidence-based psychology program covering cognitive, social, and clinical psychology.'
    },
    {
      id: '5',
      title: 'Data Science MSc',
      institution: 'University of Edinburgh',
      country: 'United Kingdom',
      city: 'Edinburgh',
      level: 'postgraduate',
      studyArea: 'Computer Science',
      intakeDate: 'September 2024',
      applicationDeadline: 'March 31, 2024',
      tuitionCost: '£25,000/year',
      requirements: { minGrade: 'Upper Second', subjects: ['Computer Science', 'Mathematics'] },
      description: 'Advanced data science program focusing on machine learning and big data analytics.'
    },
    {
      id: '6',
      title: 'MBA Executive',
      institution: 'London Business School',
      country: 'United Kingdom',
      city: 'London',
      level: 'postgraduate',
      studyArea: 'Business',
      intakeDate: 'January 2024',
      applicationDeadline: 'October 31, 2023',
      tuitionCost: '£87,900/year',
      requirements: { workExperience: '5+ years', degree: 'Any bachelor degree' },
      description: 'Executive MBA program for senior professionals with significant management experience.'
    }
  ];

  const handleStudyLevelSelect = (level: StudyLevel) => {
    setSelectedStudyLevel(level);
    setCurrentStep('qualifications');
  };

  const handleQualificationSubmit = (data: QualificationFormData) => {
    setQualificationData(data);
    // Todo: remove mock functionality - implement real matching algorithm
    setCurrentStep('results');
  };

  const filteredCourses = mockCourses.filter(course => 
    course.level === selectedStudyLevel
  );

  switch (currentStep) {
    case 'hero':
      return <HeroSection onGetStarted={() => setCurrentStep('study-level')} />;
    
    case 'study-level':
      return (
        <StudyLevelSelector 
          onSelect={handleStudyLevelSelect}
          onBack={() => setCurrentStep('hero')}
        />
      );
    
    case 'qualifications':
      return (
        <QualificationForm 
          studyLevel={selectedStudyLevel}
          onSubmit={handleQualificationSubmit}
          onBack={() => setCurrentStep('study-level')}
        />
      );
    
    case 'results':
      return qualificationData ? (
        <CourseResults 
          qualificationData={qualificationData}
          courses={filteredCourses}
          onBack={() => setCurrentStep('qualifications')}
          onStartOver={() => {
            setCurrentStep('hero');
            setQualificationData(null);
          }}
        />
      ) : null;
    
    default:
      return <NotFound />;
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={CourseMatchingApp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;