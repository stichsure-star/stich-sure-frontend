import React from "react";
// import "../styles/DesignerProfile.css";
import "../styles/DesignerDirectory.css"
import { useNavigate } from "react-router-dom";
import {
 HiMapPin,
  HiBriefcase,
  HiCheckBadge,
  HiStar,
//   HiOutlineHeart,
} from "react-icons/hi2";
import text from "../assets/daniel/Text.png";
import yoruba from "../assets/daniel/Yorubabride.png";
import aso from "../assets/daniel/Aso-Oke.png";
import ankara from "../assets/daniel/AnkaraGown.png";
import { NavLink } from "react-router-dom";

const DesignerDirectory= () => {
  const portfolioItems = [
    { id: 1, image: text, title: "Royal Agbada", category: "Traditional" },
    { id: 2, image: yoruba, title: "Yoruba Bride", category: "Bridal" },
    { id: 3, image: aso, title: "Aso-Oke Set", category: "Traditional" },
    { id: 4, image: ankara, title: "Ankara Gown", category: "Casual" },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60",
      title: "Senator Style",
      category: "Corporate",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1611590027211-b954fd027b51?w=500&auto=format&fit=crop&q=60",
      title: "Festival Outfit",
      category: "Traditional",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60",
      title: "Festival Outfit",
      category: "Traditional",
    },
  ];

  return (
    <div className="dd-page-container">
      <main className="dd-main-content">
        <div className="dd-profile-card">
          {/* <button className="dd-favorite-btn" aria-label="Add to favorites">
            <HiOutlineHeart />
          </button> */}

          <div className="dd-card-body">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Adebayo Styles"
              className="dd-avatar"
            />

            <div className="dd-info-section">
              <h1 className="dd-designer-name">Adebayo Styles</h1>
              <h2 className="dd-designer-type">Traditional Wear</h2>

              <div className="dd-meta-row">
                <span className="dd-meta-item">
                  <HiMapPin className="dd-meta-icon" /> Lagos, Nigeria
                </span>
                <span className="dd-meta-item">
                  <HiBriefcase className="dd-meta-icon" /> 15 years experience
                </span>
                <span className="dd-meta-item">
                  <HiBriefcase className="dd-meta-icon" /> 156 completed orders
                </span>
              </div>

              <div className="dd-rating-row">
                <div className="dd-stars">
                  <HiStar className="dd-star active" />
                  <HiStar className="dd-star active" />
                  <HiStar className="dd-star active" />
                  <HiStar className="dd-star active" />
                  <HiStar className="dd-star active" />
                </div>
                <span className="dd-rating-score">4.9</span>
                <span className="dd-review-count">(3 reviews)</span>
                <span className="dd-verified-tag">
                  <HiCheckBadge className="dd-verified-icon" /> Verified
                  Designer
                </span>
              </div>

              <p className="dd-bio">
                Award-winning fashion designer specializing in traditional
                Nigerian attire. With over 15 years of experience, I bring
                cultural heritage and modern elegance together in every piece I
                create.
              </p>

              <div className="dd-specializations">
                <span className="dd-spec-label">Specializations:</span>
                <div className="dd-spec-tags">
                  <span className="dd-spec-tag">Traditional Wear</span>
                  <span className="dd-spec-tag">Aso-Oke</span>
                  <span className="dd-spec-tag">Agbada</span>
                  <span className="dd-spec-tag">Ankara Styles</span>
                  <span className="dd-spec-tag">Custom Embroidery</span>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="dd-action-row">
            <NavLink to="/user/requiredetails">
              <button className="dd-hire-btn">Hire Designer</button>
            </NavLink>
          </div> */}

          <div className="dd-reliability-section">
            <div className="dd-reliability-labels">
              <span className="dd-reliability-title">Reliability Score</span>
              <span className="dd-reliability-value">86%</span>
            </div>
            <div className="dd-progress-track">
              <div className="dd-progress-fill" style={{ width: "86%" }}></div>
            </div>
          </div>
        </div>

        <div className="dd-portfolio-grid">
          {portfolioItems.map((item) => (
            <div key={item.id} className="dd-portfolio-card">
              <div className="dd-image-container">
                <img
                  src={item.image}
                  alt={item.title}
                  className="dd-portfolio-img"
                />
              </div>
              <div className="dd-portfolio-details">
                <h3 className="dd-item-title">{item.title}</h3>
                <p className="dd-item-category">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
export default DesignerDirectory;
