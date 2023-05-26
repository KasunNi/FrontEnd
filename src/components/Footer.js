import React from 'react';
import '../css/Footer.css'; // Import the styles.css file


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const created = 'RAD Module Project';

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {currentYear} - Created for {created}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
