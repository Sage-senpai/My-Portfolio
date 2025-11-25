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
            className="modern-profile-img framed" 
          />
        </div>
        
        <div className="section-content" data-aos="fade-left" data-aos-delay="400">
          <h2 className="gradient-text">About Me</h2>
          
          <div className="description" style={{
            background: 'rgba(28, 28, 28, 0.6)',
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            borderRadius: '20px',
            border: '1px solid rgba(176, 0, 32, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}>
            <p style={{ marginBottom: '1rem', color: '#fff' }}>
              My name is <span style={{ color: '#B00020', fontWeight: '700' }}>Divine Anyadike</span>. 
              I'm a computer and robotics education student with a burning passion for Web3 technology.
            </p>
            <p style={{ color: '#999' }}>
              Based in Nigeria, I specialize in <strong style={{ color: '#B00020' }}>front-end development</strong>, 
              <strong style={{ color: '#B00020' }}> smart contract development</strong>, and 
              <strong style={{ color: '#B00020' }}> community management</strong>. I help projects grow 
              by combining technical expertise with strategic community building.
            </p>
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
          style={{ marginBottom: '3rem' }}
        >
          Skills & Expertise
        </h2>
        
        <div data-aos="fade-up" data-aos-delay="200">
          <SpotlightSkills />
        </div>
      </div>
    </Element>
  );
}