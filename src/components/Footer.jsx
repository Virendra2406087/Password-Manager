import React from "react";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <p className="tagline">
          Secure • Simple • Smart Password Manager
        </p>
        <p className="credit">
          © {new Date().getFullYear()} PassSafe PRO — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
