import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/RateDesigner.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { authApi } from "../config/auth";
import AddedRatings from "../paymentInStich-sure/popups/AddedRatings ";

const RateDesigner = ({ onStatusFetched }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🚀 CATCHING INSTANTLY: Grab the synchronized snapshot parameters passed down via router state
  const orderId = location.state?.orderId;
  const itemName = location.state?.itemName || "Custom Garment";
  const designerName = location.state?.designerName || "Professional Designer";
  const amount = location.state?.amount || 0;

  // 🔍 DEBUG LOGS FOR MAPPED PROPERTIES
  console.log("=== RateDesigner Route State Mappings ===");
  console.log("Full state payload:", location.state);
  console.log("Mapped orderId:", orderId);
  console.log("Mapped itemName:", itemName);
  console.log("Mapped designerName:", designerName);
  console.log("Mapped amount:", amount);
  console.log("=========================================");

  const [rating, setRating] = useState(0);
  const [submittingRating, setSubmittingRating] = useState(false);

  const [activeTab, setActiveTab] = useState("completed");
  const [activeAction, setActiveAction] = useState("review");
  const [isRatingAddedOpen, setIsRatingAddedOpen] = useState(false);

  // 🚀 SUBMIT TO YOUR PATH + BODY API MATCHING THE SCHEMA
  const handleStarClick = async (selectedRating) => {
    if (!orderId) return;
    setRating(selectedRating);

    // Inside RateDesigner.jsx -> handleStarClick function:

    try {
      setSubmittingRating(true);

      // 🚀 Switch from authApi.submitRating to authApi.orderRating
      if (authApi.orderRating) {
        await authApi.orderRating(orderId, { rating: selectedRating });

        // SUCCESS POPUP SHOWS RIGHT AFTER RUNNING API
        setIsRatingAddedOpen(true);
      } else {
        console.warn("Rating API method reference missing in config file.");
      }
    } catch (error) {
      console.error("Failed saving rating score to database:", error);
    }
  };

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
        {/* Navigation Tabs */}
        <div className="order-tabs-row">
          <button
            className={`rate-tab-btn ${activeTab === "active" ? "rate-tab-btn-active" : ""}`}
            onClick={() => navigate("/user/myorders")}
          >
            Active order
          </button>

          <button
            className={`rate-tab-btn ${activeTab === "completed" ? "rate-tab-btn-active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Order
          </button>
        </div>

        {/* Dynamic Connected Layout Grid */}
        <div
          className="item-details-row"
          style={{ opacity: submittingRating ? 0.6 : 1 }}
        >
          <div className="item-details-left">
            {/* 🚀 MAPPING DETAILED PROPERTIES HERE INSTANTLY */}
            <h2 className="dress-name">{itemName}</h2>
            <p className="designer-by">By {designerName}</p>

            <div className="timestamps-row">
              <span className="status-indicator">Status: Completed</span>
            </div>

            <div className="price-tag-value">
              ₦{new Intl.NumberFormat("en-NG").format(amount)}
            </div>
          </div>

          <div className="item-details-right">
            {activeTab === "active" ? (
              <button
                className="order-action-btn order-action-btn-active"
                onClick={() => navigate(-1)}
              >
                Track Order
              </button>
            ) : (
              <>
                {/* Clickable Star Selection Node */}
                <div className="stars-rating-container">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <button
                      key={index}
                      className="star-click-element"
                      onClick={() => handleStarClick(index)}
                      disabled={submittingRating}
                      style={{
                        cursor: submittingRating ? "not-allowed" : "pointer",
                        border: "none",
                        background: "transparent",
                      }}
                    >
                      {index <= rating ? (
                        <FaStar
                          className="star-icon filled"
                          style={{ color: "#FFB000", fontSize: "24px" }}
                        />
                      ) : (
                        <FaRegStar
                          className="star-icon outline"
                          style={{ color: "#CCCCCC", fontSize: "24px" }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="action-buttons-group">
                  <button
                    className={`order-action-btn ${activeAction === "reorder" ? "order-action-btn-active" : ""}`}
                    onClick={handleReorder}
                  >
                    Reorder
                  </button>

                  <button
                    className={`order-action-btn ${activeAction === "review" ? "order-action-btn-active" : ""}`}
                    onClick={handleReview}
                  >
                    Review
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <AddedRatings
        isOpen={isRatingAddedOpen}
        onClose={() => setIsRatingAddedOpen(false)}
        orderId={orderId}
      />
    </div>
  );
};

export default RateDesigner;
