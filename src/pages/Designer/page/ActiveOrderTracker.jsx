import React from "react";
import "../../../styles/ActiveOrdertracker.css";
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const ActiveOrderTracker = () => {
  return (
    <div className="active-tracker-container">
      
      <div className="active-tracker-card">
        
        <div className="order-filter-tabs">
          <button className="filter-tab-btn active-state">Active Order</button>
          <button className="filter-tab-btn completed-state">Completed Order</button>
        </div>

        <div className="order-summary-header">
          <div className="summary-left-side">
            <h2 className="apparel-title">Bridal Gown</h2>
            <p className="designer-attribution">By Josephine Sonayon</p>
            <p className="order-reference-code">Order ID: ORD-101</p>
          </div>
          <div className="summary-right-side">
            <span className="price-tag-display">&#8358;180,000</span>
            <div className="status-indicator-pill">In Production</div>
            <p className="due-calendar-date">Due: June 10, 2026</p>
          </div>
        </div>

        <div className="interactive-status-stack">
          <button className="status-interactive-row">
            <span className="status-title-label">Picked Up</span>
            <span className="status-action-hint">Click to update current status</span>
          </button>

          <button className="status-interactive-row">
            <span className="status-title-label">Ready</span>
            <span className="status-action-hint">Click to update current status</span>
          </button>

          <button className="status-interactive-row">
            <span className="status-title-label">Delivered</span>
            <span className="status-action-hint">Click to update current status</span>
          </button>
        </div>

        <div className="overall-tracker-progress">
          <div className="progress-text-alignment">
            <span>Overall Progress</span>
            <strong>60%</strong>
          </div>
          <div className="progress-track-baseline">
            <div className="progress-fill-accent"></div>
          </div>
        </div>

      </div>

      <footer className="active-tracker-footer">
        <div className="footer-width-container">
          <p className="copyright-info-text">&copy; 2026 Stichsure. All rights reserved.</p>
          <div className="social-media-channels">
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

export default ActiveOrderTracker;