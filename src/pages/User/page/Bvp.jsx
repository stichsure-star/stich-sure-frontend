import React, { useEffect, useState } from "react";
import { FiImage, FiInfo } from "react-icons/fi";
import { FaRulerCombined } from "react-icons/fa";
import "../css/Bvp.css";
import { useLocation } from "react-router-dom";
import { authApi } from "../../../config/auth";
import { useSelector } from "react-redux"; // 🚀 Added to listen to instant cross-app state
import { SkeletonOrderTracker } from "../../../components/reuasbleComponents/Skeleton";

const BvpPage = ({ onStatusFetched }) => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  const globalShipmentReceipt = useSelector(
    (state) => state.auth?.shipmentReceipt,
  );

  // 👇 ADD THIS LOG HERE 👇
  console.log("👉 BVP PAGE READ FROM REDUX STATE:", globalShipmentReceipt);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extracted core fetch logic so it can run during initial mount AND polling cycles
  const fetchData = async (isBackground = false) => {
    if (!orderId) return;
    try {
      if (!isBackground) setLoading(true); // Don't trigger skeleton loader on background polls
      const response = await authApi.oneOrder(orderId);
      console.log("CUSTOMER DATABASE RESPONSE:", response.data);

      let orderData = null;
      if (response.data?.data) {
        orderData = response.data.data;
      } else {
        orderData = response.data;
      }

      setOrder(orderData);

      const targetData = orderData?.data || orderData;
      const liveStatus =
        orderData?.status || response.data?.status || "Pending";

      const orderPayload = {
        status: liveStatus,
        orderId: targetData?._id || orderId,
        itemName: targetData?.itemName || "Custom Garment",
        amount: targetData?.amount || 0,
        designerName:
          targetData?.designer?.businessName ||
          targetData?.designer?.firstName ||
          "Professional Designer",
        designerId: targetData?.designer?._id || targetData?.designerId,
      };

      if (onStatusFetched) {
        onStatusFetched(orderPayload);
      }
    } catch (error) {
      console.error("Error fetching single order data:", error);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  // 🚀 Effect 1: Handles Initial Load & Real-Time Client DB Polling
  useEffect(() => {
    fetchData(); // Initial data fetch

    // Poll the database silently every 10 seconds for remote status changes
    const pollInterval = setInterval(() => {
      const activeData = order?.data || order;

      // 🚀 Also parse localstorage during loop check to safeguard background polls
      const savedShipmentRaw = localStorage.getItem(`shipment_${orderId}`);
      const savedShipment = savedShipmentRaw
        ? JSON.parse(savedShipmentRaw)
        : null;

      const activeShipment =
        activeData?.shipment ||
        activeData?.payment?.pickup ||
        globalShipmentReceipt ||
        savedShipment?.shipment ||
        savedShipment;

      // Stop checking once tracking parameters show up
      if (!activeShipment?.trackingCode && !activeShipment?.tracking_code) {
        fetchData(true); // pass true to fetch silently in the background
      }
    }, 10000);

    return () => clearInterval(pollInterval);
  }, [orderId, order?.status]);

  if (loading) {
    return (
      <div className="Bba_ordertracker-wrapper">
        <div className="Bba_ordertracker-page-shell">
          <SkeletonOrderTracker />
        </div>
      </div>
    );
  }

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

  // 🚀 1. READ FROM LOCALSTORAGE AS A SAFEGUARD AGAINST FULL APP REFRESHES
  const savedShipmentRaw = localStorage.getItem(`shipment_${orderId}`);
  const savedShipment = savedShipmentRaw ? JSON.parse(savedShipmentRaw) : null;

  const currentStatus =
    targetData?.status === "Completed" ||
    targetData?.status?.toLowerCase() === "completed" ||
    order?.status === "Completed" ||
    order?.status?.toLowerCase() === "completed" ||
    globalShipmentReceipt?.success ||
    savedShipment?.success
      ? "Completed"
      : "Pending";

  // 🚀 2. INJECTED SAVEDSHIPMENT FALLBACKS INTO THE SHIPMENT INFO CHAIN
  const shipmentInfo =
    globalShipmentReceipt?.shipment ||
    globalShipmentReceipt ||
    savedShipment?.shipment || // 🚀 If page refreshed, it grabs it from here!
    savedShipment || // 🚀 Just in case payload structures vary
    targetData?.shipment ||
    targetData?.payment?.pickup ||
    order?.shipment;

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
              {currentStatus}
            </span>
            <p className="Bba_ordertracker-due">
              Due:{" "}
              {formatDashboardDate(
                targetData?.pickupDate ||
                  targetData?.request?.deadLine ||
                  targetData?.placedAt,
              )}
            </p>
          </div>
        </div>

        <div className="Bba_ordertracker-card">
          <section className="Bba_measurements-card">
            <h3 className="Bba_section-title">
              <FaRulerCombined /> Body Measurements
            </h3>

            <div className="Bba_measurement-note">
              <FiInfo /> All measurements are in inches unless otherwise stated.
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
                      fontSize: "13px",
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
                  <FiImage /> Your Design
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
                      height: "150px",
                      border: "1px dashed #cfcfcf",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
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

          {/* 🚀 LOGISTICS COMPONENT READS DYNAMIC SYNCED STATE WITH LOCALSTORAGE RESILIENCE */}
          {shipmentInfo &&
            (shipmentInfo.trackingCode ||
              shipmentInfo.tracking_code ||
              shipmentInfo.trackingCode) && (
              <section
                className="Bba_description-section"
                style={{
                  borderLeft: "4px solid #8B0021",
                  background: "#fdfbff",
                  padding: "15px",
                  borderRadius: "0 8px 8px 0",
                  marginBottom: "20px",
                }}
              >
                <h3
                  className="Bba_section-title"
                  style={{ color: "#8B0021", margin: 0 }}
                >
                  <FaRulerCombined /> Logistics & Tracking Details
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    fontSize: "14px",
                    marginTop: "10px",
                  }}
                >
                  <p>
                    <strong>Tracking Number:</strong>{" "}
                    {shipmentInfo.trackingCode || shipmentInfo.tracking_code}
                  </p>
                  <p>
                    <strong>Courier Service:</strong>{" "}
                    {shipmentInfo.courier || shipmentInfo.courier_name}
                  </p>
                  {(shipmentInfo.trackingUrl || shipmentInfo.tracking_url) && (
                    <a
                      href={
                        shipmentInfo.trackingUrl || shipmentInfo.tracking_url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#8B0021",
                        textDecoration: "underline",
                        fontWeight: "600",
                      }}
                    >
                      Track Package on Shipbubble →
                    </a>
                  )}
                </div>
              </section>
            )}

          <section className="Bba_description-section">
            <h3 className="Bba_section-title">
              <FiImage /> Design Description
            </h3>
            <p>
              {targetData?.request?.description || "No description provided."}
            </p>
          </section>

          <section className="Bba_images-section">
            <h3 className="Bba_section-title">
              <FiImage /> Inspiration Images
            </h3>

            <div className="Bba_image-scroll">
              {targetData?.request?.inspirationalImage ? (
                Array.isArray(targetData.request.inspirationalImage) ? (
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
                      src={targetData.request.inspirationalImage}
                      alt="Inspiration reference look"
                    />
                  </button>
                )
              ) : (
                <p
                  style={{
                    fontSize: "13px",
                    color: "#8a8a8a",
                    margin: "auto 18px",
                  }}
                >
                  No optional inspiration references uploaded by client.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BvpPage;
