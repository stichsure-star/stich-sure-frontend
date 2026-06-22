import React from "react";
import '../styles/Hero.css';
import man from "../assets/daniel/Man fashion.jpg";

const Hero = () => {
  return (
    <div
      className="designer-hero"
    >
      <img src={man} alt="" className="hero-img" />
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
            <option>Agbada</option>
            <option>Bridal</option>
            <option>Street Wear</option>
            <option>Senator Wear</option>
            <option>Female Wear</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Hero;