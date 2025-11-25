import React, { useState } from 'react';

const images = [
  { src: '/projects.jpg', title: 'Projects' },
  { src: '/smart-irigation-system.jpg', title: 'Smart Irrigation' },
  { src: '/about.jpg', title: 'About' },
  { src: '/sui-meetup-group.jpg', title: 'Sui Meetup' },
  { src: '/workshop.jpg', title: 'Workshop' },
  { src: '/nivida-workshop.jpg', title: 'NVIDIA AI' },
  { src: '/bitcoin-pizza-day.jpg', title: 'Bitcoin Pizza' },
  { src: '/sui-meetup.jpg', title: 'Sui Dev Workshop' },
];

export default function CircularGallery() {
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const radius = 280;
  const angleStep = (2 * Math.PI) / images.length;

  const handleRotate = (direction) => {
    const step = 360 / images.length;
    setRotation(prev => prev + (direction === 'next' ? -step : step));
    setSelectedIndex(prev => 
      direction === 'next' 
        ? (prev + 1) % images.length 
        : (prev - 1 + images.length) % images.length
    );
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '3rem',
      padding: '4rem 1rem',
      minHeight: '600px',
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '700px',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div
          style={{
            position: 'relative',
            width: '600px',
            height: '600px',
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {images.map((img, i) => {
            const angle = i * angleStep;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isSelected = i === selectedIndex;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: isSelected ? '180px' : '140px',
                  height: isSelected ? '180px' : '140px',
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${-rotation}deg) scale(${isSelected ? 1 : 0.85})`,
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  zIndex: isSelected ? 10 : 1,
                }}
                onClick={() => {
                  const diff = i - selectedIndex;
                  const step = 360 / images.length;
                  setRotation(prev => prev - (diff * step));
                  setSelectedIndex(i);
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: isSelected ? '3px solid #B00020' : '2px solid rgba(176, 0, 32, 0.3)',
                  boxShadow: isSelected 
                    ? '0 0 30px rgba(176, 0, 32, 0.6), 0 0 60px rgba(176, 0, 32, 0.3)' 
                    : '0 8px 20px rgba(0, 0, 0, 0.5)',
                  background: '#1C1C1C',
                  position: 'relative',
                }}>
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: isSelected ? 'brightness(1.1)' : 'brightness(0.7)',
                      transition: 'filter 0.5s ease',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        color: '#B00020',
      }}>
        <h3 style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          marginBottom: '0.5rem',
          textShadow: '0 0 20px rgba(176, 0, 32, 0.5)',
        }}>
          {images[selectedIndex].title}
        </h3>
      </div>

      <div style={{
        display: 'flex',
        gap: '1rem',
      }}>
        <button
          onClick={() => handleRotate('prev')}
          style={{
            padding: '0.8rem 2rem',
            background: 'linear-gradient(135deg, #B00020, #8B0000)',
            border: '1px solid rgba(176, 0, 32, 0.5)',
            borderRadius: '50px',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(176, 0, 32, 0.3)',
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 25px rgba(176, 0, 32, 0.5)';
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(176, 0, 32, 0.3)';
          }}
        >
          ← Previous
        </button>
        <button
          onClick={() => handleRotate('next')}
          style={{
            padding: '0.8rem 2rem',
            background: 'linear-gradient(135deg, #B00020, #8B0000)',
            border: '1px solid rgba(176, 0, 32, 0.5)',
            borderRadius: '50px',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(176, 0, 32, 0.3)',
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 25px rgba(176, 0, 32, 0.5)';
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(176, 0, 32, 0.3)';
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}