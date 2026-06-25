import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { customerApi } from "../../../config/customer"; // Added missing import
import "../css/Tryed.css";
import { useNavigate } from "react-router-dom";

const Try = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  console.log("userId", userId);

  const [dabby, setDab] = useState([]);

  const navigate = useNavigate(); // Kept name consistent with your working Dashboard state pattern

  const handleSub = async () => {
    try {
      if (!userId) return;

      const response = await customerApi.allAdlrs(userId);
      console.log("orders response", response.data);
      setDab(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 1. Added useEffect to call the API function when component mounts or userId changes
  useEffect(() => {
    handleSub();
  }, [userId]);

  // 2. Extracted the actual array from the API data structure
  const ordersList = dabby?.data || [];

  // Date formatting helper function (similar to Dashboard Overview)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
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

  return (
    <div className="Act_container">
      <h1>Active Orders</h1>

      <div className="Act_orders_wrapper">
        {/* 3. Empty state handling if no orders are available */}
        {ordersList.length === 0 ? (
          <div
            style={{ padding: "40px 20px", textAlign: "center", color: "#666" }}
          >
            <span style={{ fontSize: "40px" }}>🪡</span>
            <h3>No active orders found</h3>
          </div>
        ) : (
          ordersList.map((order) => (
            <div
              className="Act_order_card"
              key={order.id}
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate("/user/SecondTracker", {
                  state: {
                    orderId: order.id,
                  },
                })
              }
            >
              <div className="Act_order_top">
                <div>
                  <h3>{order?.itemName}</h3>

                  <p className="Act_designer">
                    by {order?.designer?.firstName} {order?.designer?.lastName}
                  </p>

                  <p className="Act_order_id">Order ID: {order?.orderNumber}</p>
                </div>

                <span className="Act_status">{order?.status}</span>
              </div>

              <div className="Act_progress_row">
                <span>Progress</span>
                <span>{order?.progress || 0}%</span>
              </div>

              <div className="Act_progress_bar">
                <div
                  className="Act_progress_fill"
                  style={{
                    width: `${order?.progress || 0}%`,
                  }}
                />
              </div>

              <p className="Act_due">🕒 Due: {formatDate(order?.placedAt)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Try;
