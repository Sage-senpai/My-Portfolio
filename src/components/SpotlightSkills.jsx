// ============================================================================
// FILE: src/components/SpotlightSkills.jsx
// DESCRIPTION: Interactive skill cards with spotlight effect
// ============================================================================

import React, { useState, useRef } from 'react';

const skills = [
  'Certified Front-end Dev - CSS, React, JavaScript and Smart Contracts',
  'Organizer of Twitter Spaces and local events',
  'Developer and content creator',
  'Pro gamer and community manager',
  'Public speaking',
  'Teamwork and Leadership skills',
  'Microsoft Office Expert',
  'Robotics Expertise',
];

function SpotlightCard({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '16px',
        padding: '2rem',
        minHeight: '140px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        border: '1px solid rgba(255, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle at center, rgba(255, 0, 0, 0.4), transparent 70%)`,
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            transition: 'opacity 0.2s ease',
          }}
        />
      )}

      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            padding: '2px',
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #FF0000, transparent 70%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none',
          }}
        />
      )}

      <div style={{
        position: 'relative',
        zIndex: 1,
        color: isHovered ? '#fff' : '#FF0000',
        fontSize: '1rem',
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: '1.6',
        transition: 'color 0.3s ease',
        textShadow: isHovered ? '0 0 10px rgba(255, 0, 0, 0.5)' : 'none',
      }}>
        {children}
      </div>

      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 0, 0.1), transparent 50%)`,
            pointerEvents: 'none',
            animation: 'pulse 1.5s infinite',
          }}
        />
      )}
    </div>
  );
}

export default function SpotlightSkills() {
  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        padding: '2rem 0',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {skills.map((skill, index) => (
          <SpotlightCard key={index}>
            {skill}
          </SpotlightCard>
        ))}
      </div>
    </>
  );
}