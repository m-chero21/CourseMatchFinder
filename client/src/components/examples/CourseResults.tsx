import CourseResults from '../CourseResults';
import { Course, QualificationFormData } from '@shared/schema';

// Todo: remove mock functionality
const mockQualificationData: QualificationFormData = {
  studyLevel: 'undergraduate',
  country: 'United Kingdom',
  qualifications: [
    { subject: 'Mathematics', grade: 'A' },
    { subject: 'Physics', grade: 'B' },
    { subject: 'Chemistry', grade: 'A' }
  ],
  undergradDegree: 'Computer Science',
  undergradGrade: 'First Class'
};

// Todo: remove mock functionality
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
  }
];

export default function CourseResultsExample() {
  return (
    <CourseResults 
      qualificationData={mockQualificationData}
      courses={mockCourses}
      onBack={() => console.log('Back clicked')}
      onStartOver={() => console.log('Start over clicked')}
    />
  );
}