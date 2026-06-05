import React from "react";
import "../styles/Herocopy.css";
import color from "../assets/daniel/Colorful Ankara.png";

const Herocopy= () => {
  return (
    <section
      className="features-hero"
      style={{ backgroundImage: `url(${color})` }}
    >
      <div className="feature-overlay">
        <h1>Platform Features That Solve Real Problems</h1>

        <p>
          Every feature is designed to eliminate late deliveries,
          fake designers and create a transparent fashion ecosystem.
        </p>
      </div>
    </section>
  );
};

export default Herocopy;