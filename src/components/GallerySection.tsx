// ============================================================================
// FILE: src/components/GallerySection.tsx
// DESCRIPTION: Horizontal right-to-left autoscroll gallery with write-ups.
//
// The track renders every item TWICE — CSS translateX(-50%) creates
// a seamless infinite loop without JavaScript scroll logic.
// Hovering pauses the animation so users can read the write-ups.
// ============================================================================

import React from 'react';
import { Element } from 'react-scroll';
import '../styles/components/Gallery.scss';

interface GalleryItem {
  image: string;
  title: string;
  description: string;
  date: string;
}

// ── Gallery data ──────────────────────────────────────────────────────────────
// Add or reorder items freely — the scroll adapts automatically.
const GALLERY_ITEMS: GalleryItem[] = [
  {
    image: '/workshop.jpg',
    title: '2-Day Capacity Building Workshop',
    description:
      'Facilitated hands-on sessions bridging smart agriculture concepts with IoT sensor integration — empowering rural farming communities with data-driven decision tools.',
    date: '2024',
  },
  {
    image: '/nivida-workshop.jpg',
    title: 'NVIDIA × UNN AI Workshop',
    description:
      "Attended NVIDIA's GPU-accelerated deep learning workshop at UNN, exploring neural architecture fundamentals and real-world inference pipeline optimisation.",
    date: '2024',
  },
  {
    image: '/bitcoin-pizza-day.jpg',
    title: 'World Bitcoin Pizza Day',
    description:
      'Celebrated the milestone marking global Bitcoin adoption awareness — engaging local builders and enthusiasts around crypto culture and financial sovereignty.',
    date: '2024',
  },
  {
    image: '/polkadot-dev.jpg',
    title: 'Polkadot Developer Workshop',
    description:
      'Led developer onboarding into the Polkadot ecosystem — walking builders through substrate pallets, XCM architecture, and parachain deployment patterns.',
    date: '2025',
  },
  {
    image: '/sui-meetup.jpg',
    title: 'Sui-Move Developer Workshop',
    description:
      "Organised Sui Nsukka meetups introducing the Move programming language — covering Sui's object-centric execution model and on-chain resource safety guarantees.",
    date: '2025',
  },
  {
    image: '/road-2-sub0.jpg',
    title: 'Polkadot Road to sub0 Meetup',
    description:
      'Attended as a builder and community representative — connecting with core Polkadot engineers and ecosystem leads ahead of the sub0 developer conference.',
    date: '2025',
  },
  {
    image: '/smart-irigation-system.jpg',
    title: 'Smart Irrigation System',
    description:
      'Built an IoT-based automated irrigation prototype with Arduino and moisture-sensor integration — presented at a regional tech fair as an applied engineering showcase.',
    date: '2023',
  },
  {
    image: '/0G-hackathon.jpg',
    title: '0G Network Hackathon',
    description:
      'Competed in the 0G Labs x ETF hackathon — building on AI-centric Layer 1 infrastructure and exploring decentralised data availability patterns at the AI × Web3 intersection.',
    date: '2026',
  },
  {
    image: '/0G-onboarding.jpg',
    title: '0G Ecosystem Onboarding',
    description:
      'Led developer onboarding sessions for the 0G Network — guiding builders through the AI-native chain architecture, DA layer mechanics, and early-stage deployment flows.',
    date: '2026',
  },
  {
    image: '/sui-meetup-group.jpg',
    title: 'Sui Ecosystem Builder Network',
    description:
      'Growing the Sui developer network in Southeast Nigeria — facilitating knowledge transfer, peer collaboration, and community-driven ecosystem expansion.',
    date: '2025',
  },
  {
    image: '/sui-meetup-group-1.jpg',
    title: 'Move Language Workshop Series',
    description:
      'Co-ran a workshop series on the Move programming model — teaching resource-oriented programming patterns and on-chain safety guarantees to local developers.',
    date: '2025',
  },
  {
    image: '/projects.jpg',
    title: 'Engineering Projects Showcase',
    description:
      'A curated showcase of shipped products — from DeFi platforms and onboarding dApps to IoT systems, each representing a distinct problem-solving cycle and technical stack.',
    date: '2024',
  },
  {
    image: '/about.jpg',
    title: 'Community Events',
    description:
      'Organised multiple Web3 builder events across Nsukka — fostering technical collaboration, regional adoption, and peer-to-peer knowledge sharing at the grassroots level.',
    date: '2025',
  },
];

// Duplicate items for seamless CSS infinite loop
const TRACK_ITEMS: GalleryItem[] = [...GALLERY_ITEMS, ...GALLERY_ITEMS];

export default function GallerySection(): JSX.Element {
  return (
    <Element name="gallery" className="page-container">
      <div className="gallery-section-inner">

        {/* Section header */}
        <h2 className="gallery-heading" data-aos="fade-up">
          Gallery &amp; Highlights
        </h2>
        <p
          className="gallery-subheading"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Events, workshops, hackathons &amp; community involvement
        </p>

        {/* Autoscroll viewport — hover pauses the animation */}
        <div className="gallery-viewport" data-aos="fade-up" data-aos-delay="200">
          <div className="gallery-track">
            {TRACK_ITEMS.map((item, index) => (
              <article
                key={`${item.image}-${index}`}
                className="gallery-item"
                aria-label={item.title}
              >
                {/* Image */}
                <div className="gallery-item__img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-item__img"
                    loading="lazy"
                  />
                  <div className="gallery-item__img-overlay" aria-hidden="true" />
                  <span className="gallery-item__date">{item.date}</span>
                </div>

                {/* Write-up */}
                <div className="gallery-item__content">
                  <h3 className="gallery-item__title">{item.title}</h3>
                  <p className="gallery-item__desc">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </Element>
  );
}
