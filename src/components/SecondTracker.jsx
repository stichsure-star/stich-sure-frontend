import React from "react";
import { useNavigate } from "react-router-dom";
import MvpPage from "../pages/Designer/page/MvpPage";
import "../styles/SecondTracker.css";

const SecondTracker = () => {
  const navigate = useNavigate();

  return (
    <div className="tracker-page-wrapper">
      <div className="order-tabs">
      <button className="tab-btn active">Active Order</button>
      <button
        className="tab-btn"
        onClick={() => navigate("/user/designer-rating")}
      >
        Completed Order
      </button>
      </div>
      <div className="customer-active-order-details">
        <MvpPage />
      </div>
    </div>
  );
};

export default SecondTracker;
