// FILE: src/components/HyperspeedBackground.jsx
// DESCRIPTION: Hyperspeed star field background with red/white theme
// ============================================================================

import React, { useEffect, useRef } from 'react';

export default function HyperspeedBackground() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    const centerX = w / 2;
    const centerY = h / 2;
    const starCount = 300;
    const speed = 0.03;

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * w - centerX;
        this.y = Math.random() * h - centerY;
        this.z = Math.random() * 2000;
        // Red, white, or light red colors
        const colorChoice = Math.random();
        if (colorChoice < 0.4) {
          this.color = '#FF0000'; // Red
        } else if (colorChoice < 0.7) {
          this.color = '#FFFFFF'; // White
        } else {
          this.color = '#FF6B6B'; // Light red
        }
      }

      update() {
        this.z -= speed * 100;
        if (this.z <= 0) {
          this.reset();
          this.z = 2000;
        }
      }

      draw() {
        const sx = (this.x / this.z) * 500 + centerX;
        const sy = (this.y / this.z) * 500 + centerY;
        const size = (1 - this.z / 2000) * 3;

        const px = (this.x / (this.z + speed * 100)) * 500 + centerX;
        const py = (this.y / (this.z + speed * 100)) * 500 + centerY;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = size;
        ctx.globalAlpha = 1 - this.z / 2000;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    }

    starsRef.current = Array.from({ length: starCount }, () => new Star());

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, w, h);

      starsRef.current.forEach(star => {
        star.update();
        star.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: '#000000',
      }}
    />
  );
}