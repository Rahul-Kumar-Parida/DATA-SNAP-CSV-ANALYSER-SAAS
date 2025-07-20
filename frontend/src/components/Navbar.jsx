import React from "react";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">DataSnap</div>
    <ul className="navbar-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#contact">Contact Us</a></li>
    </ul>
  </nav>
);

export default Navbar;