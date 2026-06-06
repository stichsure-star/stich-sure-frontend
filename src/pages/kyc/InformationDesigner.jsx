import React from "react";
import BasicInfo from "../../components/BasicInfo";
import Header from "../../components/reuasbleComponents/Header";
import Footer from "../../components/reuasbleComponents/Footer";

const InformationDesigner = ({ onNext, onPrev }) => {
  return (
    <div>
      <BasicInfo onNext={onNext} onPrev={onPrev} />
    </div>
  );
};

export default InformationDesigner;
