// File: src/pages/Home.js
import React from "react";
import "aos/dist/aos.css";
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
          || Crypto specialist || Web3 Enthusiast & Dev || FrontEnd -
           React/ JavaScript /Next.js dev || Robotics Student || Public Speaker & Community Manager ||

          </p>
          <div className="pill-categories">
            <a href="/about" className="pill themed">About</a>
            <a href="/projects" className="pill themed">Projects</a>
            <a href="/contact" className="pill themed">Contact</a>
            <a href="/gallery" className="pill themed">Gallery</a>
          </div>
        </div>


        </section>
        
      </div>
    </div>
  );
}

export default Home;
