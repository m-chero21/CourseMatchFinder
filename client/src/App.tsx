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
import { apiRequest } from "./lib/queryClient";

type AppStep = 'hero' | 'study-level' | 'qualifications' | 'results';

function CourseMatchingApp() {
  const [currentStep, setCurrentStep] = useState<AppStep>('hero');
  const [selectedStudyLevel, setSelectedStudyLevel] = useState<StudyLevel>('undergraduate');
  const [qualificationData, setQualificationData] = useState<QualificationFormData | null>(null);
  const [matchedCourses, setMatchedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const handleStudyLevelSelect = (level: StudyLevel) => {
    setSelectedStudyLevel(level);
    setCurrentStep('qualifications');
  };

  const handleQualificationSubmit = async (data: QualificationFormData) => {
    setLoading(true);
    setQualificationData(data);
    
    try {
      const response = await apiRequest('POST', '/api/match-courses', data);
      
      const result = await response.json();
      setMatchedCourses(result.matchedCourses);
      setCurrentStep('results');
    } catch (error) {
      console.error('Error matching courses:', error);
      // Fallback to showing empty results
      setMatchedCourses([]);
      setCurrentStep('results');
    } finally {
      setLoading(false);
    }
  };

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
          loading={loading}
        />
      );
    
    case 'results':
      return qualificationData ? (
        <CourseResults 
          qualificationData={qualificationData}
          courses={matchedCourses}
          onBack={() => setCurrentStep('qualifications')}
          onStartOver={() => {
            setCurrentStep('hero');
            setQualificationData(null);
            setMatchedCourses([]);
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