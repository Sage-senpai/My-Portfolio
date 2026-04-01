// ============================================================================
// FILE: src/views/AmbassadorView.tsx
// DESCRIPTION: Ecosystem / Protocol — Animated Canvas solar system
// ============================================================================

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { ECOSYSTEMS, PROJECTS, OSS_CONTRIBUTIONS, PROFILE, type Project } from '../data/portfolio';
import BackButton from '../components/BackButton';
import '../styles/views/_ambassador.scss';

interface Props {
  onBack: () => void;
}

/* ── Canvas Solar System ─────────────────────────────────────────────────── */

interface PlanetState {
  id: string;
  name: string;
  color: string;
  icon: string;
  desc: string;
  orbitRadius: number;
  angle: number;         // current angle in radians (animated)
  speed: number;         // radians per frame
  size: number;
  projectCount: number;
  x: number;
  y: number;
}

function SolarCanvas({
  onSelectEco,
  selectedEco,
  profileImg,
}: {
  onSelectEco: (id: string | null) => void;
  selectedEco: string | null;
  profileImg: HTMLImageElement | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const planetsRef = useRef<PlanetState[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef<string | null>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<{ x: number; y: number; r: number; a: number }[]>([]);

  const projectsByEco = useMemo(() => {
    const map: Record<string, number> = {};
    PROJECTS.forEach((p) => { map[p.ecosystem] = (map[p.ecosystem] || 0) + 1; });
    return map;
  }, []);

  // Initialize planets
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const maxOrbit = Math.max(...ECOSYSTEMS.map((e) => e.orbitRadius));

    planetsRef.current = ECOSYSTEMS.map((eco, i) => {
      const pCount = projectsByEco[eco.id] || 0;
      return {
        id: eco.id,
        name: eco.name,
        color: eco.color,
        icon: eco.icon,
        desc: eco.description,
        orbitRadius: eco.orbitRadius / maxOrbit, // normalize 0-1
        angle: (eco.angle * Math.PI) / 180,
        speed: 0.0008 + (0.0012 / (i + 1)), // inner planets faster
        size: Math.max(14, 10 + pCount * 2.5),
        projectCount: pCount,
        x: 0,
        y: 0,
      };
    });

    // Generate stars
    starsRef.current = Array.from({ length: 200 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.5 + 0.2,
    }));
  }, [projectsByEco]);

  // Mouse tracking
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onClick = () => {
      if (hoveredRef.current) {
        onSelectEco(hoveredRef.current);
      }
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('click', onClick);
    canvas.style.cursor = 'default';

    return () => {
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('click', onClick);
    };
  }, [onSelectEco]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      const cx = W / 2;
      const cy = H / 2;
      const maxR = Math.min(W, H) * 0.42;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Stars
      starsRef.current.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a * (0.8 + 0.2 * Math.sin(Date.now() * 0.001 + s.x * 10))})`;
        ctx.fill();
      });

      // Orbit rings
      planetsRef.current.forEach((p) => {
        const r = p.orbitRadius * maxR;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = hoveredRef.current === p.id
          ? `${p.color}30`
          : 'rgba(255,255,255,0.04)';
        ctx.lineWidth = hoveredRef.current === p.id ? 1.5 : 0.7;
        ctx.setLineDash(hoveredRef.current === p.id ? [] : [4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Sun glow
      const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      sunGlow.addColorStop(0, 'rgba(230,0,122,0.15)');
      sunGlow.addColorStop(0.5, 'rgba(230,0,122,0.05)');
      sunGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = sunGlow;
      ctx.fillRect(cx - 60, cy - 60, 120, 120);

      // Sun (profile image)
      const sunR = 30;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      if (profileImg && profileImg.complete) {
        ctx.drawImage(profileImg, cx - sunR, cy - sunR, sunR * 2, sunR * 2);
      } else {
        ctx.fillStyle = '#1a0533';
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('AD', cx, cy);
      }
      ctx.restore();

      // Sun border
      ctx.beginPath();
      ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(230,0,122,0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Sun label
      ctx.fillStyle = '#888';
      ctx.font = '10px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(PROFILE.name, cx, cy + sunR + 14);

      // Track hover
      let foundHover = false;

      // Planets
      planetsRef.current.forEach((p) => {
        // Animate angle
        p.angle += p.speed;
        if (p.angle > Math.PI * 2) p.angle -= Math.PI * 2;

        const r = p.orbitRadius * maxR;
        const px = cx + Math.cos(p.angle) * r;
        const py = cy + Math.sin(p.angle) * r;
        p.x = px;
        p.y = py;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dist = Math.sqrt((mx - px) ** 2 + (my - py) ** 2);
        const isHovered = dist < p.size + 8;
        const isSelected = selectedEco === p.id;

        if (isHovered) {
          foundHover = true;
          hoveredRef.current = p.id;
        }

        const scale = isHovered || isSelected ? 1.3 : 1;
        const drawSize = p.size * scale;

        // Planet glow
        if (isHovered || isSelected) {
          const glow = ctx.createRadialGradient(px, py, 0, px, py, drawSize * 2.5);
          glow.addColorStop(0, `${p.color}33`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.fillRect(px - drawSize * 2.5, py - drawSize * 2.5, drawSize * 5, drawSize * 5);
        }

        // Planet body
        const grad = ctx.createRadialGradient(
          px - drawSize * 0.25, py - drawSize * 0.25, 0,
          px, py, drawSize
        );
        grad.addColorStop(0, `${p.color}cc`);
        grad.addColorStop(0.6, `${p.color}66`);
        grad.addColorStop(1, `${p.color}22`);

        ctx.beginPath();
        ctx.arc(px, py, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = isHovered || isSelected ? `${p.color}dd` : `${p.color}66`;
        ctx.lineWidth = isHovered || isSelected ? 2 : 1;
        ctx.stroke();

        // Icon
        ctx.fillStyle = '#fff';
        ctx.font = `${Math.max(9, drawSize * 0.6)}px system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.icon, px, py);

        // Label
        ctx.fillStyle = isHovered || isSelected ? '#fff' : '#aaa';
        ctx.font = `${isHovered || isSelected ? '600 11px' : '10px'} system-ui`;
        ctx.textAlign = 'center';
        ctx.fillText(p.name, px, py + drawSize + 12);

        // Project count
        ctx.fillStyle = p.color;
        ctx.font = '600 8px system-ui';
        ctx.fillText(`${p.projectCount} project${p.projectCount !== 1 ? 's' : ''}`, px, py + drawSize + 23);

        // Orbit trail (small dots trailing behind planet)
        for (let t = 1; t <= 5; t++) {
          const trailAngle = p.angle - p.speed * t * 12;
          const tx = cx + Math.cos(trailAngle) * r;
          const ty = cy + Math.sin(trailAngle) * r;
          ctx.beginPath();
          ctx.arc(tx, ty, Math.max(1, p.size * 0.15 * (1 - t * 0.15)), 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${Math.round((0.3 - t * 0.05) * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }
      });

      if (!foundHover) hoveredRef.current = null;

      // Cursor
      if (canvasRef.current) {
        canvasRef.current.style.cursor = hoveredRef.current ? 'pointer' : 'default';
      }

      // Tooltip
      if (hoveredRef.current) {
        const hp = planetsRef.current.find((p) => p.id === hoveredRef.current);
        if (hp) {
          const tx = hp.x + hp.size + 16;
          const ty = hp.y - 20;
          const tw = 190;
          const th = 52;
          const actualX = tx + tw > W ? hp.x - tw - 16 : tx;
          const actualY = ty < 0 ? 4 : ty;

          // Tooltip bg
          ctx.fillStyle = 'rgba(5,7,15,0.92)';
          ctx.strokeStyle = `${hp.color}66`;
          ctx.lineWidth = 1;
          roundRect(ctx, actualX, actualY, tw, th, 6);
          ctx.fill();
          ctx.stroke();

          // Tooltip text
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 11px system-ui';
          ctx.textAlign = 'left';
          ctx.fillText(hp.name, actualX + 10, actualY + 18);

          ctx.fillStyle = '#999';
          ctx.font = '9px system-ui';
          const descText = hp.desc.length > 55 ? hp.desc.slice(0, 55) + '...' : hp.desc;
          ctx.fillText(descText, actualX + 10, actualY + 34);

          ctx.fillStyle = hp.color;
          ctx.font = 'bold 9px system-ui';
          ctx.fillText('Click to explore →', actualX + 10, actualY + 46);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [selectedEco, profileImg]);

  return <canvas ref={canvasRef} className="solar__canvas" />;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ── Main Component ──────────────────────────────────────────────────────── */

export default function AmbassadorView({ onBack }: Props) {
  const [selectedEco, setSelectedEco] = useState<string | null>(null);
  const [profileImg, setProfileImg] = useState<HTMLImageElement | null>(null);

  const projectsByEco = useMemo(() => {
    const map: Record<string, Project[]> = {};
    PROJECTS.forEach((p) => {
      if (!map[p.ecosystem]) map[p.ecosystem] = [];
      map[p.ecosystem].push(p);
    });
    return map;
  }, []);

  // Preload profile image for canvas
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = PROFILE.profileImage;
    img.onload = () => setProfileImg(img);
  }, []);

  const selectedEcosystem = ECOSYSTEMS.find((e) => e.id === selectedEco) || null;
  const selectedProjects = selectedEco ? projectsByEco[selectedEco] || [] : [];
  const totalProjects = PROJECTS.length;
  const totalEcosystems = ECOSYSTEMS.filter((e) => e.id !== 'web2').length;

  const handleSelectEco = useCallback((id: string | null) => {
    setSelectedEco(id);
  }, []);

  return (
    <div className="solar">
      {/* Header */}
      <div className="solar__header">
        <div>
          <div className="solar__brand">Ecosystem Solar System</div>
          <span className="solar__stats">
            {totalProjects} projects · {totalEcosystems} chains · {OSS_CONTRIBUTIONS.length} OSS contributions
          </span>
        </div>
        <BackButton onBack={onBack} />
      </div>

      {/* Desktop: Animated Canvas Solar System */}
      <div className="solar__system">
        <SolarCanvas
          onSelectEco={handleSelectEco}
          selectedEco={selectedEco}
          profileImg={profileImg}
        />
      </div>

      {/* Mobile: Ecosystem Card Grid */}
      <div className="solar__mobile-grid">
        {ECOSYSTEMS.map((eco) => {
          const projects = projectsByEco[eco.id] || [];
          const isOpen = selectedEco === eco.id;
          return (
            <div key={eco.id} className="solar__mobile-card">
              <button
                className="solar__mobile-card-header"
                onClick={() => setSelectedEco(isOpen ? null : eco.id)}
                style={{ borderLeftColor: eco.color }}
              >
                <div className="solar__mobile-card-left">
                  <span className="solar__mobile-icon" style={{ color: eco.color }}>{eco.icon}</span>
                  <div>
                    <div className="solar__mobile-name">{eco.name}</div>
                    <div className="solar__mobile-desc">{eco.description}</div>
                  </div>
                </div>
                <span className="solar__mobile-count" style={{ background: `${eco.color}18`, color: eco.color }}>
                  {projects.length}
                </span>
              </button>
              {isOpen && (
                <div className="solar__mobile-projects">
                  {projects.map((p) => (
                    <ProjectCard key={p.id} project={p} accentColor={eco.color} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* OSS */}
        <div className="solar__mobile-card">
          <div className="solar__mobile-card-header" style={{ borderLeftColor: '#00FF41' }}>
            <div className="solar__mobile-card-left">
              <span className="solar__mobile-icon" style={{ color: '#00FF41' }}>&#9826;</span>
              <div>
                <div className="solar__mobile-name">Open Source Contributions</div>
                <div className="solar__mobile-desc">Forked repos with code contributions</div>
              </div>
            </div>
            <span className="solar__mobile-count" style={{ background: 'rgba(0,255,65,0.08)', color: '#00FF41' }}>
              {OSS_CONTRIBUTIONS.length}
            </span>
          </div>
          <div className="solar__mobile-projects">
            {OSS_CONTRIBUTIONS.map((c) => (
              <div key={c.project} className="solar__project-card" style={{ borderColor: 'rgba(0,255,65,0.12)' }}>
                <div className="solar__project-top">
                  <span className="solar__project-name">{c.project}</span>
                  <span className="solar__project-badge" style={{ background: 'rgba(0,255,65,0.1)', color: '#00FF41' }}>OSS</span>
                </div>
                <p className="solar__project-desc">{c.description}</p>
                <div className="solar__project-links">
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="solar__project-link" style={{ borderColor: '#00FF41', color: '#00FF41' }}>Fork ↗</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Panel (desktop overlay) */}
      {selectedEcosystem && (
        <div className="solar__detail-panel" onClick={() => setSelectedEco(null)}>
          <div className="solar__detail-content" onClick={(e) => e.stopPropagation()}>
            <div className="solar__detail-header">
              <div>
                <span className="solar__detail-icon" style={{ color: selectedEcosystem.color }}>
                  {selectedEcosystem.icon}
                </span>
                <h2 className="solar__detail-title" style={{ color: selectedEcosystem.color }}>
                  {selectedEcosystem.name}
                </h2>
              </div>
              <button className="solar__detail-close" onClick={() => setSelectedEco(null)}>&#10005;</button>
            </div>
            <p className="solar__detail-desc">{selectedEcosystem.description}</p>

            <div className="solar__detail-projects">
              {selectedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} accentColor={selectedEcosystem.color} />
              ))}
            </div>

            {selectedEco === 'polkadot' && (
              <div className="solar__detail-oss">
                <h3 className="solar__detail-oss-title">Open Source Contributions</h3>
                {OSS_CONTRIBUTIONS.map((c) => (
                  <div key={c.project} className="solar__project-card" style={{ borderColor: 'rgba(0,255,65,0.12)' }}>
                    <div className="solar__project-top">
                      <span className="solar__project-name">{c.project}</span>
                      <span className="solar__project-badge" style={{ background: 'rgba(0,255,65,0.1)', color: '#00FF41' }}>OSS</span>
                    </div>
                    <p className="solar__project-desc">{c.description}</p>
                    <div className="solar__project-links">
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="solar__project-link" style={{ borderColor: '#00FF41', color: '#00FF41' }}>View Fork ↗</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Project Card ────────────────────────────────────────────────────────── */

function ProjectCard({ project, accentColor }: { project: Project; accentColor: string }) {
  return (
    <div className="solar__project-card" style={{ borderColor: `${accentColor}20` }}>
      <div className="solar__project-top">
        <span className="solar__project-name">{project.name}</span>
        <div className="solar__project-badges">
          <span className="solar__project-badge" style={{ background: `${accentColor}15`, color: accentColor }}>
            {project.type}
          </span>
          <span className={`solar__project-status solar__project-status--${project.status.toLowerCase()}`}>
            {project.status === 'LIVE' ? '● LIVE' : '○ WIP'}
          </span>
        </div>
      </div>
      <p className="solar__project-desc">{project.description}</p>
      <div className="solar__project-tech">
        {project.tech.map((t) => (
          <span key={t} className="solar__project-tech-pill" style={{ background: `${accentColor}10`, color: `${accentColor}cc` }}>
            {t}
          </span>
        ))}
      </div>
      <div className="solar__project-links">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="solar__project-link" style={{ borderColor: accentColor, color: accentColor }}>
          GitHub ↗
        </a>
        {project.liveUrl && project.liveUrl !== '#' && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="solar__project-link solar__project-link--live">
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  );
}
