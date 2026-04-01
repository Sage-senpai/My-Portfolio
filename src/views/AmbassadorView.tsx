// ============================================================================
// FILE: src/views/AmbassadorView.tsx
// DESCRIPTION: Ecosystem / Protocol — Solar System explorer with zoom-in
// ============================================================================

import { useState, useMemo } from 'react';
import { ECOSYSTEMS, PROJECTS, OSS_CONTRIBUTIONS, PROFILE, type Ecosystem, type Project } from '../data/portfolio';
import BackButton from '../components/BackButton';
import '../styles/views/_ambassador.scss';

interface Props {
  onBack: () => void;
}

export default function AmbassadorView({ onBack }: Props) {
  const [selectedEco, setSelectedEco] = useState<string | null>(null);

  const projectsByEco = useMemo(() => {
    const map: Record<string, Project[]> = {};
    PROJECTS.forEach((p) => {
      if (!map[p.ecosystem]) map[p.ecosystem] = [];
      map[p.ecosystem].push(p);
    });
    return map;
  }, []);

  const selectedEcosystem = ECOSYSTEMS.find((e) => e.id === selectedEco) || null;
  const selectedProjects = selectedEco ? projectsByEco[selectedEco] || [] : [];

  const totalProjects = PROJECTS.length;
  const totalEcosystems = ECOSYSTEMS.filter((e) => e.id !== 'web2').length;

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

      {/* Desktop: Solar System */}
      <div className={`solar__system ${selectedEco ? 'solar__system--zoomed' : ''}`}>
        {/* Star field */}
        <div className="solar__stars" />

        {/* Sun */}
        <div className="solar__sun" onClick={() => setSelectedEco(null)}>
          <div className="solar__sun-glow" />
          <div className="solar__sun-core">
            <img src={PROFILE.profileImage} alt={PROFILE.name} className="solar__sun-img" />
          </div>
          <span className="solar__sun-label">{PROFILE.name}</span>
        </div>

        {/* Orbit rings + planets */}
        {ECOSYSTEMS.map((eco, i) => {
          const radian = (eco.angle * Math.PI) / 180;
          const planetX = Math.cos(radian) * eco.orbitRadius;
          const planetY = Math.sin(radian) * eco.orbitRadius;
          const projectCount = (projectsByEco[eco.id] || []).length;

          return (
            <div key={eco.id}>
              {/* Orbit ring */}
              <div
                className="solar__orbit-ring"
                style={{
                  width: eco.orbitRadius * 2,
                  height: eco.orbitRadius * 2,
                }}
              />

              {/* Planet */}
              <button
                className={`solar__planet ${selectedEco === eco.id ? 'solar__planet--active' : ''}`}
                style={{
                  transform: `translate(${planetX}px, ${planetY}px)`,
                  animationDelay: `${i * 0.1}s`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEco(selectedEco === eco.id ? null : eco.id);
                }}
              >
                <div
                  className="solar__planet-body"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${eco.color}88, ${eco.color}44, ${eco.color}22)`,
                    borderColor: eco.color,
                    boxShadow: `0 0 20px ${eco.color}44, inset -4px -4px 8px ${eco.color}22`,
                    width: 24 + projectCount * 4,
                    height: 24 + projectCount * 4,
                  }}
                >
                  <span className="solar__planet-icon">{eco.icon}</span>
                </div>
                <span className="solar__planet-name">{eco.name}</span>
                <span className="solar__planet-count" style={{ color: eco.color }}>
                  {projectCount}
                </span>
              </button>
            </div>
          );
        })}
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
                    <MobileProjectCard key={p.id} project={p} accentColor={eco.color} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* OSS Section — mobile */}
        <div className="solar__mobile-card">
          <div className="solar__mobile-card-header" style={{ borderLeftColor: '#00FF41' }}>
            <div className="solar__mobile-card-left">
              <span className="solar__mobile-icon" style={{ color: '#00FF41' }}>⑂</span>
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
                  <span className="solar__project-badge" style={{ background: 'rgba(0,255,65,0.1)', color: '#00FF41' }}>
                    OSS
                  </span>
                </div>
                <p className="solar__project-desc">{c.description}</p>
                <div className="solar__project-links">
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="solar__project-link" style={{ borderColor: '#00FF41', color: '#00FF41' }}>
                    Fork ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Panel (desktop) */}
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
              <button className="solar__detail-close" onClick={() => setSelectedEco(null)}>✕</button>
            </div>
            <p className="solar__detail-desc">{selectedEcosystem.description}</p>

            <div className="solar__detail-projects">
              {selectedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} accentColor={selectedEcosystem.color} />
              ))}
            </div>

            {/* OSS in detail panel if showing polkadot or general */}
            {selectedEco === 'polkadot' && (
              <div className="solar__detail-oss">
                <h3 className="solar__detail-oss-title">Open Source Contributions</h3>
                {OSS_CONTRIBUTIONS.map((c) => (
                  <div key={c.project} className="solar__project-card" style={{ borderColor: 'rgba(0,255,65,0.12)' }}>
                    <div className="solar__project-top">
                      <span className="solar__project-name">{c.project}</span>
                      <span className="solar__project-badge" style={{ background: 'rgba(0,255,65,0.1)', color: '#00FF41' }}>
                        OSS
                      </span>
                    </div>
                    <p className="solar__project-desc">{c.description}</p>
                    <div className="solar__project-links">
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="solar__project-link" style={{ borderColor: '#00FF41', color: '#00FF41' }}>
                        View Fork ↗
                      </a>
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

/* ── Project Card (desktop panel) ──────────────────────────────────────── */

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
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="solar__project-link"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          GitHub ↗
        </a>
        {project.liveUrl && project.liveUrl !== '#' && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="solar__project-link solar__project-link--live"
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  );
}

/* ── Mobile Project Card ───────────────────────────────────────────────── */

function MobileProjectCard({ project, accentColor }: { project: Project; accentColor: string }) {
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
            Live ↗
          </a>
        )}
      </div>
    </div>
  );
}
