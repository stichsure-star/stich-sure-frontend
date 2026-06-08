import { useState } from "react";
import "../styles/BasicInfo.css";
import { NavLink } from "react-router-dom";

const BasicInfo = ({ onNext, onPrev }) => {
  return (
    <div className="basic-info-page">
      <div className="basic-info-card">
        <h4>Basic Information</h4>
        <form className="basic-info-form">
          <label htmlFor="businessName">Business Name</label>
          <input id="businessName" type="text" />

          <label htmlFor="address">Current Business Address</label>
          <input id="address" type="text" />

          <label htmlFor="phone">Phone Number</label>
          <input id="phone" type="text" />

          <button type="submit" onClick={onNext}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default BasicInfo;
