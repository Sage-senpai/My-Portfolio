# Adaptive Portfolio System — Anyadike Divine

An identity-aware portfolio that reshapes itself based on **who's looking at it**. Instead of one static page, visitors declare their role — VC, CTO, Client, Protocol, or Conference organizer — and get a completely different, purpose-built experience.

## The Concept

Traditional developer portfolios show everyone the same page. This one asks one question:

> **"Who are you?"**

Then it delivers a view engineered for that exact audience:

| Visitor | Experience | What They See |
|---------|-----------|---------------|
| **VC / Investor** | Blockchain Explorer | Transaction ledger of every shipped project with on-chain proof-of-work metrics |
| **Engineering Lead / CTO** | Terminal OS | Fully interactive CLI with 15+ commands — `ls projects/`, `git log`, `sudo hire me` |
| **Client / Startup** | Mission Control | NASA-style ops dashboard with radar charts, live deployment status, and comms channel |
| **Ecosystem / Protocol** | Solar System | Interactive solar system where each planet is a blockchain ecosystem with orbiting projects |
| **Conference / Event** | Holographic ID Card | 3D tilt-responsive card with shimmer effects — downloadable and printable front & back |

## Tech Stack

- **React 19** + **TypeScript** — Type-safe component architecture
- **Vite** — Lightning-fast dev server and build
- **Framer Motion** — `AnimatePresence` view transitions
- **Recharts** — Radar chart diagnostics (Client view)
- **SCSS** — View-scoped stylesheets with CSS custom properties
- **html-to-image** — ID card download as PNG

## Project Stats

- **25+ shipped projects** across 7 blockchain ecosystems
- **13 events** — workshops, hackathons, meetups, conferences
- **2 open source contributions** — StreamFi, StellarFlow
- **6 published content pieces** — technical threads, guides, and analysis

## Ecosystems

Polkadot · Solana · 0G Network · Stellar · Mandala Chain · Mantle · Pacifica

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## File Structure

```
src/
  data/
    portfolio.ts              # All typed content — projects, events, skills, ecosystems
  views/
    IdentitySelector.tsx      # Landing page — "Who are you?"
    VCView.tsx                # Blockchain explorer resume
    CTOView.tsx               # Interactive terminal with working commands
    ClientView.tsx            # NASA mission control dashboard
    AmbassadorView.tsx        # Solar system ecosystem explorer
    EventView.tsx             # 3D holographic ID card
  components/
    BackButton.tsx            # Shared "Switch view" navigation
  styles/
    views/
      _selector.scss          # Identity selector styles
      _vc.scss                # Blockchain explorer theme
      _cto.scss               # Terminal green-phosphor theme
      _client.scss            # Mission control cyan theme
      _ambassador.scss        # Solar system + mobile card grid
      _event.scss             # Holographic card + print styles
      _animations.scss        # Shared keyframes
    global.scss               # Global reset and base styles
```

## Responsive Design

Each view has distinct desktop and mobile layouts:

- **Desktop**: Full interactive experiences — solar system visualization, terminal with keyboard, multi-panel dashboards
- **Mobile**: Touch-optimized alternatives — ecosystem card grid (replaces solar system), stacked panels, larger touch targets (44px+)

## Key Features

### Terminal (CTO View)
A fully working CLI with command history, tab completion, arrow key navigation, and a matrix rain easter egg. Commands include `whoami`, `ls projects/`, `git log`, `skill --list`, `open <project>`, `sudo hire me`, and more.

### Solar System (Ambassador View)
Desktop shows an interactive solar system with the developer at the center and blockchain ecosystems as orbiting planets. Click any planet to zoom in and see all projects in that ecosystem with GitHub/live links. Mobile shows an accordion-style ecosystem card grid.

### Holographic Card (Event View)
A CSS 3D card that responds to mouse movement with tilt and shimmer effects. Click to flip between the identity front and project ledger back. Download as PNG or print both sides.

## Links

- **Portfolio**: [portfolio-dvyne.vercel.app](https://portfolio-dvyne.vercel.app)
- **GitHub**: [github.com/Sage-senpai](https://github.com/Sage-senpai)
- **Twitter/X**: [@sage_senpeak](https://x.com/sage_senpeak)
- **Email**: anyadikedivine@gmail.com

---

Built by **Anyadike Divine** — Web3 Developer, Smart Contract Engineer, Community Manager from Nsukka, Nigeria.
