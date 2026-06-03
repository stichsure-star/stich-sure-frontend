import React from "react";
import '../styles/Hero.css';
import man from "../assets/daniel/Man fashion.jpg";

const Hero = () => {
  return (
    <div
      className="designer-hero"
      style={{ backgroundImage: `url(${man})` }}
    >
      <div className="hero-overlay">
        <h1>Browse Verified Designers</h1>

        <p>
          Every designer is KYC-verified with proven reliability scores.
          Browse by category or search by specialty.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by specialty..."
          />

          <select>
            <option>Category</option>
            <option>Fashion</option>
            <option>Textile</option>
            <option>Branding</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Hero;