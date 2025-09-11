import { ThemeProvider } from '../ThemeProvider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTheme } from '../ThemeProvider';

function ThemeToggleExample() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6 space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Theme Example</h3>
        <p className="text-muted-foreground mb-4">
          Current theme: {theme}
        </p>
        <Button 
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          variant="outline"
        >
          Toggle to {theme === "light" ? "dark" : "light"} mode
        </Button>
      </Card>
    </div>
  );
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <ThemeToggleExample />
    </ThemeProvider>
  );
}