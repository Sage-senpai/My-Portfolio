// ============================================================================
// FILE: src/views/IdentitySelector.tsx
// DESCRIPTION: Landing page — visitor selects their identity/perspective
// ============================================================================

import { PERSONAS, PROFILE, type ViewId } from '../data/portfolio';
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
      {[['25', 'Projects'], ['13', 'Events'], ['7', 'Chains']].map(([val, label]) => (
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
  // Solar system mini preview
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Sun */}
      <div style={{
        width: 14, height: 14, borderRadius: '50%',
        background: 'radial-gradient(circle, #E6007A, #E6007A66)',
        boxShadow: '0 0 12px rgba(230,0,122,0.4)',
        position: 'absolute',
      }} />
      {/* Orbits */}
      {[22, 36, 50].map((r, i) => (
        <div key={i} style={{
          width: r * 2, height: r * 2, borderRadius: '50%',
          border: '1px dashed rgba(255,255,255,0.06)',
          position: 'absolute',
        }} />
      ))}
      {/* Planets */}
      {[
        { x: 0, y: -22, color: '#E6007A', size: 6 },
        { x: 30, y: 15, color: '#00D395', size: 5 },
        { x: -36, y: 5, color: '#9945FF', size: 5 },
        { x: 15, y: -42, color: '#4DA2FF', size: 4 },
        { x: -20, y: 40, color: '#FF6B6B', size: 4 },
        { x: 45, y: -10, color: '#7B61FF', size: 4 },
        { x: -10, y: -50, color: '#F59E0B', size: 4 },
      ].map((p, i) => (
        <div key={i} style={{
          width: p.size, height: p.size, borderRadius: '50%',
          background: p.color, position: 'absolute',
          transform: `translate(${p.x}px, ${p.y}px)`,
          boxShadow: `0 0 6px ${p.color}66`,
        }} />
      ))}
    </div>
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

function PortfolioPreview() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0.5rem 0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#C0182A', boxShadow: '0 0 6px rgba(192,24,42,0.5)' }} />
        <span style={{ fontSize: '0.42rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(192,24,42,0.8)' }}>Web3 Developer</span>
      </div>
      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '0.2rem' }}>
        Anyadike<br /><span style={{ WebkitTextStroke: '0.5px rgba(192,24,42,0.7)', color: 'transparent' }}>Divine</span><span style={{ color: '#C0182A' }}>.</span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {['25+', '7', '4+'].map((n) => (
          <span key={n} style={{ fontSize: '0.55rem', fontWeight: 800, color: 'rgba(192,24,42,0.7)' }}>{n}</span>
        ))}
      </div>
    </div>
  );
}

const previews: Record<ViewId, React.ComponentType> = {
  vc: VCPreview,
  cto: CTOPreview,
  client: ClientPreview,
  ambassador: AmbassadorPreview,
  event: EventPreview,
  portfolio: PortfolioPreview,
};

/* ── Main Component ──────────────────────────────────────────────────────── */

export default function IdentitySelector({ onSelect }: Props) {
  return (
    <div className="selector">
      <div className="selector__header">
        <p className="selector__label">Adaptive Portfolio System</p>
        <h1 className="selector__name">ANYADIKE DIVINE</h1>
        <p className="selector__tagline">
          {PROFILE.role} · Nigeria
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
