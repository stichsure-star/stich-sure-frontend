import { useState } from "react";
// import "../styles/SetUpWallet.css"
import { NavLink } from "react-router-dom";
import "../styles/SetUpWallet.css";

const SetUpWallet = ({ onNext }) => {
  return (
    <div className="set-info-page">
      <div className="set-up-card">
        <h4>Set Up Your Wallet</h4>
        <form className="set-up-form">
          <label htmlFor="businessName">Bank Name</label>
          <input id="businessName" type="text" />

          <label htmlFor="address">Account Number</label>
          <input id="address" type="text" />

          <label htmlFor="phone">Account Name</label>
          <input id="phone" type="text" />

          <button type="submit" onClick={onNext}>
            Verify Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetUpWallet;
