// ============================================================================
// FILE: src/views/BentoLandingView.tsx
// DESCRIPTION: Bento-grid landing page, the default homepage.
// "Back to adaptive portfolio" drops into the original multi-persona
// selector (VC, CTO, Client, Ambassador, Event, Full Portfolio) for anyone
// who wants that view instead.
// ============================================================================

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiDownload, FiGithub, FiExternalLink } from 'react-icons/fi';
import { SiGithub, SiX, SiLinkedin } from 'react-icons/si';
import {
  PROFILE, PROJECTS, EVENTS, EXPERIENCES, ECOSYSTEMS,
  SKILL_CATEGORIES, OSS_CONTRIBUTIONS, CONTENT_PIECES,
} from '../data/portfolio';
import AmbassadorView from './AmbassadorView';
import EventView from './EventView';
import { AmbassadorPreview, EventPreview } from './IdentitySelector';
import '../styles/views/_bentolanding.scss';

const CV_HREF = '/Anyadike_Divine_CV.pdf';

const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'projects', label: 'Projects' },
  { id: 'oss', label: 'Open Source' },
  { id: 'writing', label: 'Writing' },
  { id: 'explore', label: 'Explore' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const onScroll = () => {
      let current = '';
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);
  return active;
}

function BentoNav({ onExit }: { onExit: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(NAV_SECTIONS.map((s) => s.id));

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <div className="bento__nav-fixed">
        <div className="bento__nav">
          <span
            className="bento__wordmark"
            role="button"
            tabIndex={0}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            AD.
          </span>

          <div className="bento__nav-links">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`bento__nav-link ${active === s.id ? 'bento__nav-link--active' : ''}`}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="bento__nav-actions">
            <a className="bento__nav-cv" href={CV_HREF} download>
              <FiDownload /> Download CV
            </a>
            <button className="bento__exit" onClick={onExit}>← Back to adaptive portfolio</button>
          </div>

          <button
            className={`bento__hamburger ${menuOpen ? 'bento__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="bento__mobile-menu">
          {NAV_SECTIONS.map((s) => (
            <button key={s.id} className="bento__mobile-nav-btn" onClick={() => scrollTo(s.id)}>
              {s.label}
            </button>
          ))}
          <a className="bento__nav-cv bento__nav-cv--mobile" href={CV_HREF} download>
            <FiDownload /> Download CV
          </a>
          <button className="bento__exit" onClick={onExit} style={{ marginTop: '0.5rem' }}>
            ← Back to adaptive portfolio
          </button>
        </div>
      )}
    </>
  );
}

interface Props {
  onExit: () => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
};

function stagger(i: number) {
  return { ...fadeUp, transition: { ...fadeUp.transition, delay: i * 0.06 } };
}

/* ── Featured speaking events (curated, real data) ───────────────────────── */
const FEATURED_EVENTS = EVENTS.filter((e) => e.image).slice(0, 8);

/* ── Featured projects (curated mix of sizes) ────────────────────────────── */
const WIDE_PROJECT_IDS = ['dotique', 'client-demo'];
const NARROW_PROJECT_IDS = ['lorelich', 'orbyt', 'learning-space', 'kotlead-academy', 'mancave', 'theupherroom'];
const featuredProjects = [
  ...WIDE_PROJECT_IDS.map((id) => ({ id, wide: true })),
  ...NARROW_PROJECT_IDS.map((id) => ({ id, wide: false })),
]
  .map(({ id, wide }) => {
    const p = PROJECTS.find((proj) => proj.id === id);
    return p ? { ...p, wide } : null;
  })
  .filter(Boolean) as (typeof PROJECTS[number] & { wide: boolean })[];

const GALLERY_IMAGES = [
  '/workshop.jpg', '/nivida-workshop.jpg', '/bitcoin-pizza-day.jpg',
  '/smart-irigation-system.jpg', '/sui-meetup.jpg', '/road-2-sub0.jpg',
  '/polkadot-dev.jpg', '/devpack-hackathon.png', '/boundless-hackathon.png', '/0G-onboarding.jpg',
];

export default function BentoLandingView({ onExit }: Props) {
  const [subView, setSubView] = useState<'ambassador' | 'event' | null>(null);

  if (subView === 'ambassador') return <AmbassadorView onBack={() => setSubView(null)} />;
  if (subView === 'event') return <EventView onBack={() => setSubView(null)} />;

  return (
    <div className="bento">
      {/* ── Sticky nav ──────────────────────────────────────────────────── */}
      <BentoNav onExit={onExit} />

      {/* ── HERO BENTO ──────────────────────────────────────────────────── */}
      <section className="bento__hero">
        <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8b5cf6' }}>
          Anyadike Divine · Full-Stack Engineer · Web3 Builder
        </p>
        <h1 className="bento__title">Portfolio</h1>

        <div className="bento__grid">
          {/* About card */}
          <motion.div className="bento__card bento__about" {...fadeUp}>
            <span className="bento__about-badge">★ About Me</span>
            <div className="bento__portrait-wrap" style={{ alignSelf: 'flex-start' }}>
              <img src={PROFILE.profileImage} alt={PROFILE.name} className="bento__portrait" />
            </div>
            <div>
              <div className="bento__about-name">I&apos;m,<br />Anyadike Divine</div>
              <span className="bento__about-tag">Full-Stack Engineer · Web3 Builder</span>
              <br />
              <a className="bento__about-email" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </div>
            <span className="bento__side-labels">Speaking · Projects · Community · Contact</span>
          </motion.div>

          {/* Featured card */}
          <motion.div
            className="bento__card bento__featured"
            style={{ backgroundImage: "url('/avalanche-team1-speaker.png')" }}
            {...stagger(1)}
          >
            <span className="bento__arrow">↗</span>
            <div className="bento__featured-overlay">
              <div className="bento__featured-label">On Stage</div>
              <div className="bento__featured-title">Speaking at Avalanche Team1, BlockHive UNN</div>
            </div>
          </motion.div>

          {/* Stats split card */}
          <motion.div className="bento__card bento__stats" {...stagger(2)}>
            <div className="bento__stats-half bento__stats-half--mint">
              <div className="bento__stats-num">27+</div>
              <div className="bento__stats-label">Projects Shipped</div>
            </div>
            <div className="bento__stats-half bento__stats-half--purple">
              <div className="bento__stats-num">7</div>
              <div className="bento__stats-label">Blockchain Ecosystems</div>
            </div>
          </motion.div>

          {/* Ecosystems card */}
          <motion.div className="bento__card bento__eco" {...stagger(3)}>
            <span className="bento__eco-label">Ecosystems</span>
            <div className="bento__eco-logos">
              {ECOSYSTEMS.map((eco) => (
                <div key={eco.id} className="bento__eco-chip" title={eco.name}>
                  <img src={eco.logo} alt={eco.name} className="bento__eco-logo" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Award card */}
          <motion.div className="bento__card bento__award" {...stagger(4)}>
            <div className="bento__award-left">🏆</div>
            <div className="bento__award-right">
              <div className="bento__award-num">2×</div>
              <div className="bento__award-label">Polkadot Sub0 Hackathon Winner</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT NARRATIVE ─────────────────────────────────────────────── */}
      <section className="bento__section" id="about">
        <div className="bento__section-head">
          <h2 className="bento__section-title bento__display">About</h2>
        </div>
        <div className="bento__about-narrative">
          <div className="bento__narrative-text">
            {PROFILE.aboutParagraphs.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <div className="bento__timeline">
            {EXPERIENCES.slice(0, 5).map((exp, i) => (
              <div key={i} className="bento__timeline-item">
                <div className="bento__timeline-role">{exp.role}</div>
                <div className="bento__timeline-org">{exp.org}</div>
                <div className="bento__timeline-duration">{exp.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────────────── */}
      <section className="bento__section" id="skills">
        <div className="bento__section-head">
          <h2 className="bento__section-title bento__display">Skills</h2>
          <p className="bento__section-sub">What I actually reach for, day to day.</p>
        </div>
        <div className="bento__skills-grid">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div key={cat.category} className="bento__skill-card" {...stagger(i)}>
              <div className="bento__skill-card-title">{cat.category}</div>
              <div className="bento__skill-pills">
                {cat.items.map((item) => (
                  <span key={item.name} className={`bento__skill-pill bento__skill-pill--${item.tier}`}>
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SPEAKING & COMMUNITY ────────────────────────────────────────── */}
      <section className="bento__section" id="speaking">
        <div className="bento__section-head">
          <h2 className="bento__section-title bento__display">Speaking &amp; Community</h2>
          <p className="bento__section-sub">Workshops, hackathons, and meetups led or organized across Nigeria and beyond.</p>
        </div>
        <div className="bento__speak-grid">
          {FEATURED_EVENTS.map((ev, i) => (
            <motion.div
              key={ev.name}
              className="bento__speak-card"
              style={{ backgroundImage: `url('${ev.image}')` }}
              {...stagger(i)}
            >
              <span className="bento__speak-year">{ev.year}</span>
              <div>
                <div className="bento__speak-name">{ev.name}</div>
                <div className="bento__speak-role">{ev.role}</div>
                {ev.attendees > 0 && (
                  <div className="bento__speak-attendees">{ev.attendees.toLocaleString()}+ attendees</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────── */}
      <section className="bento__section" id="projects">
        <div className="bento__section-head">
          <h2 className="bento__section-title bento__display">Projects</h2>
          <p className="bento__section-sub">A slice of {PROJECTS.length}+ shipped builds across Web3 and Web2.</p>
        </div>
        <div className="bento__proj-grid">
          {featuredProjects.map((p, i) => (
            <motion.div
              key={p.id}
              className={`bento__proj-card ${p.wide ? 'bento__proj-card--wide' : 'bento__proj-card--narrow'}`}
              {...stagger(i)}
            >
              <div>
                <span className={`bento__proj-status bento__proj-status--${p.status === 'LIVE' ? 'live' : 'wip'}`}>
                  {p.status}
                </span>
                <div className="bento__proj-name">{p.name}</div>
                <div className="bento__proj-impact">{p.impact}</div>
              </div>
              <div className="bento__proj-tags">
                {p.tech.slice(0, 4).map((t) => <span key={t} className="bento__proj-tag">{t}</span>)}
              </div>
              {(p.liveUrl !== '#' || p.githubUrl !== '#') && (
                <div className="bento__proj-links">
                  {p.liveUrl !== '#' && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      <FiExternalLink /> Live
                    </a>
                  )}
                  {p.githubUrl !== '#' && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      <FiGithub /> Code
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── OPEN SOURCE ─────────────────────────────────────────────────── */}
      <section className="bento__section" id="oss">
        <div className="bento__section-head">
          <h2 className="bento__section-title bento__display">Open Source</h2>
        </div>
        <div className="bento__oss-grid">
          {OSS_CONTRIBUTIONS.map((c, i) => (
            <motion.a
              key={c.project}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="bento__oss-card"
              {...stagger(i)}
            >
              <div className="bento__oss-name">{c.project}</div>
              <div className="bento__oss-desc">{c.description}</div>
              <div className="bento__oss-link">View fork ↗</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── WRITING ─────────────────────────────────────────────────────── */}
      <section className="bento__section" id="writing">
        <div className="bento__section-head">
          <h2 className="bento__section-title bento__display">Writing</h2>
          <p className="bento__section-sub">Threads and posts people actually read.</p>
        </div>
        <div className="bento__writing-grid">
          {CONTENT_PIECES.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="bento__writing-card"
              {...stagger(i)}
            >
              <div className="bento__writing-top">
                <span className="bento__writing-type">{c.type}</span>
                <span className="bento__writing-platform">{c.platform}</span>
              </div>
              <div className="bento__writing-title">{c.title}</div>
              <div className="bento__writing-impressions">{c.impressions.toLocaleString()} impressions</div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── EXPLORE MORE (Ecosystem Explorer + Conference Badge portals) ─── */}
      <section className="bento__section" id="explore">
        <div className="bento__section-head">
          <h2 className="bento__section-title bento__display">More Ways to Look</h2>
          <p className="bento__section-sub">Two interactive views from the original adaptive portfolio, still here.</p>
        </div>
        <div className="bento__portal-grid">
          <motion.div
            className="bento__portal-card bento__portal-card--dark"
            role="button"
            tabIndex={0}
            onClick={() => setSubView('ambassador')}
            onKeyDown={(e) => { if (e.key === 'Enter') setSubView('ambassador'); }}
            {...fadeUp}
          >
            <div className="bento__portal-preview">
              <AmbassadorPreview />
            </div>
            <div className="bento__portal-body">
              <div className="bento__portal-label">Ecosystem Explorer</div>
              <div className="bento__portal-desc">A solar system where every planet is a blockchain ecosystem. Tap in and look around.</div>
            </div>
            <span className="bento__arrow" style={{ position: 'static' }}>↗</span>
          </motion.div>

          <motion.div
            className="bento__portal-card bento__portal-card--dark"
            role="button"
            tabIndex={0}
            onClick={() => setSubView('event')}
            onKeyDown={(e) => { if (e.key === 'Enter') setSubView('event'); }}
            {...stagger(1)}
          >
            <div className="bento__portal-preview">
              <EventPreview />
            </div>
            <div className="bento__portal-body">
              <div className="bento__portal-label">Conference Badge</div>
              <div className="bento__portal-desc">A tilt-responsive holographic ID card. Flip it, download it, print it.</div>
            </div>
            <span className="bento__arrow" style={{ position: 'static' }}>↗</span>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────────────── */}
      <section className="bento__section" id="gallery">
        <div className="bento__section-head">
          <h2 className="bento__section-title bento__display">Gallery</h2>
        </div>
        <div className="bento__gallery">
          {GALLERY_IMAGES.map((src) => (
            <img key={src} src={src} alt="" className="bento__gallery-img" loading="lazy" />
          ))}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section className="bento__section" id="contact">
        <div className="bento__section-head">
          <h2 className="bento__section-title bento__display">Contact</h2>
        </div>
        <div className="bento__contact-grid">
          <a
            className="bento__contact-card"
            style={{ background: 'var(--mint)' }}
            href={`mailto:${PROFILE.email}`}
          >
            <span className="bento__contact-icon"><FiMail /></span>
            <div>
              <div className="bento__contact-label">Email</div>
              <div className="bento__contact-handle">{PROFILE.email}</div>
            </div>
          </a>
          <a
            className="bento__contact-card"
            style={{ background: 'var(--bg-card-dark)', color: '#fff' }}
            href={`https://github.com/${PROFILE.github}`}
            target="_blank" rel="noreferrer"
          >
            <span className="bento__contact-icon"><SiGithub /></span>
            <div>
              <div className="bento__contact-label">GitHub</div>
              <div className="bento__contact-handle">@{PROFILE.github}</div>
            </div>
          </a>
          <a
            className="bento__contact-card"
            style={{ background: 'var(--purple-light)' }}
            href={`https://x.com/${PROFILE.twitter}`}
            target="_blank" rel="noreferrer"
          >
            <span className="bento__contact-icon"><SiX /></span>
            <div>
              <div className="bento__contact-label">Twitter / X</div>
              <div className="bento__contact-handle">@{PROFILE.twitter}</div>
            </div>
          </a>
          <a
            className="bento__contact-card"
            style={{ background: 'var(--yellow)' }}
            href={`https://linkedin.com/in/${PROFILE.linkedin}`}
            target="_blank" rel="noreferrer"
          >
            <span className="bento__contact-icon"><SiLinkedin /></span>
            <div>
              <div className="bento__contact-label">LinkedIn</div>
              <div className="bento__contact-handle">{PROFILE.linkedin}</div>
            </div>
          </a>
        </div>
      </section>

      <div className="bento__footer">
        Bento redesign preview, Anyadike Divine © {new Date().getFullYear()}
      </div>
    </div>
  );
}
