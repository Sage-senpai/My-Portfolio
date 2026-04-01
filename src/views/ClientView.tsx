// ============================================================================
// FILE: src/views/ClientView.tsx
// DESCRIPTION: Client / Startup — NASA Mission Control dashboard
// ============================================================================

import { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { PROJECTS, EVENTS, SKILLS } from '../data/portfolio';
import BackButton from '../components/BackButton';
import '../styles/views/_client.scss';

interface Props {
  onBack: () => void;
}

const SKILLS_DATA = Object.entries(SKILLS).map(([subject, value]) => ({ subject, value }));

const TICKER_ITEMS = [
  { text: 'DEPLOYMENTS: 10 LIVE', cyan: true },
  { text: 'ECOSYSTEMS: 7 ACTIVE', cyan: false },
  { text: 'REACH: 50K+', cyan: true },
  { text: 'POW: 9,847', cyan: false },
  { text: 'UPTIME: 4 YEARS', cyan: true },
  { text: 'STATUS: AVAILABLE', cyan: false },
  { text: 'LOCATION: NSUKKA, NIGERIA', cyan: true },
];

const TIMELINE_COLORS = ['#00D4FF', '#9B5DE5', '#E6007A', '#00D395', '#F59E0B', '#FF6B6B', '#60A5FA'];

export default function ClientView({ onBack }: Props) {
  const [clock, setClock] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-GB', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const timelineEntries = [
    ...EVENTS.map((e) => ({ year: e.year, text: e.name, sub: e.role })),
  ].sort((a, b) => b.year - a.year);

  return (
    <div className="client">
      {/* Top bar */}
      <div className="client__topbar">
        <div className="client__topbar-left">
          <div className="client__led" />
          <span className="client__topbar-title">DIVINE COMMAND — OPERATIONS CENTER</span>
        </div>
        <div className="client__topbar-right">
          <span className="client__clock">{clock}</span>
          <BackButton onBack={onBack} />
        </div>
      </div>

      {/* Ticker */}
      <div className="client__ticker">
        <div className="client__ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className={`client__ticker-item ${item.cyan ? 'client__ticker-item--cyan' : 'client__ticker-item--muted'}`}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Panel grid */}
      <div className="client__grid">
        {/* Panel 1 — Active Deployments */}
        <div className="client__panel client__panel--wide">
          <div className="client__panel-title">◉ Active Deployments</div>
          <div className="client__deploy-grid">
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className="client__deploy-card"
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <div className="client__mission-code">
                  MISSION-{p.chain.slice(0, 3).toUpperCase()}-{String(i + 1).padStart(3, '0')}
                </div>
                <div className="client__deploy-name">
                  {p.name}
                  {p.status === 'LIVE' && <span className="client__live-dot" />}
                </div>
                <span className="client__deploy-chain">{p.chain}</span>
                <div className="client__progress-bar">
                  <div
                    className="client__progress-bar-fill"
                    style={{ width: p.status === 'LIVE' ? '100%' : '65%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2 — System Diagnostics */}
        <div className="client__panel" style={{ animationDelay: '0.2s' }}>
          <div className="client__panel-title">◈ System Diagnostics</div>
          <div className="client__radar-wrap">
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={SKILLS_DATA}>
                <PolarGrid stroke="rgba(0,212,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
                <Radar
                  dataKey="value"
                  stroke="#00D4FF"
                  fill="#00D4FF"
                  fillOpacity={0.12}
                  strokeWidth={1.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="client__metrics">
            {[
              { value: '10', label: 'Projects' },
              { value: '12', label: 'Events' },
              { value: '7', label: 'Chains' },
              { value: '50K+', label: 'Reach' },
            ].map((m) => (
              <div key={m.label} className="client__metric-box">
                <div className="client__metric-value">{m.value}</div>
                <div className="client__metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3 — Mission Log */}
        <div className="client__panel" style={{ animationDelay: '0.3s' }}>
          <div className="client__panel-title">◈ Mission Log</div>
          <div className="client__timeline">
            {timelineEntries.map((entry, i) => (
              <div
                key={i}
                className="client__timeline-entry"
                style={{ animationDelay: `${0.06 * i}s` }}
              >
                <span className="client__timeline-year">{entry.year}</span>
                <span
                  className="client__timeline-bar"
                  style={{ background: TIMELINE_COLORS[i % TIMELINE_COLORS.length] }}
                />
                <span className="client__timeline-text">
                  {entry.text} <span>· {entry.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 4 — Comms Channel */}
        <div className="client__panel" style={{ animationDelay: '0.4s' }}>
          <div className="client__panel-title">◈ Comms Channel</div>
          <div className="client__contact-rows">
            {[
              { label: 'EMAIL', value: 'anyadikedivine@gmail.com', href: 'mailto:anyadikedivine@gmail.com' },
              { label: 'TWITTER', value: '@anaborejustin', href: 'https://twitter.com/anaborejustin' },
              { label: 'GITHUB', value: 'Sage-senpai', href: 'https://github.com/Sage-senpai' },
              { label: 'LINKEDIN', value: 'anyadikedivine', href: 'https://linkedin.com/in/anyadikedivine' },
            ].map((c) => (
              <div key={c.label} className="client__contact-row">
                <span className="client__contact-label">{c.label}</span>
                <span className="client__contact-value">{c.value}</span>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="client__contact-link">↗</a>
              </div>
            ))}
          </div>
          <div className="client__comms-area">
            <div className="client__comms-label">State your mission parameters:</div>
            <textarea
              className="client__comms-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your project requirements..."
            />
            <button
              className="client__transmit-btn"
              onClick={() => {
                window.location.href = `mailto:anyadikedivine@gmail.com?subject=Mission Request&body=${encodeURIComponent(message)}`;
              }}
            >
              TRANSMIT REQUEST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
