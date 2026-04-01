// ============================================================================
// FILE: src/data/portfolio.ts
// DESCRIPTION: All typed portfolio content — sourced from real GitHub repos
// ============================================================================

export type ViewId = 'vc' | 'cto' | 'client' | 'ambassador' | 'event';

export interface Persona {
  id: ViewId;
  label: string;
  subtitle: string;
  description: string;
  accent: string;
  glow: string;
}

export interface Project {
  id: string;
  name: string;
  chain: string;
  ecosystem: string;
  type: string;
  status: 'LIVE' | 'WIP';
  impact: string;
  txnHash: string;
  tech: string[];
  description: string;
  githubUrl: string;
  liveUrl: string;
}

export interface Ecosystem {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
  orbitRadius: number;
  angle: number;
}

export interface EventEntry {
  year: number;
  name: string;
  role: string;
  attendees: number;
  image?: string;
}

export interface ContentPiece {
  title: string;
  platform: string;
  url: string;
  impressions: number;
  type: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'center' | 'chain' | 'project' | 'community';
  color: string;
  r: number;
  desc: string;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface OSSContribution {
  project: string;
  repo: string;
  description: string;
  url: string;
}

// ── PERSONAS ────────────────────────────────────────────────────────────────

export const PERSONAS: Persona[] = [
  {
    id: 'vc',
    label: 'VC / Investor',
    subtitle: 'Chain-of-Proof Resume',
    description:
      'View a blockchain-explorer-style transaction ledger of every shipped project, verified on-chain with proof-of-work metrics.',
    accent: '#9B5DE5',
    glow: 'rgba(155,93,229,0.35)',
  },
  {
    id: 'cto',
    label: 'Engineering Lead / CTO',
    subtitle: 'Terminal OS Portfolio',
    description:
      'Boot into a fully interactive CLI where you can run commands, inspect the tech stack, and explore the codebase like a real terminal.',
    accent: '#00FF41',
    glow: 'rgba(0,255,65,0.25)',
  },
  {
    id: 'client',
    label: 'Client / Startup',
    subtitle: 'Mission Control Dashboard',
    description:
      'A NASA-style operations room showing live deployments, skill diagnostics, and mission logs — everything you need to greenlight a collaboration.',
    accent: '#00D4FF',
    glow: 'rgba(0,212,255,0.3)',
  },
  {
    id: 'ambassador',
    label: 'Ecosystem / Protocol',
    subtitle: 'Solar System Explorer',
    description:
      'An interactive solar system where each planet is a blockchain ecosystem — tap to zoom in and explore every project orbiting within it.',
    accent: '#E6007A',
    glow: 'rgba(230,0,122,0.3)',
  },
  {
    id: 'event',
    label: 'Conference / Event',
    subtitle: 'Holographic ID Card',
    description:
      'A 3D tilt-responsive holographic badge with shimmer effects — flip it to see the full proof-of-work record. Download or print it.',
    accent: '#F59E0B',
    glow: 'rgba(245,158,11,0.3)',
  },
];

// ── ECOSYSTEMS (for solar system view) ──────────────────────────────────────

export const ECOSYSTEMS: Ecosystem[] = [
  {
    id: 'polkadot',
    name: 'Polkadot',
    color: '#E6007A',
    icon: '⬡',
    description: 'Primary ecosystem — 9 shipped projects, ambassador, workshop lead, Sub0 speaker',
    orbitRadius: 120,
    angle: 270,
  },
  {
    id: '0g',
    name: '0G Network',
    color: '#00D395',
    icon: '◎',
    description: 'AI-native Layer 1 — decentralized storage, vector search, and AI-powered dApps',
    orbitRadius: 160,
    angle: 45,
  },
  {
    id: 'solana',
    name: 'Solana',
    color: '#9945FF',
    icon: '◈',
    description: 'High-performance chain — token-gated social platforms',
    orbitRadius: 200,
    angle: 135,
  },
  {
    id: 'stellar',
    name: 'Stellar',
    color: '#7B61FF',
    icon: '✦',
    description: 'Soroban smart contract tooling and decentralized Web3 education',
    orbitRadius: 240,
    angle: 315,
  },
  {
    id: 'mandala',
    name: 'Mandala Chain',
    color: '#FF6B6B',
    icon: '⬢',
    description: 'Polkadot parachain — gamified onboarding for new Web3 users',
    orbitRadius: 280,
    angle: 200,
  },
  {
    id: 'mantle',
    name: 'Mantle',
    color: '#0052FF',
    icon: '▲',
    description: 'Real-world yield intelligence layer on Mantle L2',
    orbitRadius: 320,
    angle: 90,
  },
  {
    id: 'pacifica',
    name: 'Pacifica',
    color: '#00D4FF',
    icon: '◆',
    description: 'AI-driven liquidation cascade prediction and whale tracking',
    orbitRadius: 350,
    angle: 350,
  },
  {
    id: 'web2',
    name: 'Freelance & Web2',
    color: '#F59E0B',
    icon: '★',
    description: 'Client websites, health tech, music platforms, and investment dashboards',
    orbitRadius: 370,
    angle: 240,
  },
];

// ── PROJECTS ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  // ─── Polkadot Ecosystem ───
  {
    id: 'dotique',
    name: 'DOTique',
    chain: 'Polkadot',
    ecosystem: 'polkadot',
    type: 'DApp',
    status: 'LIVE',
    impact: 'Mobile-first NFT marketplace',
    txnHash: '0xD0T1Q3...7f8a',
    tech: ['React', 'TypeScript', 'Polkadot.js', 'Web3'],
    description:
      'Mobile-first platform combining 3D avatars, NFT design, and a social marketplace powered by Polkadot. Users can create, customize, and trade NFTs within a community-driven ecosystem.',
    githubUrl: 'https://github.com/Sage-senpai/DOTique',
    liveUrl: 'https://dot-ique.vercel.app',
  },
  {
    id: 'dotvest',
    name: 'DotVest',
    chain: 'Polkadot',
    ecosystem: 'polkadot',
    type: 'DeFi',
    status: 'LIVE',
    impact: 'DeFi staking & yield farming',
    txnHash: '0xD0TV35...2c1b',
    tech: ['React', 'TypeScript', 'PAPI', 'Web3'],
    description:
      'DeFi platform for staking and yield farming on Polkadot. Provides users with accessible, transparent staking mechanisms and yield optimization tools built with the Polkadot API (PAPI).',
    githubUrl: 'https://github.com/Sage-senpai/DOT-VEST',
    liveUrl: 'https://dot-vest.vercel.app',
  },
  {
    id: 'safeping',
    name: 'SafePing',
    chain: 'Polkadot',
    ecosystem: 'polkadot',
    type: 'DApp',
    status: 'LIVE',
    impact: 'Family safety beacon',
    txnHash: '0x54F3P1...9d4e',
    tech: ['Next.js', 'TypeScript', 'PAPI', 'Web3'],
    description:
      'One-tap family check-in beacon with on-chain signed proof. Families can verify each other\'s safety through tamper-proof, blockchain-verified pings — no passwords, no accounts, just one tap.',
    githubUrl: 'https://github.com/Sage-senpai/SafePing',
    liveUrl: '#',
  },
  {
    id: 'equishare',
    name: 'EquiShare',
    chain: 'Polkadot',
    ecosystem: 'polkadot',
    type: 'RealFi',
    status: 'LIVE',
    impact: 'Fractional real estate ownership',
    txnHash: '0x3QU15H...7c9b',
    tech: ['Next.js', 'TypeScript', 'Polkadot', 'Substrate'],
    description:
      'Polkadot-native fractional real-estate dApp emphasizing fairness and sybil resistance. Enables fractional property ownership with on-chain equity distribution and transparent governance.',
    githubUrl: 'https://github.com/Sage-senpai/EquiShare',
    liveUrl: 'https://equishare-pink.vercel.app',
  },
  {
    id: 'prizm',
    name: 'Prizm Protocol',
    chain: 'Polkadot',
    ecosystem: 'polkadot',
    type: 'DeFi',
    status: 'LIVE',
    impact: 'Real asset borrowing protocol',
    txnHash: '0xPR1ZM0...3d5e',
    tech: ['Next.js', 'TypeScript', 'Polkadot'],
    description:
      'Real asset borrowing platform secured by verified individuals. Enables decentralized lending against real-world assets with on-chain identity verification and transparent collateral management.',
    githubUrl: 'https://github.com/Sage-senpai/Prizm-protocol',
    liveUrl: 'https://prizm-protocol.vercel.app',
  },
  {
    id: 'crimson-remit',
    name: 'Crimson Remit',
    chain: 'Polkadot',
    ecosystem: 'polkadot',
    type: 'DeFi',
    status: 'WIP',
    impact: 'Cross-border remittance DEX',
    txnHash: '0xCR1M50...8b2a',
    tech: ['TypeScript', 'Polkadot', 'Substrate'],
    description:
      'On-chain remittance corridor DEX built on Polkadot. Facilitates low-cost, transparent cross-border money transfers targeting African remittance corridors with decentralized liquidity pools.',
    githubUrl: 'https://github.com/Sage-senpai/Crimson-Remit',
    liveUrl: '#',
  },
  {
    id: 'oryo',
    name: 'Oryo',
    chain: 'Polkadot',
    ecosystem: 'polkadot',
    type: 'DApp',
    status: 'LIVE',
    impact: 'Lightweight tipping protocol',
    txnHash: '0x0RY000...4c1d',
    tech: ['TypeScript', 'Polkadot.js'],
    description:
      'Lightweight tipping application built on the Polkadot ecosystem. Enables frictionless micropayments between users, creators, and community members through a simple, clean interface.',
    githubUrl: 'https://github.com/Sage-senpai/Oryo',
    liveUrl: '#',
  },
  {
    id: 'dotway',
    name: 'Dot-Way',
    chain: 'Polkadot',
    ecosystem: 'polkadot',
    type: 'DApp',
    status: 'LIVE',
    impact: 'Polkadot onboarding portal',
    txnHash: '0xD0TW4Y...6e3f',
    tech: ['TypeScript', 'Polkadot.js'],
    description:
      'Polkadot onboarding dApp designed to guide new developers and users into the ecosystem. Provides interactive tutorials, documentation links, and hands-on wallet setup assistance.',
    githubUrl: 'https://github.com/Sage-senpai/Dot-Way',
    liveUrl: '#',
  },
  {
    id: 'revive-debugger',
    name: 'Revive Dual Debugger',
    chain: 'Polkadot',
    ecosystem: 'polkadot',
    type: 'DevTool',
    status: 'LIVE',
    impact: 'VS Code extension for Solidity on Polkadot',
    txnHash: '0xR3V1V3...5a2b',
    tech: ['TypeScript', 'VS Code API', 'pallet-revive'],
    description:
      'VS Code extension for Solidity debugging via pallet-revive on Polkadot. Enables Solidity developers to debug smart contracts deployed through Polkadot\'s revive pallet directly in their IDE.',
    githubUrl: 'https://github.com/Sage-senpai/revive-dual-debugger',
    liveUrl: '#',
  },

  // ─── 0G Ecosystem ───
  {
    id: 'lorelich',
    name: 'LoreLich',
    chain: '0G',
    ecosystem: '0g',
    type: 'AI+Web3',
    status: 'LIVE',
    impact: 'Ancestral story preservation',
    txnHash: '0xL0R3L1...8e2c',
    tech: ['Next.js', 'TypeScript', '0G SDK', 'IPFS', 'AI'],
    description:
      'Decentralized ancestral story preservation platform with encryption and soulbound ownership. An AI guardian helps users preserve family histories on-chain with tamper-proof storage via 0G Network and IPFS.',
    githubUrl: 'https://github.com/Sage-senpai/Lorelich',
    liveUrl: 'https://lorelich-vault.vercel.app',
  },
  {
    id: 'abobi',
    name: 'Abobi',
    chain: '0G',
    ecosystem: '0g',
    type: 'AI+Web3',
    status: 'LIVE',
    impact: 'Multilingual immigration legal aid',
    txnHash: '0x4B0B10...9f3c',
    tech: ['TypeScript', '0G SDK', 'AI/ML'],
    description:
      'Multilingual immigration legal aid platform on 0G infrastructure with AI guidance. Provides accessible, AI-powered legal information for immigrants in multiple languages, with decentralized data storage.',
    githubUrl: 'https://github.com/Sage-senpai/Abobi',
    liveUrl: '#',
  },
  {
    id: '0g-vector',
    name: '0G Vector Search',
    chain: '0G',
    ecosystem: '0g',
    type: 'DevTool',
    status: 'LIVE',
    impact: 'Decentralized vector search engine',
    txnHash: '0x0GV3CT...2d4e',
    tech: ['TypeScript', '0G SDK', 'HNSW'],
    description:
      'Decentralized HNSW vector search engine on 0G storage infrastructure. Enables high-performance similarity search with fully decentralized indexing and retrieval, purpose-built for AI applications.',
    githubUrl: 'https://github.com/Sage-senpai/0g-vector-search',
    liveUrl: '#',
  },

  // ─── Solana Ecosystem ───
  {
    id: 'innercircle',
    name: 'InnerCircle',
    chain: 'Solana',
    ecosystem: 'solana',
    type: 'Social',
    status: 'LIVE',
    impact: 'Token-gated social platform',
    txnHash: '0x1NN3RC...5b7d',
    tech: ['React', 'TypeScript', 'Solana', 'web3.js', 'pump.fun'],
    description:
      'Token-gated social platform with memecoin ownership requirements. Access is governed by on-chain token holdings via pump.fun and Solana, creating exclusive communities around shared financial stakes.',
    githubUrl: 'https://github.com/Sage-senpai/INNERCIRCLE',
    liveUrl: 'https://innercircle-gamma.vercel.app',
  },

  // ─── Mandala Chain ───
  {
    id: 'mancave',
    name: 'Man-Cave',
    chain: 'Mandala Chain',
    ecosystem: 'mandala',
    type: 'Gamified',
    status: 'LIVE',
    impact: 'Gamified Web3 onboarding',
    txnHash: '0xM4NC4V...1a3f',
    tech: ['Next.js', 'TypeScript', 'Mandala Chain'],
    description:
      'Gamified Web3 onboarding platform for Mandala Chain with quests and rewards. New users learn blockchain concepts through interactive missions while earning on-chain badges and reputation tokens.',
    githubUrl: 'https://github.com/Sage-senpai/ManCave',
    liveUrl: 'https://man-cave.vercel.app',
  },

  // ─── Stellar ───
  {
    id: 'stellar-suite',
    name: 'Stellar Suite',
    chain: 'Stellar',
    ecosystem: 'stellar',
    type: 'DevTool',
    status: 'LIVE',
    impact: 'Soroban smart contract toolkit',
    txnHash: '0x5T3LL4...1b2c',
    tech: ['TypeScript', 'Rust', 'Soroban'],
    description:
      'Complete toolkit for Soroban smart contract development. Provides scaffolding, testing, and deployment utilities for building and deploying contracts on the Stellar network.',
    githubUrl: 'https://github.com/Sage-senpai/stellar-suite',
    liveUrl: '#',
  },
  {
    id: 'chainverse',
    name: 'ChainVerse',
    chain: 'Stellar',
    ecosystem: 'stellar',
    type: 'DApp',
    status: 'LIVE',
    impact: 'Decentralized Web3 education',
    txnHash: '0xCH41NV...3d4e',
    tech: ['Rust', 'TypeScript', 'Stellar', 'Soroban'],
    description:
      'Decentralized Web3 education platform on Stellar with crypto payments, NFT certifications, and DAO governance. Students earn verifiable on-chain credentials upon course completion.',
    githubUrl: 'https://github.com/Sage-senpai/chainVerse-onchain',
    liveUrl: '#',
  },

  // ─── Mantle ───
  {
    id: 'maxion',
    name: 'Maxion',
    chain: 'Mantle',
    ecosystem: 'mantle',
    type: 'DeFi',
    status: 'LIVE',
    impact: 'Real-world yield intelligence layer',
    txnHash: '0xM4X10N...5e6f',
    tech: ['TypeScript', 'Mantle SDK'],
    description:
      'Intelligence layer for real-world yield on Mantle blockchain. Aggregates and optimizes real-world asset yields with data-driven insights for institutional and retail DeFi users.',
    githubUrl: 'https://github.com/Sage-senpai/maxion-dapp',
    liveUrl: '#',
  },

  // ─── Pacifica ───
  {
    id: 'sentinel',
    name: 'Sentinel',
    chain: 'Pacifica',
    ecosystem: 'pacifica',
    type: 'AI+Web3',
    status: 'LIVE',
    impact: 'AI liquidation prediction platform',
    txnHash: '0x53NT1N...7g8h',
    tech: ['TypeScript', 'AI/ML', 'Pacifica SDK'],
    description:
      'AI platform predicting liquidation cascades, tracking whale movements, and protecting Pacifica positions. Uses machine learning models to forecast market risks and alert users before cascading liquidations hit.',
    githubUrl: 'https://github.com/Sage-senpai/Sentinel',
    liveUrl: '#',
  },

  // ─── Web2 / Freelance ───
  {
    id: 'mxch',
    name: 'MXCH',
    chain: 'None',
    ecosystem: 'web2',
    type: 'Website',
    status: 'LIVE',
    impact: 'Music platform for solo artist',
    txnHash: '0xMXCH00...4f6a',
    tech: ['Next.js', 'TypeScript', 'CSS3', 'Credo'],
    description:
      'Music hub, merch store, and admin dashboard built for a solo artist in Nigeria. Full-stack platform with audio streaming, merchandise e-commerce, and content management for independent musicians.',
    githubUrl: 'https://github.com/Sage-senpai/MXCH',
    liveUrl: 'https://cartoon-offical.vercel.app',
  },
  {
    id: 'flour',
    name: 'Flour & Fantasies',
    chain: 'None',
    ecosystem: 'web2',
    type: 'Website',
    status: 'LIVE',
    impact: 'Premium bakery e-commerce',
    txnHash: '0xFL0UR0...1a8c',
    tech: ['Next.js', 'TypeScript', 'CSS3', 'Credo'],
    description:
      'Handcrafted pastry business website featuring premium bakery products. A beautifully designed e-commerce platform with online ordering, product galleries, and seamless checkout for a boutique bakery.',
    githubUrl: 'https://github.com/Sage-senpai/flour-and-fantasies',
    liveUrl: 'https://flour-and-fantasies.vercel.app',
  },
  {
    id: 'lunera',
    name: 'Lunera',
    chain: 'None',
    ecosystem: 'web2',
    type: 'HealthTech',
    status: 'LIVE',
    impact: "Women's health period tracker",
    txnHash: '0xLUN3R4...2b3c',
    tech: ['JavaScript', 'React'],
    description:
      "Women's health application providing cycle tracking, fertility predictions, symptom logging, and wellness guidance. Designed with privacy-first principles and intuitive UX for daily health monitoring.",
    githubUrl: 'https://github.com/Sage-senpai/Lunera-Period-Tracker',
    liveUrl: '#',
  },
  {
    id: 'summityield',
    name: 'SummitYield',
    chain: 'None',
    ecosystem: 'web2',
    type: 'Website',
    status: 'LIVE',
    impact: 'Investment platform frontend',
    txnHash: '0x5UMM1T...4d5e',
    tech: ['JavaScript', 'React'],
    description:
      'Frontend design for an investment platform. Clean, modern UI for managing investment portfolios with real-time data visualization and performance tracking dashboards.',
    githubUrl: 'https://github.com/Sage-senpai/SummitYield',
    liveUrl: '#',
  },
  {
    id: 'ghostpass',
    name: 'GhostPass',
    chain: 'Multi-chain',
    ecosystem: 'polkadot',
    type: 'DApp',
    status: 'WIP',
    impact: 'SBT utility leasing protocol',
    txnHash: '0xGH05TP...6f7g',
    tech: ['TypeScript', 'Solidity'],
    description:
      'Utility leasing protocol for Soulbound Tokens without ownership transfer. Enables temporary access delegation to SBT-gated services while preserving the non-transferability of the underlying token.',
    githubUrl: 'https://github.com/Sage-senpai/GhostPass',
    liveUrl: '#',
  },
  {
    id: 'terraflow',
    name: 'TerraFlow',
    chain: 'Multi-chain',
    ecosystem: 'polkadot',
    type: 'DeFi',
    status: 'WIP',
    impact: 'AI yield vault rebalancer',
    txnHash: '0xT3RR4F...8h9i',
    tech: ['TypeScript', 'AI/ML', 'DeFi'],
    description:
      'AI-managed real-world yield vault rebalancing across economic sectors. Automatically optimizes yield strategies by analyzing macroeconomic data and shifting allocations between asset classes.',
    githubUrl: 'https://github.com/Sage-senpai/TerraFlow',
    liveUrl: '#',
  },
  {
    id: 'guild',
    name: 'Guild',
    chain: 'Multi-chain',
    ecosystem: 'polkadot',
    type: 'DApp',
    status: 'WIP',
    impact: 'Decentralized agent marketplace',
    txnHash: '0xGU1LD0...0a1b',
    tech: ['TypeScript', 'Next.js', 'AI'],
    description:
      'Decentralized agent marketplace inspired by the historical guild model. Connects AI agents with tasks through a reputation-based matching system and on-chain work verification.',
    githubUrl: 'https://github.com/Sage-senpai/Guild',
    liveUrl: '#',
  },
];

// ── OPEN SOURCE CONTRIBUTIONS ───────────────────────────────────────────────

export const OSS_CONTRIBUTIONS: OSSContribution[] = [
  {
    project: 'StreamFi',
    repo: 'StreamFi-x/streamfi-frontend',
    description:
      'Contributed to StreamFi — a decentralized streaming and content monetization platform. Frontend contributions to the React/TypeScript application.',
    url: 'https://github.com/Sage-senpai/streamfi-frontend',
  },
  {
    project: 'StellarFlow',
    repo: 'StellarFlow-Network/stellarflow-frontend',
    description:
      'Contributed to StellarFlow — a Stellar network application frontend. Code contributions to the TypeScript-based UI.',
    url: 'https://github.com/Sage-senpai/stellarflow-frontend',
  },
];

// ── EVENTS ──────────────────────────────────────────────────────────────────

export const EVENTS: EventEntry[] = [
  { year: 2026, name: '0G Network Hackathon', role: 'ETF Hackathon Competitor', attendees: 1000, image: '/0G-hackathon.jpg' },
  { year: 2026, name: '0G Ecosystem Onboarding', role: 'Developer Onboarding Lead', attendees: 300, image: '/0G-onboarding.jpg' },
  { year: 2025, name: 'Polkadot Developer Workshop', role: 'Workshop Lead — Substrate & XCM', attendees: 200, image: '/polkadot-dev.jpg' },
  { year: 2025, name: 'Sui-Move Developer Workshop', role: 'Organizer — Move Programming', attendees: 150, image: '/sui-meetup.jpg' },
  { year: 2025, name: 'Polkadot Road to sub0 Meetup', role: 'Builder Representative', attendees: 300, image: '/road-2-sub0.jpg' },
  { year: 2025, name: 'Sui Ecosystem Builder Network', role: 'Community Builder — SE Nigeria', attendees: 120, image: '/sui-meetup-group.jpg' },
  { year: 2025, name: 'Move Language Workshop Series', role: 'Co-Lead Instructor', attendees: 100, image: '/sui-meetup-group-1.jpg' },
  { year: 2025, name: 'Community Builder Events', role: 'Multi-event Organizer — Nsukka', attendees: 250 },
  { year: 2024, name: '2-Day Capacity Building Workshop', role: 'IoT & Smart Agriculture Lead', attendees: 80, image: '/workshop.jpg' },
  { year: 2024, name: 'NVIDIA × UNN AI Workshop', role: 'GPU Deep Learning Participant', attendees: 200, image: '/nivida-workshop.jpg' },
  { year: 2024, name: 'World Bitcoin Pizza Day', role: 'Community Organizer', attendees: 150, image: '/bitcoin-pizza-day.jpg' },
  { year: 2024, name: 'Engineering Projects Showcase', role: 'DeFi & dApp Presenter', attendees: 400 },
  { year: 2023, name: 'Smart Irrigation System Demo', role: 'IoT Engineer — Arduino & Sensors', attendees: 60, image: '/smart-irigation-system.jpg' },
];

// ── SKILLS ──────────────────────────────────────────────────────────────────

export const SKILLS: Record<string, number> = {
  Frontend: 92,
  'Smart Contracts': 78,
  Community: 95,
  Writing: 88,
  DeFi: 82,
  Strategy: 90,
};

// ── CONTENT PIECES ──────────────────────────────────────────────────────────

export const CONTENT_PIECES: ContentPiece[] = [
  {
    title: 'Kusama AssetHub Migration Guide',
    platform: 'X Thread',
    url: 'https://x.com/sage_senpeak/status/1975485357933441433',
    impressions: 12400,
    type: 'Guide',
  },
  {
    title: 'Polkadot-API (PAPI) Deep Dive',
    platform: 'X Thread',
    url: 'https://x.com/sage_senpeak/status/2005562106029187446',
    impressions: 8900,
    type: 'Technical',
  },
  {
    title: 'Mandala Chain Use Cases in Nigeria',
    platform: 'X Thread',
    url: 'https://x.com/sage_senpeak/status/2019377757331894383',
    impressions: 6200,
    type: 'Analysis',
  },
  {
    title: 'Hackathon Gentrifications Analysis',
    platform: 'X Thread',
    url: 'https://x.com/sage_senpeak/status/1983842857359437830',
    impressions: 10000,
    type: 'Opinion',
  },
  {
    title: 'TOP 3 Hackathon Projects at ETF 2026',
    platform: 'X Post',
    url: 'https://x.com/sage_senpeak/status/2027307307973976149',
    impressions: 2000,
    type: 'Recap',
  },
  {
    title: '0G Labs Onboarding Spotlight',
    platform: 'X Post',
    url: 'https://x.com/sage_senpeak/status/2027393637370274202',
    impressions: 1000,
    type: 'Spotlight',
  },
];

// ── PROFILE ─────────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'Anyadike Divine',
  role: 'Web3 Developer · Smart Contract Engineer · Community Manager',
  location: 'Nsukka, Nigeria',
  email: 'anyadikedivine@gmail.com',
  twitter: 'sage_senpeak',
  github: 'Sage-senpai',
  linkedin: 'anyadikedivine',
  portfolio: 'https://portfolio-dvyne.vercel.app',
  profileImage: '/profile.jpg',
  bio: 'Forward-thinking Web3 builder specializing in front-end engineering (React, Next.js, TypeScript) and decentralized application development. Shipped 25+ projects across Polkadot, Solana, 0G, Stellar, Mandala, Mantle, and Pacifica ecosystems. Active community manager, technical writer, hackathon competitor, and ecosystem ambassador bridging Nigerian developers with global Web3 opportunities.',
};
