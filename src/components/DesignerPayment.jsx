import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
// import "../styles/DesignerVerification.css"
// import "../styles/DesignerVerification.css"
// import "../styles/DesignerSuccessful.css";
import "../styles/DesignerPayment.css";

// import { NavLink, Navigate } from "react-router-dom";

const DesignerPayment = ({ onNext, onPrev }) => {
  return (
    <div className="verification-page">
      <div className="verification-card">
        <div className="icon-circle">
          <MdVerifiedUser className="shield-icon" />
        </div>

        <h2>Payment Successful !</h2>

        <p className="description">
          Your order has been successfully
           processed and your fashion project is
           now moving to the next stage.
        </p>

        <button className="submit-btn ">
            Go Back
        </button>
      </div>
    </div>
  );
};

export default DesignerPayment;
