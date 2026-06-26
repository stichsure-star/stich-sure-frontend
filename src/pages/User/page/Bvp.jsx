import React, { useEffect, useState } from "react";
import { FiImage, FiInfo } from "react-icons/fi";
import { FaRulerCombined } from "react-icons/fa";
import "../css/Bvp.css";
import { useLocation } from "react-router-dom";
import { authApi } from "../../../config/auth";
import { SkeletonOrderTracker } from "../../../components/reuasbleComponents/Skeleton";

const BvpPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDara = async () => {
    if (!orderId) return;
    try {
      setLoading(true);
      const response = await authApi.oneOrder(orderId);
      if (response.data?.data) {
        setOrder(response.data.data);
      } else {
        setOrder(response.data);
      }
    } catch (error) {
      console.error("Error fetching single order data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDara();
  }, [orderId]);

  if (loading) {
    return (
      <div className="Bba_ordertracker-wrapper">
        <div className="Bba_ordertracker-page-shell">
          <SkeletonOrderTracker />
        </div>
      </div>
    );
  }

  // Safely extract paths regardless of wrapper nests
  const targetData = order?.data || order;
  const measurements =
    targetData?.measurement || targetData?.design?.measurements;

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

  return (
    <div className="Bba_ordertracker-wrapper">
      <div className="Bba_ordertracker-page-shell">
        <div className="Bba_ordertracker-header">
          <div>
            <h2 className="Bba_ordertracker-title">
              {targetData?.itemName || "Custom Garment"}
            </h2>
            <p className="Bba_ordertracker-customer">
              for: {targetData?.customer?.firstName || "Guest"}{" "}
              {targetData?.customer?.lastName || ""}
            </p>
            <p className="Bba_ordertracker-id">
              Order ID: {targetData?.orderNumber || "N/A"}
            </p>
          </div>

          <div className="Bba_ordertracker-header-right">
            <h3 className="Bba_ordertracker-price">
              ₦{new Intl.NumberFormat("en-NG").format(targetData?.amount || 0)}
            </h3>
            <span className="Bba_ordertracker-status-badge">
              {targetData?.status}
            </span>
            <p className="Bba_ordertracker-due">
              Due:{" "}
              {formatDashboardDate(
                targetData?.pickupDate ||
                  targetData?.deadLine ||
                  targetData?.placedAt,
              )}
            </p>
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
                {measurements && measurements.length > 0 ? (
                  measurements.map((item, index) => (
                    <div
                      key={item.name || item.label || index}
                      className="Bba_measurement-row"
                    >
                      <div>
                        <span>{item.name || item.label}</span>
                        {item.note && <small>{item.note}</small>}
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
                {targetData?.designImage || targetData?.design?.designImage ? (
                  <button className="Bba_design-preview-button" type="button">
                    <img
                      src={
                        targetData?.designImage ||
                        targetData?.design?.designImage
                      }
                      alt={targetData?.itemName || "Garment catalog look"}
                    />
                    <p>{targetData?.design?.category || "Standard Template"}</p>
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
                    No profile base template layout
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="Bba_description-section">
            <h3 className="Bba_section-title">
              <FiImage />
              Design Description
            </h3>
            <p>
              {targetData?.request.description ||
                targetData?.request?.description ||
                "No description provided."}
            </p>
          </section>

          <section className="Bba_images-section">
            <h3 className="Bba_section-title">
              <FiImage />
              Inspiration Images
            </h3>

            <div className="Bba_image-scroll">
              {targetData?.request.inspirationalImage ? (
                Array.isArray(targetData?.request.inspirationalImage) ? (
                  targetData.request.inspirationalImage.map((imgUrl, index) => (
                    <button
                      className="Bba_inspiration-image-button"
                      type="button"
                      key={index}
                    >
                      <img
                        src={imgUrl}
                        alt={`Inspiration reference look ${index + 1}`}
                      />
                    </button>
                  ))
                ) : (
                  <button
                    className="Bba_inspiration-image-button"
                    type="button"
                  >
                    <img
                      src={targetData.inspirationalImage}
                      alt="Inspiration reference look"
                    />
                  </button>
                )
              ) : (
                <p style={{ fontSize: "11px", color: "#8a8a8a", margin: 0 }}>
                  No optional inspiration references uploaded by client.
                </p>
              )}
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
