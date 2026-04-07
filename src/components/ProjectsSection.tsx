// ============================================================================
// FILE: src/components/ProjectsSection.tsx
// DESCRIPTION: Collapsible project categories with particle hover effects
//
// HOW TO ADD LINKS:
//   Each project has two link fields:
//     githubUrl — GitHub repository (already filled)
//     liveUrl   — Live deployed site  ← FILL THESE IN (marked with TODO below)
//
//   In the card UI, the "Live Demo" button only renders when liveUrl is set.
//   Set liveUrl: 'https://your-live-site.com' in the relevant project object.
// ============================================================================

import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import { FaChevronDown, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../styles/components/Projects.scss';

// ── Types ────────────────────────────────────────────────────────────────────
interface Project {
  title: string;
  description: string;
  tech?: string[];

  // ── Dev projects (Web Applications & DApps) ──
  githubUrl?: string;   // GitHub repo URL
  liveUrl?: string;     // Live deployed URL  ← fill these in with TODO comments below

  // ── Writing / content projects ──
  // articleUrl replaces githubUrl/liveUrl for docs and content items.
  // The card renders a single CTA button instead of GitHub/Live Demo.
  articleUrl?: string;  // Direct link to the article, thread, or recording
  ctaLabel?: string;    // Button label, e.g. 'Read Thread', 'Listen Now', 'View Series'

  type?: string;
  category?: string;
  platform?: string;
  engagement?: string;
}

// ── Web Applications & DApps ─────────────────────────────────────────────────
const WEB_APPS: Project[] = [
  {
    title: 'DOTique dApp',
    description: 'Decentralized marketplace on the Polkadot blockchain with NFT integration from Unique network and on-chain asset management.',
    tech: ['PAPI', 'React', 'Web3'],
    githubUrl: 'https://github.com/sage-senpai/DOTique',
    liveUrl: "https://dot-ique.vercel.app", // TODO: Add live URL → e.g. 'https://dotique.vercel.app'
    type: 'DApp',
  },
  {
    title: 'DotVest dApp',
    description: 'Decentralized Finance platform for staking and yield farming built on Polkadot infrastructure.',
    tech: ['PAPI', 'React', 'Web3'],
    githubUrl: 'https://github.com/sage-senpai/DOT-VEST',
    liveUrl: 'https://dot-vest.vercel.app', // TODO: Add live URL → e.g. 'https://dotvest.vercel.app'
    type: 'DApp',
  },
  {
    title: 'SafePing',
    description: 'SafePing – Private Family Check-In BeaconCore idea: One-tap “I’m safe” ping to selected family/contacts with optional GPS snapshot. Pings are signed on-chain for immutable proof; missed daily check-ins trigger auto-alerts to group.',
    tech: ['PAPI', 'Next.js', 'Web3'],
    githubUrl: 'https://github.com/sage-senpai/SafePing',
    liveUrl: undefined, // TODO: Add live URL → e.g. 'https://dotway.vercel.app'
    type: 'DApp',
  },
  {
    title: 'Man-Cave',
    description: 'A gamified Web3 onboarding and ecosystem operations platform built for the Mandala Chain (Polkadot parachain). Mancave guides users through their Web3 journey with quests, rewards, and community features while providing administrators with powerful tools to manage the ecosystem',
    tech: ['Next.js', 'Mandala Chain', 'Typescript', 'Gamified'],
    githubUrl: 'https://github.com/Sage-senpai/ManCave',
    liveUrl: 'https://man-cave.vercel.app', // TODO: Add live URL → e.g. 'https://lunera.vercel.app'
    type: 'Web App',
  },
  {
    title: 'InnerCircle',
    description: 'InnerCircle is a token-gated social platform where access to communities, private posts, and influence is determined by on-chain memecoin ownership, combined with real-time leaderboards and market intelligence.',
    tech: ['React', 'CSS3', 'TypeScript','bagsAPI', 'pump.fun', 'solana/web3.js'],
  githubUrl: 'https://github.com/Sage-senpai/INNERCIRCLE',
    liveUrl: 'https://innercircle-gamma.vercel.app', // TODO: Add live URL → e.g. 'https://nexachain.vercel.app'
    type: 'Website',
  },
  {
    title: 'LoreLich',
    description: 'LoreLich Vault is a decentralized platform for preserving ancestral stories — audio, video, and text — with client-side encryption, 0G decentralized storage, soulbound on-chain ownership, and an AI guardian that speaks with wisdom and reverence',
    tech: ['Next', 'CSS3', 'TypeScript', '0G SDK', 'IPFS', 'AI Integration'],
    githubUrl: 'https://github.com/Sage-senpai/lorelich',
    liveUrl: 'https://lorelich-vault.vercel.app', // TODO: Add live URL → e.g. 'https://nexachain.vercel.app'
    type: 'Website',
  },
  {
    title: 'MXCH',
    description: 'A production-grade web platform for a solo artist in Nigeria, combining a music hub, merch store, and admin dashboard with glassmorphic UI. ',
    tech: ['next', 'CSS3', 'TypeScript', 'Credo', 'Vercel'],
    githubUrl: 'https://github.com/Sage-senpai/MXCH',
    liveUrl: 'https://cartoon-offical.vercel.app', // TODO: Add live URL → e.g. 'https://dvyne.github.io'
    type: 'Website',
  },
   {
    title: 'EquiShare',
    description: 'EquiShare is a Polkadot-native fractional real-estate dApp focused on fairness and sybil resistance',
    tech: ['next', 'CSS3', 'TypeScript', 'Polkadot', 'Vercel', 'Substrate', 'Proof of ownership mechanisms'],
    githubUrl: 'https://github.com/Sage-senpai/EquiShare',
    liveUrl: 'https://equishare-pink.vercel.app', // TODO: Add live URL → e.g. 'https://dvyne.github.io'
    type: 'Website',
  },
    {
    title: 'Prizm-Protocol',
    description: 'Prizm-Protocol is a decentralized platform for managing and sharing digital assets with enhanced privacy and security features. Borrow Against Real Assets — Secured by Real Humans.',
    tech: ['next', 'CSS3', 'TypeScript', 'Polkadot', 'Vercel', 'Substrate', 'Proof of ownership mechanisms'],
    githubUrl: 'https://github.com/Sage-senpai/Prizm-protocol',
    liveUrl: 'https://prizm-protocol.vercel.app', // TODO: Add live URL → e.g. 'https://dvyne.github.io'
    type: 'Website',
  },
   {
    title: 'Flour & Fantasies',
    description: 'Flour & Fantasies was born from a passion for creating beautiful, delicious pastries that bring joy to every celebration. Each creation is handcrafted with premium ingredients and baked fresh daily.',
    tech: ['next', 'CSS3', 'TypeScript', 'Credo', 'Vercel'],
    githubUrl: 'https://github.com/Sage-senpai/flour-and-fantasies',
    liveUrl: 'https://flour-and-fantasies.vercel.app',
    type: 'Website',
  },
  {
    title: 'Client Website Showcase',
    description: '11-industry client website demo system — restaurant, airport, resort, delivery, school, SaaS, tech, construction, beauty salon, coworking space, and fitness gym. Each industry is a fully independent multi-page website with its own design system, routing, forms, and booking flows.',
    tech: ['React 19', 'TypeScript', 'Vite', 'SCSS', 'Framer Motion', 'React Router'],
    githubUrl: 'https://github.com/Sage-senpai/client-demo',
    liveUrl: 'https://client-projectdemo.vercel.app',
    type: 'Showcase',
  },
];

// ── Technical Writing & Documentation ───────────────────────────────────────
// No GitHub or Live Demo buttons here — use articleUrl + ctaLabel only.
// The card renders a single CTA button that links directly to the piece.
const DOCUMENTATION: Project[] = [
  {
    title: 'Kusama AssetHub Migration Guide',
    description: 'Comprehensive technical documentation on the Kusama network AssetHub migration — covering pallet changes, asset transfer patterns, and migration tooling.',
    platform: 'X / Twitter Thread',
    articleUrl: 'https://x.com/sage_senpeak/status/1975485357933441433',
    ctaLabel: 'Read Thread',
    category: 'Technical Guide',
  },
  {
    title: 'Polkadot-API Deep Dive',
    description: 'Analysis of Polkadot-API, from Zero to Hero — exploring its architecture, key features, and how it abstracts complex blockchain interactions for developers.',
    platform: 'Twitter Thread',
    articleUrl: 'https://x.com/sage_senpeak/status/2005562106029187446',
    ctaLabel: 'Read Thread',
    category: 'Ecosystem Analysis',
  },
  {
    title: 'Mandala Chain Use Cases in Nigeria',
    description: 'Documentation covering Mandala Chain use cases in Nigeria',
    platform: 'X',
    articleUrl: 'https://x.com/sage_senpeak/status/2019377757331894383?s=20', // TODO: paste Medium article URL here when published
    ctaLabel: 'Read Article',
    category: 'Article',
  },
];

// ── Content & Community Work ─────────────────────────────────────────────────
// No GitHub or Live Demo buttons here — use articleUrl + ctaLabel only.
const CONTENT_WORK: Project[] = [
  {
    title: 'Hackathon Gentrifications Analysis',
    description: 'In-depth breakdown of hackathon ecosystem trends — how incentive structures are shifting, builder retention patterns, and protocol adoption signals.',
    platform: 'X Thread',
    articleUrl: 'https://x.com/sage_senpeak/status/1983842857359437830',
    ctaLabel: 'Read Thread',
    engagement: '10K+ views',
  },
  {
    title: 'TOP 3 Hackathon Projects at ETF 2026',
    description: '3rd place at the ETF 2026 x 0G labs hackathon.',
    platform: 'X post',
    articleUrl: 'https://x.com/sage_senpeak/status/2027307307973976149?s=20', // TODO: paste Spaces recording URL here when available
    ctaLabel: 'Engage',
    engagement: '2k+ views',
  },
  {
    title: '0G labs onboarding Spotlight',
    description: 'Interview series highlighting 0G Labs’ onboarding and developer experience — showcasing how they make complex Web3 infrastructure approachable for new builders.',
    platform: '0G labs booth at ETF 2026',
    articleUrl: 'https://x.com/sage_senpeak/status/2027393637370274202?s=20',
    ctaLabel: 'View Series',
    engagement: '1K+ reach',
  },
];

// ── Particle type ────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

// ── ProjectCard ──────────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  showTech?: boolean;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, showTech = true, index }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    if (!hovered) {
      setParticles([]);
      return;
    }
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-20),
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 2 + 1,
        },
      ]);
    }, 100);
    return () => clearInterval(interval);
  }, [hovered]);

  const handleGithub = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.githubUrl) window.open(project.githubUrl, '_blank');
  };

  const handleLive = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveUrl) window.open(project.liveUrl, '_blank');
  };

  return (
    <div
      className="project-card"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dynamic particles — inline styles required (positions are computed) */}
      {particles.map(p => (
        <div
          key={p.id}
          className="project-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Title + badge in a flex row — badge is in normal flow so it
          can never overlap the title regardless of badge text length   */}
      <div className="project-card__top-row">
        <h3 className="project-card__title">{project.title}</h3>
        {(project.type || project.category) && (
          <span className="project-card__badge">
            {project.type || project.category}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="project-card__desc">{project.description}</p>

      {/* Tech stack */}
      {showTech && project.tech && (
        <div className="tech-tag-list">
          {project.tech.map((tag, i) => (
            <span key={i} className="tech-tag">{tag}</span>
          ))}
        </div>
      )}

      {/* Platform / engagement */}
      {project.platform && (
        <div className="project-card__platform-row">
          <span className="project-card__platform-label">
            📍 {project.platform}
          </span>
          {project.engagement && (
            <span className="project-card__engagement">{project.engagement}</span>
          )}
        </div>
      )}

      {/* ── Action buttons ───────────────────────────────────────────────
           Dev projects   → GitHub repo + optional Live Demo
           Writing/Content → single article CTA (no code buttons)
           Items with no URL yet render no button — keeps cards clean.
          ─────────────────────────────────────────────────────────────── */}
      <div className="project-card__actions">

        {/* Dev projects: GitHub + optional Live Demo */}
        {project.githubUrl && (
          <>
            <button
              onClick={handleGithub}
              className="project-btn project-btn--github"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <FaGithub /> GitHub
            </button>

            {/* LIVE URL: set liveUrl in WEB_APPS above — button appears automatically */}
            {project.liveUrl && (
              <button
                onClick={handleLive}
                className="project-btn project-btn--live"
                aria-label={`Live demo of ${project.title}`}
              >
                <FaExternalLinkAlt /> Live Demo
              </button>
            )}
          </>
        )}

        {/* Writing / content: one link direct to the article, thread, or recording.
            Set articleUrl in DOCUMENTATION or CONTENT_WORK above to show this. */}
        {project.articleUrl && (
          <a
            href={project.articleUrl}
            target="_blank"
            rel="noreferrer"
            className="project-btn project-btn--article"
            aria-label={`${project.ctaLabel ?? 'Read article'}: ${project.title}`}
          >
            <FaExternalLinkAlt /> {project.ctaLabel ?? 'Read Article'}
          </a>
        )}

      </div>

      {/* Bottom glow accent */}
      <div className="project-card__bottom-glow" />
    </div>
  );
};

// ── CategorySection ──────────────────────────────────────────────────────────
interface CategorySectionProps {
  title: string;
  icon: string;
  items: Project[];
  showTech?: boolean;
  delay?: number;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  icon,
  items,
  showTech = true,
  delay = 0,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <section
      className="category-section"
      data-aos="fade-up"
      data-aos-delay={String(delay)}
    >
      {/* Clickable header */}
      <div
        className={`category-header${isOpen ? ' category-header--open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setIsOpen(prev => !prev)}
      >
        <div className="category-header-left">
          <span className="category-icon" aria-hidden="true">{icon}</span>
          <h2 className="category-title">{title}</h2>
          <span className="category-count">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <FaChevronDown
          className={`category-chevron${isOpen ? ' category-chevron--open' : ''}`}
        />
      </div>

      {/* Collapsible grid */}
      <div className={`category-content${isOpen ? ' category-content--open' : ''}`}>
        <div className="category-grid">
          {items.map((item, i) => (
            <ProjectCard
              key={item.title}
              project={item}
              showTech={showTech}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ── ProjectsSection ──────────────────────────────────────────────────────────
export default function ProjectsSection(): JSX.Element {
  return (
    <Element name="projects" className="page-container">
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div className="projects-header" data-aos="fade-up">
          <h1 className="projects-title">Projects &amp; Work</h1>
          <div className="projects-divider" />
          <p className="projects-subtitle">
            Click a category to expand and explore shipped work.
          </p>
        </div>

        {/* Categories */}
        <CategorySection
          title="Web Applications & DApps"
          icon="🚀"
          items={WEB_APPS}
          showTech={true}
          delay={0}
        />

        <CategorySection
          title="Technical Writing & Documentation"
          icon="📚"
          items={DOCUMENTATION}
          showTech={false}
          delay={100}
        />

        <CategorySection
          title="Content & Community Work"
          icon="✍️"
          items={CONTENT_WORK}
          showTech={false}
          delay={200}
        />

      </div>
    </Element>
  );
}
