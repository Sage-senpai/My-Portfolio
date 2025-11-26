// ============================================================================
// FILE: src/components/HeroSection.jsx
// DESCRIPTION: Simplified hero section with border container like other sections
// ============================================================================

import React from "react";
import { Element } from "react-scroll";
import "../styles/global.scss";

export default function HeroSection() {
  return (
    <Element name="home" className="page-container hero-section">
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 0, 0, 0.3)',
        padding: '4rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '2rem',
      }} data-aos="fade-up">
        
        {/* Profile Image */}
        <div data-aos="zoom-in" data-aos-delay="200">
          <img 
            src="/profile.jpg" 
            alt="Profile" 
            className="modern-profile-img"
            style={{
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #FF0000',
              boxShadow: '0 0 60px rgba(255, 0, 0, 0.6)',
            }}
          />
        </div>

        {/* Name and Title */}
        <div data-aos="fade-up" data-aos-delay="400" style={{
          maxWidth: '800px',
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            marginBottom: '1rem',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FF0000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Anyadike Divine
          </h1>

          <p style={{
            fontSize: '1.3rem',
            color: '#fff',
            fontWeight: '500',
            lineHeight: '1.6',
          }}>
            Web3 Developer | Smart Contract Engineer | Community Manager
          </p>
        </div>
      </div>
    </Element>
  );
}