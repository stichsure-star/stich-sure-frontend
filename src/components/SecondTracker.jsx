import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MvpPage from "../pages/Designer/page/MvpPage";
import "../styles/SecondTracker.css";
import BvpPage from "../pages/User/page/Bvp";

const SecondTracker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the order status passed through the navigation state from the previous page
  const orderStatus = location.state?.status?.toLowerCase();
  const isCompleted = orderStatus === "done" || orderStatus === "completed";

  return (
    <div className="tracker-page-wrapper">
      <div className="order-tabs">
        <button className={`tab-btn ${!isCompleted ? "active" : ""}`}>
          Active Order
        </button>
        <button
          className={`tab-btn ${isCompleted ? "active" : ""}`}
          onClick={() => navigate("/user/designer-rating")}
          disabled={!isCompleted} // Unclickable until order is done
          style={{
            cursor: !isCompleted ? "not-allowed" : "pointer",
            opacity: !isCompleted ? 0.5 : 1,
          }}
        >
          Completed Order
        </button>
      </div>
      <div className="customer-active-order-details">
        <BvpPage />
      </div>
    </div>
  );
};

export default SecondTracker;
