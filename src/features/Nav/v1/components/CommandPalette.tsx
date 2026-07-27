import { useNavbar } from '../hooks/useNavbar';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  Layers,
  Users,
  Calendar,
  BookOpen,
  DollarSign,
  Info,
  Laptop,
  GitBranch,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { navItems } from '../types/navbar.types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
}

interface PaletteItem {
  id: string;
  label: string;
  category: 'Pages' | 'Actions' | 'Community & Help';
  href?: string;
  action?: () => void;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSearch,
}) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useNavbar();
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Define searchable items
  const items: PaletteItem[] = [
    // Pages from navItems
    {
      id: 'page-home',
      label: 'Home',
      category: 'Pages',
      href: '/',
      icon: Home,
      description: 'Go to Homepage',
    },
    {
      id: 'page-features',
      label: 'Features',
      category: 'Pages',
      href: '/features',
      icon: Layers,
      description: 'Explore product surface and capabilities',
    },
    {
      id: 'page-communities',
      label: 'Communities',
      category: 'Pages',
      href: '/communities',
      icon: Users,
      description: 'Connect with other groups and teams',
    },
    {
      id: 'page-events',
      label: 'Events',
      category: 'Pages',
      href: '/events',
      icon: Calendar,
      description: 'See live programming and sessions',
    },
    {
      id: 'page-resources',
      label: 'Resources',
      category: 'Pages',
      href: '/resources',
      icon: BookOpen,
      description: 'View documentation and templates',
    },
    {
      id: 'page-pricing',
      label: 'Pricing',
      category: 'Pages',
      href: '/pricing',
      icon: DollarSign,
      description: 'Check subscription tiers and plans',
    },
    {
      id: 'page-about',
      label: 'About',
      category: 'Pages',
      href: '/about',
      icon: Info,
      description: 'Learn about CommDesk and the creators',
    },
    // Quick Actions
    {
      id: 'action-theme',
      label: 'Toggle Theme',
      category: 'Actions',
      action: () => setTheme(theme === 'light' ? 'dark' : 'light'),
      icon: Laptop,
      description: 'Switch between light and dark mode',
    },
    // Links / Help
    {
      id: 'help-github',
      label: 'Vite on GitHub',
      category: 'Community & Help',
      action: () => window.open('https://github.com/vitejs/vite', '_blank'),
      icon: GitBranch,
      description: 'Check source code and contribute',
    },
    {
      id: 'help-discord',
      label: 'Join Discord Chat',
      category: 'Community & Help',
      action: () => window.open('https://chat.vite.dev/', '_blank'),
      icon: MessageSquare,
      description: 'Get help and chat with developers',
    },
  ];

  // Filter items based on query
  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(query.toLowerCase())),
  );

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle auto-focus
  useEffect(() => {
    if (isOpen) {
      // Focus input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle outside click & escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev + 1 >= filteredItems.length ? 0 : prev + 1,
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev - 1 < 0 ? filteredItems.length - 1 : prev - 1,
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  // Auto-scroll selected item into view
  useEffect(() => {
    const activeEl = listRef.current?.querySelector('[aria-selected="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Send search query upstream (for analytics or main content filters)
  useEffect(() => {
    if (query) {
      onSearch?.(query);
    }
  }, [query, onSearch]);

  const handleSelect = (item: PaletteItem) => {
    if (item.href) {
      navigate(item.href);
    } else if (item.action) {
      item.action();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 pt-[12vh] pb-4"
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
        >
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/40 dark:bg-black/60 backdrop-blur-md"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border/80 bg-background/95 dark:bg-background/80 backdrop-blur-xl shadow-2xl flex flex-col z-10"
          >
            {/* Header / Input */}
            <div className="relative flex items-center border-b border-border/40 px-4 py-3.5">
              <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, actions, and help..."
                className="w-full bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground/60 text-[16px] md:text-sm focus:ring-0"
              />
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <kbd className="hidden sm:inline-flex h-5 select-none items-center rounded border border-border/80 bg-muted px-1.5 font-mono text-[9px] text-muted-foreground">
                  ESC
                </kbd>
              </div>
            </div>

            {/* List Results */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto max-h-[380px] p-2 space-y-4"
            >
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-2">
                  <Search className="h-8 w-8 text-muted-foreground/45" />
                  <span>No results found for "{query}"</span>
                </div>
              ) : (
                // Group items by category
                (['Pages', 'Actions', 'Community & Help'] as const).map(
                  (cat) => {
                    const catItems = filteredItems.filter(
                      (item) => item.category === cat,
                    );
                    if (catItems.length === 0) return null;

                    return (
                      <div key={cat} className="space-y-1">
                        <div className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                          {cat}
                        </div>
                        {catItems.map((item) => {
                          const absoluteIndex = filteredItems.indexOf(item);
                          const isSelected = absoluteIndex === selectedIndex;
                          const Icon = item.icon;

                          return (
                            <div
                              key={item.id}
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => handleSelect(item)}
                              onMouseEnter={() =>
                                setSelectedIndex(absoluteIndex)
                              }
                              className={`group flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer select-none transition-all ${
                                isSelected
                                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/10'
                                  : 'hover:bg-muted/50 text-foreground'
                              }`}
                            >
                              <div className="flex items-center min-w-0 mr-3">
                                <div
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                                    isSelected
                                      ? 'bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground'
                                      : 'bg-muted/40 border-border text-muted-foreground'
                                  }`}
                                >
                                  <Icon className="h-4.5 w-4.5" />
                                </div>
                                <div className="ml-3 min-w-0">
                                  <p className="text-sm font-medium leading-none">
                                    {item.label}
                                  </p>
                                  {item.description && (
                                    <p
                                      className={`text-[11px] mt-1.5 truncate leading-none ${
                                        isSelected
                                          ? 'text-primary-foreground/75'
                                          : 'text-muted-foreground'
                                      }`}
                                    >
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center shrink-0">
                                {isSelected ? (
                                  <div className="flex items-center gap-1">
                                    <span className="text-[10px] font-medium opacity-85">
                                      Open
                                    </span>
                                    <ArrowRight className="h-3 w-3" />
                                  </div>
                                ) : (
                                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/35 group-hover:text-muted-foreground/75 transition-colors" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  },
                )
              )}
            </div>

            {/* Footer with key descriptions */}
            <div className="border-t border-border/40 px-4 py-3 bg-muted/20 dark:bg-muted/5 flex items-center justify-between text-[11px] text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 items-center justify-center rounded border border-border bg-background px-1 font-mono text-[9px]">
                    ↑
                  </kbd>
                  <kbd className="inline-flex h-4 items-center justify-center rounded border border-border bg-background px-1 font-mono text-[9px]">
                    ↓
                  </kbd>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 items-center justify-center rounded border border-border bg-background px-1 font-mono text-[9px]">
                    ↵
                  </kbd>
                  <span>to select</span>
                </span>
              </div>
              <div>Press ESC to close</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
