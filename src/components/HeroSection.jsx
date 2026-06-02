import React from "react";
import "../styles/HeroSection.css";
import Fashion from "../assets/gbenga/StitchCam.png";
import { BsSearch } from "react-icons/bs";

const HeroSection = () => {
  return (
    <div className="Hero_con">
      <section className="Hero_content">
        <article className="Hero_text_content">
          <h1>
            Connect With Trusted <br /> Fashion Designers
          </h1>
          <p>
            Connecting customers with verified designers for on-time delivery,
            quality craftsmanship, and seamless fashion experiences.
          </p>
          <div className="Hero_btns">
            <button className="Hero_btn_primary">
              <BsSearch /> Find a Designer
            </button>
            <button className="Hero_btn_secondary">Join as Designer</button>
          </div>
        </article>
        <article className="Hero_image_content">
          <img src={Fashion} alt="Fashion Designer" className="Hero_img" />
        </article>
      </section>
    </div>
  );
};

export default HeroSection;
