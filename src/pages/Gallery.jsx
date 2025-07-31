// File: src/pages/Gallery.js
import React from "react";
import "../index.css";

function Gallery() {
  return (
    <div className="gallery">
      <h2 className="name" data-aos="fade-up">Gallery & Highlights</h2>

      <section className="profile-picture" data-aos="zoom-in">
        <h3>My Profile Picture</h3>
        <img src="/profile.jpg" alt="Profile" className="profile-img" />
      </section>

      <section className="hover-gallery" data-aos="fade-up">
        <h3>Latest works and Events</h3>
        <div className="image-grid">
          <img src="/projects.jpg" alt="Preview 1" />
          <img src="/smart-irrigation.jpg" alt="Preview 2" />
          <img src="/about.jpg" alt="Preview 3" />
        </div>
      </section>

      <section className="event-gallery" data-aos="fade-up">
        <h3>Events & Community Involvement</h3>
        <div className="event-cards">
          <div className="event-card" data-aos="fade-right">
            <img src="/workshop.jpg" alt="Event 1" />
            <p>2-Day Capacity Bilding Workshop On Smart Agriculture</p>
          </div>
          <div className="event-card" data-aos="fade-up">
            <img src="/nivida-workshop.jpg" alt="Event 2" />
            <p>Attended NIVIDA-UNN AI Workshop</p>
          </div>
          <div className="event-card" data-aos="fade-left">
            <img src="/bitcoin-pizza-day.jpg" alt="Event 3" />
            <p>Attended World Bitcoin Pizza Day</p>
          </div>
        </div>
      </section>
      <div className="pill-categories-1">
            <a href="/about" className="pill themed">About</a>
            <a href="/projects" className="pill themed">Projects</a>
            <a href="/contact" className="pill themed">Contact</a>
            <a href="/home" className="pill themed">Home</a>
          </div>
    </div>
  );
}

export default Gallery;
