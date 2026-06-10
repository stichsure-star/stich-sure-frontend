import React, { useState } from "react";
import "../styles/RateDesigner.css";
import { FaRegStar, FaStar } from "react-icons/fa";

const RateDesigner = () => {
  const [rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState("completed");

  return (
    <div className="rate-page-container">
      <h1 className="rate-page-title">Rate Designer</h1>

      <div className="rate-card-box">

        {/* Tabs */}
        <div className="order-tabs-row">
          <button
            className={`tab-btn ${
              activeTab === "active" ? "selected-tab" : ""
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active order
          </button>

          <button
            className={`tab-btn ${
              activeTab === "completed" ? "selected-tab" : ""
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Order
          </button>
        </div>

        {/* Active Order Content */}
        {activeTab === "active" && (
          <div className="item-details-row">

            <div className="item-details-left">
              <h2 className="dress-name">Bridal Gown</h2>
              <p className="designer-by">By Amisun Styles</p>

              <div className="timestamps-row">
                <span>Delivery: April 20, 2026</span>
                <span>Status: In Progress</span>
              </div>

              <div className="price-tag-value">&#8358;45,000</div>
            </div>

            <div className="item-details-right">
              <button className="reorder-action-btn">
                Track Order
              </button>
            </div>

          </div>
        )}

        {/* Completed Order Content */}
        {activeTab === "completed" && (
          <div className="item-details-row">

            <div className="item-details-left">
              <h2 className="dress-name">Bridal Gown</h2>
              <p className="designer-by">By Amisun Styles</p>

              <div className="timestamps-row">
                <span>Completed: April 15, 2026</span>
                <span>Completed: April 15, 2026</span>
              </div>

              <div className="price-tag-value">&#8358;45,000</div>
            </div>

            <div className="item-details-right">

              <div className="stars-rating-container">
                {[1, 2, 3, 4, 5].map((index) => (
                  <button
                    key={index}
                    className="star-click-element"
                    onClick={() => setRating(index)}
                  >
                    {index <= rating ? (
                      <FaStar className="star-icon filled" />
                    ) : (
                      <FaRegStar className="star-icon outline" />
                    )}
                  </button>
                ))}
              </div>

              <div className="action-buttons-group">
                <button className="reorder-action-btn">
                  Reorder
                </button>

                <button className="review-action-btn">
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

export default RateDesigner;