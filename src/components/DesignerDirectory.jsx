import React, { useState } from "react";
import "../styles/DesignerDirectory.css";
import { useLocation } from "react-router-dom";
import { HiMapPin, HiBriefcase, HiCheckBadge, HiStar } from "react-icons/hi2";

import text from "../assets/daniel/Text.png";
import yoruba from "../assets/daniel/Yorubabride.png";
import aso from "../assets/daniel/Aso-Oke.png";
import ankara from "../assets/daniel/AnkaraGown.png";

const DesignerDirectory = () => {
  const location = useLocation();
  const designer = location.state;

  console.log("selected designer:", designer);
  const [loading, setLoading] = useState(false);

  const profile = designer?.designerId?.profile;

  // fallback only for demo if no backend portfolio
  const defaultPortfolio = [
    { id: 1, image: text, title: "Royal Agbada", category: "Traditional" },
    { id: 2, image: yoruba, title: "Yoruba Bride", category: "Bridal" },
    { id: 3, image: aso, title: "Aso-Oke Set", category: "Traditional" },
    { id: 4, image: ankara, title: "Ankara Gown", category: "Casual" },
  ];

  const design = designer?.designerId?.designs;
  console.log("design", design);

  const portfolioItems = profile?.portfolio || [];

  const specializations = Array.isArray(profile?.specialization)
    ? profile.specialization
    : profile?.specialization
      ? profile.specialization.split(",")
      : [];

  const rating = Math.round(profile?.rating || 0);

  return (
    <div className="dd-page-container">
      <main className="dd-main-content">
        <div className="dd-profile-card">
          <div className="dd-card-body">
            <img
              src={profile?.profilePhoto}
              alt="designer"
              className="dd-avatar"
            />

            <div className="dd-info-section">
              <h1 className="dd-designer-name">{profile?.businessName}</h1>

              <h2 className="dd-designer-type">
                {profile?.specialization || "Fashion Designer"}
              </h2>

              <div className="dd-meta-row">
                <span className="dd-meta-item">
                  <HiMapPin className="dd-meta-icon" />
                  {profile?.state}, {profile?.country}
                </span>

                <span className="dd-meta-item">
                  <HiBriefcase className="dd-meta-icon" />
                  {profile?.yearsOfExperience || 0} years experience
                </span>

                <span className="dd-meta-item">
                  <HiBriefcase className="dd-meta-icon" />
                  {profile?.completedOrders || 0} completed orders
                </span>
              </div>

              <div className="dd-rating-row">
                <div className="dd-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <HiStar
                      key={star}
                      className={star <= rating ? "dd-star active" : "dd-star"}
                    />
                  ))}
                </div>

                <span className="dd-rating-score">{profile?.rating || 0}</span>

                <span className="dd-review-count">
                  ({profile?.ratingCount || 0} reviews)
                </span>

                <span className="dd-verified-tag">
                  <HiCheckBadge className="dd-verified-icon" />
                  Verified Designer
                </span>
              </div>

              <p className="dd-bio">
                {profile?.shortBio || "No bio added yet"}
              </p>

              <div className="dd-specializations">
                <span className="dd-spec-label">Specializations:</span>

                <div className="dd-spec-tags">
                  {specializations.length > 0 ? (
                    specializations.map((item, index) => (
                      <span key={index} className="dd-spec-tag">
                        {item.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="dd-spec-tag">No specialization</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="dd-reliability-section">
            <div className="dd-reliability-labels">
              <span className="dd-reliability-title">Reliability Score</span>

              <span className="dd-reliability-value">
                {profile?.reliabilityScore || 0}
              </span>
            </div>

            <div className="dd-progress-track">
              <div
                className="dd-progress-fill"
                style={{
                  width: `${profile?.reliabilityScore || 0}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="dd-portfolio-grid">
          {design?.length > 0 ? (
            design.map((item) => (
              <div key={item.id} className="dd-portfolio-card">
                <div className="dd-image-container">
                  <img
                    src={item.designImage}
                    alt={item.title}
                    className="dd-portfolio-img"
                  />
                </div>

                <div className="dd-portfolio-details">
                  <h3 className="dd-item-title">{item.title}</h3>

                  <p className="dd-item-category">{item.category}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="dd-empty-state">
              <h3>No Designs Yet</h3>

              <p>This designer has not uploaded any designs.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DesignerDirectory;
