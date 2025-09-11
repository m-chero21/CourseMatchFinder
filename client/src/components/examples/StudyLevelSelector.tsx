import StudyLevelSelector from '../StudyLevelSelector';

export default function StudyLevelSelectorExample() {
  return (
    <StudyLevelSelector 
      onSelect={(level) => console.log('Selected level:', level)}
      onBack={() => console.log('Back clicked')}
    />
  );
}