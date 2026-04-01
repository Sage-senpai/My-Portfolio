// ============================================================================
// FILE: src/views/AmbassadorView.tsx
// DESCRIPTION: Ecosystem / Protocol — Animated Canvas solar system with
//              zoom-in planet view where projects orbit as moons
// ============================================================================

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { ECOSYSTEMS, PROJECTS, OSS_CONTRIBUTIONS, PROFILE, type Project } from '../data/portfolio';
import BackButton from '../components/BackButton';
import '../styles/views/_ambassador.scss';

interface Props {
  onBack: () => void;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CANVAS SOLAR SYSTEM — overview (all planets orbiting) + zoomed (one planet
   fills the screen, its projects orbit as moons, hover shows details)
   ═══════════════════════════════════════════════════════════════════════════ */

interface PlanetDef {
  id: string;
  name: string;
  color: string;
  icon: string;
  desc: string;
  orbitNorm: number;   // 0-1 normalized orbit radius
  baseAngle: number;   // starting angle
  speed: number;
  size: number;
  projectCount: number;
}

interface MoonDef {
  id: string;
  name: string;
  type: string;
  status: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  orbitRadius: number;
  angle: number;
  speed: number;
  size: number;
}

function SolarCanvas({
  onSelectEco,
  selectedEco,
  profileImg,
  projectsByEco,
}: {
  onSelectEco: (id: string | null) => void;
  selectedEco: string | null;
  profileImg: HTMLImageElement | null;
  projectsByEco: Record<string, Project[]>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Persistent state across frames
  const planetsRef = useRef<PlanetDef[]>([]);
  const moonsRef = useRef<MoonDef[]>([]);
  const starsRef = useRef<{ x: number; y: number; r: number; a: number }[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const hoveredPlanetRef = useRef<string | null>(null);
  const hoveredMoonRef = useRef<string | null>(null);
  // Smooth zoom transition
  const zoomRef = useRef(0); // 0=overview, 1=zoomed
  const zoomTargetRef = useRef(0);

  // Build planet defs once
  useEffect(() => {
    const maxOrbit = Math.max(...ECOSYSTEMS.map((e) => e.orbitRadius));
    planetsRef.current = ECOSYSTEMS.map((eco, i) => {
      const pc = (projectsByEco[eco.id] || []).length;
      return {
        id: eco.id,
        name: eco.name,
        color: eco.color,
        icon: eco.icon,
        desc: eco.description,
        orbitNorm: eco.orbitRadius / maxOrbit,
        baseAngle: (eco.angle * Math.PI) / 180,
        speed: 0.0006 + 0.001 / (i + 1),
        size: Math.max(14, 10 + pc * 2.5),
        projectCount: pc,
      };
    });
    starsRef.current = Array.from({ length: 220 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.5 + 0.15,
    }));
  }, [projectsByEco]);

  // Build moons when selectedEco changes
  useEffect(() => {
    if (!selectedEco) { moonsRef.current = []; return; }
    const projects = projectsByEco[selectedEco] || [];
    moonsRef.current = projects.map((p, i) => {
      const count = projects.length;
      const spacing = Math.min(70, 220 / Math.max(count, 1));
      return {
        id: p.id,
        name: p.name,
        type: p.type,
        status: p.status,
        description: p.description,
        tech: p.tech,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        orbitRadius: 80 + i * spacing,
        angle: ((2 * Math.PI) / count) * i,
        speed: 0.003 + 0.001 / (i + 1),
        size: 8,
      };
    });
  }, [selectedEco, projectsByEco]);

  // Zoom target
  useEffect(() => {
    zoomTargetRef.current = selectedEco ? 1 : 0;
  }, [selectedEco]);

  // Mouse + click
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const onMove = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onClick = () => {
      if (selectedEco) {
        // In zoomed view, check moon clicks
        const moon = hoveredMoonRef.current;
        if (moon) {
          const m = moonsRef.current.find((mm) => mm.id === moon);
          if (m && m.githubUrl) window.open(m.githubUrl, '_blank', 'noopener noreferrer');
        } else {
          onSelectEco(null); // click empty space to zoom out
        }
      } else {
        if (hoveredPlanetRef.current) onSelectEco(hoveredPlanetRef.current);
      }
    };
    c.addEventListener('mousemove', onMove);
    c.addEventListener('click', onClick);
    return () => { c.removeEventListener('mousemove', onMove); c.removeEventListener('click', onClick); };
  }, [selectedEco, onSelectEco]);

  // Main draw loop
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
      const now = Date.now();

      // Smooth zoom interpolation
      const zt = zoomTargetRef.current;
      zoomRef.current += (zt - zoomRef.current) * 0.06;
      const zoom = zoomRef.current;
      const isZoomed = zoom > 0.5;

      ctx.clearRect(0, 0, W, H);

      // ── Stars ──
      starsRef.current.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a * (0.8 + 0.2 * Math.sin(now * 0.001 + s.x * 20))})`;
        ctx.fill();
      });

      // Find selected planet for zoom
      const selPlanet = selectedEco ? planetsRef.current.find((p) => p.id === selectedEco) : null;

      if (!isZoomed) {
        // ═══ OVERVIEW MODE ═══
        const alpha = 1 - zoom;
        ctx.globalAlpha = alpha;

        // Orbit rings
        planetsRef.current.forEach((p) => {
          const r = p.orbitNorm * maxR;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = hoveredPlanetRef.current === p.id ? `${p.color}30` : 'rgba(255,255,255,0.04)';
          ctx.lineWidth = hoveredPlanetRef.current === p.id ? 1.5 : 0.7;
          ctx.setLineDash(hoveredPlanetRef.current === p.id ? [] : [4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
        });

        // Sun glow
        const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 55);
        sg.addColorStop(0, 'rgba(230,0,122,0.15)');
        sg.addColorStop(1, 'transparent');
        ctx.fillStyle = sg;
        ctx.fillRect(cx - 55, cy - 55, 110, 110);

        // Sun image
        const sunR = 28;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
        ctx.clip();
        if (profileImg && profileImg.complete) {
          ctx.drawImage(profileImg, cx - sunR, cy - sunR, sunR * 2, sunR * 2);
        } else {
          ctx.fillStyle = '#1a0533'; ctx.fill();
        }
        ctx.restore();
        ctx.beginPath();
        ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(230,0,122,0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#888';
        ctx.font = '10px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(PROFILE.name, cx, cy + sunR + 14);

        // Planets
        let foundHover = false;
        planetsRef.current.forEach((p) => {
          p.baseAngle += p.speed;
          const r = p.orbitNorm * maxR;
          const px = cx + Math.cos(p.baseAngle) * r;
          const py = cy + Math.sin(p.baseAngle) * r;

          const mx = mouseRef.current.x, my = mouseRef.current.y;
          const dist = Math.sqrt((mx - px) ** 2 + (my - py) ** 2);
          const hovered = dist < p.size + 10;
          if (hovered) { foundHover = true; hoveredPlanetRef.current = p.id; }

          const sc = hovered ? 1.3 : 1;
          const ds = p.size * sc;

          // Glow
          if (hovered) {
            const g = ctx.createRadialGradient(px, py, 0, px, py, ds * 2.5);
            g.addColorStop(0, `${p.color}33`);
            g.addColorStop(1, 'transparent');
            ctx.fillStyle = g;
            ctx.fillRect(px - ds * 2.5, py - ds * 2.5, ds * 5, ds * 5);
          }

          // Body
          const bg = ctx.createRadialGradient(px - ds * 0.25, py - ds * 0.25, 0, px, py, ds);
          bg.addColorStop(0, `${p.color}cc`);
          bg.addColorStop(0.6, `${p.color}66`);
          bg.addColorStop(1, `${p.color}22`);
          ctx.beginPath(); ctx.arc(px, py, ds, 0, Math.PI * 2);
          ctx.fillStyle = bg; ctx.fill();
          ctx.strokeStyle = hovered ? `${p.color}dd` : `${p.color}55`;
          ctx.lineWidth = hovered ? 2 : 1;
          ctx.stroke();

          // Icon
          ctx.fillStyle = '#fff';
          ctx.font = `${Math.max(9, ds * 0.55)}px system-ui`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(p.icon, px, py);

          // Label
          ctx.fillStyle = hovered ? '#fff' : '#aaa';
          ctx.font = `${hovered ? '600 11px' : '10px'} system-ui`;
          ctx.textBaseline = 'alphabetic';
          ctx.fillText(p.name, px, py + ds + 13);
          ctx.fillStyle = p.color;
          ctx.font = '600 8px system-ui';
          ctx.fillText(`${p.projectCount}`, px, py + ds + 23);

          // Trail
          for (let t = 1; t <= 4; t++) {
            const ta = p.baseAngle - p.speed * t * 14;
            ctx.beginPath();
            ctx.arc(cx + Math.cos(ta) * r, cy + Math.sin(ta) * r, Math.max(0.8, p.size * 0.12 * (1 - t * 0.2)), 0, Math.PI * 2);
            ctx.fillStyle = `${p.color}${Math.round((0.25 - t * 0.05) * 255).toString(16).padStart(2, '0')}`;
            ctx.fill();
          }
        });

        if (!foundHover) hoveredPlanetRef.current = null;

        // Tooltip
        if (hoveredPlanetRef.current) {
          const hp = planetsRef.current.find((p) => p.id === hoveredPlanetRef.current)!;
          const r = hp.orbitNorm * maxR;
          const hpx = cx + Math.cos(hp.baseAngle) * r;
          const hpy = cy + Math.sin(hp.baseAngle) * r;
          drawTooltip(ctx, hpx, hpy, hp.size, W, H, hp.name, hp.desc, 'Click to explore →', hp.color);
        }

        ctx.globalAlpha = 1;
        canvas.style.cursor = hoveredPlanetRef.current ? 'pointer' : 'default';

      } else if (selPlanet) {
        // ═══ ZOOMED MODE — planet centered, projects as moons ═══
        ctx.globalAlpha = zoom;

        // Big planet in center — slowly rotating surface effect
        const bigR = Math.min(W, H) * 0.15;
        const surfaceAngle = now * 0.0002;

        // Planet glow
        const pg = ctx.createRadialGradient(cx, cy, bigR * 0.3, cx, cy, bigR * 2.2);
        pg.addColorStop(0, `${selPlanet.color}22`);
        pg.addColorStop(1, 'transparent');
        ctx.fillStyle = pg;
        ctx.fillRect(cx - bigR * 2.2, cy - bigR * 2.2, bigR * 4.4, bigR * 4.4);

        // Planet body with rotating surface bands
        const pbg = ctx.createRadialGradient(cx - bigR * 0.3, cy - bigR * 0.3, 0, cx, cy, bigR);
        pbg.addColorStop(0, `${selPlanet.color}ee`);
        pbg.addColorStop(0.5, `${selPlanet.color}88`);
        pbg.addColorStop(1, `${selPlanet.color}33`);
        ctx.beginPath(); ctx.arc(cx, cy, bigR, 0, Math.PI * 2);
        ctx.fillStyle = pbg; ctx.fill();

        // Surface bands (rotating)
        ctx.save();
        ctx.beginPath(); ctx.arc(cx, cy, bigR, 0, Math.PI * 2); ctx.clip();
        for (let b = 0; b < 5; b++) {
          const by = cy - bigR + (bigR * 2 / 5) * b + Math.sin(surfaceAngle + b * 1.2) * 4;
          ctx.fillStyle = `${selPlanet.color}${b % 2 === 0 ? '15' : '0a'}`;
          ctx.fillRect(cx - bigR, by, bigR * 2, bigR * 0.3);
        }
        ctx.restore();

        // Planet border
        ctx.beginPath(); ctx.arc(cx, cy, bigR, 0, Math.PI * 2);
        ctx.strokeStyle = `${selPlanet.color}88`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Icon + name
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${bigR * 0.35}px system-ui`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(selPlanet.icon, cx, cy - 6);
        ctx.font = `600 ${Math.min(14, bigR * 0.18)}px system-ui`;
        ctx.fillText(selPlanet.name, cx, cy + bigR * 0.25);

        // Moon orbits + moons
        let foundMoonHover = false;
        moonsRef.current.forEach((m) => {
          m.angle += m.speed;
          const mr = bigR + m.orbitRadius * (maxR / 350);
          const mx = cx + Math.cos(m.angle) * mr;
          const my = cy + Math.sin(m.angle) * mr;

          // Orbit ring
          ctx.beginPath(); ctx.arc(cx, cy, mr, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255,255,255,0.03)';
          ctx.lineWidth = 0.5;
          ctx.setLineDash([2, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Check hover
          const mdist = Math.sqrt((mouseRef.current.x - mx) ** 2 + (mouseRef.current.y - my) ** 2);
          const moonHovered = mdist < 18;
          if (moonHovered) { foundMoonHover = true; hoveredMoonRef.current = m.id; }

          const moonScale = moonHovered ? 1.4 : 1;
          const moonSize = m.size * moonScale;

          // Moon glow
          if (moonHovered) {
            const mg = ctx.createRadialGradient(mx, my, 0, mx, my, moonSize * 3);
            mg.addColorStop(0, `${selPlanet.color}33`);
            mg.addColorStop(1, 'transparent');
            ctx.fillStyle = mg;
            ctx.fillRect(mx - moonSize * 3, my - moonSize * 3, moonSize * 6, moonSize * 6);
          }

          // Moon body
          const mbg = ctx.createRadialGradient(mx - moonSize * 0.3, my - moonSize * 0.3, 0, mx, my, moonSize);
          mbg.addColorStop(0, '#ffffff55');
          mbg.addColorStop(1, '#ffffff15');
          ctx.beginPath(); ctx.arc(mx, my, moonSize, 0, Math.PI * 2);
          ctx.fillStyle = mbg; ctx.fill();
          ctx.strokeStyle = m.status === 'LIVE' ? '#00D39588' : '#F59E0B88';
          ctx.lineWidth = moonHovered ? 2 : 1;
          ctx.stroke();

          // Moon label
          ctx.fillStyle = moonHovered ? '#fff' : '#bbb';
          ctx.font = `${moonHovered ? '600 10px' : '9px'} system-ui`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
          ctx.fillText(m.name, mx, my + moonSize + 12);

          // Status dot
          ctx.beginPath();
          ctx.arc(mx + moonSize + 3, my - moonSize + 2, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = m.status === 'LIVE' ? '#00D395' : '#F59E0B';
          ctx.fill();
        });

        if (!foundMoonHover) hoveredMoonRef.current = null;

        // Moon tooltip
        if (hoveredMoonRef.current) {
          const hm = moonsRef.current.find((m) => m.id === hoveredMoonRef.current)!;
          const mr = bigR + hm.orbitRadius * (maxR / 350);
          const hmx = cx + Math.cos(hm.angle) * mr;
          const hmy = cy + Math.sin(hm.angle) * mr;

          const tw = 240, th = 90;
          let tx = hmx + 20;
          let ty = hmy - th / 2;
          if (tx + tw > W) tx = hmx - tw - 20;
          if (ty < 4) ty = 4;
          if (ty + th > H) ty = H - th - 4;

          ctx.fillStyle = 'rgba(5,7,15,0.94)';
          ctx.strokeStyle = `${selPlanet.color}55`;
          ctx.lineWidth = 1;
          roundRect(ctx, tx, ty, tw, th, 8);
          ctx.fill(); ctx.stroke();

          // Title
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 12px system-ui';
          ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
          ctx.fillText(hm.name, tx + 12, ty + 20);

          // Type + status
          ctx.fillStyle = selPlanet.color;
          ctx.font = '600 9px system-ui';
          ctx.fillText(`${hm.type} · ${hm.status}`, tx + 12, ty + 33);

          // Description — word wrap
          ctx.fillStyle = '#999';
          ctx.font = '10px system-ui';
          wrapText(ctx, hm.description, tx + 12, ty + 47, tw - 24, 13, 3);

          // Tech pills text
          ctx.fillStyle = `${selPlanet.color}aa`;
          ctx.font = '8px system-ui';
          const techStr = hm.tech.slice(0, 4).join(' · ');
          ctx.fillText(techStr, tx + 12, ty + th - 8);
        }

        // Back hint
        ctx.globalAlpha = 0.5 * zoom;
        ctx.fillStyle = '#888';
        ctx.font = '11px system-ui';
        ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
        ctx.fillText('Click anywhere to zoom out', cx, H - 24);
        ctx.globalAlpha = 1;

        canvas.style.cursor = hoveredMoonRef.current ? 'pointer' : 'default';
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, [selectedEco, profileImg, projectsByEco]);

  return <canvas ref={canvasRef} className="solar__canvas" />;
}

/* ── Canvas helpers ──────────────────────────────────────────────────────── */

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

function drawTooltip(
  ctx: CanvasRenderingContext2D,
  px: number, py: number, planetSize: number,
  W: number, H: number,
  title: string, desc: string, cta: string, color: string,
) {
  const tw = 200, th = 60;
  let tx = px + planetSize + 16;
  let ty = py - th / 2;
  if (tx + tw > W) tx = px - tw - 16;
  if (ty < 4) ty = 4;
  if (ty + th > H) ty = H - th - 4;

  ctx.fillStyle = 'rgba(5,7,15,0.92)';
  ctx.strokeStyle = `${color}55`;
  ctx.lineWidth = 1;
  roundRect(ctx, tx, ty, tw, th, 6);
  ctx.fill(); ctx.stroke();

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 11px system-ui';
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  ctx.fillText(title, tx + 10, ty + 17);

  ctx.fillStyle = '#999';
  ctx.font = '9px system-ui';
  const shortDesc = desc.length > 50 ? desc.slice(0, 50) + '…' : desc;
  ctx.fillText(shortDesc, tx + 10, ty + 32);

  ctx.fillStyle = color;
  ctx.font = 'bold 9px system-ui';
  ctx.fillText(cta, tx + 10, ty + 48);
}

function wrapText(
  ctx: CanvasRenderingContext2D, text: string,
  x: number, y: number, maxWidth: number, lineHeight: number, maxLines: number,
) {
  const words = text.split(' ');
  let line = '';
  let lineNum = 0;
  for (const word of words) {
    const test = line + (line ? ' ' : '') + word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lineNum++;
      if (lineNum > maxLines) {
        ctx.fillText(line + '…', x, y);
        return;
      }
      ctx.fillText(line, x, y);
      y += lineHeight;
      line = word;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, y);
}

/* ═══ Main Component ═══════════════════════════════════════════════════════ */

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

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = PROFILE.profileImage;
    img.onload = () => setProfileImg(img);
  }, []);

  const totalProjects = PROJECTS.length;
  const totalEcosystems = ECOSYSTEMS.filter((e) => e.id !== 'web2').length;

  const handleSelectEco = useCallback((id: string | null) => setSelectedEco(id), []);

  return (
    <div className="solar">
      <div className="solar__header">
        <div>
          <div className="solar__brand">Ecosystem Solar System</div>
          <span className="solar__stats">
            {totalProjects} projects · {totalEcosystems} chains · {OSS_CONTRIBUTIONS.length} OSS contributions
          </span>
        </div>
        <BackButton onBack={onBack} />
      </div>

      {/* Desktop: Canvas */}
      <div className="solar__system">
        <SolarCanvas
          onSelectEco={handleSelectEco}
          selectedEco={selectedEco}
          profileImg={profileImg}
          projectsByEco={projectsByEco}
        />
      </div>

      {/* Mobile: Card Grid */}
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
    </div>
  );
}

function ProjectCard({ project, accentColor }: { project: Project; accentColor: string }) {
  return (
    <div className="solar__project-card" style={{ borderColor: `${accentColor}20` }}>
      <div className="solar__project-top">
        <span className="solar__project-name">{project.name}</span>
        <div className="solar__project-badges">
          <span className="solar__project-badge" style={{ background: `${accentColor}15`, color: accentColor }}>{project.type}</span>
          <span className={`solar__project-status solar__project-status--${project.status.toLowerCase()}`}>
            {project.status === 'LIVE' ? '● LIVE' : '○ WIP'}
          </span>
        </div>
      </div>
      <p className="solar__project-desc">{project.description}</p>
      <div className="solar__project-tech">
        {project.tech.map((t) => (
          <span key={t} className="solar__project-tech-pill" style={{ background: `${accentColor}10`, color: `${accentColor}cc` }}>{t}</span>
        ))}
      </div>
      <div className="solar__project-links">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="solar__project-link" style={{ borderColor: accentColor, color: accentColor }}>GitHub ↗</a>
        {project.liveUrl && project.liveUrl !== '#' && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="solar__project-link solar__project-link--live">Live Demo ↗</a>
        )}
      </div>
    </div>
  );
}
