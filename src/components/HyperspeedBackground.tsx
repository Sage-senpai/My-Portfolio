// ============================================================================
// FILE: src/components/HyperspeedBackground.tsx
// DESCRIPTION: GPU-accelerated star-field canvas — fixed behind all content
// ============================================================================

import React, { useEffect, useRef } from 'react';
import '../styles/components/Background.scss';

interface StarData {
  x: number;
  y: number;
  z: number;
  color: string;
}

export default function HyperspeedBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<StarData[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const centerX = () => w / 2;
    const centerY = () => h / 2;
    const starCount = 300;
    const speed = 0.03;

    const COLORS = ['#FF0000', '#FFFFFF', '#FF6B6B'];

    function createStar(): StarData {
      return {
        x: Math.random() * w - w / 2,
        y: Math.random() * h - h / 2,
        z: Math.random() * 2000,
        color: COLORS[Math.random() < 0.4 ? 0 : Math.random() < 0.5 ? 1 : 2],
      };
    }

    function resetStar(s: StarData): void {
      s.x = Math.random() * w - w / 2;
      s.y = Math.random() * h - h / 2;
      s.z = 2000;
      s.color = COLORS[Math.random() < 0.4 ? 0 : Math.random() < 0.5 ? 1 : 2];
    }

    starsRef.current = Array.from({ length: starCount }, createStar);

    function animate(): void {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, w, h);

      const cx = centerX();
      const cy = centerY();

      starsRef.current.forEach(star => {
        star.z -= speed * 100;
        if (star.z <= 0) resetStar(star);

        const sx = (star.x / star.z) * 500 + cx;
        const sy = (star.y / star.z) * 500 + cy;
        const size = (1 - star.z / 2000) * 3;
        const px = (star.x / (star.z + speed * 100)) * 500 + cx;
        const py = (star.y / (star.z + speed * 100)) * 500 + cy;

        ctx.strokeStyle = star.color;
        ctx.lineWidth = size;
        ctx.globalAlpha = 1 - star.z / 2000;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    function handleResize(): void {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="hyperspeed-canvas" />;
}
