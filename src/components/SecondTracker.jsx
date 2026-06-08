import React from "react";
import "../styles/SecondTracker.css";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

const SecondTracker = () => {
  return (
    <div className="tracker-page-wrapper">
      <div className="order-tabs">
      <button className="tab-btn active">Active Order</button>
      <button className="tab-btn">Complete Order</button>
      </div>
      <div className="tracker-main-card">
        <div className="tracker-header-row">
          <div className="header-meta-left">
            <h1 className="item-title">Bridal Gown</h1>
            <button></button>
            <p className="client-assignee">By Josephine Sonayon</p>
            <p className="order-id-tag">Order ID: ORD-101</p>
          </div>
          <div className="header-meta-right">
            <span className="currency-amount">&#8358;180,000</span>
            <div className="badge-pill-status">in Production</div>
            <p className="calendar-due-date">Due: June 10, 2026</p>
          </div>
        </div>

        <div className="milestones-stack">
          <div className="milestone-interactive-row">
            <span className="milestone-name">Picked Up</span>
            <span className="milestone-action-prompt">
              Click to update current status
            </span>
          </div>

          <div className="milestone-interactive-row">
            <span className="milestone-name">Ready</span>
            <span className="milestone-action-prompt">
              Click to update current status
            </span>
          </div>

          <div className="milestone-interactive-row">
            <span className="milestone-name">Delivered</span>
            <span className="milestone-action-prompt">
              Click to update current status
            </span>
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
    </div>
  );
};

export default SecondTracker;
