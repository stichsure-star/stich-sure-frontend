import React from "react";
import BasicInfo from "../../components/BasicInfo";
import Header from "../../components/reuasbleComponents/Header";
import Footer from "../../components/reuasbleComponents/Footer";

const InformationDesigner = ({
  onNext,
  onPrev,
  setDesignerInfo,
  designerInfo,
}) => {
  return (
    <div>
      <BasicInfo
        onNext={onNext}
        onPrev={onPrev}
        designerInfo={designerInfo}
        setDesignerInfo={setDesignerInfo}
      />
    </div>
  );
};

export default InformationDesigner;
