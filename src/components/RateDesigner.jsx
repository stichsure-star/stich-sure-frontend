import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RateDesigner.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import AddedRatings from "../popups/AddedRatings ";

const RateDesigner = () => {
  const [rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState("completed");
  const [activeAction, setActiveAction] = useState("reorder");
  const [isRatingAddedOpen, setIsRatingAddedOpen] = useState(false);
  const navigate = useNavigate();

  const handleReorder = () => {
    setActiveAction("reorder");
    navigate("/user/browsedesigns");
  };

  const handleReview = () => {
    setActiveAction("review");
    setIsRatingAddedOpen(true);
  };

  return (
    <div className="rate-page-container">
      <h1 className="rate-page-title">Rate Designer</h1>

      <div className="rate-card-box">

        {/* Tabs */}
        <div className="order-tabs-row">
          <button
            className={`rate-tab-btn ${
              activeTab === "active" ? "rate-tab-btn-active" : ""
            }`}
            onClick={() => navigate("/user/myorders")}
          >
            Active order
          </button>

          <button
            className={`rate-tab-btn ${
              activeTab === "completed" ? "rate-tab-btn-active" : ""
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
              <button className="order-action-btn order-action-btn-active">
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
                <button
                  className={`order-action-btn ${
                    activeAction === "reorder" ? "order-action-btn-active" : ""
                  }`}
                  onClick={handleReorder}
                >
                  Reorder
                </button>

                <button
                  className={`order-action-btn ${
                    activeAction === "review" ? "order-action-btn-active" : ""
                  }`}
                  onClick={handleReview}
                >
                  Review
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

      <AddedRatings
        isOpen={isRatingAddedOpen}
        onClose={() => setIsRatingAddedOpen(false)}
      />
    </div>
  );
};

export default RateDesigner;
