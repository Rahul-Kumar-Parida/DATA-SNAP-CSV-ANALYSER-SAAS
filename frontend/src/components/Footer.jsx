import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <span>© {new Date().getFullYear()} DataSnap. All rights reserved.</span>
    <span>Powered by DataSnap</span>
  </footer>
);

export default Footer;