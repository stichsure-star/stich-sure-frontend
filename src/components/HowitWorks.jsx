import React, { useRef } from "react";
import {
  FaSearch,
  FaCube,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../styles/HowitWorks.css";
// import Background from "../assets/gbenga/StitchCam.png";

const steps = [
  {
    id: 1,
    icon: <FaSearch />,
    step: "Step 1",
    title: "Browse & Select",
    description:
      "Search verified designers, view portfolios and compare prices",
  },
  {
    id: 2,
    icon: <FaCube />,
    step: "Step 2",
    title: "Submit Request",
    description:
      "Fill structured design request with measurements and preferences",
  },
  {
    id: 3,
    icon: <FaChartLine />,
    step: "Step 3",
    title: "Track Production",
    description: "Monitor real-time progress from cutting to final touches",
  },
  {
    id: 4,
    icon: <FaSearch />,
    step: "Step 4",
    title: "Secure Delivery",
    description:
      "Get your custom outfit delivered on time with our internal logistics",
  },
];

const HowItWorks = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -370,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 370,
      behavior: "smooth",
    });
  };

  return (
    <section className="how">
      <h1>How It Works</h1>

      <p className="how_text">
        A streamlined process that eliminates late deliveries and ensures
        quality production
      </p>

      <div className="how_cards" ref={sliderRef}>
        {steps.map((item) => (
          <div className="how_card" key={item.id}>
            <div className="icon_box">{item.icon}</div>

            <h3>{item.step}</h3>

            <h4>{item.title}</h4>

            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <div className="slider_btns">
        <button onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <button onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;
