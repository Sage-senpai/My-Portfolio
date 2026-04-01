// ============================================================================
// FILE: src/views/VCView.tsx
// DESCRIPTION: VC / Investor view — Blockchain explorer resume
// ============================================================================

import { useState, useEffect } from 'react';
import { PROJECTS } from '../data/portfolio';
import BackButton from '../components/BackButton';
import '../styles/views/_vc.scss';

interface Props {
  onBack: () => void;
}

const TYPE_COLORS: Record<string, string> = {
  DApp: '#9B5DE5',
  DeFi: '#00D395',
  'AI+Web3': '#00D4FF',
  Social: '#E6007A',
  Gamified: '#F59E0B',
  RealFi: '#FF6B6B',
  Website: '#60A5FA',
};

export default function VCView({ onBack }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [powScore, setPowScore] = useState(0);

  useEffect(() => {
    const target = 9847;
    const step = Math.ceil(target / 50);
    const interval = setInterval(() => {
      setPowScore((prev) => {
        const next = prev + step;
        if (next >= target) {
          clearInterval(interval);
          return target;
        }
        return next;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vc">
      <div className="vc__header">
        <div>
          <div className="vc__brand">DIVINE.CHAIN · BLOCKCHAIN EXPLORER</div>
          <h2 className="vc__title">Proof-of-Work Transaction Record</h2>
        </div>
        <BackButton onBack={onBack} />
      </div>

      <div className="vc__wallet-strip">
        <div className="vc__wallet-item">
          <span className="vc__wallet-label">Wallet Address</span>
          <span className="vc__wallet-value">0x44NY4D1K3...D1V1N3</span>
        </div>
        <div className="vc__wallet-item">
          <span className="vc__wallet-label">Network</span>
          <span className="vc__wallet-value vc__wallet-value--white">Multi-chain · 7 ecosystems</span>
        </div>
        <div className="vc__wallet-item">
          <span className="vc__wallet-label">POW Score</span>
          <span className="vc__wallet-value vc__wallet-value--green">
            {powScore.toLocaleString()} POW
          </span>
        </div>
        <div className="vc__wallet-item">
          <span className="vc__wallet-label">Reputation</span>
          <span className="vc__wallet-value vc__wallet-value--white">Top 3% Builder · Nigeria</span>
        </div>
      </div>

      <div className="vc__columns">
        <span>Txn Hash</span>
        <span>Type</span>
        <span>Project</span>
        <span>Status</span>
        <span>Chain</span>
        <span>Impact</span>
      </div>

      {PROJECTS.map((project) => (
        <div key={project.id}>
          <div
            className="vc__row"
            onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
          >
            <span className="vc__hash">{project.txnHash}</span>
            <span
              className="vc__type-badge"
              style={{
                background: `${TYPE_COLORS[project.type] || '#888'}22`,
                color: TYPE_COLORS[project.type] || '#888',
              }}
            >
              {project.type}
            </span>
            <span className="vc__project-name">{project.name}</span>
            <span className={`vc__status vc__status--${project.status === 'LIVE' ? 'live' : 'wip'}`}>
              {project.status === 'LIVE' ? '✓ Verified' : '⟳ Active'}
            </span>
            <span className="vc__chain">{project.chain}</span>
            <span className="vc__impact">{project.impact}</span>
          </div>

          {expandedId === project.id && (
            <div className="vc__expanded">
              <p className="vc__desc">{project.description}</p>
              <div className="vc__tech">
                {project.tech.map((t) => (
                  <span key={t} className="vc__tech-pill">{t}</span>
                ))}
              </div>
              <div className="vc__links">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vc__link-btn vc__link-btn--github"
                >
                  GitHub
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vc__link-btn vc__link-btn--live"
                >
                  Live Demo
                </a>
              </div>
              <div className="vc__meta">Block confirmations: 312 · Gas invested: 840 hours</div>
            </div>
          )}
        </div>
      ))}

      <div className="vc__footer">
        All transactions verified on Anyadike Proof-of-Work Chain · Consensus: 100% · 4 years uptime
      </div>
    </div>
  );
}
