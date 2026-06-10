import React, { createContext, useContext, useState, useEffect } from 'react';
import type { NavbarState } from '../types/navbar.types';

interface NavbarContextType extends NavbarState {
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
  toggleUserMenu: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialTheme = (): 'light' | 'dark' | 'system' => {
    if (typeof window === 'undefined') {
      return 'system';
    }

    return (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';
  };

  const [state, setState] = useState<NavbarState>({
    isMobileMenuOpen: false,
    isSearchOpen: false,
    isUserMenuOpen: false,
    isScrolled: false,
    theme: getInitialTheme(),
  });

  useEffect(() => {
    const handleScroll = () => {
      setState((prev) => ({
        ...prev,
        isScrolled: window.scrollY > 20,
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setState((prev) => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }));
  };

  const toggleSearch = () => {
    setState((prev) => ({ ...prev, isSearchOpen: !prev.isSearchOpen }));
  };

  const toggleUserMenu = () => {
    setState((prev) => ({ ...prev, isUserMenuOpen: !prev.isUserMenuOpen }));
  };

  const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.removeAttribute('data-theme');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      root.setAttribute('data-theme', systemTheme);
    } else {
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
  };

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    setState((prev) => ({ ...prev, theme }));
    applyTheme(theme);
  };

  // Initial theme application
  useEffect(() => {
    applyTheme(state.theme);
  }, [state.theme]);

  useEffect(() => {
    if (state.theme !== 'system') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => applyTheme('system');

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [state.theme]);

  return (
    <NavbarContext.Provider
      value={{
        ...state,
        toggleMobileMenu,
        toggleSearch,
        toggleUserMenu,
        setTheme,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};
