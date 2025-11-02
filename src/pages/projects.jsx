// File: src/pages/Projects.js
import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

function Projects() {
  return (
    <div className="page-container">
      <div className="project-section">
        <div className="section-content">
          <h2 className="name">Projects</h2>

          <ul>
            <li className="link-list-item">
              <span>Landing Page for a clothing brand</span>
              <button
                className="themed-link-button"
                onClick={() => window.open("https://github.com/Sage-senpai/dvyne-clothing-brand.github.io", "_blank")}
              >
                View →
              </button>
            </li>
             <li className="link-list-item">
              <span>Period-Tracker-App</span>
              <button
                className="themed-link-button"
                onClick={() => window.open("https://github.com/Sage-senpai/Lunera", "_blank")}
              >
                View →
              </button>
            </li>
            <li className="link-list-item">
              <span>Nsukka Yellow Pepper</span>
              <button
                className="themed-link-button"
                //onClick={() => window.open("https://example.com/dao-portal", "_blank")}
              >
                View →
              </button>
            </li>
            <li className="link-list-item">
              <span>Smart Agriculture Irrigation System</span>
              <button
                className="themed-link-button"
                //onClick={() => window.open("https://example.com/identity-wallet", "_blank")}
              >
                View →
              </button>
            </li>
          </ul>

          <h2 className="name" style={{ marginTop: "2rem" }}>My Work</h2>
          <ul>
            <li className="link-list-item">
              <span>X Thread on Hackathon Gentrifications</span>
              <button
                className="themed-link-button"
                onClick={() => window.open("https://x.com/sage_senpeak/status/1983842857359437830", "_blank")}
              >
                Read →
              </button>
            </li>
             <li className="link-list-item">
              <span>Crypto Investment Landing Page</span>
              <button
                className="themed-link-button"
                onClick={() => window.open("https://github.com/Sage-senpai/SummitYield", "_blank")}
              >
                View →
              </button>
            </li>
            <li className="link-list-item">
              <span>X Thread: Kusama AssetHub Migration</span>
              <button
                className="themed-link-button"
                onClick={() => window.open("https://x.com/sage_senpeak/status/1975485357933441433", "_blank")}
              >
                View →
              </button>
            </li>
            <li className="link-list-item">
              <span>dApp built with Sui and React (GitHub link)</span>
              <button
                className="themed-link-button"
                onClick={() => window.open("https://github.com/sage-senpai/DOTique", "_blank")}
              >
                Code →
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="pill-categories-1">
        <Link to="/" className="pill themed">Home</Link>
                    <Link to="/about" className="pill themed">About</Link>
                    <Link to="/contact" className="pill themed">Contact</Link>
                    <Link to="/gallery" className="pill themed">Gallery</Link>
      </div>
    </div>
  );
}

export default Projects;
