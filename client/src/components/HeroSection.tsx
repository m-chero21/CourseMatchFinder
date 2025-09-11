import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Logo from "./Logo";
import heroImage from "@assets/generated_images/International_students_studying_together_0510caf5.png";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary/5 to-accent/10">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <Logo className="h-16" />
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-card/95 backdrop-blur-sm border shadow-xl">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Find Your Perfect
                <span className="text-primary block">Educational Path</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover undergraduate and postgraduate programs that match your qualifications. 
                Get personalized course recommendations from top institutions worldwide.
              </p>

              <div className="bg-accent/20 rounded-lg p-6 mb-8">
                <p className="text-lg text-foreground">
                  Answer a few questions about your academic background and receive tailored course suggestions 
                  with application deadlines, tuition costs, and qualification requirements.
                </p>
              </div>

              <Button 
                size="lg" 
                className="text-lg px-8 py-4 h-auto"
                onClick={onGetStarted}
                data-testid="button-get-started"
              >
                Get Started
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}