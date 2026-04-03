// ============================================================================
// FILE: src/components/HeroSection.tsx
// DESCRIPTION: Hero landing section — profile, name, and primary tagline
// ============================================================================

import React from 'react';
import { Element } from 'react-scroll';
import '../styles/components/Hero.scss';

export default function HeroSection(): JSX.Element {
  return (
    <Element name="home" className="page-container hero-section">
      <div className="hero-container" data-aos="fade-up">

        {/* Profile image */}
        <div className="hero-profile-wrap" data-aos="zoom-in" data-aos-delay="200">
          <img
            src="/profile.jpg"
            alt="Anyadike Divine — Full Stack Web3 Engineer"
            className="hero-profile-img"
          />
        </div>

        {/* Identity block */}
        <div className="hero-text" data-aos="fade-up" data-aos-delay="400">
          <h1 className="hero-name">Anyadike Divine</h1>
          {/* On desktop: one line with pipe separators.
              On mobile (≤480px): each role stacks on its own line.
              The CSS hides .hero-role-sep and adds ▸ bullets per role. */}
          <p className="hero-tagline">
            <span className="hero-role">Web3 Developer</span>
            <span className="hero-role-sep" aria-hidden="true">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <span className="hero-role">Smart Contract Engineer</span>
            <span className="hero-role-sep" aria-hidden="true">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
            <span className="hero-role">Community Manager</span>
          </p>
        </div>

      </div>
    </Element>
  );
}
