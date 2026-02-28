// ============================================================================
// FILE: src/components/FuturisticFooter.tsx
// DESCRIPTION: Footer with social links — zero inline styles
// ============================================================================

import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaEnvelope, FaX } from 'react-icons/fa6';
import '../styles/components/Footer.scss';

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://x.com/sage_senpeak',
    icon: <FaX />,
    label: 'X / Twitter',
  },
  {
    href: 'https://github.com/sage-senpai',
    icon: <FaGithub />,
    label: 'GitHub',
  },
  {
    href: 'https://linkedin.com/in/divineanyadike',
    icon: <FaLinkedin />,
    label: 'LinkedIn',
  },
  {
    href: 'mailto:anyadikedivine0@gmail.com',
    icon: <FaEnvelope />,
    label: 'Email',
  },
];

function FuturisticFooter(): JSX.Element {
  return (
    <footer className="site-footer">
      <p className="footer-label">Connect with me:</p>

      <ul className="footer-social-list">
        {SOCIAL_LINKS.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="footer-social-link"
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>

      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Anyadike Divine. All rights reserved.
      </p>
    </footer>
  );
}

export default FuturisticFooter;
