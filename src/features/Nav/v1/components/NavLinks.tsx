import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navItems } from '../types/navbar.types';

export const NavLinks: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();

  return (
    <nav aria-label="Primary navigation" className="hidden xl:block">
      <ul
        className="flex items-center gap-0"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;

          return (
            <li
              key={item.href}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {/* Solid hover pill — brought back */}
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full bg-foreground/[0.07] z-0"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}

              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `relative z-10 block px-4 py-2 whitespace-nowrap text-[13px] font-medium tracking-[0.01em] transition-colors duration-150 focus-visible:outline-none ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-foreground/65 hover:text-foreground'
                  }`
                }
              >
                {item.label}
                {/* Upstox-style active underline */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-line"
                    className="absolute bottom-[-2px] left-4 right-4 h-[2px] rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
