import React from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../types/navbar.types';

export const NavLinks: React.FC = () => {
  return (
    <nav aria-label="Primary navigation" className="hidden xl:block">
      <ul className="flex items-center gap-5 2xl:gap-7">
        {navItems.map((item) => (
          <li key={item.href}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive ? 'text-primary' : 'text-foreground/70'
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
