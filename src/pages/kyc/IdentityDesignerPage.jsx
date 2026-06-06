import React from "react";
import DesignerVerification from "../../components/DesignerVerification";
import Header from "../../components/reuasbleComponents/Header";
import Footer from "../../components/reuasbleComponents/Footer";

const IdentityDesignerPage = ({ onNext, onPrev }) => {
  return (
    <div>
      <DesignerVerification />
    </div>
  );
};

export default IdentityDesignerPage;
