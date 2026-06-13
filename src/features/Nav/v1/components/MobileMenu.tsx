import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Search, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import type { NavItem } from '../types/navbar.types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  isAuthenticated: boolean;
  onAuthToggle?: () => void;
  onSearch?: (query: string) => void;
  focusSearchOnOpen?: boolean;
}

const focusableElementsSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  items,
  isAuthenticated,
  onAuthToggle,
  onSearch,
  focusSearchOnOpen = false,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElement.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (focusSearchOnOpen) {
      searchInputRef.current?.focus();
    } else {
      closeButtonRef.current?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) {
        return;
      }

      const focusableElements = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          focusableElementsSelector,
        ),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement.current?.focus();
    };
  }, [focusSearchOnOpen, isOpen, onClose]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) {
        return;
      }

      onSearch?.(trimmedQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [onSearch, searchQuery]);

  const handleNavigate = () => {
    onClose();
  };

  const handleAuthAction = () => {
    onClose();
    onAuthToggle?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-50 xl:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            aria-hidden="true"
          />
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className="absolute inset-y-0 right-0 flex h-dvh w-full max-w-sm flex-col overflow-hidden border-l border-border bg-background text-foreground shadow-2xl sm:w-[85vw]"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 shadow-md">
                  <span className="text-white font-black text-sm select-none">C</span>
                </div>
                <span
                  id="mobile-menu-title"
                  className="font-black text-lg bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent"
                >
                  CommDesk
                </span>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="shrink-0 border-b border-border px-4 py-4 sm:px-5">
              <label
                className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                htmlFor="mobile-search"
              >
                Search
              </label>
              <div className="relative mt-3">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="mobile-search"
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search CommDesk"
                  aria-label="Search CommDesk"
                  autoComplete="off"
                  className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <nav
              aria-label="Mobile navigation"
              className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5 sm:py-6"
            >
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Navigation
              </div>
              <div className="flex flex-col gap-1">
                {items.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={handleNavigate}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground/75 hover:bg-muted hover:text-foreground'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </nav>

            <div className="shrink-0 space-y-3 border-t border-border bg-background px-4 py-4 sm:px-5 sm:py-5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Appearance
                </span>
                <ThemeToggle />
              </div>
              {isAuthenticated ? (
                <button
                  onClick={handleAuthAction}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-semibold text-red-500 dark:text-red-400 transition-colors hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAuthAction}
                    className="w-full rounded-xl border border-border py-3 text-center text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleAuthAction}
                    className="w-full rounded-xl bg-gradient-to-r from-primary to-purple-600 py-3 text-center text-sm font-bold text-primary-foreground shadow-[0_4px_12px_rgba(170,59,255,0.3)] hover:shadow-[0_6px_16px_rgba(170,59,255,0.4)] transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
