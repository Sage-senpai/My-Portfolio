// ============================================================================
// FILE: src/components/GallerySection.jsx
// DESCRIPTION: Simple plancard-style gallery with hover effects
// ============================================================================

import React from 'react';
import { Element } from 'react-scroll';

const galleryItems = [
  {
    image: '/workshop.jpg',
    title: '2-Day Capacity Building Workshop',
    description: 'On Smart Agriculture'
  },
  {
    image: '/nivida-workshop.jpg',
    title: 'Attended NVIDIA-UNN AI Workshop',
    description: 'Deep learning and AI fundamentals'
  },
  {
    image: '/bitcoin-pizza-day.jpg',
    title: 'World Bitcoin Pizza Day',
    description: 'Celebrating crypto adoption milestone'
  },
  {
    image: '/polkadot-dev.jpg',
    title: 'Polkadot Developer Workshop',
    description: 'Personally onboarded developers'
  },
  {
    image: '/sui-meetup.jpg',
    title: 'Sui-Move Developer Workshop',
    description: 'Sui Nsukka Meetups'
  },
  {
    image: '/road-2-sub0.jpg',
    title: 'Polkadot Road to sub0 Meetup',
    description: 'Attended as a builder'
  },
  {
    image: '/projects.jpg',
    title: 'Latest Projects',
    description: 'Showcase of recent development work'
  },
  {
    image: '/smart-irigation-system.jpg',
    title: 'Smart Irrigation System',
    description: 'IoT-based agricultural innovation'
  },
  {
    image: '/about.jpg',
    title: 'Community Events',
    description: 'Building Web3 communities'
  }
];

export default function GallerySection() {
  return (
    <Element name="gallery" className="page-container">
      <div style={{
        width: '100%',
        maxWidth: '1400px',
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #fff 0%, #FF0000 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 40px rgba(255, 0, 0, 0.5)',
        }}
        data-aos="fade-up">
          Gallery & Highlights
        </h2>

        <p style={{
          textAlign: 'center',
          color: '#999',
          fontSize: '1.1rem',
          marginBottom: '4rem',
          maxWidth: '600px',
          margin: '0 auto 4rem',
        }}
        data-aos="fade-up"
        data-aos-delay="100">
          Events, workshops, and community involvement
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {galleryItems.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 0, 0, 0.4)';
                e.currentTarget.style.borderColor = '#FF0000';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Image */}
              <div style={{
                width: '100%',
                height: '250px',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                }}></div>
              </div>

              {/* Content */}
              <div style={{
                padding: '1.5rem',
              }}>
                <h3 style={{
                  color: '#FF0000',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  lineHeight: '1.3',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#fff',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                }}>
                  {item.description}
                </p>
              </div>

              {/* Top Glow Effect on Hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #FF0000, transparent)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}></div>
            </div>
          ))}
        </div>
      </div>
    </Element>
  );
}