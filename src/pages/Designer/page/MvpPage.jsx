import React, { useEffect, useState } from "react";
import { FiImage, FiInfo } from "react-icons/fi";
import { FaRulerCombined } from "react-icons/fa";
import "../css/mvp.css";
import designImage from "../../../assets/daniel/Colorful Ankara.png";
import { designerApi } from "../../../config/designer";
import { useLocation } from "react-router-dom";
import { authApi } from "../../../config/auth";
import { useSelector } from "react-redux";
import { SkeletonOrderTracker } from "../../../components/reuasbleComponents/Skeleton";

const MvpPage = () => {
  const location = useLocation();

  const orderId = location.state?.orderId;

  console.log("orderId", orderId);
  console.log("orderId");

  const paymentData = useSelector((state) => user.auth.paymentData);
  console.log("paymentData", user);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDara = async () => {
    try {
      setLoading(true);
      const response = await authApi.oneOrder(orderId);
      console.log("response", response.data.data);
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log("order", order);

  // Safely grab measurements from the API payload
  const measurements = order?.data?.design?.measurements;

  const fetcUser = async () => {
    const payload = {
      name: `${order?.data?.customer?.firstName || ""} ${
        order?.data?.customer?.lastName || ""
      }`,
      email: order?.data?.customer?.email || "",
      address: order?.data?.customer?.address || "",
      phone: order?.data?.customer?.phone || "",
    };

    try {
      const res = await designerApi.shipPy(payload);

      console.log("customer shipping", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetcDes = async () => {
    const payloaded = {
      name: `${order?.data?.designer?.firstName || ""} ${
        order?.data?.designer?.lastName || ""
      }`,

      email: order?.data?.designer?.email || "",

      address: order?.data?.designer?.address || "",

      phone: order?.data?.designer?.phone || "",
    };

    try {
      const res = await designerApi.shipPy(payloaded);

      console.log("designer shipping", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const shipPing = async () => {
    const payloa = {
      request_token: "",
      courier_id: "",
      service_code: "",
      is_cod_label: "",
    };
    try {
      const res = await designerApi.Valid(payloa);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDara();
    shipPing();
  }, []);

  useEffect(() => {
    if (order?.data) {
      fetcUser();
      fetcDes();
    }
  }, [order]);

  if (loading) {
    return (
      <div className="bot_ordertracker-wrapper">
        <div className="bot_ordertracker-page-shell">
          <SkeletonOrderTracker />
        </div>
      </div>
    );
  }

  return (
    <div className="bot_ordertracker-wrapper">
      <div className="bot_ordertracker-page-shell">
        <div className="bot_ordertracker-header">
          <div>
            <h2 className="bot_ordertracker-title">{order?.data.itemName}</h2>
            <p className="bot_ordertracker-customer">
              for:{order?.data?.customer?.firstName}{" "}
              {order?.data?.customer?.lastName}
            </p>
            <p className="bot_ordertracker-id">
              Order ID: {order?.data?.orderNumber}
            </p>
          </div>

          <div className="bot_ordertracker-header-right">
            <h3 className="bot_ordertracker-price">{order?.amount}</h3>
            <span className="bot_ordertracker-status-badge">
              {order?.data.status}
            </span>
            <p className="bot_ordertracker-due">Due: {order?.data.placedAt}</p>
          </div>
        </div>

        <div className="bot_ordertracker-card">
          <section className="bot_measurements-card">
            <h3 className="bot_section-title">
              <FaRulerCombined />
              Body Measurements
            </h3>

            <div className="bot_measurement-note">
              <FiInfo />
              All measurements are in inches unless otherwise stated.
            </div>

            <div className="bot_measurement-design-grid">
              <div className="bot_measurements-scroll">
                {/* Measurements Quick Empty State */}
                {measurements && measurements.length > 0 ? (
                  measurements.map((item) => (
                    <div key={item.label} className="bot_measurement-row">
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

              <div className="bot_your-design-panel">
                <h3 className="bot_section-title">
                  <FiImage />
                  Your Design
                </h3>
                {/* Your Design Image Quick Empty State */}
                {order?.data?.designImage ||
                order?.data?.design?.designImage ? (
                  <button className="bot_design-preview-button" type="button">
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

          <section className="bot_description-section">
            <h3 className="bot_section-title">
              <FiImage />
              Design Description
            </h3>

            <p>
              {order?.data.design.description || "No description provided."}
            </p>
          </section>

          <section className="bot_images-section">
            <h3 className="bot_section-title">
              <FiImage />
              Inspiration Images
            </h3>

            <div className="bot_image-scroll">
              <button className="bot_inspiration-image-button" type="button">
                <img
                  src={order?.data.status}
                  alt="Inspiration for bridal gown"
                />
              </button>
            </div>

            <p className="bot_image-helper-text">
              Client has uploaded reference images to guide the design. Click
              each image to view full size.
            </p>
          </section>
        </div>

        <button
          className="bot_ordertracker-done-btn"
          type="button"
          onClick={shipPing}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default MvpPage;
