import React from "react";
import "../styles/HeroSection.css";
import { BsSearch } from "react-icons/bs";
import imged from "../assets/gbenga/StitchCam.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="Hero_con">
      <section className="Hero_content">
        <article className="Hero_text_content">
          <h1>
            Connect With Trusted <br /> Fashion Designers
          </h1>
          <p>
            Say goodbye to late deliveries. Our platform
            connect customers with verified designers and 
            enables seamless collaboration for on-time fashion
            production.
            
          </p>
          <div className="Hero_btns">
            <button 
            onClick={() => navigate("/customersignup")}
            className="Hero_btn_primary">
              <BsSearch />
               Find a Designer
            </button>
            <button 
            onClick={() => navigate ("/signup")}
            className="Hero_btn_secondary"
            >Join as a Designer
            </button>
          </div>
        </article>
        <article className="Hero_image_content">
          <img src={imged} alt="Fashion Designer" className="Hero_img" />
        </article>
      </section>
    </div>
  );
};

export default HeroSection;
