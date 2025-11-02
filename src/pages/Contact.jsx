// File: src/pages/Contact.js
import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import "../index.css";
import { FaX } from "react-icons/fa6";

function Contact() {
  return (
    <div className="page-container">
      <div className="section">
        <div className="section-image">
          {/* Replace with your actual image */}
          <img
            src="/contact.jpg"
            alt="Contact"
            className="modern-profile-img framed"
          />
        </div>

        <div className="section-content">
          <h2 className="name">Contact Me</h2>

          <ul>
          <li className="link-list-item">
    <span>Email Me</span>
    <button
      className="themed-link-button"
      onClick={() => window.open("mailto:anyadikedivine0@gmail.com", "_blank")}
    >
      <FaEnvelope />
    </button>
  </li>

  <li className="link-list-item">
    <span>Follow on X</span>
    <button
      className="themed-link-button"
      onClick={() => window.open("https://x.com/sage_senpeak", "_blank")}
    >
      <FaX />
    </button>
  </li>

  <li className="link-list-item">
    <span>Connect on LinkedIn</span>
    <button
      className="themed-link-button"
      onClick={() => window.open("https://linkedin.com/in/divineanyadike", "_blank")}
    >
      <FaLinkedin />
    </button>
  </li>

  <li className="link-list-item">
    <span>Check out my GitHub</span>
    <button
      className="themed-link-button"
      onClick={() => window.open("https://github.com/sage-senpai", "_blank")}
    >
      <FaGithub />
    </button>
  </li>

          </ul>
        </div>
      </div>

       <div className="pill-categories-1">
              <Link to="/" className="pill themed">Home</Link>
                          <Link to="/about" className="pill themed">About</Link>
                          <Link to="/projects" className="pill themed">Projects</Link>
                          <Link to="/gallery" className="pill themed">Gallery</Link>
            </div>
    </div>
  );
}

export default Contact;
