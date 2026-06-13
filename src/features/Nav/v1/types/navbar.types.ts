export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Communities', href: '/communities' },
  { label: 'Events', href: '/events' },
  { label: 'Resources', href: '/resources' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface UserState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface NavbarState {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isUserMenuOpen: boolean;
  isScrolled: boolean;
  theme: 'light' | 'dark' | 'system';
}
