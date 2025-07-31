// File: src/pages/Projects.js
import React from "react";
import "../index.css";

function Projects() {
  return (
    <div className="page-container">
      <div className="project-section">
        <div className="section-content">
          <h2 className="name">Projects</h2>

          <ul>
            <li className="link-list-item">
              <span>NFT Minting Platform</span>
              <button
                className="themed-link-button"
                onClick={() => window.open("https://example.com/nft-platform", "_blank")}
              >
                View →
              </button>
            </li>
            <li className="link-list-item">
              <span>Nsukka Yellow Pepper</span>
              <button
                className="themed-link-button"
                onClick={() => window.open("https://example.com/dao-portal", "_blank")}
              >
                View →
              </button>
            </li>
            <li className="link-list-item">
              <span>Smart Agriculture Irrigation System</span>
              <button
                className="themed-link-button"
                onClick={() => window.open("https://example.com/identity-wallet", "_blank")}
              >
                View →
              </button>
            </li>
          </ul>

          <h2 className="name" style={{ marginTop: "2rem" }}>My Work</h2>
          <ul>
            <li className="link-list-item">
              <span>X Thread on Sui Object Model</span>
              <button
                className="themed-link-button"
                onClick={() => window.open("https://yourblog.com/sui-object-model", "_blank")}
              >
                Read →
              </button>
            </li>
            <li className="link-list-item">
              <span>X Thread: Polkadot's Identity Chains</span>
              <button
                className="themed-link-button"
                onClick={() => window.open("https://twitter.com/yourthreadlink", "_blank")}
              >
                View →
              </button>
            </li>
            <li className="link-list-item">
              <span>dApp built with Sui and React (GitHub link)</span>
              <button
                className="themed-link-button"
                onClick={() => window.open("https://github.com/your-username/sui-dapp", "_blank")}
              >
                Code →
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="pill-categories-1">
        <a href="/home" className="pill themed">Home</a>
        <a href="/about" className="pill themed">About</a>
        <a href="/contact" className="pill themed">Contact</a>
        <a href="/gallery" className="pill themed">Gallery</a>
      </div>
    </div>
  );
}

export default Projects;
