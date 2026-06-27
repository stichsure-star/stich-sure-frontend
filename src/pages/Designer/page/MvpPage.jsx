import React, { useEffect, useState } from "react";
import { FiImage, FiInfo } from "react-icons/fi";
import { FaRulerCombined } from "react-icons/fa";
import "../css/mvp.css";
import { designerApi } from "../../../config/designer";
import { useLocation } from "react-router-dom";
import { authApi } from "../../../config/auth";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setShipmentReceipt } from "../../../global/authSlice";
import { SkeletonOrderTracker } from "../../../components/reuasbleComponents/Skeleton";
import Warning from "../../../paymentInStich-sure/popups/Warning";

const MvpPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [Dobbe, Donar] = useState(false);
  const [recep, Reciept] = useState({});
  const dispatch = useDispatch();

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

  console.log("order", order);
  const fetcUser = async () => {
    if (!order) return;
    const payload = {
      name: `${order?.customer?.firstName || ""} ${order?.customer?.lastName || ""}`.trim(),
      email: order?.customer?.email || "",
      address: order?.customer?.address || "",
      phone: order?.customer?.phone || "",
    };
    console.log("payload", payload);
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
      address: order?.designer?.profile.address || "",
      phone: order?.designer?.profile.phoneNumber || "",
    };
    console.log("payloaded", payloaded);
    try {
      const res = await designerApi.shipPy(payloaded);
      console.log("designer shipping", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("order", order?.designer?.profile.phoneNumber);

  console.log("order", order?.designer?.profile.address);

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

  const handleConfirm = async () => {
    setLoading(true);

    const payload = {
      request_token: order?.payment.pickup.request_token,
      courier_id: order?.payment.pickup.courier_id,
      service_code: order?.payment.pickup.service_code,
      is_cod_label: "false",
    };

    try {
      const response = await designerApi.Valid(payload);

      // Storing data into state
      Reciept(response.data);
      dispatch(setShipmentReceipt(response.data));

      if (response.data && response.data.success === true) {
        // 1. Save the FULL raw API response straight to Redux for your own custom display layouts
        dispatch(setShipmentReceipt(response.data));

        // 2. Instantly update the parent UI state to toggle the status string from "Pending" to "Completed"
        if (typeof updateStatusOnUI === "function") {
          updateStatusOnUI("Completed");
        }

        Swal.fire({
          icon: "success",
          title: "Production Completed!",
          text: "Marked as Completed and tracking details loaded.",
          timer: 2000,
          showConfirmButton: false,
        });

        if (onClose) onClose();

        Swal.fire({
          icon: "success",
          title: "Production Completed!",
          text: "Shipment created successfully and order marked as Completed",
          timer: 2000,
          showConfirmButton: false,
        });

        // Optional: Remove if you want the user to stay and read the tracking numbers
        // on the current screen before closing
        if (onClose) {
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      }
    } catch (errors) {
      console.error("Validation error:", errors);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          errors?.response?.data?.message ||
          "Something went wrong tracking this order.",
        confirmButtonColor: "#8B0021",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchDara();
    }
  }, [orderId]);

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
              Due:{" "}
              {formatDashboardDate(order?.request.deadLine || order?.deadLine)}
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
          {recep.success && (
            <div
              className="shipping-receipt-card"
              style={{
                marginTop: "20px",
                padding: "15px",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#6c0319" }}>
                Shipment Details
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  fontSize: "14px",
                }}
              >
                <p>
                  <strong>Tracking Code:</strong> {recep.shipment?.trackingCode}
                </p>
                <p>
                  <strong>Courier:</strong> {recep.shipment?.courier}
                </p>
                <p>
                  <strong>Shipping Fee:</strong> {recep.shipment?.currency}{" "}
                  {recep.shipment?.shippingFee}
                </p>
                <p>
                  <strong>Pickup Address:</strong>{" "}
                  {recep.data?.ship_from?.address}
                </p>

                {recep.shipment?.trackingUrl && (
                  <a
                    href={recep.shipment?.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#6c0319",
                      fontWeight: "600",
                      textDecoration: "underline",
                      marginTop: "4px",
                    }}
                  >
                    Track Shipment on Shipbubble →
                  </a>
                )}
              </div>
            </div>
          )}

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
          {/* Replace the bottom warning div in your return statement with this */}
          {Dobbe && (
            <div className="Warni">
              <Warning
                onClose={() => Donar(false)}
                orderData={order}
                handleConfirm={handleConfirm}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MvpPage;
