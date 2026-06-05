import { useState } from "react";
import "../styles/BasicInfo.css";
import { NavLink } from "react-router-dom";

const steps = [1, 2, 3, 4, 5];

const BasicInfo = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="basic-info-page">
      <div className="progress-wrapper">
        {steps.map((step) => (
          <div
            key={step}
            className={`progress-step ${step <= currentStep ? "active" : ""}`}
          />
        ))}
      </div>

      <div className="basic-info-card">
        <h4>Basic Information</h4>

        <form className="basic-info-form">
          <label htmlFor="businessName">Business Name</label>
          <input id="businessName" type="text" />

          <label htmlFor="address">Current Business Address</label>
          <input id="address" type="text" />

          <label htmlFor="phone">Phone Number</label>
          <input id="phone" type="text" />

          <button type="submit">
            <NavLink to="/walletdesigner" className="NavLink">
              Continue
            </NavLink>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BasicInfo;
