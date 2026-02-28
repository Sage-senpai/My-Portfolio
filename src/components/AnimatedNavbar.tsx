// ============================================================================
// FILE: src/components/AnimatedNavbar.tsx
// DESCRIPTION: Sticky centered navigation with scroll-spy active states
// ============================================================================

import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, Events } from 'react-scroll';
import '../styles/global.scss';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home',     label: 'Home'     },
  { id: 'about',    label: 'About'    },
  { id: 'projects', label: 'Projects' },
  { id: 'gallery',  label: 'Gallery'  },
];

function AnimatedNavbar(): JSX.Element {
  const [active, setActive] = useState<string>('home');

  useEffect(() => {
    Events.scrollEvent.register('begin', () => {});
    Events.scrollEvent.register('end', () => {});
    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  return (
    <nav className="navbar">
      <ul>
        {NAV_ITEMS.map(item => (
          <li key={item.id}>
            <ScrollLink
              to={item.id}
              spy={true}
              smooth={true}
              duration={600}
              offset={-80}
              className={`nav-link${active === item.id ? ' active' : ''}`}
              onSetActive={() => setActive(item.id)}
            >
              {item.label}
            </ScrollLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AnimatedNavbar;
