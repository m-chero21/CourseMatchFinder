import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Clock, DollarSign, GraduationCap, Search } from "lucide-react";
import { Course, QualificationFormData } from "@shared/schema";
import Logo from "./Logo";

interface CourseResultsProps {
  qualificationData: QualificationFormData;
  courses: Course[];
  onBack: () => void;
  onStartOver: () => void;
}

export default function CourseResults({ qualificationData, courses, onBack, onStartOver }: CourseResultsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [studyAreaFilter, setStudyAreaFilter] = useState("all");

  // Get unique values for filters
  const countries = Array.from(new Set(courses.map(course => course.country)));
  const studyAreas = Array.from(new Set(courses.map(course => course.studyArea)));

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = countryFilter === "all" || course.country === countryFilter;
    const matchesStudyArea = studyAreaFilter === "all" || course.studyArea === studyAreaFilter;
    
    return matchesSearch && matchesCountry && matchesStudyArea;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <Logo className="h-12" />
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack} data-testid="button-back">
              Back
            </Button>
            <Button variant="outline" onClick={onStartOver} data-testid="button-start-over">
              Start Over
            </Button>
          </div>
        </header>

        {/* Results Header */}
        <div className="text-center mb-8">
          <Card className="p-6">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Courses You Qualify For
            </h1>
            <p className="text-lg text-muted-foreground">
              Based on your {qualificationData.studyLevel} qualifications from {qualificationData.country}
            </p>
            <div className="flex justify-center mt-4">
              <Badge variant="outline" className="text-sm">
                {filteredCourses.length} courses found
              </Badge>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses or institutions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search"
              />
            </div>
            
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger data-testid="select-country-filter">
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={studyAreaFilter} onValueChange={setStudyAreaFilter}>
              <SelectTrigger data-testid="select-study-area-filter">
                <SelectValue placeholder="Filter by study area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Study Areas</SelectItem>
                {studyAreas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setCountryFilter("all");
                setStudyAreaFilter("all");
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          </div>
        </Card>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover-elevate transition-all duration-200" data-testid={`card-course-${course.id}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {course.level}
                  </Badge>
                  <Badge variant="outline">{course.studyArea}</Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                <CardDescription className="font-medium">{course.institution}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{course.city}, {course.country}</span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Intake: {course.intakeDate}</span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Apply by: {course.applicationDeadline}</span>
                </div>

                <div className="flex items-center text-sm font-semibold text-primary">
                  <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{course.tuitionCost}</span>
                </div>

                {course.description && (
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                    {course.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="p-12 text-center">
            <h3 className="text-xl font-semibold mb-4">No courses found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or filters to find more courses.
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setCountryFilter("all");
              setStudyAreaFilter("all");
            }}>
              Clear All Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}