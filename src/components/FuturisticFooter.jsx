// ============================================================================
// FILE: src/components/FuturisticFooter.jsx
// DESCRIPTION: Footer with social links - Black/Red/White theme
// ============================================================================

import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaEnvelope, FaX } from "react-icons/fa6";
import "../styles/global.scss";

function FuturisticFooter() {
  return (
    <footer style={{
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 0, 0, 0.3)',
      padding: '2rem',
      textAlign: 'center',
      marginTop: '4rem',
    }}>
      <p style={{ 
        color: '#fff', 
        marginBottom: '1.5rem',
        fontSize: '1.1rem',
      }}>
        Connect with me:
      </p>
      
      <ul style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        flexWrap: 'wrap',
      }}>
        <li>
          <a 
            href="https://x.com/sage_senpeak" 
            target="_blank" 
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              background: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: '50%',
              color: '#FF0000',
              fontSize: '1.5rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'linear-gradient(135deg, #FF0000, #CC0000)';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(-5px) rotate(360deg)';
              e.target.style.boxShadow = '0 10px 30px rgba(255, 0, 0, 0.6)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(0, 0, 0, 0.8)';
              e.target.style.color = '#FF0000';
              e.target.style.transform = 'translateY(0) rotate(0deg)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <FaX />
          </a>
        </li>
        
        <li>
          <a 
            href="https://github.com/sage-senpai" 
            target="_blank" 
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              background: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: '50%',
              color: '#FF0000',
              fontSize: '1.5rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'linear-gradient(135deg, #FF0000, #CC0000)';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(-5px) rotate(360deg)';
              e.target.style.boxShadow = '0 10px 30px rgba(255, 0, 0, 0.6)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(0, 0, 0, 0.8)';
              e.target.style.color = '#FF0000';
              e.target.style.transform = 'translateY(0) rotate(0deg)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <FaGithub />
          </a>
        </li>
        
        <li>
          <a 
            href="https://linkedin.com/in/divineanyadike" 
            target="_blank" 
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              background: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: '50%',
              color: '#FF0000',
              fontSize: '1.5rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'linear-gradient(135deg, #FF0000, #CC0000)';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(-5px) rotate(360deg)';
              e.target.style.boxShadow = '0 10px 30px rgba(255, 0, 0, 0.6)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(0, 0, 0, 0.8)';
              e.target.style.color = '#FF0000';
              e.target.style.transform = 'translateY(0) rotate(0deg)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <FaLinkedin />
          </a>
        </li>
        
        <li>
          <a 
            href="mailto:anyadikedivine0@gmail.com" 
            target="_blank" 
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              background: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: '50%',
              color: '#FF0000',
              fontSize: '1.5rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'linear-gradient(135deg, #FF0000, #CC0000)';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(-5px) rotate(360deg)';
              e.target.style.boxShadow = '0 10px 30px rgba(255, 0, 0, 0.6)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(0, 0, 0, 0.8)';
              e.target.style.color = '#FF0000';
              e.target.style.transform = 'translateY(0) rotate(0deg)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <FaEnvelope />
          </a>
        </li>
      </ul>

      <p style={{ 
        color: '#999', 
        marginTop: '2rem',
        fontSize: '0.9rem',
      }}>
        © 2025 Anyadike Divine. All rights reserved.
      </p>
    </footer>
  );
}

export default FuturisticFooter;