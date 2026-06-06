import React from "react";
import SetUpWallet from "../../components/SetUpWallet";
import Header from "../../components/reuasbleComponents/Header";
import Footer from "../../components/reuasbleComponents/Footer";

const WalletDesigner = ({ onNext, onPrev }) => {
  return (
    <div>
      <SetUpWallet onNext={onNext} onPrev={onPrev} />
    </div>
  );
};

export default WalletDesigner;
