import React from "react";
import DesignerIsVerified from "../../components/DesignerIsVerified";

const DesignerIsVerifiedSuccessfullyPage = ({ onNext, onPrev, saved }) => {
  return (
    <div>
      <DesignerIsVerified onNext={onNext} onPrev={onPrev} saved={saved} />
    </div>
  );
};

export default DesignerIsVerifiedSuccessfullyPage;
