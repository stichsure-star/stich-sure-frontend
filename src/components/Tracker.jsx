import React, { useState } from "react";
import "../styles/Tracker.css";
import { TbTruckDelivery } from "react-icons/tb";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { GiCardPickup } from "react-icons/gi";

const Tracker = () => {
  const steps = [
    { step: "Picked Up", icon: <GiCardPickup /> },
    { step: "Ready", icon: <IoCheckmarkCircleOutline /> },
    { step: "Delivered", icon: <TbTruckDelivery /> },
  ];

  const [completedSteps, setCompletedSteps] = useState([]);

  const handleStatusChange = (step) => {
    setCompletedSteps((prev) => {
      if (prev.includes(step)) return prev;
      return [...prev, step];
    });
  };

  const progress = (completedSteps.length / steps.length) * 100;

  return (
    <div className="tracker-page-wrapper">
      <div className="tracker-main-card">
        <div className="tracker-header-row">
          <div className="header-meta-left">
            <h1 className="item-title">Coperate Suit</h1>
            <button></button>
            <p className="client-assignee">for Faith E.</p>
            <p className="order-id-tag">Order ID: ORD-101</p>
          </div>

          <div className="header-meta-right">
            <span className="currency-amount">₦300,000</span>

            <div className="badge-pill-status">
              {completedSteps.length === 0
                ? "Pending"
                : completedSteps.length === steps.length
                  ? "Delivered"
                  : "In Progress"}
            </div>

            <p className="calendar-due-date">Due: June 04, 2026</p>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="progress-section-block">
          <div className="progress-label-row">
            <span className="progress-title-text">Overall Progress</span>
            <strong className="progress-value-numeric">
              {Math.round(progress)}%
            </strong>
          </div>

          <div className="progress-bar-track-line">
            <div
              className="progress-bar-fill-indicator"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* MILESTONES */}
        <div className="milestones-stack">
          {steps.map((item) => {
            const isActive = completedSteps.includes(item.step);
            const className = item.step.toLowerCase().replace(/\s/g, "-");

            return (
              <div
                key={item.step}
                className={`milestone-interactive-row ${className} ${
                  isActive ? "active" : ""
                }`}
                onClick={() => handleStatusChange(item.step)}
              >
                <span className="milestone-name">
                  {isActive && <span className="icon">{item.icon}</span>}
                  {item.step}
                </span>

                <span className="milestone-action-prompt">
                  {isActive ? "Completed" : "Click to mark complete"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      
    </div>
  );
};

export default Tracker;
