import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/global.scss";

import AnimatedNavbar from "./components/AnimatedNavbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import GallerySection from "./components/GallerySection";
import ContactSection from "./components/ContactSection";
import FuturisticFooter from "./components/FuturisticFooter";
import Iridescence from "./components/Iridescence";

function App() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="app-root">
      {/* Iridescent animated background */}
      <div className="bg-ctn">
        <Iridescence
          color={[1.0, 0.84, 0.0]} // gold-ish color (R,G,B)
          mouseReact={true}
          amplitude={0.06}
          speed={1.0}
        />
      </div>

      <AnimatedNavbar />

      <main className="main-scroll">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <GallerySection />
        <ContactSection />
      </main>

      <FuturisticFooter />
    </div>
  );
}

export default App;
