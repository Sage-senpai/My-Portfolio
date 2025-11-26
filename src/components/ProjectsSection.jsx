// ============================================================================
// FILE: src/components/ProjectsSection.jsx
// DESCRIPTION: Professional grid layout for projects and work items
// ============================================================================

import React from "react";
import { Element } from "react-scroll";

const projects = [
  {
    title: 'Clothing Brand Landing Page',
    description: 'Modern responsive website for fashion brand',
    tech: ['React', 'CSS3', 'JavaScript'],
    link: 'https://github.com/Sage-senpai/dvyne-clothing-brand.github.io'
  },
  {
    title: 'Period Tracker App',
    description: 'Health tracking application for women',
    tech: ['React', 'LocalStorage', 'PWA'],
    link: 'https://github.com/Sage-senpai/Lunera'
  },
  {
    title: 'Nsukka Yellow Pepper',
    description: 'Agricultural product showcase platform',
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: '#'
  },
  {
    title: 'Smart Irrigation System',
    description: 'IoT-based automated agriculture solution',
    tech: ['Arduino', 'Sensors', 'IoT'],
    link: '#'
  }
];

const works = [
  {
    title: 'Hackathon Gentrifications',
    description: 'In-depth analysis of hackathon trends',
    type: 'X Thread',
    link: 'https://x.com/sage_senpeak/status/1983842857359437830'
  },
  {
    title: 'Crypto Investment Landing',
    description: 'SummitYield investment platform',
    type: 'Website',
    link: 'https://github.com/Sage-senpai/SummitYield'
  },
  {
    title: 'Kusama AssetHub Migration',
    description: 'Technical migration documentation',
    type: 'X Thread',
    link: 'https://x.com/sage_senpeak/status/1975485357933441433'
  },
  {
    title: 'DOTique dApp',
    description: 'Sui blockchain decentralized app',
    type: 'GitHub',
    link: 'https://github.com/sage-senpai/DOTique'
  }
];

const ProjectCard = ({ project }) => (
  <div style={{
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 0, 0, 0.3)',
    borderRadius: '15px',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 0, 0, 0.4)';
    e.currentTarget.style.borderColor = '#FF0000';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)';
  }}>
    <h3 style={{
      color: '#FF0000',
      fontSize: '1.3rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
    }}>
      {project.title}
    </h3>
    <p style={{
      color: '#fff',
      fontSize: '0.95rem',
      marginBottom: '1rem',
      flex: 1,
    }}>
      {project.description}
    </p>
    {project.tech && (
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginBottom: '1rem',
      }}>
        {project.tech.map((tech, i) => (
          <span key={i} style={{
            padding: '0.3rem 0.8rem',
            background: 'rgba(255, 0, 0, 0.2)',
            border: '1px solid rgba(255, 0, 0, 0.4)',
            borderRadius: '20px',
            fontSize: '0.8rem',
            color: '#fff',
          }}>
            {tech}
          </span>
        ))}
      </div>
    )}
    {project.type && (
      <span style={{
        display: 'inline-block',
        padding: '0.4rem 1rem',
        background: 'rgba(255, 0, 0, 0.2)',
        border: '1px solid rgba(255, 0, 0, 0.4)',
        borderRadius: '20px',
        fontSize: '0.85rem',
        color: '#FF0000',
        marginBottom: '1rem',
        width: 'fit-content',
      }}>
        {project.type}
      </span>
    )}
    <button
      onClick={() => window.open(project.link, '_blank')}
      style={{
        padding: '0.8rem 1.5rem',
        background: 'linear-gradient(135deg, #FF0000, #CC0000)',
        border: '1px solid rgba(255, 0, 0, 0.5)',
        borderRadius: '50px',
        color: '#fff',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginTop: 'auto',
      }}
      onMouseEnter={e => {
        e.target.style.transform = 'translateX(5px)';
        e.target.style.boxShadow = '0 4px 15px rgba(255, 0, 0, 0.4)';
      }}
      onMouseLeave={e => {
        e.target.style.transform = 'translateX(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      View Project →
    </button>
  </div>
);

export default function ProjectsSection() {
  return (
    <Element name="projects" className="page-container">
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 0, 0, 0.3)',
        padding: '3rem',
      }}>
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#FF0000',
            marginBottom: '2rem',
            textShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
          }}>
            Projects
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </section>

        <section>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#FF0000',
            marginBottom: '2rem',
            textShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
          }}>
            My Work
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {works.map((work, i) => (
              <ProjectCard key={i} project={work} />
            ))}
          </div>
        </section>
      </div>
    </Element>
  );
}