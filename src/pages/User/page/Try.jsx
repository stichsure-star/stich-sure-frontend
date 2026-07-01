import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { customerApi } from "../../../config/customer";
import "../css/Tryed.css";
import { useNavigate } from "react-router-dom";
import { ClockLoader } from "react-spinners";

const Try = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id || user?._id; // Fallback in case your user object uses mongo _id

  const [dabby, setDab] = useState([]);
  const navigate = useNavigate();

  const handleSub = async () => {
    try {
      if (!userId) return;

      const response = await customerApi.allAdlrs(userId);
      console.log("orders response", response.data);
      setDab(response?.data);
    } catch (error) {
      console.error("Error fetching active orders:", error);
    }
  };

  useEffect(() => {
    handleSub();
  }, [userId]);

  // Safely extract arrays out of your response format
  const ordersList = dabby?.data || [];

  return (
    <div className="Act_container">
      <h1>Active Orders</h1>

      <div className="Act_orders_wrapper">
        {ordersList.length === 0 ? (
          <div
            style={{ padding: "40px 20px", textAlign: "center", color: "#666" }}
          >
            <span style={{ fontSize: "40px" }}>🪡</span>
            <h3>No active orders found</h3>
          </div>
        ) : (
          ordersList.map((order) => {
            // Bulletproof ID fallback so your routing params don't break with undefined
            const currentOrderId = order.id || order._id;

            return (
              <div
                className="Act_order_card"
                key={currentOrderId}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/user/SecondTracker", {
                    state: {
                      orderId: currentOrderId,
                    },
                  })
                }
              >
                <div className="Act_order_top">
                  <div>
                    <h3>{order?.itemName || "Custom Item"}</h3>

                    <p className="Act_designer">
                      by {order?.designer?.firstName || ""}{" "}
                      {order?.designer?.lastName || ""}
                    </p>

                    <p className="Act_order_id">
                      Order ID: {order?.orderNumber || "N/A"}
                    </p>
                  </div>

                  {/* Displays the fresh database status updated from MvpPage */}
                  <span
                    className={`Act_status ${order?.status?.toLowerCase()}`}
                  >
                    {order?.status || "Pending"}
                  </span>
                </div>

                <p className="Act_due">
                  <ClockLoader size={20} /> Due: {formatDate(order?.placedAt)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// Extracted date formatting helper function
const formatDate = (dateString) => {
  if (!dateString) return "Pending Arrangement";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    return dateString;
  }
};

export default Try;
