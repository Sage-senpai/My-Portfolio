// ============================================================================
// FILE: src/components/AboutSection.tsx
// DESCRIPTION: About me — bio, positioning, and skills accordion
// ============================================================================

import React from 'react';
import { Element } from 'react-scroll';
import SpotlightSkills from './SpotlightSkills';
import '../styles/components/About.scss';

export default function AboutSection(): JSX.Element {
  return (
    <Element name="about" className="page-container">

      {/* Bio grid */}
      <div className="section" data-aos="fade-up">
        <div className="section-image" data-aos="zoom-in" data-aos-delay="200">
          <img
            src="/about.jpg"
            alt="Anyadike Divine at a community event"
            className="modern-profile-img"
          />
        </div>

        <div className="section-content" data-aos="fade-left" data-aos-delay="400">
          <h2 className="gradient-text">About Me</h2>

          <div className="about-bio-box">
            <div className="about-bio-text">
              <p>
                Forward-thinking{' '}
                <span className="highlight">Web3 builder</span> with a blend of
                front-end engineering, product thinking, and community leadership.
                I develop scalable, user-focused applications{' '}
                <span className="highlight-soft">(React, Vite, SCSS)</span> and have
                delivered projects across DeFi, dashboards, authentication systems,
                and crypto-integrated logic — including{' '}
                <span className="highlight-soft">
                  Nexachain, DotVest, Dotique, Lunera
                </span>{' '}
                and multiple Web3 prototypes.
              </p>

              <p>
                Beyond development, I bring strong ecosystem and community-building
                experience. I manage technical and gaming communities{' '}
                <span className="highlight-soft">
                  (EngineeringXpress, Chasing Farlight)
                </span>
                , driving engagement, moderation systems, events, and user onboarding.
                This has strengthened my communication, problem-solving, and ability
                to maintain healthy community dynamics.
              </p>

              <p>
                I also create structured, insight-driven Web3 content — deep dives,
                ecosystem analyses, and technical breakdowns across networks like{' '}
                <span className="highlight-soft">
                  Polkadot, HeLa Labs, Ayetu Network, Cardano
                </span>{' '}
                — helping onboard users and amplify innovative projects.
              </p>

              <p className="closing-statement">
                I thrive in fast-moving environments, bridging engineering execution
                with storytelling and community growth. Focused on decentralized
                systems, digital identity, and intuitive on-chain UX — building
                meaningful products and accelerating the next generation of Web3
                ecosystems.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills section */}
      <div className="skills-wrapper" data-aos="fade-up">
        <h2
          className="text-center gradient-text"
          data-aos="fade-up"
          style={{ marginBottom: '1rem' }}
        >
          Skills &amp; Expertise
        </h2>

        <div data-aos="fade-up" data-aos-delay="200">
          <SpotlightSkills />
        </div>
      </div>

    </Element>
  );
}
