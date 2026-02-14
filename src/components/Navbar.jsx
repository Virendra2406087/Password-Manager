import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          className="Image-Logo"
          src="/PassSafe PRO.jpeg"
          alt="Not Found"
        />
      </div>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`home-bar ${menuOpen ? "show" : ""}`}>
        <div className="manager-header">
          <h1 className="logo">
            <span className="t1">&lt;</span>
            PassSafe
            <span className="t1">PRO/&gt;</span>
          </h1>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
