// ============================================================================
// FILE: src/components/SpotlightSkills.tsx
// DESCRIPTION: Collapsible skill categories — zero inline styles
// ============================================================================

import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import '../styles/components/Skills.scss';

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Technical Development',
    icon: '💻',
    skills: [
      'Front-End Engineering (React, Vite, SCSS)',
      'Component Architecture & Routing Systems',
      'Authentication Flows & Dashboards',
      'Crypto Payment Logic Integration',
      'Smart Contract Development',
      'User-Centric UI/UX Design',
    ],
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
      'Ambassador Program Management',
    ],
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
      'Web3 Educational Content',
    ],
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
      'Stakeholder Relations',
    ],
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
      'Analytics & Data Tracking',
    ],
  },
];

interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
}

function SkillCategoryCard({ category, index }: SkillCategoryCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="skill-category"
      data-aos="fade-up"
      data-aos-delay={String(index * 100)}
    >
      {/* Clickable header */}
      <div
        className={`skill-header${isOpen ? ' skill-header--open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setIsOpen(prev => !prev)}
      >
        <div className="skill-header-left">
          <span className="skill-icon" aria-hidden="true">{category.icon}</span>
          <h3 className="skill-title">{category.title}</h3>
        </div>
        <FaChevronDown className={`skill-chevron${isOpen ? ' skill-chevron--open' : ''}`} />
      </div>

      {/* Collapsible list */}
      <div className={`skill-list-wrap${isOpen ? ' skill-list-wrap--open' : ''}`}>
        <ul className="skill-list">
          {category.skills.map((skill, i) => (
            <li key={i} className="skill-item">
              <span className="skill-item-arrow" aria-hidden="true">▸</span>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SpotlightSkills(): JSX.Element {
  return (
    <div className="skills-grid">
      {SKILL_CATEGORIES.map((category, index) => (
        <SkillCategoryCard key={category.title} category={category} index={index} />
      ))}
    </div>
  );
}
