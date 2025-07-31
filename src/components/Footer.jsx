// File: src/components/Footer.js
import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import "../index.css";
import { FaEnvelope, FaX } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">
      <p>Connect with me:</p>
      <ul className="social-links">
        <li><a href="https://x.com/divine_anyadike" target="_blank" rel="noopener noreferrer"><FaX /></a></li>
        <li><a href="https://github.com/sage-senpai" target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
        <li><a href="https://linkedin.com/in/divineanyadike" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
        <li><a href="https://anyadikedivine0@gmail.com/" target="_blank" 
        rel="noopener noreferrer"><FaEnvelope/></a></li>
      </ul>
    </footer>
  );
}

export default Footer;
