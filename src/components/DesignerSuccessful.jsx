import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
// import "../styles/DesignerVerification.css"
// import "../styles/DesignerVerification.css"
import "../styles/DesignerSuccessful.css";
import { NavLink, Navigate } from "react-router-dom";

const Desgn = ({ onNext, onPrev }) => {
  return (
    <div className="Desgn-page">
      <div className="verification-card">
        <div className="icon-circle">
          <MdVerifiedUser className="shield-icon" />
        </div>

        <h2>Verification Successful !</h2>

        <p className="description">
          Your identity has been verified successfully. You now have access to
          all designer features.
        </p>

        <ul className="benefits">You’re now a Verified Designer</ul>

        <button className="submit-btn " onClick={onNext}> 
          Proceed to dashboard  
        </button>
      </div>
    </div>
  );
};

export default Desgn;
