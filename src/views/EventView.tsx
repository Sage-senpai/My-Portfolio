// ============================================================================
// FILE: src/views/EventView.tsx
// DESCRIPTION: Conference / Event — Holographic 3D tilt ID card with download
// ============================================================================

import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { PROJECTS, PROFILE } from '../data/portfolio';
import BackButton from '../components/BackButton';
import '../styles/views/_event.scss';

interface Props {
  onBack: () => void;
}

const CHAINS = [
  { name: 'DOT', color: '#E6007A' },
  { name: 'SUI', color: '#4DA2FF' },
  { name: '0G', color: '#00D395' },
  { name: 'SOL', color: '#9945FF' },
];

const liveProjects = PROJECTS.filter((p) => p.liveUrl !== '#');
const totalEcosystems = [...new Set(PROJECTS.map((p) => p.ecosystem))].filter((e) => e !== 'web2').length;

export default function EventView({ onBack }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shimmer, setShimmer] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (-y / rect.height) * 16,
      y: (x / rect.width) * 16,
    });
    setShimmer({
      x: ((x / rect.width) + 0.5) * 100,
      y: ((y / rect.height) + 0.5) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
    setShimmer({ x: 50, y: 50 });
  };

  const handleDownload = useCallback(async () => {
    if (!printRef.current) return;
    try {
      const dataUrl = await toPng(printRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#06060f',
      });
      const link = document.createElement('a');
      link.download = 'anyadike-divine-id-card.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    }
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const rotateY = flipped ? 180 + tilt.y : tilt.y;

  return (
    <div className="event">
      <div className="event__back-wrap">
        <BackButton onBack={onBack} />
      </div>

      <div className="event__instruction">Hover to tilt · Click to flip</div>

      <div
        className="event__card-wrapper"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovering(true)}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className="event__card-inner"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${rotateY}deg)`,
            transition: isHovering
              ? 'transform 0.05s linear'
              : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          {/* Front Face */}
          <div className="event__face event__face--front">
            <div
              className="event__shimmer"
              style={{
                background: `radial-gradient(ellipse at ${shimmer.x}% ${shimmer.y}%, rgba(245,158,11,0.22), rgba(155,93,229,0.15), rgba(0,212,255,0.08), transparent)`,
              }}
            />

            <div className="event__chains-row">
              <div className="event__chain-badges">
                {CHAINS.map((c) => (
                  <span
                    key={c.name}
                    className="event__chain-badge"
                    style={{
                      background: `${c.color}15`,
                      color: c.color,
                      border: `1px solid ${c.color}33`,
                    }}
                  >
                    {c.name}
                  </span>
                ))}
              </div>
              <span className="event__builder-id">WEB3 BUILDER ID</span>
            </div>

            <div className="event__identity-row">
              <div className="event__avatar-photo">
                <img src={PROFILE.profileImage} alt={PROFILE.name} />
              </div>
              <div className="event__name-block">
                <span className="event__card-name">ANYADIKE DIVINE</span>
                <span className="event__card-role">Web3 Frontend Architect</span>
              </div>
            </div>

            <div className="event__tags-row">
              {['Developer', 'Community Lead', 'Builder'].map((tag) => (
                <span key={tag} className="event__tag-pill">{tag}</span>
              ))}
            </div>

            <div className="event__stats-row">
              <div className="event__stats-group">
                {[
                  { value: String(PROJECTS.length), label: 'Projects' },
                  { value: '13', label: 'Events' },
                  { value: String(totalEcosystems), label: 'Ecosystems' },
                ].map((s) => (
                  <div key={s.label} className="event__stat">
                    <div className="event__stat-value">{s.value}</div>
                    <div className="event__stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="event__established">
                Est. 2021<br />Nigeria
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div className="event__face event__face--back">
            <div className="event__back-header">Proof of Work — Shipped</div>

            <div className="event__project-list">
              {PROJECTS.slice(0, 14).map((p) => (
                <div key={p.id} className="event__project-row">
                  <span className="event__project-row-name">{p.name}</span>
                  <span className="event__project-row-chain">{p.chain}</span>
                  <span className="event__project-row-status">
                    {p.status === 'LIVE' ? '● LIVE' : '○ WIP'}
                  </span>
                </div>
              ))}
              {PROJECTS.length > 14 && (
                <div className="event__project-row">
                  <span className="event__project-row-name" style={{ color: '#888' }}>
                    +{PROJECTS.length - 14} more projects
                  </span>
                </div>
              )}
            </div>

            <div className="event__divider" />

            <div className="event__back-contact">
              <span className="event__back-contact-item">
                ✉ <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </span>
              <span className="event__back-contact-item">
                𝕏 <a href={`https://x.com/${PROFILE.twitter}`} target="_blank" rel="noopener noreferrer">@{PROFILE.twitter}</a>
              </span>
              <span className="event__back-contact-item">
                ⌥ <a href={`https://github.com/${PROFILE.github}`} target="_blank" rel="noopener noreferrer">{PROFILE.github}</a>
              </span>
            </div>

            <div className="event__back-footer">
              Available for DeFi · Ambassador · Contracts · Collabs
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="event__actions">
        <a href={`mailto:${PROFILE.email}`} className="event__action-btn event__action-btn--email">
          ✉ Send Email
        </a>
        <a href={`https://github.com/${PROFILE.github}`} target="_blank" rel="noopener noreferrer" className="event__action-btn event__action-btn--github">
          ⌥ GitHub
        </a>
        <a href={`https://x.com/${PROFILE.twitter}`} target="_blank" rel="noopener noreferrer" className="event__action-btn event__action-btn--twitter">
          𝕏 Twitter
        </a>
        <button onClick={handleDownload} className="event__action-btn event__action-btn--download">
          ⤓ Download Card
        </button>
        <button onClick={handlePrint} className="event__action-btn event__action-btn--print">
          ⎙ Print Card
        </button>
      </div>

      {/* ── Hidden printable layout (both faces side by side) ────────── */}
      <div className="event__print-layout" ref={printRef}>
        {/* Front */}
        <div className="event__print-card event__print-card--front">
          <div className="event__chains-row">
            <div className="event__chain-badges">
              {CHAINS.map((c) => (
                <span
                  key={c.name}
                  className="event__chain-badge"
                  style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}33` }}
                >
                  {c.name}
                </span>
              ))}
            </div>
            <span className="event__builder-id">WEB3 BUILDER ID</span>
          </div>
          <div className="event__identity-row">
            <div className="event__avatar-photo">
              <img src={PROFILE.profileImage} alt={PROFILE.name} />
            </div>
            <div className="event__name-block">
              <span className="event__card-name">ANYADIKE DIVINE</span>
              <span className="event__card-role">Web3 Frontend Architect</span>
            </div>
          </div>
          <div className="event__tags-row">
            {['Developer', 'Community Lead', 'Builder'].map((tag) => (
              <span key={tag} className="event__tag-pill">{tag}</span>
            ))}
          </div>
          <div className="event__stats-row">
            <div className="event__stats-group">
              {[
                { value: String(PROJECTS.length), label: 'Projects' },
                { value: '13', label: 'Events' },
                { value: String(totalEcosystems), label: 'Ecosystems' },
              ].map((s) => (
                <div key={s.label} className="event__stat">
                  <div className="event__stat-value">{s.value}</div>
                  <div className="event__stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="event__established">Est. 2021 · Nigeria</div>
          </div>
        </div>

        {/* Back */}
        <div className="event__print-card event__print-card--back">
          <div className="event__back-header">Proof of Work — Shipped</div>
          <div className="event__project-list">
            {PROJECTS.slice(0, 14).map((p) => (
              <div key={p.id} className="event__project-row">
                <span className="event__project-row-name">{p.name}</span>
                <span className="event__project-row-chain">{p.chain}</span>
                <span className="event__project-row-status">
                  {p.status === 'LIVE' ? '● LIVE' : '○ WIP'}
                </span>
              </div>
            ))}
            {PROJECTS.length > 14 && (
              <div className="event__project-row">
                <span className="event__project-row-name" style={{ color: '#888' }}>
                  +{PROJECTS.length - 14} more
                </span>
              </div>
            )}
          </div>
          <div className="event__divider" />
          <div className="event__back-contact">
            <span className="event__back-contact-item">✉ {PROFILE.email}</span>
            <span className="event__back-contact-item">𝕏 @{PROFILE.twitter}</span>
            <span className="event__back-contact-item">⌥ {PROFILE.github}</span>
          </div>
          <div className="event__back-footer">
            Available for DeFi · Ambassador · Contracts · Collabs
          </div>
        </div>
      </div>
    </div>
  );
}
