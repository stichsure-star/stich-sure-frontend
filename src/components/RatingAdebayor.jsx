 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RatingAdebayor.css";

const RatingAdebayor = () => {
  const [activeTab, setActiveTab] = useState("completed");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleReorder = () => {
    alert("Reorder button clicked");
  };

  const handleReview = () => {
    alert(`Review submitted with a ${rating} star rating!`);
  };

  return (
    <div className="rate-designer">
      <div className="rate-header">
        <h2>Rate Designer</h2>
      </div>

      <div className="rate-content">
        <div className="order-tabs">
          <button
            className={`tab-btn ${activeTab === "active" ? "active-tab" : ""}`}
            onClick={() => setActiveTab("active")}
          >
            Active order
          </button>

          <button
            className={`tab-btn completed-btn ${activeTab === "completed" ? "active-completed" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Order
          </button>
        </div>

        {activeTab === "active" ? (
          <div className="order-card">
            <div className="order-info">
              <h3>Bridal Gown</h3>
              <p className="designer-name">By Adebayo Styles</p>

              <div className="date-row">
                <span>Due: April 30, 2026</span>
                <span>Status: In Progress</span>
              </div>

              <h2 className="price">₦45,000</h2>
            </div>

            <div className="order-actions">
              <button className="review-btn">
                View Details
              </button>
            </div>
          </div>
        ) : (
          <div className="order-card">
            <div className="order-info">
              <h3>Bridal Gown</h3>
              <p className="designer-name">By Adebayo Styles</p>

              <div className="date-row">
                <span>Completed: April 15, 2026</span>
              </div>

              <h2 className="price">₦45,000</h2>
            </div>

            <div className="order-actions">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star-item ${rating >= star ? "filled" : ""}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="buttons">
                <button
                  className="reorder-btn"
                  onClick={handleReorder}
                >
                  Reorder
                </button>

                <button
                  className="review-btn"
                  onClick={handleReview}
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingAdebayor;