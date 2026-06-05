import { useState } from "react";
// import "../styles/SetUpWallet.css"
import { NavLink } from "react-router-dom";
import "../styles/SetUpWallet.css";

const steps = [1, 2, 3, 4, 5];

const SetUpWallet = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="set-info-page">
      <div className="progress-wrapper">
        {steps.map((step) => (
          <div
            key={step}
            className={`progress-step ${step <= currentStep ? "active" : ""}`}
          />
        ))}
      </div>

      <div className="set-up-card">
        <h4>Set Up Your Wallet</h4>
        <form className="set-up-form">
          <label htmlFor="businessName">Bank Name</label>
          <input id="businessName" type="text" />

          <label htmlFor="address">Account Number</label>
          <input id="address" type="text" />

          <label htmlFor="phone">Account Name</label>
          <input id="phone" type="text" />

          <button type="submit">
            <NavLink to="/profilepage" className="NavLink">
              Verify Account
            </NavLink>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetUpWallet;
