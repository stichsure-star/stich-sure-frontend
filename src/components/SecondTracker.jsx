import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/SecondTracker.css";
import BvpPage from "../pages/User/page/Bvp";

const SecondTracker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Stores the clean mapping object coming straight from BvpPage
  const [orderDetails, setOrderDetails] = useState({
    status: location.state?.status || "",
    orderId: location.state?.orderId || "",
    itemName: "Custom Garment",
    amount: 0,
    designerName: "Professional Designer",
    designerId: "",
  });

  // 1. Track if the user has actually CLICKED the completed tab yet
  const [hasClickedCompleted, setHasClickedCompleted] = useState(false);

  const rawStatus = orderDetails.status || "";
  const orderStatus = rawStatus.toLowerCase();

  // The backend says it's done...
  const isOrderFinishedBackend =
    orderStatus === "done" || orderStatus === "completed";

  const handleCompletedClick = () => {
    // If it's not finished on the backend, do nothing
    if (!isOrderFinishedBackend) return;

    // 2. If it IS finished, clicking it now toggles the UI/Active state!
    setHasClickedCompleted(true);

    // If you want them to click ONCE to view the tab, and TWICE to navigate, use this.
    // If you just want it to navigate instantly upon click, leave this here:
    navigate("/user/designer-rating", {
      state: {
        orderId: orderDetails.orderId,
        itemName: orderDetails.itemName,
        amount: orderDetails.amount,
        designerName: orderDetails.designerName,
        designerId: orderDetails.designerId,
      },
    });
  };

  return (
    <div className="tracker-page-wrapper">
      <div className="order-tabs">
        {/* Active tab stays active UNTIL the user explicitly clicks the completed tab */}
        <button
          className={`tab-btn ${!hasClickedCompleted ? "active" : ""}`}
          onClick={() => setHasClickedCompleted(false)}
        >
          Active Order
        </button>

        <button
          className={`tab-btn ${hasClickedCompleted ? "active" : ""}`}
          onClick={handleCompletedClick}
          disabled={!isOrderFinishedBackend} // Stays disabled until backend says "done"
          style={{
            cursor: !isOrderFinishedBackend ? "not-allowed" : "pointer",
            opacity: !isOrderFinishedBackend ? 0.5 : 1,
          }}
        >
          Completed Order
        </button>
      </div>
      <div className="customer-active-order-details">
        {/* Receives the mapped bundle cleanly */}
        <BvpPage onStatusFetched={(payload) => setOrderDetails(payload)} />
      </div>
    </div>
  );
};

export default SecondTracker;
