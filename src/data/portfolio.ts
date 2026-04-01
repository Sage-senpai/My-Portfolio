// ============================================================================
// FILE: src/data/portfolio.ts
// DESCRIPTION: All typed portfolio content in one file
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
  type: string;
  status: 'LIVE' | 'WIP';
  impact: string;
  txnHash: string;
  tech: string[];
  description: string;
  githubUrl: string;
  liveUrl: string;
}

export interface EventEntry {
  year: number;
  name: string;
  role: string;
  attendees: number;
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
    subtitle: 'Network Graph Visualizer',
    description:
      'An interactive D3 force-directed graph mapping connections across chains, projects, and communities in the Web3 ecosystem.',
    accent: '#E6007A',
    glow: 'rgba(230,0,122,0.3)',
  },
  {
    id: 'event',
    label: 'Conference / Event',
    subtitle: 'Holographic ID Card',
    description:
      'A 3D tilt-responsive holographic badge with shimmer effects — flip it to reveal the full proof-of-work record.',
    accent: '#F59E0B',
    glow: 'rgba(245,158,11,0.3)',
  },
];

// ── PROJECTS ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'dotique',
    name: 'DOTique',
    chain: 'Polkadot',
    type: 'DApp',
    status: 'LIVE',
    impact: 'NFT marketplace for Polkadot ecosystem',
    txnHash: '0xD0T1Q3...7f8a',
    tech: ['React', 'TypeScript', 'Polkadot.js', 'Substrate', 'SCSS'],
    description:
      'A curated NFT marketplace built on the Polkadot ecosystem, enabling creators to mint, list, and trade digital collectibles with cross-chain interoperability.',
    githubUrl: 'https://github.com/Sage-senpai',
    liveUrl: '#',
  },
  {
    id: 'dotvest',
    name: 'DotVest',
    chain: 'Polkadot',
    type: 'DeFi',
    status: 'LIVE',
    impact: 'Staking & vesting protocol',
    txnHash: '0xD0TV35...2c1b',
    tech: ['React', 'TypeScript', 'ink!', 'Substrate', 'Polkadot.js'],
    description:
      'A staking and vesting protocol that lets users lock DOT tokens with customizable vesting schedules, earning yield while maintaining governance rights.',
    githubUrl: 'https://github.com/Sage-senpai',
    liveUrl: '#',
  },
  {
    id: 'safeping',
    name: 'SafePing',
    chain: 'Polkadot',
    type: 'DApp',
    status: 'LIVE',
    impact: 'On-chain emergency alert system',
    txnHash: '0x54F3P1...9d4e',
    tech: ['React', 'TypeScript', 'Substrate', 'Geolocation API'],
    description:
      'An on-chain emergency alert and safety verification system leveraging blockchain for tamper-proof incident reporting and community safety coordination.',
    githubUrl: 'https://github.com/Sage-senpai',
    liveUrl: '#',
  },
  {
    id: 'mancave',
    name: 'Man-Cave',
    chain: 'Polkadot',
    type: 'Social',
    status: 'LIVE',
    impact: 'Decentralized social platform',
    txnHash: '0xM4NC4V...1a3f',
    tech: ['React', 'Node.js', 'Substrate', 'IPFS'],
    description:
      'A decentralized social platform for curated communities, built with on-chain identity and content moderation governed by community consensus.',
    githubUrl: 'https://github.com/Sage-senpai',
    liveUrl: '#',
  },
  {
    id: 'innercircle',
    name: 'InnerCircle',
    chain: 'Polkadot',
    type: 'Social',
    status: 'LIVE',
    impact: 'Token-gated community platform',
    txnHash: '0x1NN3RC...5b7d',
    tech: ['Next.js', 'TypeScript', 'Polkadot.js', 'IPFS'],
    description:
      'A token-gated community platform where access is governed by on-chain credentials, enabling exclusive content sharing and governance participation.',
    githubUrl: 'https://github.com/Sage-senpai',
    liveUrl: '#',
  },
  {
    id: 'lorelich',
    name: 'LoreLich',
    chain: 'Multi-chain',
    type: 'Gamified',
    status: 'LIVE',
    impact: 'Interactive storytelling engine',
    txnHash: '0xL0R3L1...8e2c',
    tech: ['Next.js', 'TypeScript', 'AI/ML', 'Turborepo', 'Tailwind'],
    description:
      'An AI-powered interactive storytelling engine where users shape narratives through choices, with on-chain story ownership and community-driven world building.',
    githubUrl: 'https://github.com/Sage-senpai',
    liveUrl: '#',
  },
  {
    id: 'mxch',
    name: 'MXCH',
    chain: 'Sui',
    type: 'DeFi',
    status: 'LIVE',
    impact: 'Decentralized exchange on Sui',
    txnHash: '0xMXCH00...4f6a',
    tech: ['React', 'Move', 'Sui SDK', 'TypeScript'],
    description:
      'A decentralized exchange built on Sui featuring automated market making, liquidity pools, and ultra-low-latency swaps powered by Sui\'s parallel execution.',
    githubUrl: 'https://github.com/Sage-senpai',
    liveUrl: '#',
  },
  {
    id: 'equishare',
    name: 'EquiShare',
    chain: '0G',
    type: 'RealFi',
    status: 'LIVE',
    impact: 'Tokenized real-world assets',
    txnHash: '0x3QU15H...7c9b',
    tech: ['React', 'Solidity', 'TypeScript', '0G SDK'],
    description:
      'A platform for tokenizing real-world assets, enabling fractional ownership and transparent, on-chain equity distribution for physical and digital assets.',
    githubUrl: 'https://github.com/Sage-senpai',
    liveUrl: '#',
  },
  {
    id: 'prizm',
    name: 'Prizm Protocol',
    chain: 'Solana',
    type: 'AI+Web3',
    status: 'WIP',
    impact: 'AI-driven DeFi analytics',
    txnHash: '0xPR1ZM0...3d5e',
    tech: ['Next.js', 'Rust', 'Anchor', 'Python', 'TensorFlow'],
    description:
      'An AI-driven DeFi analytics protocol on Solana that provides real-time market insights, risk scoring, and automated strategy recommendations.',
    githubUrl: 'https://github.com/Sage-senpai',
    liveUrl: '#',
  },
  {
    id: 'flour',
    name: 'Flour & Fantasies',
    chain: 'None',
    type: 'Website',
    status: 'LIVE',
    impact: 'E-commerce bakery platform',
    txnHash: '0xFL0UR0...1a8c',
    tech: ['React', 'TypeScript', 'Node.js', 'Stripe', 'SCSS'],
    description:
      'A beautifully designed e-commerce platform for a boutique bakery, featuring online ordering, real-time inventory, and seamless payment integration.',
    githubUrl: 'https://github.com/Sage-senpai',
    liveUrl: '#',
  },
];

// ── EVENTS ──────────────────────────────────────────────────────────────────

export const EVENTS: EventEntry[] = [
  { year: 2025, name: 'Polkadot Decoded', role: 'Builder Showcase', attendees: 3000 },
  { year: 2025, name: 'Sui Basecamp', role: 'Hackathon Participant', attendees: 2500 },
  { year: 2024, name: 'Polkadot Sub0 Bangkok', role: 'Workshop Lead', attendees: 1500 },
  { year: 2024, name: 'ETH Safari Nairobi', role: 'Speaker & Builder', attendees: 2000 },
  { year: 2024, name: 'Polkadot Meetup Lagos', role: 'Organizer', attendees: 200 },
  { year: 2024, name: 'Web3 Lagos Conference', role: 'Panelist', attendees: 1800 },
  { year: 2023, name: 'Polkadot Hackathon APAC', role: 'Finalist', attendees: 5000 },
  { year: 2023, name: 'Encode Club Bootcamp', role: 'Graduate', attendees: 500 },
  { year: 2023, name: 'Substrate Saturday Lagos', role: 'Community Lead', attendees: 80 },
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
    title: 'The Complete Guide to Kusama Governance',
    platform: 'Medium',
    url: '#',
    impressions: 12400,
    type: 'Guide',
  },
  {
    title: 'Deep Dive into Polkadot API (PAPI)',
    platform: 'Dev.to',
    url: '#',
    impressions: 8900,
    type: 'Technical',
  },
  {
    title: 'Mandala Chain: Real-World Use Cases',
    platform: 'Mirror',
    url: '#',
    impressions: 6200,
    type: 'Analysis',
  },
  {
    title: 'Hackathon Survival: A Builder\'s Playbook',
    platform: 'Hashnode',
    url: '#',
    impressions: 15300,
    type: 'Opinion',
  },
  {
    title: 'Polkadot ETF: What It Means for Builders',
    platform: 'Subsocial',
    url: '#',
    impressions: 7100,
    type: 'Recap',
  },
];

// ── GRAPH NODES (for Ambassador D3 view) ────────────────────────────────────

export const GRAPH_NODES: GraphNode[] = [
  { id: 'divine', label: 'Anyadike Divine', type: 'center', color: '#E6007A', r: 28, desc: 'Web3 Developer · Community Manager · Ecosystem Builder' },
  { id: 'polkadot', label: 'Polkadot', type: 'chain', color: '#E6007A', r: 20, desc: 'Primary ecosystem — 5 shipped projects' },
  { id: 'sui', label: 'Sui', type: 'chain', color: '#4DA2FF', r: 16, desc: 'MXCH DEX built on Sui' },
  { id: '0g', label: '0G', type: 'chain', color: '#00D395', r: 16, desc: 'EquiShare RWA platform' },
  { id: 'solana', label: 'Solana', type: 'chain', color: '#9945FF', r: 16, desc: 'Prizm Protocol — AI+DeFi' },
  { id: 'dotique', label: 'DOTique', type: 'project', color: '#9B5DE5', r: 13, desc: 'NFT marketplace on Polkadot' },
  { id: 'dotvest', label: 'DotVest', type: 'project', color: '#00D395', r: 13, desc: 'Staking & vesting protocol' },
  { id: 'safeping', label: 'SafePing', type: 'project', color: '#00D4FF', r: 13, desc: 'On-chain emergency alerts' },
  { id: 'lorelich', label: 'LoreLich', type: 'project', color: '#F59E0B', r: 13, desc: 'AI storytelling engine' },
  { id: 'mxch', label: 'MXCH', type: 'project', color: '#4DA2FF', r: 13, desc: 'Decentralized exchange on Sui' },
  { id: 'equishare', label: 'EquiShare', type: 'project', color: '#00D395', r: 13, desc: 'Tokenized real-world assets' },
  { id: 'polkadot-community', label: 'Polkadot Community', type: 'community', color: '#E6007A', r: 15, desc: 'Ambassador · Workshop Lead · Organizer' },
  { id: 'web3-nigeria', label: 'Web3 Nigeria', type: 'community', color: '#00FF41', r: 15, desc: 'Lagos meetups · Local builder community' },
];

// ── GRAPH LINKS ─────────────────────────────────────────────────────────────

export const GRAPH_LINKS: GraphLink[] = [
  { source: 'divine', target: 'polkadot' },
  { source: 'divine', target: 'sui' },
  { source: 'divine', target: '0g' },
  { source: 'divine', target: 'solana' },
  { source: 'divine', target: 'polkadot-community' },
  { source: 'divine', target: 'web3-nigeria' },
  { source: 'polkadot', target: 'dotique' },
  { source: 'polkadot', target: 'dotvest' },
  { source: 'polkadot', target: 'safeping' },
  { source: 'polkadot', target: 'lorelich' },
  { source: 'sui', target: 'mxch' },
  { source: '0g', target: 'equishare' },
  { source: 'dotique', target: 'polkadot-community' },
  { source: 'dotvest', target: 'polkadot-community' },
  { source: 'polkadot-community', target: 'web3-nigeria' },
  { source: 'lorelich', target: 'sui' },
  { source: 'safeping', target: 'web3-nigeria' },
  { source: 'mxch', target: 'divine' },
  { source: 'equishare', target: 'divine' },
];
