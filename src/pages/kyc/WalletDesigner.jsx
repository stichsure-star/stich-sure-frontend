import React from "react";
import SetUpWallet from "../../components/SetUpWallet";
import Header from "../../components/reuasbleComponents/Header";
import Footer from "../../components/reuasbleComponents/Footer";

const WalletDesigner = ({ onNext, onPrev, designerInfo, setDesignerInfo }) => {
  return (
    <div>
      <SetUpWallet
        onNext={onNext}
        onPrev={onPrev}
        designerInfo={designerInfo}
        setDesignerInfo={setDesignerInfo}
      />
    </div>
  );
};

export default WalletDesigner;
