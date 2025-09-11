import QualificationForm from '../QualificationForm';

export default function QualificationFormExample() {
  return (
    <QualificationForm 
      studyLevel="undergraduate"
      onSubmit={(data) => console.log('Form submitted:', data)}
      onBack={() => console.log('Back clicked')}
    />
  );
}