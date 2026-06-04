import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
// import "../styles/DesignerVerification.css"
import "../styles/DesignerVerification.css"

const steps = [1, 2, 3, 4, 5];

  const  DesignerVerification =() => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="verification-page">

      <div className="progress-wrapper">
        {steps.map((step) => (
          <div
            key={step}
            className={`progress-step ${
              step <= currentStep ? "active" : ""
            }`}
          />
        ))}
      </div>

      <div className="verification-card">
        <div className="icon-circle">
          <MdVerifiedUser className="shield-icon" />
        </div>

        <h2>Verify Your Identity As A Designer</h2>

        <p className="description">
          Verify your identity to build trust, receive
          orders, and access designer features.
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

        <button className="verify-btn" onClick={handleNext}>
          Start Verification
        </button>
      </div>
    </div>
  );
}

export default  DesignerVerification