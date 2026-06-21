import React, { useEffect, useState } from "react";
import "../styles/DesignerProfile.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  HiMapPin,
  HiBriefcase,
  HiCheckBadge,
  HiStar,
  HiOutlineHeart,
} from "react-icons/hi2";
import text from "../assets/daniel/Text.png";
import yoruba from "../assets/daniel/Yorubabride.png";
import aso from "../assets/daniel/Aso-Oke.png";
import ankara from "../assets/daniel/AnkaraGown.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { designerApi } from "../config/designer";

function DanDesignerProfile() {
  const navigate = useNavigate();

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

  const { id } = useParams();
  console.log(id);
  const [profile, setProf] = useState({});

  const fetchData = async () => {
    try {
      const response = await designerApi.getOne(id);
      console.log("response", response.data.data);
      setProf(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("profile", profile);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dp-page-container">
      <main className="dp-main-content">
        <div className="dp-profile-card">
          <button className="dp-favorite-btn" aria-label="Add to favorites">
            <HiOutlineHeart />
          </button>

          <div className="dp-card-body">
            <img
              src={profile?.profile?.profilePhoto}
              alt="Adebayo Styles"
              className="dp-avatar"
            />

            <div className="dp-info-section">
              <h1 className="dp-designer-name">
                {profile?.profile?.businessName}
              </h1>
              <h2 className="dp-designer-type">
                {profile?.profile?.specialization}
              </h2>

              <div className="dp-meta-row">
                <span className="dp-meta-item">
                  <HiMapPin className="dp-meta-icon" /> Lagos, Nigeria
                </span>
                <span className="dp-meta-item">
                  <HiBriefcase className="dp-meta-icon" />{" "}
                  {profile.profile?.yearsOfExperience} years experience
                </span>
                <span className="dp-meta-item">
                  <HiBriefcase className="dp-meta-icon" />
                  {profile?.profile?.completedOrders} completed orders
                </span>
              </div>

              <div className="dp-rating-row">
                <div className="dp-stars">
                  <HiStar className="dp-star active" />
                  <HiStar className="dp-star active" />
                  <HiStar className="dp-star active" />
                  <HiStar className="dp-star active" />
                  <HiStar className="dp-star active" />
                </div>
                <span className="dp-rating-score">
                  {profile?.profile?.ratingAverage}
                </span>
                <span className="dp-review-count">(3 reviews)</span>
                <span className="dp-verified-tag">
                  <HiCheckBadge className="dp-verified-icon" /> Verified
                  Designer
                </span>
              </div>

              <p className="dp-bio">{profile?.profile?.shortBio}</p>

              <div className="dp-specializations">
                <span className="dp-spec-label">Specializations:</span>
                <div className="dp-spec-tags">
                  <span className="dp-spec-tag">
                    {profile?.profile?.specialization}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="dp-action-row">
            {/* <button
              onClick={() => navigate("/user/requiredetails")}
              className="dp-hire-btn"
            >
              Hire Designer
            </button> */}
          </div>

          <div className="dp-reliability-section">
            <div className="dp-reliability-labels">
              <span className="dp-reliability-title">Reliability Score</span>
              <span className="dp-reliability-value">
                {profile?.profile?.reliabilityScore ?? 0}%
              </span>
            </div>
            <div className="dp-progress-track">
              <div
                className="dp-progress-fill"
                style={{
                  width: `${profile?.profile?.reliabilityScore ?? 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {profile?.designs?.length > 0 ? (
          <div className="dp-portfolio-grid">
            {profile.designs.map((item) => (
              <div key={item.id} className="dp-portfolio-card">
                <div className="dp-image-container">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="dp-portfolio-img"
                  />
                </div>
                <div className="dp-portfolio-details">
                  <h3 className="dp-item-title">{item.title}</h3>
                  <p className="dp-item-category">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="dp-empty-designs-title">Add your design</h1>
        )}
      </main>
    </div>
  );
}
export default DanDesignerProfile;
