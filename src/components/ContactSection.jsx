// ============================================================================
// FILE: src/components/ContactSection.jsx
// DESCRIPTION: Contact section with social links
// ============================================================================

import React from "react";
import { Element } from "react-scroll";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import "../styles/global.scss";

export default function ContactSection() {
  return (
    <Element name="contact" className="page-container">
      <div className="section">
        <div className="section-image">
          <img src="/contact.jpg" alt="Contact" className="modern-profile-img framed" />
        </div>

        <div className="section-content">
          <h2 className="name gradient-text">Contact Me</h2>

          <ul style={{ listStyle: 'none', padding: 0 }}>
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
    </Element>
  );
}