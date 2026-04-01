// ============================================================================
// FILE: src/views/IdentitySelector.tsx
// DESCRIPTION: Landing page — visitor selects their identity/perspective
// ============================================================================

import { PERSONAS, type ViewId } from '../data/portfolio';
import '../styles/views/_selector.scss';

interface Props {
  onSelect: (id: ViewId) => void;
}

/* ── Mini preview components ─────────────────────────────────────────────── */

function VCPreview() {
  return (
    <div style={{ fontFamily: "'Courier New', monospace", fontSize: '0.6rem', lineHeight: 1.8, width: '100%' }}>
      <div><span style={{ color: '#9B5DE5' }}>0xD0T1Q3</span> <span style={{ color: '#666' }}>·</span> <span style={{ color: '#999' }}>DOTique</span> <span style={{ color: '#666' }}>·</span> <span style={{ color: '#00D395' }}>✓ VERIFIED</span></div>
      <div><span style={{ color: '#666' }}>0xD0TV35</span> <span style={{ color: '#666' }}>·</span> <span style={{ color: '#999' }}>DotVest</span> <span style={{ color: '#666' }}>·</span> <span style={{ color: '#00D395' }}>✓ VERIFIED</span></div>
      <div><span style={{ color: '#666' }}>0x54F3P1</span> <span style={{ color: '#666' }}>·</span> <span style={{ color: '#999' }}>SafePing</span> <span style={{ color: '#666' }}>·</span> <span style={{ color: '#00D395' }}>✓ VERIFIED</span></div>
    </div>
  );
}

function CTOPreview() {
  return (
    <div style={{ fontFamily: "'Courier New', monospace", fontSize: '0.6rem', lineHeight: 1.8, color: '#00FF41', width: '100%' }}>
      <div>DIVINE-OS v2.1.0</div>
      <div style={{ color: '#fff' }}>❯ whoami</div>
      <div>Web3 Architect</div>
    </div>
  );
}

function ClientPreview() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', width: '100%', justifyContent: 'center' }}>
      {[['10', 'Projects'], ['12', 'Events'], ['7', 'Chains']].map(([val, label]) => (
        <div key={label} style={{
          textAlign: 'center', padding: '0.4rem 0.6rem',
          background: 'rgba(0,212,255,0.05)', borderRadius: '6px',
          border: '1px solid rgba(0,212,255,0.12)', flex: 1,
        }}>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: '#00D4FF' }}>{val}</div>
          <div style={{ fontSize: '0.5rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

function AmbassadorPreview() {
  return (
    <svg viewBox="0 0 120 60" width="120" height="60">
      <circle cx="60" cy="30" r="5" fill="#E6007A" opacity={0.8} />
      {[[30, 12], [90, 12], [20, 48], [100, 48], [60, 55]].map(([cx, cy], i) => (
        <g key={i}>
          <line x1={60} y1={30} x2={cx} y2={cy} stroke="rgba(230,0,122,0.3)" strokeWidth={0.7} />
          <circle cx={cx} cy={cy} r={3} fill="none" stroke="#E6007A" strokeWidth={0.7} opacity={0.6} />
        </g>
      ))}
    </svg>
  );
}

function EventPreview() {
  return (
    <div style={{
      width: '130px', height: '65px',
      background: 'linear-gradient(135deg, #0d0d20, #1a0533)',
      borderRadius: '8px', padding: '0.5rem 0.6rem',
      border: '1px solid rgba(245,158,11,0.25)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#fff', marginBottom: '0.15rem' }}>ANYADIKE DIVINE</div>
      <div style={{ fontSize: '0.45rem', color: '#F59E0B' }}>Web3 Architect</div>
    </div>
  );
}

const previews: Record<ViewId, React.ComponentType> = {
  vc: VCPreview,
  cto: CTOPreview,
  client: ClientPreview,
  ambassador: AmbassadorPreview,
  event: EventPreview,
};

/* ── Main Component ──────────────────────────────────────────────────────── */

export default function IdentitySelector({ onSelect }: Props) {
  return (
    <div className="selector">
      <div className="selector__header">
        <p className="selector__label">Adaptive Portfolio System</p>
        <h1 className="selector__name">ANYADIKE DIVINE</h1>
        <p className="selector__tagline">
          Web3 Developer · Community Manager · Ecosystem Builder · Nigeria
        </p>
        <hr className="selector__line" />
      </div>

      <p className="selector__instruction">
        Who are you? Select your perspective — each view shows what matters most to you.
      </p>

      <div className="selector__grid">
        {PERSONAS.map((p, i) => {
          const Preview = previews[p.id];
          return (
            <div
              key={p.id}
              className="selector__card"
              style={{
                animationDelay: `${0.08 * i}s`,
                ['--card-accent' as string]: p.accent,
                ['--card-glow' as string]: p.glow,
              }}
              onClick={() => onSelect(p.id)}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = p.accent;
                el.style.boxShadow = `0 20px 50px ${p.glow}`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.06)';
                el.style.boxShadow = 'none';
              }}
            >
              <div className="selector__preview">
                <Preview />
              </div>
              <div className="selector__card-label">
                <span className="selector__dot" style={{ background: p.accent, boxShadow: `0 0 8px ${p.glow}` }} />
                {p.label}
              </div>
              <div className="selector__card-subtitle">{p.subtitle}</div>
              <div className="selector__card-desc">{p.description}</div>
              <div className="selector__card-enter" style={{ color: p.accent }}>Enter this view →</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
