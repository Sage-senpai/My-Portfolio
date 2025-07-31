// File: src/pages/About.js
import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

function About() {
  return (
    <div className="page-container">
      <div className="section">
        <div className="section-image">
          {/* Replace 'about.jpg' with your actual image path */}
          <img
            src="/about.jpg"
            alt="About"
            className="modern-profile-img framed"
          />
        </div>
        <div className="section-content">
          <h2 className="name">About Me</h2>
          

      <section className="about-gallery" data-aos="fade-up">
          
            
            <p className="description">
            {/* Add your about text here */}
            My name is Divine Anyadike. I'm a computer and robotics education student
            I'm a passionate Web3 developer based in Nigeria.
             I specialize in Front end developing, 
              smart contract development, community management, 
             and helping projects grow.
          </p>

          </section>

          <h2 className="skills-heading">Skills</h2>
        
        </div>
      </div>
      <section className="skills-grid" data-aos="fade-up">
  <div className="skill-card" data-aos="fade-right">
    <ul>
      <li>Certified Front-end dev <br/> CSS, React, JavaScript and Smart Contracts</li>
    </ul>
  </div>
  <div className="skill-card" data-aos="fade-left">
    <ul>
      <li>Organizer of Twitter Spaces and local events</li>
    </ul>
  </div>
  <div className="skill-card" data-aos="fade-right">
    <ul>
      <li>Developer and content creator</li>
    </ul>
  </div>
  <div className="skill-card" data-aos="fade-left">
    <ul>
      <li>Pro gamer and community manager</li>
    </ul>
  </div>
  <div className="skill-card" data-aos="fade-right">
    <ul>
      <li>Public speaking</li>
    </ul>
  </div>
  <div className="skill-card" data-aos="fade-right">
    <ul>
      <li>Teamwork and Leadership skills</li>
    </ul>
  </div>
  <div className="skill-card" data-aos="fade-right">
    <ul>
      <li>MicroSoft Office Expert</li>
    </ul>
  </div>
  <div className="skill-card" data-aos="fade-right">
    <ul>
      <li>Robotics Expertice</li>
    </ul>
       </div>
      </section>

        <div className="pill-categories-1">
            <Link to="/" className="pill themed">Home</Link>
            <Link to="/projects" className="pill themed">Projects</Link>
            <Link to="/contact" className="pill themed">Contact</Link>
            <Link to="/gallery" className="pill themed">Gallery </Link>
          </div>
    </div>
  );
}

export default About;

//stoped here check for event-card-1 and continue editig the styles

