import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/Design.css";

import img1 from "../assets/gbenga/Gown.png";
import img2 from "../assets/gbenga/Gown.png";
import img3 from "../assets/gbenga/Gown.png";
import img4 from "../assets/gbenga/Gown.png";
import img5 from "../assets/gbenga/Gown.png";
import img6 from "../assets/gbenga/Gown.png";
import img7 from "../assets/gbenga/Gown.png";
import img8 from "../assets/gbenga/Gown.png";
import img9 from "../assets/gbenga/Gown.png";

const slides = [
  [img1, img2, img3],
  [img4, img5, img6],
  [img7, img8, img9],
];

const Design = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="Design_container">
      <h1>Featured Designs</h1>

      <p className="Design_text">
        Discover outstanding fashion pieces created by our verified designers
      </p>

      <div className="Design_wrapper">
        <button className="Design_arrow" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div className="Design_slider" ref={sliderRef}>
          {slides.map((group, index) => (
            <div className="Design_slide" key={index}>
              {group.map((image, idx) => (
                <div className="Design_card" key={idx}>
                  <img src={image} alt="design" />
                </div>
              ))}
            </div>
          ))}
        </div>

        <button className="Design_arrow" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Design;
