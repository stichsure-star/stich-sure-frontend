import React from "react";
import "../styles/Ordertracker.css";
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const OrderTracker = () => {
  return (
    <div className="tracker-page-wrapper">
      <div className="tracker-main-card">
        
        <div className="tracker-header-row">
          <div className="header-meta-left">
            <h1 className="item-title">Coperate Suit</h1>
            <p className="client-assignee">for Faith E.</p>
            <p className="order-id-tag">Order ID: ORD-101</p>
          </div>
          <div className="header-meta-right">
            <span className="currency-amount">&#8358;300,000</span>
            <div className="badge-pill-status">Ready</div>
            <p className="calendar-due-date">Due: June 04, 2026</p>
          </div>
        </div>

        <div className="milestones-stack">
          <div className="milestone-interactive-row">
            <span className="milestone-name">Picked Up</span>
            <span className="milestone-action-prompt">Click to update current status</span>
          </div>

          <div className="milestone-interactive-row">
            <span className="milestone-name">Ready</span>
            <span className="milestone-action-prompt">Click to update current status</span>
          </div>

          <div className="milestone-interactive-row">
            <span className="milestone-name">Delivered</span>
            <span className="milestone-action-prompt">Click to update current status</span>
          </div>
        </div>

        <div className="progress-section-block">
          <div className="progress-label-row">
            <span className="progress-title-text">Overall Progress</span>
            <strong className="progress-value-numeric">60%</strong>
          </div>
          <div className="progress-bar-track-line">
            <div className="progress-bar-fill-indicator"></div>
          </div>
        </div>

      </div>

      <footer className="tracker-page-footer">
        <div className="footer-alignment-container">
          <p className="legal-copyright-text">&copy; 2026 Stichsure. All rights reserved.</p>
          <div className="social-networks-anchors">
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

export default OrderTracker;