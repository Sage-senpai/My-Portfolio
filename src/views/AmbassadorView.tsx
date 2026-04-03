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

const ORBIT_CONFIG: Record<string, { size: number; speed: number; planetSize: number; startAngle: number }> = {
  polkadot:  { size: 18, speed: 0.5,  planetSize: 3.5, startAngle: 220 },
  '0g':      { size: 26, speed: 0.8,  planetSize: 2.8, startAngle: 45  },
  solana:    { size: 34, speed: 1.1,  planetSize: 2.6, startAngle: 310 },
  stellar:   { size: 42, speed: 1.5,  planetSize: 2.4, startAngle: 140 },
  mandala:   { size: 50, speed: 2.0,  planetSize: 2.2, startAngle: 270 },
  mantle:    { size: 58, speed: 2.5,  planetSize: 2.4, startAngle: 80  },
  pacifica:  { size: 66, speed: 3.0,  planetSize: 2.0, startAngle: 190 },
  web2:      { size: 74, speed: 3.8,  planetSize: 2.2, startAngle: 350 },
};
const BASE_SPEED = 30;

export default function AmbassadorView({ onBack }: Props) {
  const [selectedEco, setSelectedEco] = useState<string | null>(null);
  const [hoveredMoon, setHoveredMoon] = useState<string | null>(null);
  const [mobile3D, setMobile3D] = useState(false);

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
              <div className="solar__sun">
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
                      animationDelay: `-${(duration * cfg.startAngle) / 360}s`,
                    }}
                  >
                    <div className="solar__pos" style={{
                      animationDuration: `${duration}s`,
                      animationDelay: `-${(duration * cfg.startAngle) / 360}s`,
                    }}>
                      {/* Planet — CSS gradient sphere + ecosystem logo */}
                      <div
                        className={`solar__planet ${isSelected ? 'solar__planet--selected' : ''}`}
                        style={{
                          width: `${cfg.planetSize}em`,
                          height: `${cfg.planetSize}em`,
                          marginTop: `-${cfg.planetSize / 2}em`,
                          marginLeft: `-${cfg.planetSize / 2}em`,
                          background: `radial-gradient(circle at 30% 30%, ${eco.color}ee, ${eco.color}88 45%, ${eco.color}33 75%, ${eco.color}11)`,
                          boxShadow: `0 0 ${isSelected ? 40 : 15}px ${eco.color}44, inset -${cfg.planetSize * 0.15}em -${cfg.planetSize * 0.1}em ${cfg.planetSize * 0.3}em ${eco.color}33`,
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

                      {/* No moons in the 3D view — detail panel handles it */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detail panel — slides in from right when a planet is selected */}
        {selectedEcosystem && (
          <div className="solar__panel" onClick={(e) => e.stopPropagation()}>
            <div className="solar__panel-header">
              <div className="solar__panel-title-row">
                <img src={selectedEcosystem.logo} alt="" className="solar__panel-logo" />
                <div>
                  <h2 className="solar__panel-title" style={{ color: selectedEcosystem.color }}>{selectedEcosystem.name}</h2>
                  <p className="solar__panel-desc">{selectedEcosystem.description}</p>
                </div>
              </div>
              <button className="solar__panel-close" onClick={() => setSelectedEco(null)}>✕</button>
            </div>
            <div className="solar__panel-list">
              {selectedProjects.map((p) => (
                <div key={p.id} className="solar__panel-project">
                  <div className="solar__panel-project-top">
                    <span className="solar__panel-project-name">{p.name}</span>
                    <span className={`solar__panel-project-status ${p.status === 'LIVE' ? 'solar__panel-project-status--live' : 'solar__panel-project-status--wip'}`}>
                      {p.status === 'LIVE' ? '● LIVE' : '○ WIP'}
                    </span>
                  </div>
                  <span className="solar__panel-project-type" style={{ color: selectedEcosystem.color }}>{p.type}</span>
                  <p className="solar__panel-project-desc">{p.description}</p>
                  <div className="solar__panel-project-tech">
                    {p.tech.slice(0, 4).map((t) => (
                      <span key={t} style={{ borderColor: `${selectedEcosystem.color}33`, color: `${selectedEcosystem.color}bb` }}>{t}</span>
                    ))}
                  </div>
                  <div className="solar__panel-project-links">
                    {p.githubUrl !== '#' && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: selectedEcosystem.color }}>GitHub ↗</a>
                    )}
                    {p.liveUrl !== '#' && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="solar__panel-link-live">Live Demo ↗</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
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

      {/* ═══ MOBILE 3D FULLSCREEN ═══ */}
      {mobile3D && (
        <div className="solar__mobile-3d">
          <button className="solar__mobile-3d-close" onClick={() => { setMobile3D(false); setSelectedEco(null); }}>
            ✕ Exit 3D View
          </button>
          <div className="solar__mobile-3d-hint">Rotate your phone to landscape for best view</div>
          <div className="solar__universe">
            <div className="solar__galaxy">
              <div className={`solar__system ${selectedEco ? 'solar__system--paused' : ''}`}>
                <div className="solar__sun">
                  <img src={PROFILE.profileImage} alt={PROFILE.name} className="solar__sun-photo" />
                </div>
                {ECOSYSTEMS.map((eco) => {
                  const cfg = ORBIT_CONFIG[eco.id] || { size: 40, speed: 2, planetSize: 2.5, startAngle: 0 };
                  const projects = projectsByEco[eco.id] || [];
                  const isSelected = selectedEco === eco.id;
                  const duration = BASE_SPEED * cfg.speed;
                  return (
                    <div key={eco.id} className={`solar__orbit ${isSelected ? 'solar__orbit--active' : ''}`}
                      style={{
                        width: `${cfg.size}em`, height: `${cfg.size}em`,
                        marginTop: `-${cfg.size / 2}em`, marginLeft: `-${cfg.size / 2}em`,
                        animationDuration: `${duration}s`,
                        animationDelay: `-${(duration * cfg.startAngle) / 360}s`,
                      }}>
                      <div className="solar__pos" style={{
                        animationDuration: `${duration}s`,
                        animationDelay: `-${(duration * cfg.startAngle) / 360}s`,
                      }}>
                        <div className={`solar__planet ${isSelected ? 'solar__planet--selected' : ''}`}
                          style={{
                            width: `${cfg.planetSize}em`, height: `${cfg.planetSize}em`,
                            marginTop: `-${cfg.planetSize / 2}em`, marginLeft: `-${cfg.planetSize / 2}em`,
                            background: `radial-gradient(circle at 30% 30%, ${eco.color}ee, ${eco.color}88 45%, ${eco.color}33 75%, ${eco.color}11)`,
                            boxShadow: `0 0 15px ${eco.color}44`,
                          }}
                          onClick={(e) => { e.stopPropagation(); setSelectedEco(isSelected ? null : eco.id); }}>
                          <img src={eco.logo} alt={eco.name} className="solar__planet-logo" />
                        </div>
                        <div className="solar__planet-info">
                          <span className="solar__planet-name" style={{ color: eco.color }}>{eco.name}</span>
                          <span className="solar__planet-count">{projects.length} projects</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {selectedEcosystem && (
            <div className="solar__panel" onClick={(e) => e.stopPropagation()}>
              <div className="solar__panel-header">
                <div className="solar__panel-title-row">
                  <img src={selectedEcosystem.logo} alt="" className="solar__panel-logo" />
                  <div>
                    <h2 className="solar__panel-title" style={{ color: selectedEcosystem.color }}>{selectedEcosystem.name}</h2>
                    <p className="solar__panel-desc">{selectedEcosystem.description}</p>
                  </div>
                </div>
                <button className="solar__panel-close" onClick={() => setSelectedEco(null)}>✕</button>
              </div>
              <div className="solar__panel-list">
                {selectedProjects.map((p) => (
                  <div key={p.id} className="solar__panel-project">
                    <div className="solar__panel-project-top">
                      <span className="solar__panel-project-name">{p.name}</span>
                      <span className={`solar__panel-project-status ${p.status === 'LIVE' ? 'solar__panel-project-status--live' : 'solar__panel-project-status--wip'}`}>
                        {p.status === 'LIVE' ? '● LIVE' : '○ WIP'}
                      </span>
                    </div>
                    <span className="solar__panel-project-type" style={{ color: selectedEcosystem.color }}>{p.type}</span>
                    <p className="solar__panel-project-desc">{p.description}</p>
                    <div className="solar__panel-project-links">
                      {p.githubUrl !== '#' && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: selectedEcosystem.color }}>GitHub ↗</a>}
                      {p.liveUrl !== '#' && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="solar__panel-link-live">Live ↗</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ MOBILE ═══ */}
      <div className="solar__mobile-grid">
        <button className="solar__mobile-3d-btn" onClick={() => setMobile3D(true)}>
          View 3D Solar System (Landscape)
        </button>
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
