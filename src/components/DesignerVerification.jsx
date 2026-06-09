import { useState } from "react";
import "../styles/DesignerVerification.css";

import IdentityDesignerPage from "../pages/kyc/IdentityDesignerPage";
import InformationDesigner from "../pages/kyc/InformationDesigner";
import ProfilePage from "../pages/kyc/ProfilePage";
import SuccessfulDesignerPage from "../pages/kyc/SuccessfulDesignerPage";
import WalletDesigner from "../pages/kyc/WalletDesigner";
import DesignerIsVerifiedSuccessfullyPage from "../pages/kyc/DesignerIsVerifiedSuccessfullyPage";

const steps = [1, 2, 3, 4, 5];

const DesignerVerification = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <DesignerIsVerifiedSuccessfullyPage onNext={handleNext} />;
      case 2:
        return <InformationDesigner onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <WalletDesigner onNext={handleNext} onPrev={handlePrev} />;
      case 4:
        return <ProfilePage onNext={handleNext} onPrev={handlePrev} />;
      case 5:
        return <SuccessfulDesignerPage />;
      default:
        return null;
    }
  };

  return (
    <div className="verification-page">
      <div className="progress-wrapper">
        {steps.map((step) => (
          <div
            key={step}
            className={`progress-step ${step <= currentStep ? "active" : ""}`}
          />
        ))}
      </div>

      <div className="step-content-container">{renderStepContent()}</div>
    </div>
  );
};

export default DesignerVerification;
