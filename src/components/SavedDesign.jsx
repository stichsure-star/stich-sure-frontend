import React, { useState } from "react";
import { HiMapPin, HiStar, HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import "../styles/DesignerGrid.css";

import Containlace from "../assets/daniel/Contain lace.png";
import mensenator from "../assets/daniel/Mensenitor.png";
import womendesign from "../assets/daniel/Container women.png";
import fibre from "../assets/daniel/Fiber.png";
import menstyle from "../assets/daniel/Manstyle.png"
import cleanwear from "../assets/daniel/Cleanwear.png"


function DesignersGrid() {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const designers = [
    {
      id: 1,
      name: "Adebayo Styles",
      specialty: "Traditional Wear",
      rating: "4.9",
      description: "Specialist in Yoruba traditional attire with 15+ years experience",
      location: "Lagos",
      orders: "156 orders",
      image: Containlace,
    },
    {
      id: 2,
      name: "Chioma Couture",
      specialty: "Bridal Fashion",
      rating: "5",
      description: "Award-winning bridal designer creating dream wedding outfits",
      location: "Abuja",
      orders: "211 orders",
      image: mensenator,
    },
    {
      id: 3,
      name: "Emeka Tailoring",
      specialty: "Corporate Attire",
      rating: "4.8",
      description: "Premium corporate suits and professional menswear tailoring",
      location: "Port Harcourt",
      orders: "98 orders",
      image: womendesign,
    },
    {
      id: 4,
      name: "Grace Fashion House",
      specialty: "Casual Wear",
      rating: "4.6",
      description: "Contemporary casual styles for the modern day individual",
      location: "Ibadan",
      orders: "142 orders",
      image: fibre,
    },
    {
      id: 5,
      name: "Kings Couture",
      specialty: "Traditional Wear",
      rating: "5",
      description: "Master craftsman in all traditional Nigerian styles and fittings",
      location: "Lagos",
      orders: "178 orders",
      image: menstyle,
    },
    {
      id: 6,
      name: "Bella Bridal",
      specialty: "Bridal Fashion",
      rating: "4.7",
      description: "Elegant and sophisticated bridal collections for custom orders",
      location: "Enugu",
      orders: "96 orders",
      image: cleanwear,
    }
  ];

  return (
    <div className="dg-page-wrapper">
      <main className="dg-main-content">
        <div className="dg-cards-grid">
          {designers.map((designer) => (
            <div key={designer.id} className="dg-designer-card">
              <div className="dg-card-image-wrap">
                <img src={designer.image} alt={designer.name} className="dg-card-img" />
                <button 
                  className={`dg-heart-btn ${favorites[designer.id] ? "is-active" : ""}`} 
                  onClick={() => toggleFavorite(designer.id)}
                  aria-label="Favorite"
                >
                  {favorites[designer.id] ? <HiHeart /> : <HiOutlineHeart />}
                </button>
              </div>

              <div className="dg-card-info">
                <div className="dg-name-rating-row">
                  <h3 className="dg-designer-name">{designer.name}</h3>
                  <div className="dg-rating-badge">
                    <HiStar className="dg-star-icon" />
                    <span>{designer.rating}</span>
                  </div>
                </div>

                <p className="dg-designer-specialty">{designer.specialty}</p>
                <p className="dg-designer-desc">{designer.description}</p>

                <div className="dg-meta-row">
                  <span className="dg-meta-item">
                    <HiMapPin className="dg-pin-icon" /> {designer.location}
                  </span>
                  <span className="dg-meta-divider">•</span>
                  <span className="dg-meta-item">{designer.orders}</span>
                </div>

                <button className="dg-profile-btn">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default DesignersGrid;