// ============================================================================
// FILE: src/components/AboutSection.jsx
// DESCRIPTION: About section with expanded professional description
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
              fontSize: '1rem', 
              lineHeight: '1.8',
              textAlign: 'justify',
            }}>
              <p style={{ marginBottom: '1rem' }}>
                I am a forward-thinking <span style={{ color: '#FF0000', fontWeight: '700' }}>Web3 creator, community manager, and product-minded developer</span> who blends technical execution with storytelling and ecosystem growth. My work spans building full-scale applications, managing active online communities, and producing high-quality threads and deep dives that spotlight emerging Web3 innovations.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                On the technical side, I specialize in <span style={{ color: '#FF0000', fontWeight: '700' }}>front-end engineering (React, Vite, SCSS), component architecture, routing systems, authentication flows, dashboards, crypto payment logic, and user-centric UI/UX</span>. I've built and maintained projects like SummitYield Capital, DotVest, Dotique, and multiple DeFi prototypes — delivering clean interfaces, consistent design systems, and scalable logic across the stack.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                Alongside engineering, I bring strong community leadership experience. I serve as a community manager for <span style={{ color: '#FF0000', fontWeight: '700' }}>EngineeringXpress</span>, where I support dev learners, organize resources, help maintain engagement pipelines, and ensure members stay active and motivated. I also manage <span style={{ color: '#FF0000', fontWeight: '700' }}>Chasing Farlight</span>, a fast-growing gaming Discord community, where I coordinate events, maintain moderation systems, handle onboarding, and build healthy user dynamics. These roles have strengthened my communication, conflict resolution, team coordination, and community-driven problem-solving — all essential for Web3 ambassador and ecosystem growth positions.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                Across ecosystems, I create structured, insight-rich content on X (Twitter), including DeFi breakdowns, project analyses, builder program highlights, and ecosystem explanations for <span style={{ color: '#FF0000', fontWeight: '700' }}>Polkadot, HeLa Labs, Ayetu Network, Core</span>, and others. My content helps onboard new users, amplify projects, and create clarity in complex spaces — a major value for ambassador roles and community expansion initiatives.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                I thrive in fast-moving environments like builder programs, hackathons, and L1/L2 community ecosystems. My strengths lie in <span style={{ color: '#FF0000', fontWeight: '700' }}>clarity, execution, creative problem-solving</span>, and the ability to bridge engineering, product thinking, and community engagement. I am deeply passionate about decentralization, digital identity, on-chain UX, and designing intuitive platforms that empower users.
              </p>

              <p style={{ color: '#FF0000', fontWeight: '700', fontSize: '1.1rem' }}>
                My ambition is always the same: build meaningful products, grow strong communities, support ecosystems, and contribute to the next generation of decentralized applications.
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