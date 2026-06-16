import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import "../styles/DesignerIsVerified.css";

const DesignerIsVerified = ({ onNext, onPrev }) => {
  return (
    <div className="DesignerIsVerified-page">
      <div className="verification-card">
        <div className="icon-circle">
          <MdVerifiedUser className="shield-icon" />
        </div>

        <h2>Verify Your Identity As A Designer</h2>

        <p className="description">
          Verify your identity to build trust, receive orders, and access
          designer features.
        </p>

        <ul className="benefits">
          <li>
            <FaCheckCircle /> Build customer trust
          </li>
          <li>
            <FaCheckCircle /> Receive secure payments
          </li>
          <li>
            <FaCheckCircle /> Increase visibility on the platform
          </li>
          <li>
            <FaCheckCircle /> Get verified designer badge
          </li>
        </ul>

        <button className="verify-btn" onClick={onNext}>
          Start Verification
        </button>
      </div>
    </div>
  );
};

export default DesignerIsVerified;
