import React from "react";
import DesignerSuccessful from "../../components/DesignerSuccessful";
import Header from "../../components/reuasbleComponents/Header";
import Footer from "../../components/reuasbleComponents/Footer";

const SuccessfulDesignerPage = ({ onNext, onPrev }) => {
  return (
    <div>
      <DesignerSuccessful onNext={onNext} onPrev={onPrev} />
    </div>
  );
};

export default SuccessfulDesignerPage;
