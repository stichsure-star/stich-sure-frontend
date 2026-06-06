import React, { useState } from "react";
import "../../../styles/RateDesigner.css";
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn, FaRegStar, FaStar } from "react-icons/fa";

const RateDesigner = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="rate-page-container">
      {/* Top Main Page Title */}
      <h1 className="rate-page-title">Rate Designer</h1>

      {/* Main Content Card Box */}
      <div className="rate-card-box">
        
        {/* Order Status Tabs */}
        <div className="order-tabs-row">
          <button className="tab-btn active-order-tab">Active order</button>
          <button className="tab-btn completed-order-tab">Completed Order</button>
        </div>

        {/* Individual Item Details Row */}
        <div className="item-details-row">
          
          {/* Left Block: Description Details */}
          <div className="item-details-left">
            <h2 className="dress-name">Bridal Gown</h2>
            <p className="designer-by">By Amisun Styles</p>
            
            <div className="timestamps-row">
              <span>Completed: April 15, 2026</span>
              <span>Completed: April 15, 2026</span>
            </div>
            
            <div className="price-tag-value">&#8358;45,000</div>
          </div>

          {/* Right Block: Interactive Stars & Actions */}
          <div className="item-details-right">
            {/* Interactive Stars Selection Container */}
            <div className="stars-rating-container">
              {[1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  type="button"
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

            {/* Action Buttons */}
            <div className="action-buttons-group">
              <button className="reorder-action-btn">Reorder</button>
              <button className="review-action-btn">Review</button>
            </div>
          </div>

        </div>
      </div>

      {/* Standardized Bottom Branding Footer */}
      <footer className="rate-page-footer">
        <div className="footer-width-limiter">
          <p className="copyright-notice">&copy; 2026 Stichsure. All rights reserved.</p>
          <div className="footer-social-anchors">
            <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
            <a href="#twitter" aria-label="Twitter"><FaTwitter /></a>
            <a href="#facebook" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#linkedin" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RateDesigner;