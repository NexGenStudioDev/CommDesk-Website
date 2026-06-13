import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useNavbar } from '../hooks/useNavbar';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useNavbar();

  return (
    <div
      className="flex items-center rounded-full border border-border bg-muted/50 p-1"
      role="group"
      aria-label="Theme selector"
    >
      <button
        onClick={() => setTheme('light')}
        className={`rounded-full p-1.5 transition-all ${
          theme === 'light'
            ? 'bg-background text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`rounded-full p-1.5 transition-all ${
          theme === 'dark'
            ? 'bg-background text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`rounded-full p-1.5 transition-all ${
          theme === 'system'
            ? 'bg-background text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="System mode"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  );
};
