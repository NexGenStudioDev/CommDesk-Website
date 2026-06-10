import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useNavbar } from '../../hooks/useNavbar';
import { NavLinks } from './NavLinks';
import { SearchBar } from './SearchBar';
import { UserMenu } from './UserMenu';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { navItems } from '../../types/navbar.types';
import { cn } from '../../utils/cn';

interface NavbarProps {
  isAuthenticated?: boolean;
  onAuthToggle?: () => void;
  onSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated = false, onAuthToggle, onSearch }) => {
  const { isScrolled, isMobileMenuOpen, toggleMobileMenu } = useNavbar();
  const [shouldFocusMobileSearch, setShouldFocusMobileSearch] = useState(false);

  // Mock user data
  const user = { name: 'Alex Johnson', avatar: '' };

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') {
        return;
      }

      const desktopSearch = document.querySelector<HTMLInputElement>('[data-desktop-search]');
      if (desktopSearch && desktopSearch.offsetParent !== null) {
        return;
      }

      event.preventDefault();
      setShouldFocusMobileSearch(true);
      if (!isMobileMenuOpen) {
        toggleMobileMenu();
      }
    };

    window.addEventListener('keydown', handleSearchShortcut);
    return () => window.removeEventListener('keydown', handleSearchShortcut);
  }, [isMobileMenuOpen, toggleMobileMenu]);

  const closeMobileMenu = () => {
    setShouldFocusMobileSearch(false);
    toggleMobileMenu();
  };

  const openMobileMenu = () => {
    setShouldFocusMobileSearch(false);
    toggleMobileMenu();
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'h-16 bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
          : 'h-[72px] bg-background/55 backdrop-blur-md border-b border-transparent'
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-[1600px] items-center gap-5 px-4 md:px-6 xl:gap-8 xl:px-8">
        {/* Logo Section */}
        <Link to="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:rotate-6">
            <span className="text-white font-black text-xl select-none">C</span>
          </div>
          <span className="hidden bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-lg font-bold tracking-tight text-transparent sm:block 2xl:text-xl">
            CommDesk
          </span>
        </Link>

        {/* Navigation Links */}
        <NavLinks />

        {/* Actions Section */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <SearchBar onSearch={onSearch} />
          
          <div className="hidden items-center 2xl:flex">
            <ThemeToggle />
          </div>

          <UserMenu isAuthenticated={isAuthenticated} user={user} onAuthToggle={onAuthToggle} />

          {/* Mobile Menu Button */}
          <button
            onClick={openMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground xl:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        items={navItems}
        isAuthenticated={isAuthenticated}
        onAuthToggle={onAuthToggle}
        onSearch={onSearch}
        focusSearchOnOpen={shouldFocusMobileSearch}
      />
    </header>
  );
};
