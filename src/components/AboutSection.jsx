import React from "react";
import { Element } from "react-scroll";
import "../styles/global.scss";

export default function AboutSection() {
  return (
    <Element name="about" className="page-container">
      <div className="section" data-aos="fade-up">
        <div className="section-image">
          <img src="/about.jpg" alt="About" className="modern-profile-img framed" />
        </div>
        <div className="section-content">
          <h2 className="name">About Me</h2>
          <section className="about-gallery" data-aos="fade-up">
            <p className="description">
              My name is Divine Anyadike. I'm a computer and robotics education student.
              I'm a passionate Web3 developer based in Nigeria.
              I specialize in Front end developing, smart contract development, community management,
              and helping projects grow.
            </p>
          </section>

          <h2 className="skills-heading">Skills</h2>
        </div>
      </div>

      <section className="skills-grid" data-aos="fade-up">
        <div className="skill-card" data-aos="fade-right">
          <ul>
            <li>Certified Front-end dev <br /> CSS, React, JavaScript and Smart Contracts</li>
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
    </Element>
  );
}
