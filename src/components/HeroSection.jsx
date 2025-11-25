import React from "react";
import { Element } from "react-scroll";
import "../styles/global.scss";

export default function HeroSection() {
  return (
    <Element name="home" className="page-container hero-section">
      <div className="section" data-aos="fade-up">
        <div className="section-image" data-aos="zoom-in" data-aos-delay="200">
          <div style={{
            position: 'relative',
            padding: '15px',
            background: 'linear-gradient(135deg, #B00020, #8B0000)',
            borderRadius: '50%',
            boxShadow: '0 0 80px rgba(176, 0, 32, 0.8), 0 0 150px rgba(176, 0, 32, 0.4)',
            animation: 'float 6s ease-in-out infinite'
          }}>
            <img 
              src="/profile.jpg" 
              alt="Profile" 
              className="modern-profile-img"
              style={{
                border: '5px solid #1C1C1C',
                boxShadow: 'inset 0 0 40px rgba(176, 0, 32, 0.4)',
                width: '320px',
                height: '320px'
              }}
            />
          </div>
        </div>

        <div className="section-content" data-aos="fade-left" data-aos-delay="400">
          <h1 className="gradient-text animated-name" style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            marginBottom: '1.5rem',
            fontWeight: '900',
            letterSpacing: '-0.02em'
          }}>
            Anyadike Divine
          </h1>

          <div style={{
            background: 'rgba(28, 28, 28, 0.6)',
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            borderRadius: '20px',
            border: '1px solid rgba(176, 0, 32, 0.2)',
            marginBottom: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
          }}>
            <p className="description" style={{
              fontSize: '1.2rem',
              lineHeight: '1.8',
              color: '#fff',
              textAlign: 'center'
            }}>
              <span style={{ color: '#B00020', fontWeight: '700' }}>||</span> Creative Thinker 
              <span style={{ color: '#B00020', fontWeight: '700' }}> || </span> Web3 Enthusiast & DevRel 
              <span style={{ color: '#B00020', fontWeight: '700' }}> || </span> FrontEnd Dev 
              <span style={{ color: '#B00020', fontWeight: '700' }}> || </span> Robotics Student 
              <span style={{ color: '#B00020', fontWeight: '700' }}> || </span> Public Speaker & Community Manager 
              <span style={{ color: '#B00020', fontWeight: '700' }}> || </span> Rotaractor 
              <span style={{ color: '#B00020', fontWeight: '700' }}> ||</span>
            </p>
          </div>

          <div className="floating-pills" data-aos="fade-up" data-aos-delay="600">
            <a 
              href="#about" 
              className="pill"
              style={{
                background: 'linear-gradient(135deg, rgba(176, 0, 32, 0.2), transparent)',
                border: '2px solid #B00020',
                color: '#B00020',
                fontWeight: '700',
                fontSize: '1.1rem',
                padding: '1rem 2.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={e => {
                e.target.style.background = 'linear-gradient(135deg, #B00020, #8B0000)';
                e.target.style.color = '#fff';
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 10px 30px rgba(176, 0, 32, 0.6)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'linear-gradient(135deg, rgba(176, 0, 32, 0.2), transparent)';
                e.target.style.color = '#B00020';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              About
            </a>
            
            <a 
              href="#projects" 
              className="pill"
              style={{
                background: 'linear-gradient(135deg, rgba(176, 0, 32, 0.2), transparent)',
                border: '2px solid #B00020',
                color: '#B00020',
                fontWeight: '700',
                fontSize: '1.1rem',
                padding: '1rem 2.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={e => {
                e.target.style.background = 'linear-gradient(135deg, #B00020, #8B0000)';
                e.target.style.color = '#fff';
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 10px 30px rgba(176, 0, 32, 0.6)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'linear-gradient(135deg, rgba(176, 0, 32, 0.2), transparent)';
                e.target.style.color = '#B00020';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Projects
            </a>
            
            <a 
              href="#contact" 
              className="pill"
              style={{
                background: 'linear-gradient(135deg, #B00020, #8B0000)',
                border: '2px solid #B00020',
                color: '#fff',
                fontWeight: '700',
                fontSize: '1.1rem',
                padding: '1rem 2.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: '0 4px 20px rgba(176, 0, 32, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 10px 40px rgba(176, 0, 32, 0.6)';
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(176, 0, 32, 0.4)';
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </Element>
  );
}