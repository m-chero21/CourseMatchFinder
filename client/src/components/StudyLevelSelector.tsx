import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen } from "lucide-react";
import { StudyLevel } from "@shared/schema";
import Logo from "./Logo";

interface StudyLevelSelectorProps {
  onSelect: (level: StudyLevel) => void;
  onBack: () => void;
}

export default function StudyLevelSelector({ onSelect, onBack }: StudyLevelSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <Logo className="h-12" />
          <Button variant="outline" onClick={onBack} data-testid="button-back">
            Back
          </Button>
        </header>

        {/* Introduction */}
        <div className="text-center mb-12">
          <Card className="p-8 bg-card/95 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What are you looking to study?
            </h2>
            <p className="text-lg text-muted-foreground">
              Select your study level to get personalized questions and course recommendations
            </p>
          </Card>
        </div>

        {/* Study Level Options */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="hover-elevate cursor-pointer transition-all duration-200" onClick={() => onSelect('undergraduate')}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                <GraduationCap className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Undergraduate</CardTitle>
              <CardDescription className="text-lg">
                Bachelor's degree programs
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Perfect if you're completing high school or looking for your first degree. 
                We'll ask about your A-levels, GCSEs, or equivalent qualifications.
              </p>
              <Button 
                className="w-full" 
                data-testid="button-undergraduate"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect('undergraduate');
                }}
              >
                Select Undergraduate
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-elevate cursor-pointer transition-all duration-200" onClick={() => onSelect('postgraduate')}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Postgraduate</CardTitle>
              <CardDescription className="text-lg">
                Master's and PhD programs
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                If you already have a bachelor's degree and want to pursue advanced studies. 
                We'll ask about your degree, experience, and research interests.
              </p>
              <Button 
                className="w-full"
                data-testid="button-postgraduate"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect('postgraduate');
                }}
              >
                Select Postgraduate
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}