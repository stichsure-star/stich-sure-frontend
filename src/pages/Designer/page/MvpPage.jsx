import React, { useEffect, useState } from "react";
import { FiImage, FiInfo } from "react-icons/fi";
import { FaRulerCombined } from "react-icons/fa";
import "../css/mvp.css";
import { designerApi } from "../../../config/designer";
import { useLocation } from "react-router-dom";
import { authApi } from "../../../config/auth";
import { useSelector } from "react-redux";
import { SkeletonOrderTracker } from "../../../components/reuasbleComponents/Skeleton";
import Warning from "../../../paymentInStich-sure/popups/Warning";

const MvpPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [Dobbe, Donar] = useState(false);

  const paylo = useSelector((state) => state.auth.setPaymentData);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDara = async () => {
    try {
      setLoading(true);
      const response = await authApi.oneOrder(orderId);
      if (response.data?.data) {
        setOrder(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching order tracking info:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetcUser = async () => {
    if (!order) return;
    const payload = {
      name: `${order?.customer?.firstName || ""} ${order?.customer?.lastName || ""}`.trim(),
      email: order?.customer?.email || "",
      address: order?.customer?.address || "",
      phone: order?.customer?.phone || "",
    };
    try {
      const res = await designerApi.shipPy(payload);
      console.log("customer shipping", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetcDes = async () => {
    if (!order) return;
    const payloaded = {
      name: `${order?.designer?.firstName || ""} ${order?.designer?.lastName || ""}`.trim(),
      email: order?.designer?.email || "",
      address: order?.designer?.address || "",
      phone: order?.designer?.phone || "",
    };
    try {
      const res = await designerApi.shipPy(payloaded);
      console.log("designer shipping", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDashboardDate = (dateString) => {
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

  useEffect(() => {
    if (orderId) {
      fetchDara();
    }
  }, [orderId]);

  useEffect(() => {
    if (order) {
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
            <h2 className="bot_ordertracker-title">
              {order?.itemName || "Custom Garment"}
            </h2>
            <p className="bot_ordertracker-customer">
              for: {order?.customer?.firstName || "Guest"}{" "}
              {order?.customer?.lastName || ""}
            </p>
            <p className="bot_ordertracker-id">
              Order Number: {order?.orderNumber || "N/A"}
            </p>
          </div>

          <div className="bot_ordertracker-header-right">
            <h3 className="bot_ordertracker-price">
              ₦{new Intl.NumberFormat("en-NG").format(order?.amount || 0)}
            </h3>
            <span className="bot_ordertracker-status-badge">
              {order?.status}
            </span>
            <p className="bot_ordertracker-due">
              Due: {formatDashboardDate(order?.pickupDate || order?.deadLine)}
            </p>
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
                {order?.measurement && order.measurement.length > 0 ? (
                  order.measurement.map((item, index) => (
                    <div
                      className="bot_measurement-row"
                      key={item.name || index}
                    >
                      <div>
                        <span>{item.name}</span>
                        {item?.note && <small>{item.note}</small>}
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
            </div>
            <div className="bot_image-scroll">
              {order?.inspirationalImage &&
              order.inspirationalImage.length > 0 ? (
                order.inspirationalImage.map((imgUrl, idx) => (
                  <button
                    className="bot_inspiration-image-button"
                    type="button"
                    key={idx}
                  >
                    <img src={imgUrl} alt="Inspiration asset" />
                  </button>
                ))
              ) : order?.designImage || order?.design?.designImage ? (
                <button className="bot_inspiration-image-button" type="button">
                  <img
                    src={order?.designImage || order?.design?.designImage}
                    alt={order?.itemName || "Catalog standard image view"}
                  />
                </button>
              ) : (
                <p style={{ fontSize: "11px", color: "#8a8a8a" }}>
                  No upload preview references available.
                </p>
              )}
            </div>
          </section>

          <div className="bot_desc-inspire-flex">
            <section className="bot_description-section">
              <h3 className="bot_section-title">
                <FiImage />
                Design Description
              </h3>
              <p>
                {order?.request.description ||
                  order?.request?.description ||
                  "No specific tailoring notes provided."}
              </p>
            </section>

            <section className="bot_images-section">
              <h3 className="bot_section-title">
                <FiImage />
                Inspiration Images
              </h3>

              <div className="bot_image-scroll">
                {order?.request.inspirationalImage &&
                order.request.inspirationalImage.length > 0 ? (
                  order?.request.inspirationalImage.map((imgUrl, idx) => (
                    <button
                      className="bot_inspiration-image-button"
                      type="button"
                      key={idx}
                    >
                      <img src={imgUrl} alt="Inspiration asset" />
                    </button>
                  ))
                ) : order?.designImage || order?.design?.designImage ? (
                  <button
                    className="bot_inspiration-image-button"
                    type="button"
                  >
                    <img
                      src={order?.designImage || order?.design?.designImage}
                      alt={order?.itemName || "Catalog standard image view"}
                    />
                  </button>
                ) : (
                  <p style={{ fontSize: "11px", color: "#8a8a8a" }}>
                    No upload preview references available.
                  </p>
                )}
              </div>

              <p className="bot_image-helper-text">
                Client has uploaded reference images to guide the design. Click
                each image to view full size.
              </p>
            </section>
          </div>
        </div>

        <button
          className="bot_ordertracker-done-btn"
          type="button"
          onClick={() => Donar(true)}
        >
          Done
        </button>
        <div className="Warni">
          <Warning onClose={() => Donar(false)} />
        </div>
      </div>
    </div>
  );
};

export default MvpPage;
