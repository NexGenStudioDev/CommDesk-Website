import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import {
  MobileMenu,
  Navbar,
  NavLinks,
  SearchBar,
} from '../src/components/navbar';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { navItems } from '../src/types/navbar.types';

const { toggleMobileMenuMock } = vi.hoisted(() => ({
  toggleMobileMenuMock: vi.fn(),
}));

// Mock the useNavbar hook
vi.mock('../src/hooks/useNavbar', () => ({
  useNavbar: () => ({
    isScrolled: false,
    isMobileMenuOpen: false,
    toggleMobileMenu: toggleMobileMenuMock,
    isSearchOpen: false,
    toggleSearch: vi.fn(),
    isUserMenuOpen: false,
    toggleUserMenu: vi.fn(),
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

beforeEach(() => {
  toggleMobileMenuMock.mockClear();
});

afterEach(() => {
  vi.useRealTimers();
});

const renderNavbar = (isAuthenticated = false) => {
  return render(
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} />
    </BrowserRouter>,
  );
};

describe('Navbar Component', () => {
  it('renders the brand name', () => {
    renderNavbar();
    expect(screen.getByText(/CommDesk/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderNavbar();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Features/i)).toBeInTheDocument();
    expect(screen.getByText(/Pricing/i)).toBeInTheDocument();
  });

  it('displays the user avatar when authenticated', () => {
    renderNavbar(true);
    // Initially only the first character is shown in the avatar button
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('contains the search input', () => {
    renderNavbar();
    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
  });
});

describe('MobileMenu Component', () => {
  it('renders navigation inside a modal drawer', () => {
    render(
      <BrowserRouter>
        <MobileMenu
          isOpen
          isAuthenticated={false}
          items={navItems}
          onClose={vi.fn()}
        />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('dialog', { name: /CommDesk/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: /Mobile navigation/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Communities/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign In/i }),
    ).toBeInTheDocument();
  });

  it('shows logout instead of logged-out actions when authenticated', () => {
    render(
      <BrowserRouter>
        <MobileMenu isOpen isAuthenticated items={navItems} onClose={vi.fn()} />
      </BrowserRouter>,
    );

    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Sign In/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Get Started/i }),
    ).not.toBeInTheDocument();
  });

  it('closes when Escape is pressed', () => {
    const onClose = vi.fn();

    render(
      <BrowserRouter>
        <MobileMenu
          isOpen
          isAuthenticated={false}
          items={navItems}
          onClose={onClose}
        />
      </BrowserRouter>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('closes after selecting a navigation link', () => {
    const onClose = vi.fn();

    render(
      <MemoryRouter initialEntries={['/']}>
        <MobileMenu
          isOpen
          isAuthenticated={false}
          items={navItems}
          onClose={onClose}
        />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('link', { name: 'About' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('provides debounced search inside the drawer', () => {
    vi.useFakeTimers();
    const onSearch = vi.fn();

    render(
      <MemoryRouter>
        <MobileMenu
          isOpen
          isAuthenticated={false}
          items={navItems}
          onClose={vi.fn()}
          onSearch={onSearch}
        />
      </MemoryRouter>,
    );

    fireEvent.change(
      screen.getByRole('searchbox', { name: /Search CommDesk/i }),
      {
        target: { value: '  pricing  ' },
      },
    );
    vi.advanceTimersByTime(300);

    expect(onSearch).toHaveBeenCalledWith('pricing');
  });

  it('focuses drawer search when requested on open', () => {
    render(
      <MemoryRouter>
        <MobileMenu
          isOpen
          isAuthenticated={false}
          items={navItems}
          onClose={vi.fn()}
          focusSearchOnOpen
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('searchbox', { name: /Search CommDesk/i }),
    ).toHaveFocus();
  });
});

describe('Navbar interactions', () => {
  it('marks the current route as active', () => {
    render(
      <MemoryRouter initialEntries={['/events']}>
        <NavLinks />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Events' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('focuses search with Ctrl+K and sends a debounced query', () => {
    vi.useFakeTimers();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    const searchInput = screen.getByRole('textbox', {
      name: /Search CommDesk/i,
    });
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(searchInput).toHaveFocus();

    fireEvent.change(searchInput, { target: { value: '  communities  ' } });
    vi.advanceTimersByTime(300);

    expect(onSearch).toHaveBeenCalledWith('communities');
  });

  it('opens the mobile drawer with Ctrl+K when desktop search is hidden', () => {
    renderNavbar();

    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });

    expect(toggleMobileMenuMock).toHaveBeenCalledOnce();
  });
});
