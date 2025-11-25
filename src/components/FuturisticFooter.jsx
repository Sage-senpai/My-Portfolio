import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaEnvelope, FaX } from "react-icons/fa6";
import "../styles/global.scss";

function FuturisticFooter() {
  return (
    <footer className="footer glass">
      <p>Connect with me:</p>
      <ul className="social-links">
        <li>
          <a href="https://x.com/divine_anyadike" target="_blank" rel="noreferrer">
            <FaX />
          </a>
        </li>
        <li>
          <a href="https://github.com/sage-senpai" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/in/divineanyadike" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a href="mailto:anyadikedivine0@gmail.com" target="_blank" rel="noreferrer">
            <FaEnvelope />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default FuturisticFooter;
