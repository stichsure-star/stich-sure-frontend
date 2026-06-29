import React, { useEffect, useState } from "react";
import "../styles/DesignerProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  HiMapPin,
  HiBriefcase,
  HiCheckBadge,
  HiStar,
  HiOutlineHeart,
  HiHeart,
} from "react-icons/hi2";

import Swal from "sweetalert2";

import text from "../assets/daniel/Text.png";
import yoruba from "../assets/daniel/Yorubabride.png";
import aso from "../assets/daniel/Aso-Oke.png";
import ankara from "../assets/daniel/AnkaraGown.png";

import { designerApi } from "../config/designer";
import { customerApi } from "../config/customer";
import { SkeletonProfile } from "../components/reuasbleComponents/Skeleton";

function DanDesignerProfile() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [profile, setProf] = useState({});
  const [loading, setLoading] = useState(true);

  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await designerApi.getOne(id);

      setProf(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    try {
      const res = await customerApi.savedDesigner();

      const saved = res.data.data.some(
        (item) => item.designerId === id || item._id === id,
      );

      setIsFavorite(saved);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    checkFavorite();
  }, [id]);

  const toggleFavorite = async () => {
    if (favLoading) return;

    try {
      setFavLoading(true);

      if (isFavorite) {
        await customerApi.removeDesigner(id);

        setIsFavorite(false);

        Swal.fire({
          icon: "success",
          title: "Removed",
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        await customerApi.saveDesigner(id);

        setIsFavorite(true);

        Swal.fire({
          icon: "success",
          title: "Saved",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong",
      });
    } finally {
      setFavLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dp-page-container">
        <main className="dp-main-content">
          <SkeletonProfile />
        </main>
      </div>
    );
  }

  return (
    <div className="dp-page-container">
      <main className="dp-main-content">
        <div className="dp-profile-card">
          <button
            className="dp-favorite-btn"
            aria-label="favorite"
            onClick={toggleFavorite}
          >
            {isFavorite ? <HiHeart /> : <HiOutlineHeart />}
          </button>

          <div className="dp-card-body">
            <img
              src={profile?.profile?.profilePhoto}
              alt="designer"
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
                  <HiMapPin className="dp-meta-icon" />
                  Lagos, Nigeria
                </span>

                <span className="dp-meta-item">
                  <HiBriefcase className="dp-meta-icon" />
                  {profile?.profile?.yearsOfExperience} years experience
                </span>

                <span className="dp-meta-item">
                  <HiBriefcase className="dp-meta-icon" />
                  {profile?.profile?.completedOrders} completed orders
                </span>
              </div>

              <div className="dp-rating-row">
                <div className="dp-stars">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const rating = Number(profile?.profile?.ratingAverage) || 0;

                    return (
                      <HiStar
                        key={star}
                        className={`dp-star ${
                          star <= Math.round(rating) ? "active" : ""
                        }`}
                      />
                    );
                  })}
                </div>

                <span className="dp-rating-score">
                  {Number(profile?.profile?.ratingAverage || 0).toFixed(1)}
                </span>

                <span className="dp-review-count">
                  ({profile?.profile?.ratingCount || 0}
                  reviews)
                </span>

                {profile?.profile?.isKycVerified && (
                  <span className="dp-verified-tag">
                    <HiCheckBadge className="dp-verified-icon" />
                    Verified Designer
                  </span>
                )}
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
              />
            </div>
          </div>
        </div>

        {profile?.designs?.length > 0 ? (
          <div className="dp-portfolio-grid">
            {profile.designs.map((item) => (
              <div
                key={item.id}
                className="dp-portfolio-card"
                onClick={() => navigate("/user/checkout")}
              >
                <div className="dp-image-container">
                  <img
                    src={item.designImage}
                    alt={item.designTitle}
                    className="dp-portfolio-img"
                  />
                </div>

                <div className="dp-portfolio-details">
                  <h3 className="dp-item-title">{item.designTitle}</h3>

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
