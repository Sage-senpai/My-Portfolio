import React from "react";
import "../styles/global.scss";
import { Element } from "react-scroll";

export default function HeroSection() {
  return (
    <Element name="home" className="page-container hero-section">
      <div className="section" data-aos="fade-up">
        <div className="section-image">
          <img src="/profile.jpg" alt="Profile" className="modern-profile-img framed" />
        </div>

        <section>
          <div className="section-content">
            <h1 className="name gradient-text animated-name">Anyadike Divine</h1>

            <p className="description typewriter">
              || Creative Thinker || Web3 Enthusiast & DevRel || FrontEnd Dev || Robotics Student || Public  <br/>Speaker 
               & Community Manager || Rotaractor ||
            </p>

            <div className="floating-pills">
              <a href="#about" className="pill themed">About</a>
              <a href="#projects" className="pill themed">Projects</a>
              <a href="#contact" className="pill themed">Contact</a>
            </div>
          </div>
        </section>
      </div>
    </Element>
  );
}
