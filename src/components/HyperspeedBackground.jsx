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
    const starCount = 200;
    const speed = 0.02;

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * w - centerX;
        this.y = Math.random() * h - centerY;
        this.z = Math.random() * 1500;
        this.color = Math.random() > 0.5 ? '#B00020' : '#ffffff';
      }

      update() {
        this.z -= speed * 100;
        if (this.z <= 0) {
          this.reset();
          this.z = 1500;
        }
      }

      draw() {
        const sx = (this.x / this.z) * 500 + centerX;
        const sy = (this.y / this.z) * 500 + centerY;
        const size = (1 - this.z / 1500) * 3;

        const px = (this.x / (this.z + speed * 100)) * 500 + centerX;
        const py = (this.y / (this.z + speed * 100)) * 500 + centerY;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = size;
        ctx.globalAlpha = 1 - this.z / 1500;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    }

    // Initialize stars
    starsRef.current = Array.from({ length: starCount }, () => new Star());

    function animate() {
      ctx.fillStyle = 'rgba(28, 28, 28, 0.1)';
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
        zIndex: -1,
        background: '#1C1C1C',
      }}
    />
  );
}