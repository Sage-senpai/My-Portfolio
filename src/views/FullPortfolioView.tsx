// ============================================================================
// FILE: src/views/FullPortfolioView.tsx
// DESCRIPTION: Recruiter / General — full scrollable portfolio page
// ============================================================================

import { useState, useEffect, useRef } from 'react';
import {
  PROJECTS, EVENTS, SKILLS, CONTENT_PIECES, OSS_CONTRIBUTIONS,
  EXPERIENCES, SKILL_CATEGORIES, PROFILE,
} from '../data/portfolio';
import BackButton from '../components/BackButton';
import '../styles/views/_fullportfolio.scss';

interface Props { onBack: () => void; }

/* ── Utility: FadeIn on scroll ───────────────────────────────────────────── */

function FadeIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Particle Canvas ─────────────────────────────────────────────────────── */

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(155,93,229,0.7)';
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(155,93,229,${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="fp__hero-canvas" />;
}

/* ── Section Label ───────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="fp__section-label">
      <div className="fp__section-label-line" />
      <span>{children}</span>
    </div>
  );
}

/* ── Nav ─────────────────────────────────────────────────────────────────── */

const SECTIONS = ['about', 'skills', 'experience', 'projects', 'content', 'contact'];

function NavBar({ onBack, activeNav }: { onBack: () => void; activeNav: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`fp__nav ${scrolled ? 'fp__nav--scrolled' : ''}`}>
        <div className="fp__nav-brand" onClick={() => scrollTo('fp-hero')}>
          <div className="fp__nav-avatar">
            <img src={PROFILE.profileImage} alt={PROFILE.name} />
          </div>
          <span className="fp__nav-name">AD<span className="fp__nav-dot">.</span></span>
        </div>

        <div className="fp__nav-links">
          {SECTIONS.map((s) => (
            <button
              key={s}
              className={`fp__nav-link ${activeNav === s ? 'fp__nav-link--active' : ''}`}
              onClick={() => scrollTo(s)}
            >
              {s}
            </button>
          ))}
          <BackButton onBack={onBack} />
        </div>

        <button
          className={`fp__hamburger ${menuOpen ? 'fp__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="fp__mobile-menu">
          {SECTIONS.map((s) => (
            <button
              key={s}
              className={`fp__mobile-nav-btn ${activeNav === s ? 'fp__mobile-nav-btn--active' : ''}`}
              onClick={() => scrollTo(s)}
            >
              {s}
            </button>
          ))}
          <div style={{ marginTop: '1rem' }}>
            <BackButton onBack={onBack} />
          </div>
        </div>
      )}
    </>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────── */

const liveCount = PROJECTS.filter((p) => p.status === 'LIVE').length;
const ecoCount = [...new Set(PROJECTS.map((p) => p.ecosystem))].filter((e) => e !== 'web2').length;
const featuredProjects = PROJECTS.filter((p) => p.liveUrl !== '#').slice(0, 8);

export default function FullPortfolioView({ onBack }: Props) {
  const [activeNav, setActiveNav] = useState('');
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      let current = '';
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      });
      setActiveNav(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fp">
      <NavBar onBack={onBack} activeNav={activeNav} />

      {/* ═══ HERO ═══ */}
      <div className="fp__hero" id="fp-hero">
        <HeroCanvas />
        <div className="fp__hero-grid" />
        <div className="fp__hero-glow" />

        <div className="fp__hero-content">
          <div className="fp__hero-left">
            <div className="fp__hero-badge fp__hero-anim fp__hero-anim--1">
              <div className="fp__hero-badge-dot" />
              <span>Web3 Developer · Smart Contract Engineer · Community Manager</span>
            </div>

            <h1 className="fp__hero-h1 fp__hero-anim fp__hero-anim--2">
              Anyadike<br />
              <span className="fp__hero-h1-outline">Divine</span>
              <span className="fp__hero-h1-dot">.</span>
            </h1>

            <p className="fp__hero-desc fp__hero-anim fp__hero-anim--3">
              {PROFILE.bio}
            </p>

            <div className="fp__hero-stats fp__hero-anim fp__hero-anim--3">
              {[
                [String(PROJECTS.length), 'Projects\nShipped'],
                [String(ecoCount), 'Blockchain\nEcosystems'],
                ['4+', 'Years\nBuilding'],
              ].map(([num, label]) => (
                <div key={num} className="fp__hero-stat">
                  <span className="fp__hero-stat-num">{num}</span>
                  <span className="fp__hero-stat-label">{label}</span>
                </div>
              ))}
            </div>

            <div className="fp__hero-anim fp__hero-anim--4" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button className="fp__btn fp__btn--primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                View Work
              </button>
              <button className="fp__btn fp__btn--secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Let's Collaborate
              </button>
            </div>
          </div>

          <div className="fp__hero-img-wrap fp__hero-anim fp__hero-anim--2">
            <div className="fp__hero-img-glow" />
            <div className="fp__hero-img-border" />
            <img src={PROFILE.profileImage} alt={PROFILE.name} className="fp__hero-img" />
          </div>
        </div>

        <div className="fp__hero-scroll-hint">
          <div className="fp__hero-scroll-line" />
          <span>scroll</span>
        </div>
      </div>

      {/* ═══ ABOUT ═══ */}
      <div className="fp__section-divider">
        <section id="about" className="fp__section">
          <FadeIn><SectionLabel>About</SectionLabel></FadeIn>
          <FadeIn>
            <h2 className="fp__section-title">
              I don't just write code.<br />
              <span className="fp__accent">I ship products & build communities.</span>
            </h2>
          </FadeIn>
          <div className="fp__about-grid">
            <FadeIn delay={0.1}>
              <div className="fp__about-text">
                {PROFILE.aboutParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="fp__about-pillars">
                {[
                  ['Frontend', 'React · TypeScript · Vite'],
                  ['Smart Contracts', 'Substrate · Solidity · Move'],
                  ['Community', 'Workshops · Events · Content'],
                  ['Ecosystems', 'Polkadot · 0G · Sui · Stellar'],
                ].map(([title, sub]) => (
                  <div key={title} className="fp__about-pillar">
                    <div className="fp__about-pillar-title">{title}</div>
                    <div className="fp__about-pillar-sub">{sub}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      </div>

      {/* ═══ SKILLS ═══ */}
      <div className="fp__section-divider fp__section-divider--alt">
        <section id="skills" className="fp__section">
          <FadeIn><SectionLabel>Expertise</SectionLabel></FadeIn>
          <FadeIn>
            <h2 className="fp__section-title">What I Bring</h2>
          </FadeIn>
          <div className="fp__skills-grid">
            {SKILL_CATEGORIES.map((cat, i) => (
              <FadeIn key={cat.category} delay={i * 0.07}>
                <div className="fp__skill-card">
                  <div className="fp__skill-card-header">
                    <div className="fp__skill-card-accent" />
                    <span>{cat.category}</span>
                  </div>
                  <div className="fp__skill-pills">
                    {cat.items.map((item) => (
                      <span key={item.name} className={`fp__skill-pill fp__skill-pill--${item.tier}`}>
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>

      {/* ═══ EXPERIENCE ═══ */}
      <div className="fp__section-divider">
        <section id="experience" className="fp__section">
          <FadeIn><SectionLabel>Experience</SectionLabel></FadeIn>
          <FadeIn>
            <h2 className="fp__section-title">Roles & Impact</h2>
          </FadeIn>
          <div className="fp__exp-grid">
            {EXPERIENCES.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="fp__exp-card">
                  <div className="fp__exp-card-top">
                    <span className="fp__exp-org">{exp.org}</span>
                    {exp.type && <span className="fp__exp-type">{exp.type}</span>}
                    <span className="fp__exp-duration">{exp.duration}</span>
                  </div>
                  <h3 className="fp__exp-role">{exp.role}</h3>
                  <p className="fp__exp-impact">{exp.impact}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>

      {/* ═══ PROJECTS ═══ */}
      <div className="fp__section-divider fp__section-divider--alt">
        <section id="projects" className="fp__section">
          <FadeIn><SectionLabel>Projects</SectionLabel></FadeIn>
          <FadeIn>
            <h2 className="fp__section-title">Selected Work</h2>
          </FadeIn>
          <div className="fp__proj-grid">
            {featuredProjects.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08}>
                <div
                  className="fp__proj-card"
                  onClick={() => window.open(p.liveUrl, '_blank', 'noopener noreferrer')}
                >
                  <div className="fp__proj-thumb">
                    <span className="fp__proj-thumb-tag">{p.chain} · {p.type}</span>
                  </div>
                  <div className="fp__proj-body">
                    <h3 className="fp__proj-name">{p.name}</h3>
                    <p className="fp__proj-desc">{p.description}</p>
                    <div className="fp__proj-footer">
                      <div className="fp__proj-tech-row">
                        {p.tech.slice(0, 3).map((t) => (
                          <span key={t} className="fp__proj-tech">{t}</span>
                        ))}
                      </div>
                      <div className="fp__proj-links-row">
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          GitHub ↗
                        </a>
                        {p.liveUrl !== '#' && <span>Live ↗</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* OSS */}
          <FadeIn delay={0.3}>
            <div className="fp__oss-section">
              <h3 className="fp__oss-title">Open Source Contributions</h3>
              <div className="fp__oss-grid">
                {OSS_CONTRIBUTIONS.map((c) => (
                  <a key={c.project} href={c.url} target="_blank" rel="noopener noreferrer" className="fp__oss-card">
                    <span className="fp__oss-name">{c.project}</span>
                    <span className="fp__oss-desc">{c.description}</span>
                    <span className="fp__oss-link">View Fork ↗</span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="fp__section-divider">
        <section id="content" className="fp__section">
          <FadeIn><SectionLabel>Content</SectionLabel></FadeIn>
          <FadeIn>
            <h2 className="fp__section-title">Published Work</h2>
          </FadeIn>
          <div className="fp__content-grid">
            {CONTENT_PIECES.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.08}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="fp__content-card">
                  <div className="fp__content-card-top">
                    <span className="fp__content-type">{c.type}</span>
                    <span className="fp__content-platform">{c.platform}</span>
                  </div>
                  <h3 className="fp__content-title">{c.title}</h3>
                  <span className="fp__content-impressions">{c.impressions.toLocaleString()} impressions</span>
                </a>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>

      {/* ═══ CONTACT ═══ */}
      <div className="fp__section-divider fp__section-divider--alt">
        <section id="contact" className="fp__section">
          <FadeIn>
            <div className="fp__contact-center">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="fp__section-title fp__contact-title">
                Ready to build<br /><span className="fp__accent">something together?</span>
              </h2>
              <p className="fp__contact-desc">
                Whether you need a frontend engineer, a smart contract developer, a community manager,
                or all three — let's talk.
              </p>

              <button
                className="fp__contact-toggle"
                onClick={() => setContactOpen((v) => !v)}
                style={{
                  background: contactOpen ? '#9B5DE5' : 'transparent',
                  borderColor: contactOpen ? '#9B5DE5' : 'rgba(255,255,255,0.15)',
                  color: contactOpen ? '#fff' : '#888',
                }}
              >
                {contactOpen ? '×' : '✉'}
              </button>

              {contactOpen && (
                <div className="fp__contact-links">
                  {[
                    { label: 'Email', handle: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: '✉' },
                    { label: 'Twitter / X', handle: `@${PROFILE.twitter}`, href: `https://x.com/${PROFILE.twitter}`, icon: '𝕏' },
                    { label: 'GitHub', handle: PROFILE.github, href: `https://github.com/${PROFILE.github}`, icon: '⌥' },
                    { label: 'LinkedIn', handle: PROFILE.linkedin, href: `https://linkedin.com/in/${PROFILE.linkedin}`, icon: 'in' },
                  ].map((c) => (
                    <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="fp__contact-link">
                      <div className="fp__contact-icon">{c.icon}</div>
                      <div className="fp__contact-info">
                        <div className="fp__contact-label">{c.label}</div>
                        <div className="fp__contact-handle">{c.handle}</div>
                      </div>
                      <span className="fp__contact-arrow">→</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        </section>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="fp__footer">
        <div className="fp__footer-inner">
          <div className="fp__footer-left">
            <span className="fp__footer-brand">AD<span className="fp__accent">.</span></span>
            <span className="fp__footer-tagline">Web3 Developer · Smart Contract Engineer · Community Manager</span>
          </div>
          <div className="fp__footer-links">
            {[
              { label: 'GitHub', href: `https://github.com/${PROFILE.github}` },
              { label: 'Twitter/X', href: `https://x.com/${PROFILE.twitter}` },
              { label: 'LinkedIn', href: `https://linkedin.com/in/${PROFILE.linkedin}` },
              { label: 'Email', href: `mailto:${PROFILE.email}` },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
            ))}
          </div>
        </div>
        <div className="fp__footer-copy">
          © {new Date().getFullYear()} Anyadike Divine — Built with React, TypeScript, and too much coffee.
        </div>
      </footer>
    </div>
  );
}
