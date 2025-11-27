// ============================================================================
// FILE: src/components/AboutSection.jsx
// DESCRIPTION: About section with updated professional description
// ============================================================================

import React from "react";
import { Element } from "react-scroll";
import SpotlightSkills from "./SpotlightSkills";
import "../styles/global.scss";

export default function AboutSection() {
  return (
    <Element name="about" className="page-container">
      <div className="section" data-aos="fade-up">
        <div className="section-image" data-aos="zoom-in" data-aos-delay="200">
          <img 
            src="/about.jpg" 
            alt="About" 
            className="modern-profile-img" 
          />
        </div>
        
        <div className="section-content" data-aos="fade-left" data-aos-delay="400">
          <h2 className="gradient-text">About Me</h2>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            borderRadius: '20px',
            border: '1px solid rgba(255, 0, 0, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            maxHeight: '500px',
            overflowY: 'auto',
          }}>
            <div style={{ 
              color: '#fff', 
              fontSize: '1.05rem', 
              lineHeight: '1.8',
              textAlign: 'justify',
            }}>
              <p style={{ marginBottom: '1.2rem' }}>
                Forward-thinking <span style={{ color: '#FF0000', fontWeight: '700' }}>Web3 builder</span> with a blend of front-end engineering, product thinking, and community leadership. I develop scalable, user-focused applications <span style={{ color: '#FF0000', fontWeight: '600' }}>(React, Vite, SCSS)</span> and have delivered projects across DeFi, dashboards, authentication systems, and crypto-integrated logic — including <span style={{ color: '#FF0000', fontWeight: '600' }}>Nexachain, DotVest, Dotique, Lunera</span> and multiple Web3 prototypes.
              </p>

              <p style={{ marginBottom: '1.2rem' }}>
                Beyond development, I bring strong ecosystem and community-building experience. I manage technical and gaming communities <span style={{ color: '#FF0000', fontWeight: '600' }}>(EngineeringXpress, Chasing Farlight)</span>, driving engagement, moderation systems, events, and user onboarding. This has strengthened my communication, problem-solving, and ability to maintain healthy community dynamics.
              </p>

              <p style={{ marginBottom: '1.2rem' }}>
                I also create structured, insight-driven Web3 content — deep dives, ecosystem analyses, and technical breakdowns across networks like <span style={{ color: '#FF0000', fontWeight: '600' }}>Polkadot, HeLa Labs, Ayetu Network, Cardano</span>, and more — helping onboard users and amplify innovative projects.
              </p>

              <p style={{ color: '#FF0000', fontWeight: '700', fontSize: '1.1rem' }}>
                I thrive in fast-moving environments, bridging engineering execution with storytelling and community growth. Passionate about decentralized systems, digital identity, and intuitive on-chain UX, I aim to build meaningful products and support the next generation of Web3 ecosystems.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        width: '100%', 
        maxWidth: '1400px', 
        marginTop: '4rem' 
      }}>
        <h2 
          className="text-center gradient-text" 
          data-aos="fade-up"
          style={{ marginBottom: '1rem' }}
        >
          Skills & Expertise
        </h2>
        
        <p style={{
          textAlign: 'center',
          color: '#999',
          fontSize: '1rem',
          marginBottom: '2rem',
          maxWidth: '700px',
          margin: '0 auto 3rem',
        }}
        data-aos="fade-up"
        data-aos-delay="100">
          Click on each category to explore my professional capabilities
        </p>
        
        <div data-aos="fade-up" data-aos-delay="200">
          <SpotlightSkills />
        </div>
      </div>
    </Element>
  );
}