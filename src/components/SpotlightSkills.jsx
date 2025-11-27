// ============================================================================
// FILE: src/components/SpotlightSkills.jsx
// DESCRIPTION: Categorized collapsible skills with professional organization
// ============================================================================

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const skillCategories = [
  {
    title: 'Technical Development',
    icon: '💻',
    skills: [
      'Front-End Engineering (React, Vite, SCSS)',
      'Component Architecture & Routing Systems',
      'Authentication Flows & Dashboards',
      'Crypto Payment Logic Integration',
      'Smart Contract Development',
      'User-Centric UI/UX Design'
    ]
  },
  {
    title: 'Community Management',
    icon: '👥',
    skills: [
      'Community Building & Engagement',
      'Discord/Telegram Moderation Systems',
      'Event Coordination & Planning',
      'User Onboarding & Retention',
      'Conflict Resolution & Team Coordination',
      'Ambassador Program Management'
    ]
  },
  {
    title: 'Content Creation & Strategy',
    icon: '✍️',
    skills: [
      'Technical Writing & Documentation',
      'DeFi Analysis & Project Breakdowns',
      'Twitter Spaces Organization',
      'Ecosystem Deep Dives & Threads',
      'Builder Program Highlights',
      'Web3 Educational Content'
    ]
  },
  {
    title: 'Soft Skills & Leadership',
    icon: '🎯',
    skills: [
      'Public Speaking',
      'Team Leadership & Collaboration',
      'Creative Problem Solving',
      'Strategic Communication',
      'Project Management',
      'Stakeholder Relations'
    ]
  },
  {
    title: 'Tools & Technologies',
    icon: '🛠️',
    skills: [
      'Microsoft Office Suite Expert',
      'Git & Version Control',
      'Robotics & IoT Systems',
      'Arduino & Sensor Integration',
      'Design Tools (Figma, Canva)',
      'Analytics & Data Tracking'
    ]
  }
];

function SkillCategory({ category, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 0, 0, 0.3)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#FF0000';
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 0, 0, 0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: isOpen ? 'linear-gradient(135deg, rgba(255, 0, 0, 0.1), transparent)' : 'transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <span style={{ fontSize: '2rem' }}>{category.icon}</span>
          <h3 style={{
            color: '#FF0000',
            fontSize: '1.3rem',
            fontWeight: '700',
            margin: 0,
          }}>
            {category.title}
          </h3>
        </div>
        
        <div style={{
          color: '#FF0000',
          fontSize: '1.2rem',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {/* Skills List */}
      <div style={{
        maxHeight: isOpen ? '500px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
        <div style={{
          padding: '0 1.5rem 1.5rem',
          display: 'grid',
          gap: '0.8rem',
        }}>
          {category.skills.map((skill, i) => (
            <div
              key={i}
              style={{
                padding: '0.8rem 1rem',
                background: 'rgba(255, 0, 0, 0.05)',
                border: '1px solid rgba(255, 0, 0, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '0.95rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(255, 0, 0, 0.15)';
                e.target.style.transform = 'translateX(5px)';
                e.target.style.borderColor = '#FF0000';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(255, 0, 0, 0.05)';
                e.target.style.transform = 'translateX(0)';
                e.target.style.borderColor = 'rgba(255, 0, 0, 0.2)';
              }}
            >
              <span style={{ color: '#FF0000', fontSize: '0.8rem' }}>▸</span>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SpotlightSkills() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '1.5rem',
      padding: '2rem 0',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {skillCategories.map((category, index) => (
        <SkillCategory key={index} category={category} index={index} />
      ))}
    </div>
  );
}