import React from "react";
import "../../User/css/Footer.css";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="Footing">
      <footer className="Footer">
        <p>© 2026 Stitchsure. All rights reserved.</p>

        <div className="Footer_icons">
          <FaInstagram />
          <FaTwitter />
          <FaFacebook />
          <FaLinkedin />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
