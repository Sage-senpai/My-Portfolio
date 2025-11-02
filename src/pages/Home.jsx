// File: src/pages/Home.js
import React from "react";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import AOS from "aos";

import { useEffect } from "react";
import "../index.css";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="page-container">
      <div className="section" data-aos="fade-up">
        <div className="section-image">
          {/* Replace 'profile.jpg' with your actual image path in public folder */}
          <img
            src="/profile.jpg"
            alt="Profile"
            className="modern-profile-img framed"
          />
        </div>
        <section>
        <div className="section-content">
          <h1 className="name gradient-text">Anyadike Divine</h1>
         

          <p className="description">
          || Creative Thinker || Web3 Enthusiast & DevRel || FrontEnd
         Dev || Robotics Student || Public Speaker & Community Manager || Rotaractor ||

          </p>
                  </div>
        </section>
        
      </div>

      <div className="pill-categories-1">
            <Link to="/about" className="pill themed">About</Link>
            <Link to="/projects" className="pill themed">Projects</Link>
            <Link to="/contact" className="pill themed">Contact</Link>
            <Link to="/gallery" className="pill themed">Gallery</Link>
            
          </div>
    </div>
  );
}

export default Home;
