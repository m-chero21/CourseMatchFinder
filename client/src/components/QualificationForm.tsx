import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { StudyLevel, Grade, gradeOptions, QualificationFormData } from "@shared/schema";
import Logo from "./Logo";

interface QualificationFormProps {
  studyLevel: StudyLevel;
  onSubmit: (data: QualificationFormData) => void;
  onBack: () => void;
}

const subjectGradeSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  grade: z.enum(gradeOptions),
});

const baseFormSchema = z.object({
  country: z.string().min(1, "Country is required"),
  qualifications: z.array(subjectGradeSchema).min(1, "At least one qualification is required"),
});

const undergraduateFormSchema = baseFormSchema.extend({
  undergradDegree: z.string().optional(),
  undergradGrade: z.string().optional(),
});

const postgraduateFormSchema = baseFormSchema.extend({
  undergradDegreeCompleted: z.string().min(1, "Undergraduate degree is required for postgraduate applications"),
  undergradGradeReceived: z.string().min(1, "Undergraduate grade is required for postgraduate applications"),
  undergradInstitution: z.string().optional(),
  workExperience: z.string().optional(),
  researchInterest: z.string().optional(),
});

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo (Democratic Republic)",
  "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
  "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "North Korea", "North Macedonia", "Norway",
  "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function QualificationForm({ studyLevel, onSubmit, onBack }: QualificationFormProps) {
  const [newSubject, setNewSubject] = useState("");
  const [newGrade, setNewGrade] = useState<Grade>("A");

  const formSchema = studyLevel === 'undergraduate' ? undergraduateFormSchema : postgraduateFormSchema;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      qualifications: [],
      ...(studyLevel === 'undergraduate' ? {
        undergradDegree: "",
        undergradGrade: "",
      } : {
        undergradDegreeCompleted: "",
        undergradGradeReceived: "",
        undergradInstitution: "",
        workExperience: "",
        researchInterest: "",
      }),
    },
  });

  const qualifications = form.watch("qualifications");

  const addQualification = () => {
    if (newSubject.trim()) {
      const current = form.getValues("qualifications");
      form.setValue("qualifications", [...current, { subject: newSubject.trim(), grade: newGrade }]);
      setNewSubject("");
      setNewGrade("A");
    }
  };

  const removeQualification = (index: number) => {
    const current = form.getValues("qualifications");
    form.setValue("qualifications", current.filter((_, i) => i !== index));
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    const formData: QualificationFormData = {
      studyLevel,
      country: data.country,
      qualifications: data.qualifications,
      ...(studyLevel === 'undergraduate' ? {
        undergradDegree: (data as any).undergradDegree,
        undergradGrade: (data as any).undergradGrade,
      } : {
        undergradDegreeCompleted: (data as any).undergradDegreeCompleted,
        undergradGradeReceived: (data as any).undergradGradeReceived,
        undergradInstitution: (data as any).undergradInstitution,
        workExperience: (data as any).workExperience,
        researchInterest: (data as any).researchInterest,
      }),
    };
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <Logo className="h-12" />
          <Button variant="outline" onClick={onBack} data-testid="button-back">
            Back
          </Button>
        </header>

        <Card className="p-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">
              {studyLevel === 'undergraduate' ? 'Undergraduate' : 'Postgraduate'} Qualifications
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Tell us about your academic background to find matching courses
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                {/* Country Selection */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">What country are you from?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-country">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Qualifications */}
                <div className="space-y-4">
                  <FormLabel className="text-lg font-semibold">Your Qualifications</FormLabel>
                  
                  {/* Add Qualification */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/20 rounded-lg">
                    <div className="md:col-span-2">
                      <Input
                        placeholder="Subject (e.g., Mathematics, English)"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        data-testid="input-subject"
                      />
                    </div>
                    <Select value={newGrade} onValueChange={(value: Grade) => setNewGrade(value)}>
                      <SelectTrigger data-testid="select-grade">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {gradeOptions.map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            Grade {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button" 
                      onClick={addQualification}
                      disabled={!newSubject.trim()}
                      data-testid="button-add-qualification"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Qualification List */}
                  <div className="space-y-2">
                    {qualifications.map((qual, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{qual.subject}</span>
                          <Badge variant="secondary">Grade {qual.grade}</Badge>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQualification(index)}
                          data-testid={`button-remove-qualification-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Study Level Specific Fields */}
                {studyLevel === 'undergraduate' ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="undergradDegree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current/Intended Degree (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Computer Science" 
                              {...field} 
                              data-testid="input-undergrad-degree"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="undergradGrade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Grade (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., First Class, 2:1" 
                              {...field}
                              data-testid="input-undergrad-grade"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">Undergraduate Degree Information</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="undergradDegreeCompleted"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Undergraduate Degree Completed *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., BSc Computer Science, BA English Literature" 
                                  {...field}
                                  data-testid="input-undergrad-degree-completed"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="undergradGradeReceived"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Grade/Classification Received *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., First Class, 2:1, 3.8 GPA, Magna Cum Laude" 
                                  {...field}
                                  data-testid="input-undergrad-grade-received"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="undergradInstitution"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>University/Institution (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., University of Oxford, Harvard University" 
                                {...field}
                                data-testid="input-undergrad-institution"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="workExperience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Work Experience (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Years of experience in relevant field" 
                                  {...field}
                                  data-testid="input-work-experience"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="researchInterest"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Research Interest (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Area you'd like to research or specialize in" 
                                  {...field}
                                  data-testid="input-research-interest"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full text-lg py-6" 
                  disabled={qualifications.length === 0}
                  data-testid="button-submit"
                >
                  Find Matching Courses
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}