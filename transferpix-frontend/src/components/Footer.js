import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 TransferPix. All rights reserved.</p>
      <div className="social-links">
        <a href="https://www.linkedin.com/in/yafet-getachew" target="_blank" rel="noopener noreferrer">
          <img src="/icons/linkedin-icon.png" alt="LinkedIn" />
        </a>
        <a href="https://github.com/YafetG3" target="_blank" rel="noopener noreferrer">
          <img src="/icons/github-icon.png" alt="GitHub" />
        </a>
        <a href="https://instagram.com/yafet.yg" target="_blank" rel="noopener noreferrer">
          <img src="/icons/instagram-icon.png" alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;