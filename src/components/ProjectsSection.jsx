// ============================================================================
// FILE: src/components/ProjectsSection.jsx
// DESCRIPTION: Collapsible categorized projects with particle effects
// ============================================================================

import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Web Applications & DApps
const webApps = [
  {
    title: 'DOTique dApp',
    description: 'Decentralized marketplace on Sui blockchain with NFT integration',
    tech: ['PAPI', 'React', 'Web3'],
    link: 'https://github.com/sage-senpai/DOTique',
    type: 'DApp'
  },
  {
    title: 'DotVest dApp',
    description: 'Decentralized Finance platform for staking and yield farming',
    tech: ['PAPI', 'React', 'Web3'],
    link: 'https://github.com/sage-senpai/DOT-VEST',
    type: 'DApp'
  },
  {
    title: 'DOTWAY dApp',
    description: 'Onboarding platform for new users in the polkadot ecosysten',
    tech: ['PAPI', 'Next.js', 'Web3'],
    link: 'https://github.com/sage-senpai/Dot-Way',
    type: 'DApp'
  },
  {
    title: 'Period Tracker App (Lunera)',
    description: 'Privacy-focused health tracking application for women',
    tech: ['React', 'LocalStorage', 'PWA'],
    link: 'https://github.com/Sage-senpai/Lunera',
    type: 'Web App'
  },
  {
    title: 'Nexachain',
    description: 'Crypto investment platform landing page',
    tech: ['React', 'CSS3', 'JavaScript'],
    link: 'https://github.com/Sage-senpai/Nexachain',
    type: 'Website'
  },
  {
    title: 'Dvyne Clothing Brand',
    description: 'Modern responsive e-commerce landing page',
    tech: ['React', 'CSS3', 'JavaScript'],
    link: 'https://github.com/Sage-senpai/dvyne-clothing-brand.github.io',
    type: 'Website'
  }
];

// Technical Writing & Documentation
const documentation = [
  {
    title: 'Kusama AssetHub Migration Guide',
    description: 'Comprehensive technical documentation on Kusama network migration',
    platform: 'X/Twitter',
    link: 'https://x.com/sage_senpeak/status/1975485357933441433',
    category: 'Technical Guide'
  },
  {
    title: 'Polkadot Ecosystem Deep Dive',
    description: 'Analysis of Polkadot parachains and cross-chain infrastructure',
    platform: 'Twitter Thread',
    link: '#',
    category: 'Ecosystem Analysis'
  },
  {
    title: 'Smart Contract Security Best Practices',
    description: 'Documentation on secure Web3 development patterns',
    platform: 'Medium',
    link: '#',
    category: 'Developer Guide'
  }
];

// Content & Community
const contentWork = [
  {
    title: 'Hackathon Gentrifications Analysis',
    description: 'In-depth breakdown of hackathon ecosystem trends and patterns',
    platform: 'X Thread',
    link: 'https://x.com/sage_senpeak/status/1983842857359437830',
    engagement: '10K+ views'
  },
  {
    title: 'HeLa Labs Ecosystem Series',
    description: 'Multi-part content series on HeLa blockchain technology',
    platform: 'Twitter Spaces',
    link: '#',
    engagement: '5K+ listeners'
  },
  {
    title: 'Web3 Builder Spotlight',
    description: 'Interview series highlighting innovative Web3 projects',
    platform: 'Content Series',
    link: '#',
    engagement: '15K+ reach'
  }
];

// IoT & Hardware Projects
/*const hardwareProjects = [
  {
    title: 'Smart Irrigation System',
    description: 'IoT-based automated agriculture solution with sensor integration',
    tech: ['Arduino', 'C++', 'IoT Sensors'],
    link: '#',
    type: 'Hardware'
  },
  {
    title: 'Nsukka Yellow Pepper Platform',
    description: 'Agricultural product showcase and information system',
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
    type: 'Web Platform'
  }
]; */

const ProjectCard = ({ project, showTech = true, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setParticles(prev => [
          ...prev.slice(-20),
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 2 + 1
          }
        ]);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(20px)',
        border: isHovered ? '2px solid #FF0000' : '1px solid rgba(255, 0, 0, 0.3)',
        borderRadius: '20px',
        padding: '2rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-15px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered 
          ? '0 25px 60px rgba(255, 0, 0, 0.5), 0 0 100px rgba(255, 0, 0, 0.3)' 
          : '0 4px 20px rgba(0, 0, 0, 0.3)',
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Particle Effects */}
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: '#FF0000',
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: `floatParticle ${particle.duration}s ease-out forwards`,
            opacity: 0.8,
          }}
        />
      ))}

      {/* Category Badge */}
      {(project.type || project.category) && (
        <span style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          padding: '0.5rem 1.2rem',
          background: isHovered ? '#FF0000' : 'rgba(255, 0, 0, 0.2)',
          border: '1px solid #FF0000',
          borderRadius: '25px',
          fontSize: '0.75rem',
          color: isHovered ? '#fff' : '#FF0000',
          fontWeight: '800',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          transition: 'all 0.3s ease',
          boxShadow: isHovered ? '0 0 20px rgba(255, 0, 0, 0.8)' : 'none',
        }}>
          {project.type || project.category}
        </span>
      )}

      {/* Title */}
      <h3 style={{
        color: '#FF0000',
        fontSize: '1.5rem',
        fontWeight: '800',
        marginBottom: '1rem',
        paddingRight: '6rem',
        position: 'relative',
        zIndex: 1,
        textShadow: isHovered ? '0 0 30px rgba(255, 0, 0, 0.8)' : 'none',
        transition: 'all 0.3s ease',
        letterSpacing: '-0.5px',
      }}>
        {project.title}
      </h3>
      
      {/* Description */}
      <p style={{
        color: '#fff',
        fontSize: '1rem',
        lineHeight: '1.7',
        marginBottom: '1.5rem',
        flex: 1,
        position: 'relative',
        zIndex: 1,
        opacity: isHovered ? 1 : 0.9,
        transition: 'opacity 0.3s ease',
      }}>
        {project.description}
      </p>
      
      {/* Tech Stack */}
      {showTech && project.tech && (
        <div style={{
          display: 'flex',
          gap: '0.6rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1,
        }}>
          {project.tech.map((tech, i) => (
            <span key={i} style={{
              padding: '0.5rem 1.1rem',
              background: isHovered ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.15)',
              border: '1px solid #FF0000',
              borderRadius: '25px',
              fontSize: '0.85rem',
              color: '#fff',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: isHovered ? '0 4px 15px rgba(255, 0, 0, 0.4)' : 'none',
            }}>
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Platform/Engagement Info */}
      {project.platform && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          padding: '1rem 0',
          borderTop: `1px solid ${isHovered ? '#FF0000' : 'rgba(255, 0, 0, 0.2)'}`,
          borderBottom: `1px solid ${isHovered ? '#FF0000' : 'rgba(255, 0, 0, 0.2)'}`,
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.3s ease',
        }}>
          <span style={{
            color: '#999',
            fontSize: '0.9rem',
            fontWeight: '500',
          }}>
            📍 {project.platform}
          </span>
          {project.engagement && (
            <span style={{
              color: '#FF0000',
              fontSize: '0.9rem',
              fontWeight: '700',
              textShadow: isHovered ? '0 0 10px rgba(255, 0, 0, 0.8)' : 'none',
            }}>
              {project.engagement}
            </span>
          )}
        </div>
      )}
      
      {/* Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          window.open(project.link, '_blank');
        }}
        style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #FF0000, #CC0000)',
          border: '2px solid #FF0000',
          borderRadius: '50px',
          color: '#fff',
          fontWeight: '800',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          marginTop: 'auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: isHovered ? '0 8px 30px rgba(255, 0, 0, 0.6)' : 'none',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.letterSpacing = '2px';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.letterSpacing = '1px';
        }}
      >
        View Project →
      </button>

      {/* Bottom Glow Line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #FF0000, transparent)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
        boxShadow: '0 0 20px #FF0000',
      }}></div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatParticle {
          0% {
            opacity: 0.8;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};

const CategorySection = ({ title, icon, items, showTech = true, delay = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section style={{ 
      marginBottom: '3rem',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 0, 0, 0.3)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    }}
    data-aos="fade-up"
    data-aos-delay={delay}>
      
      {/* Header - Clickable */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2rem',
          cursor: 'pointer',
          background: isOpen ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isOpen ? 'rgba(255, 0, 0, 0.1)' : 'transparent';
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          <span style={{ 
            fontSize: '2.5rem',
          }}>{icon}</span>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #fff 0%, #FF0000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            letterSpacing: '-1px',
          }}>
            {title}
          </h2>
          <span style={{
            padding: '0.4rem 1rem',
            background: 'rgba(255, 0, 0, 0.2)',
            border: '1px solid #FF0000',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: '#FF0000',
            fontWeight: '700',
          }}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div style={{
          color: '#FF0000',
          fontSize: '1.5rem',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <FaChevronDown />
        </div>
      </div>

      {/* Content - Collapsible */}
      <div style={{
        maxHeight: isOpen ? '5000px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.5s ease',
      }}>
        <div style={{
          padding: '0 2rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
        }}>
          {items.map((item, i) => (
            <ProjectCard key={i} project={item} showTech={showTech} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function ProjectsSection() {
  return (
    <Element name="projects" className="page-container">
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Section Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '4rem',
        }} data-aos="fade-up">
          <h1 style={{
            fontSize: 'clamp(3rem, 7vw, 5rem)',
            fontWeight: '900',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #fff 0%, #FF0000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 80px rgba(255, 0, 0, 0.6)',
            letterSpacing: '-2px',
          }}>
            Projects & Work
          </h1>
          
          <div style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #FF0000, transparent)',
            margin: '2rem auto',
            borderRadius: '2px',
            boxShadow: '0 0 20px #FF0000',
          }}></div>

          <p style={{
            color: '#999',
            fontSize: '1.2rem',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8',
            fontWeight: '400',
          }}>
            Click on each category to explore my work
          </p>
        </div>

        {/* Categories */}
        <CategorySection 
          title="Web Applications & DApps"
          icon="🚀"
          items={webApps}
          showTech={true}
          delay={0}
        />

        <CategorySection 
          title="Technical Writing & Documentation"
          icon="📚"
          items={documentation}
          showTech={false}
          delay={100}
        />

        <CategorySection 
          title="Content & Community Work"
          icon="✍️"
          items={contentWork}
          showTech={false}
          delay={200}
        />

        {/*} <CategorySection 
          title="IoT & Hardware Projects"
          icon="⚡"
          items={hardwareProjects}
          showTech={true}
          delay={300}
        />*/}

        
      </div>
    </Element>
  );
}