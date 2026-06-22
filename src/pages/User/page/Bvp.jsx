import React, { useEffect, useState } from "react";
import { FiImage, FiInfo } from "react-icons/fi";
import { FaRulerCombined } from "react-icons/fa";
import "../css/Bvp.css";
import designImage from "../../../assets/daniel/Colorful Ankara.png";
import { designerApi } from "../../../config/designer";
import { useLocation } from "react-router-dom";
import { authApi } from "../../../config/auth";
import { useSelector } from "react-redux";

const BvpPage = () => {
  // const order = {
  //   item: "Bridal Gown",
  //   customer: "Faith E.",
  //   orderId: "ORD-101",
  //   amount: "₦200,000",
  //   dueDate: "June 10, 2026",
  //   status: "15 days left",
  // };

  const location = useLocation();

  const orderId = location.state?.orderId;

  console.log("orderId", orderId);
  console.log("orderId");

  const [order, setOrder] = useState(null);

  const fetchDara = async () => {
    try {
      const response = await authApi.oneOrder(orderId);
      console.log("response", response.data.data);
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("order", order);

  // Safely grab measurements from the API payload
  const measurements = order?.data?.design?.measurements;

  useEffect(() => {
    fetchDara();
  }, []);

  return (
    <div className="Bba_ordertracker-wrapper">
      <div className="Bba_ordertracker-page-shell">
        <div className="Bba_ordertracker-header">
          <div>
            <h2 className="Bba_ordertracker-title">{order?.data.itemName}</h2>
            <p className="Bba_ordertracker-customer">
              for:{order?.data.customer.firstName}{" "}
              {order?.data.customer.lastName}
            </p>
            <p className="Bba_ordertracker-id">
              Order ID: {order?.data.orderNumber}
            </p>
          </div>

          <div className="Bba_ordertracker-header-right">
            <h3 className="Bba_ordertracker-price">{order?.amount}</h3>
            <span className="Bba_ordertracker-status-badge">
              {order?.data.status}
            </span>
            <p className="Bba_ordertracker-due">Due: {order?.data.placedAt}</p>
          </div>
        </div>

        <div className="Bba_ordertracker-card">
          <section className="Bba_measurements-card">
            <h3 className="Bba_section-title">
              <FaRulerCombined />
              Body Measurements
            </h3>

            <div className="Bba_measurement-note">
              <FiInfo />
              All measurements are in inches unless otherwise stated.
            </div>

            <div className="Bba_measurement-design-grid">
              <div className="Bba_measurements-scroll">
                {/* Measurements Quick Empty State */}
                {measurements && measurements.length > 0 ? (
                  measurements.map((item) => (
                    <div key={item.label} className="Bba_measurement-row">
                      <div>
                        <span>{item.label}</span>
                        <small>{item.note}</small>
                      </div>
                      <strong>{item.value}</strong>
                    </div>
                  ))
                ) : (
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#8a8a8a",
                      margin: 0,
                      gridColumn: "span 2",
                    }}
                  >
                    No measurements provided.
                  </p>
                )}
              </div>

              <div className="Bba_your-design-panel">
                <h3 className="Bba_section-title">
                  <FiImage />
                  Your Design
                </h3>
                {/* Your Design Image Quick Empty State */}
                {order?.data?.designImage ||
                order?.data?.design?.designImage ? (
                  <button className="Bba_design-preview-button" type="button">
                    <img
                      src={
                        order?.data?.designImage ||
                        order?.data.design.designImage
                      }
                      alt="Selected bridal gown design"
                    />
                    <p>{order?.data.design.category}</p>
                  </button>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "126px",
                      border: "1px dashed #cfcfcf",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      color: "#8a8a8a",
                      background: "#f7f5f5",
                    }}
                  >
                    No image uploaded
                  </div>
                )}
              </div>
            </div>
          </section>
          Creator
          <section className="Bba_description-section">
            <h3 className="Bba_section-title">
              <FiImage />
              Design Description
            </h3>

            <p>
              {order?.data.design.description || "No description provided."}
            </p>
          </section>
          <section className="Bba_images-section">
            <h3 className="Bba_section-title">
              <FiImage />
              Inspiration Images
            </h3>

            <div className="Bba_image-scroll">
              <button className="Bba_inspiration-image-button" type="button">
                <img
                  src={order?.data.status}
                  alt="Inspiration for bridal gown"
                />
              </button>
            </div>

            <p className="Bba_image-helper-text">
              Client has uploaded reference images to guide the design. Click
              each image to view full size.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BvpPage;
