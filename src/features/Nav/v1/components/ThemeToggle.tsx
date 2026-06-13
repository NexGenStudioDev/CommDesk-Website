import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavbar } from '../hooks/useNavbar';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useNavbar();

  const modes = [
    { id: 'light', label: 'Light mode', Icon: Sun },
    { id: 'dark', label: 'Dark mode', Icon: Moon },
    { id: 'system', label: 'System mode', Icon: Monitor },
  ] as const;

  return (
    <div
      className="relative flex items-center rounded-full border border-border bg-muted/40 p-1"
      role="group"
      aria-label="Theme selector"
    >
      {modes.map(({ id, label, Icon }) => {
        const isActive = theme === id;
        return (
          <button
            key={id}
            onClick={() => setTheme(id)}
            className={`relative rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary z-10 ${
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label={label}
          >
            {isActive && (
              <motion.span
                layoutId="theme-slider"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full bg-background shadow-[0_2px_8px_rgba(0,0,0,0.08)] z-[-1]"
              />
            )}
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
};
