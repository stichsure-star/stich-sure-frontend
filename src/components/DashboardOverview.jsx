import React, { useEffect, useState } from "react";
import "../styles/DashboardOverview.css";
import ladyhairtire from "../assets/daniel/Ladyhairtire.png";
import greenman from "../assets/daniel/greenman.png";
import queen from "../assets/daniel/Queenlace.png";
import Vector from "../assets/daniel/Vectorcontainer.png";
import Save from "../assets/daniel/Savecontainer.png";
import Complete from "../assets/daniel/Container.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { customerApi } from "../config/customer";

export default function DashboardOverview() {
  const activeOrders = [
    {
      id: "ORD-001",
      title: "Traditional Agbada",
      designer: "Adebayo Styles",
      progress: 85,
      status: "In Production",
      dueDate: "May 22, 2026",
    },
    {
      id: "ORD-005",
      title: "Bridal Gown",
      designer: "Chioma Couture",
      progress: 64,
      status: "In Production",
      dueDate: "June 5, 2026",
    },
  ];

  const designers = [
    {
      id: 1,
      name: "Emeka Tailoring",
      specialty: "Corporate Attire",
      rating: 4.8,
      image: ladyhairtire,
    },
    {
      id: 2,
      name: "Grace Fashion",
      specialty: "Casual Wear",
      rating: 4.9,
      image: greenman,
    },
    {
      id: 3,
      name: "Kings Couture",
      specialty: "Traditional Wear",
      rating: 5,
      image: queen,
    },
  ];

  const [product, setProduct] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [dabby, setDab] = useState([]);

  const userId = user?.id;
  console.log("userId", userId);

  // Date formatting helper function
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

  const fetchData = async () => {
    try {
      const response = await customerApi.userDashboard();
      console.log("response", response.data);
      setProduct(response.data.data);
      console.log("product", product);
    } catch (error) {
      console.log(error);
    }
  };

  const threeDes = async () => {
    try {
      const res = await customerApi.topThreee();
      console.log("res", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSub = async (status) => {
    try {
      if (!userId) return;

      const response = await customerApi.allAdlrs(userId, status);

      console.log("orders response", response.data);
      setDab(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  console.log("dabby", dabby.data);
  const Order = dabby.data;

  useEffect(() => {
    fetchData();
    threeDes();
    handleSub();
  }, []);

  useEffect(() => {
    console.log("product updated:", product);
  }, [product]);

  const stats = [
    {
      id: 1,
      label: "Active Orders",
      value: product?.activeOrders,
      icon: Vector,
    },
    {
      id: 2,
      label: "Saved Designers",
      value: product?.savedDesigners,
      icon: Save,
    },
    {
      id: 3,
      label: "Completed Order",
      value: product?.completedOrders,
      icon: Complete,
    },
  ];

  return (
    <div className="dashboard-content-wrapper">
      <section className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="card-top-row">
              <div className="stat-icon">
                <img src={stat.icon} alt={stat.label} />
              </div>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
            <div className="stat-info">
              <p className="stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="promo-banner">
        <h2>Ready for your next outfit?</h2>
        <p>Browse verified designers or create a custom request.</p>
        <NavLink to="/user/browsedesigns">
          <button className="promo-btn">Browse Designs</button>
        </NavLink>
      </section>

      <section className="content-card">
        <div className="card-header">
          <h2>Active Orders</h2>
        </div>

        {/* Empty state & List Render Handling */}
        {!Order || Order.length === 0 ? (
          <div
            className="empty-orders-state"
            style={{ padding: "40px 20px", textAlign: "center" }}
          >
            <span style={{ fontSize: "40px" }}>🪡</span>
            <h3 style={{ margin: "15px 0 5px 0", color: "#333" }}>
              No active orders found
            </h3>
            <p style={{ color: "#666", fontSize: "14px" }}>
              You don't have any custom clothing designs under production right
              now.
            </p>
          </div>
        ) : (
          <div className="orders-list">
            {Order?.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-title-row">
                  <div>
                    <h3>{order?.itemName}</h3>
                    <p className="designer-name">
                      by {order?.designer.firstName} {order?.designer.lastName}
                    </p>
                    <p className="order-id">Order ID: {order?.orderNumber}</p>
                  </div>
                  <span className="status-badge">{order?.status}</span>
                </div>

                <div className="progress-container">
                  <div className="progress-text">
                    <span>Progress</span>
                    <span>{order.progress || 0}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${order.progress || 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="due-date">
                  <span className="clock-icon">🕒</span> Due:{" "}
                  {formatDate(order.placedAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* 
      <section className="content-cards">
        <div className="card-header">
          <h2>Recommended Designers</h2>
        </div>
        <div className="designers-grid-layout">
          {designers.map((designer) => (
            <div key={designer.id} className="designer-card-item">
              <div className="avatar-container">
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="designer-avatar"
                />
              </div>
              <h3>{designer.name}</h3>
              <p className="designer-specialty">{designer.specialty}</p>
              <div className="rating-row">
                <span className="star-icon">★</span>
                <span className="rating-value">{designer.rating}</span>
              </div>
              <button className="profile-btn">View Profile</button>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}
