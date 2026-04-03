// ============================================================================
// FILE: src/views/AmbassadorView.tsx
// DESCRIPTION: 3D CSS Solar System with planet textures + ecosystem logos
//              Based on juliangarnier/3D-CSS-Solar-System (MIT)
// ============================================================================

import { useState, useMemo } from 'react';
import { ECOSYSTEMS, PROJECTS, OSS_CONTRIBUTIONS, PROFILE, type Project } from '../data/portfolio';
import BackButton from '../components/BackButton';
import '../styles/views/_ambassador.scss';

interface Props { onBack: () => void; }

const ORBIT_CONFIG: Record<string, { size: number; speed: number; planetSize: number }> = {
  polkadot:  { size: 30, speed: 0.5, planetSize: 5 },
  '0g':      { size: 42, speed: 0.8, planetSize: 3.8 },
  solana:    { size: 54, speed: 1.1, planetSize: 3.5 },
  stellar:   { size: 66, speed: 1.5, planetSize: 3.0 },
  mandala:   { size: 78, speed: 2.0, planetSize: 2.8 },
  mantle:    { size: 92, speed: 2.5, planetSize: 3.2 },
  pacifica:  { size: 106, speed: 3.0, planetSize: 2.6 },
  web2:      { size: 120, speed: 3.8, planetSize: 2.8 },
};
const BASE_SPEED = 24;

export default function AmbassadorView({ onBack }: Props) {
  const [selectedEco, setSelectedEco] = useState<string | null>(null);
  const [hoveredMoon, setHoveredMoon] = useState<string | null>(null);

  const projectsByEco = useMemo(() => {
    const map: Record<string, Project[]> = {};
    PROJECTS.forEach((p) => {
      if (!map[p.ecosystem]) map[p.ecosystem] = [];
      map[p.ecosystem].push(p);
    });
    return map;
  }, []);

  const selectedEcosystem = ECOSYSTEMS.find((e) => e.id === selectedEco);
  const selectedProjects = selectedEco ? projectsByEco[selectedEco] || [] : [];

  return (
    <div className="solar">
      {/* Header */}
      <div className="solar__header">
        <div>
          <div className="solar__brand">Ecosystem Solar System</div>
          <span className="solar__stats">
            {PROJECTS.length} projects · {ECOSYSTEMS.filter((e) => e.id !== 'web2').length} chains · {OSS_CONTRIBUTIONS.length} OSS
          </span>
        </div>
        <BackButton onBack={onBack} />
      </div>

      {/* ═══ DESKTOP: 3D CSS Solar System ═══ */}
      <div className="solar__desktop">
        <div
          className={`solar__universe ${selectedEco ? 'solar__universe--zoomed' : ''}`}
          onClick={() => { if (selectedEco) { setSelectedEco(null); setHoveredMoon(null); } }}
        >
          <div className="solar__galaxy">
            <div className={`solar__system ${selectedEco ? 'solar__system--paused' : ''}`}>

              {/* Sun — profile image with glow */}
              <div className="solar__sun" style={{ backgroundImage: 'url(/sun.png)' }}>
                <img src={PROFILE.profileImage} alt={PROFILE.name} className="solar__sun-photo" />
              </div>

              {/* Ecosystem orbits + planets */}
              {ECOSYSTEMS.map((eco) => {
                const cfg = ORBIT_CONFIG[eco.id] || { size: 60, speed: 2, planetSize: 3 };
                const projects = projectsByEco[eco.id] || [];
                const isSelected = selectedEco === eco.id;
                const duration = BASE_SPEED * cfg.speed;

                return (
                  <div
                    key={eco.id}
                    className={`solar__orbit ${isSelected ? 'solar__orbit--active' : ''}`}
                    style={{
                      width: `${cfg.size}em`,
                      height: `${cfg.size}em`,
                      marginTop: `-${cfg.size / 2}em`,
                      marginLeft: `-${cfg.size / 2}em`,
                      animationDuration: `${duration}s`,
                    }}
                  >
                    <div className="solar__pos" style={{ animationDuration: `${duration}s` }}>
                      {/* Planet with texture */}
                      <div
                        className={`solar__planet ${isSelected ? 'solar__planet--selected' : ''}`}
                        style={{
                          width: `${cfg.planetSize}em`,
                          height: `${cfg.planetSize}em`,
                          marginTop: `-${cfg.planetSize / 2}em`,
                          marginLeft: `-${cfg.planetSize / 2}em`,
                          backgroundImage: `url(${eco.planetTexture})`,
                          boxShadow: `0 0 ${isSelected ? 40 : 15}px ${eco.color}44`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEco(isSelected ? null : eco.id);
                          setHoveredMoon(null);
                        }}
                      >
                        {/* Ecosystem logo overlay */}
                        <img src={eco.logo} alt={eco.name} className="solar__planet-logo" />
                      </div>

                      {/* Planet label (counter-rotated to stay readable) */}
                      <div className="solar__planet-info">
                        <span className="solar__planet-name" style={{ color: eco.color }}>{eco.name}</span>
                        <span className="solar__planet-count">{projects.length} projects</span>
                      </div>

                      {/* Moon orbits — only when selected */}
                      {isSelected && selectedProjects.map((p, mi) => {
                        const moonOrbitSize = cfg.planetSize + 3.5 + mi * 2.4;
                        const moonSpeed = 8 + mi * 2.5;
                        const moonAngle = (360 / selectedProjects.length) * mi;
                        const isHovered = hoveredMoon === p.id;

                        return (
                          <div
                            key={p.id}
                            className="solar__moon-orbit"
                            style={{
                              width: `${moonOrbitSize}em`,
                              height: `${moonOrbitSize}em`,
                              marginTop: `-${moonOrbitSize / 2}em`,
                              marginLeft: `-${moonOrbitSize / 2}em`,
                              animationDuration: `${moonSpeed}s`,
                              animationDelay: `-${(moonSpeed / 360) * moonAngle}s`,
                            }}
                          >
                            <div className="solar__moon-pos" style={{ animationDuration: `${moonSpeed}s` }}>
                              <div
                                className={`solar__moon ${isHovered ? 'solar__moon--hovered' : ''}`}
                                onMouseEnter={() => setHoveredMoon(p.id)}
                                onMouseLeave={() => setHoveredMoon(null)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const url = p.liveUrl !== '#' ? p.liveUrl : p.githubUrl !== '#' ? p.githubUrl : null;
                                  if (url) window.open(url, '_blank', 'noopener noreferrer');
                                }}
                              >
                                <span className="solar__moon-dot" style={{
                                  background: p.status === 'LIVE' ? '#00D395' : '#F59E0B',
                                }} />
                                <span className="solar__moon-label">{p.name}</span>
                              </div>

                              {isHovered && (
                                <div className="solar__tooltip" style={{ borderColor: `${eco.color}44` }}>
                                  <div className="solar__tooltip-head">
                                    <span className="solar__tooltip-title">{p.name}</span>
                                    <span className="solar__tooltip-meta" style={{ color: eco.color }}>{p.type} · {p.status}</span>
                                  </div>
                                  <p className="solar__tooltip-desc">{p.description}</p>
                                  <div className="solar__tooltip-tech">
                                    {p.tech.slice(0, 4).map((t) => (
                                      <span key={t} style={{ borderColor: `${eco.color}33`, color: `${eco.color}cc` }}>{t}</span>
                                    ))}
                                  </div>
                                  <div className="solar__tooltip-links">
                                    {p.githubUrl !== '#' && (
                                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: eco.color }}
                                         onClick={(e) => e.stopPropagation()}>GitHub ↗</a>
                                    )}
                                    {p.liveUrl !== '#' && (
                                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="solar__tooltip-live"
                                         onClick={(e) => e.stopPropagation()}>Live ↗</a>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {selectedEco && (
          <button className="solar__zoom-out" onClick={() => { setSelectedEco(null); setHoveredMoon(null); }}>
            ← Back to Solar System
          </button>
        )}

        <div className="solar__legend">
          {ECOSYSTEMS.map((eco) => (
            <button
              key={eco.id}
              className={`solar__legend-item ${selectedEco === eco.id ? 'solar__legend-item--active' : ''}`}
              onClick={() => setSelectedEco(selectedEco === eco.id ? null : eco.id)}
            >
              <img src={eco.logo} alt="" className="solar__legend-logo" />
              <span>{eco.name}</span>
              <span className="solar__legend-count">{(projectsByEco[eco.id] || []).length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ═══ MOBILE ═══ */}
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
                  <img src={eco.logo} alt="" className="solar__mobile-logo" />
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
                  {projects.map((p) => <ProjectCard key={p.id} project={p} accentColor={eco.color} />)}
                </div>
              )}
            </div>
          );
        })}
        <div className="solar__mobile-card">
          <div className="solar__mobile-card-header" style={{ borderLeftColor: '#00FF41' }}>
            <div className="solar__mobile-card-left">
              <span style={{ fontSize: '1.2rem', color: '#00FF41', flexShrink: 0 }}>&#9826;</span>
              <div>
                <div className="solar__mobile-name">Open Source</div>
                <div className="solar__mobile-desc">Forked repos with code contributions</div>
              </div>
            </div>
            <span className="solar__mobile-count" style={{ background: 'rgba(0,255,65,0.08)', color: '#00FF41' }}>{OSS_CONTRIBUTIONS.length}</span>
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
        <span className={`solar__project-status solar__project-status--${project.status.toLowerCase()}`}>
          {project.status === 'LIVE' ? '● LIVE' : '○ WIP'}
        </span>
      </div>
      <p className="solar__project-desc">{project.description}</p>
      <div className="solar__project-tech">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="solar__project-tech-pill" style={{ background: `${accentColor}10`, color: `${accentColor}cc` }}>{t}</span>
        ))}
      </div>
      <div className="solar__project-links">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="solar__project-link" style={{ borderColor: accentColor, color: accentColor }}>GitHub ↗</a>
        {project.liveUrl !== '#' && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="solar__project-link solar__project-link--live">Live ↗</a>
        )}
      </div>
    </div>
  );
}
