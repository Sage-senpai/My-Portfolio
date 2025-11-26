// ============================================================================
// FILE: src/App.jsx
// DESCRIPTION: Main application component
// ============================================================================

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/global.scss";

import HyperspeedBackground from "./components/HyperspeedBackground";
import AnimatedNavbar from "./components/AnimatedNavbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import GallerySection from "./components/GallerySection";
import FuturisticFooter from "./components/FuturisticFooter";

function App() {
  useEffect(() => {
    AOS.init({ 
      duration: 1200, 
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <div className="app-root">
      {/* Hyperspeed animated background */}
      <HyperspeedBackground />

      <AnimatedNavbar />

      <main className="main-scroll">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <GallerySection />
      </main>

      <FuturisticFooter />
    </div>
  );
}

export default App;