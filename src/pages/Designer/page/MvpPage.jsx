import React, { useEffect, useState } from "react";
import { FiImage, FiInfo } from "react-icons/fi";
import { FaRulerCombined } from "react-icons/fa";
import "../css/mvp.css";
import { designerApi } from "../../../config/designer";
import { useLocation } from "react-router-dom";
import { authApi } from "../../../config/auth";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setShipmentReceipt } from "../../../global/authSlice";
import { SkeletonOrderTracker } from "../../../components/reuasbleComponents/Skeleton";
import Warning from "../../../paymentInStich-sure/popups/Warning";

const MvpPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const dispatch = useDispatch();

  const [Dobbe, Donar] = useState(false);
  const [recep, Reciept] = useState({});
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDara = async () => {
    try {
      setLoading(true);
      const response = await authApi.oneOrder(orderId);
      if (response.data?.data) {
        setOrder(response.data.data);
      } else {
        setOrder(response.data);
      }
    } catch (error) {
      console.error("Error fetching order tracking info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchDara();
    }
  }, [orderId]);

  const handleConfirm = async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    setLoading(true);

    const payload = {
      request_token:
        order?.payment?.pickup?.request_token || order?.shipment?.request_token,
      courier_id:
        order?.payment?.pickup?.courier_id || order?.shipment?.courier_id,
      service_code:
        order?.payment?.pickup?.service_code || order?.shipment?.service_code,
      is_cod_label: "false",
    };

    try {
      // 1. Create the shipment with Shipbubble
      const response = await designerApi.Valid(payload);

      if (response.data && response.data.success === true) {
        const freshShipment =
          response.data?.shipment || response.data?.data?.shipment;

        // 2. Fire database state switch
        try {
          await authApi.updateOrderStatus(orderId, { status: "completed" });
        } catch (statusError) {
          console.error(
            "Shipment succeeded, but database status update failed:",
            statusError,
          );
        }

        // 3. Update local sync states & Redux slices
        Reciept(response.data);
        dispatch(setShipmentReceipt(response.data));

        setOrder((prev) => ({
          ...prev,
          status: "Completed",
          shipment: freshShipment || prev?.shipment || prev?.payment?.pickup,
        }));

        Donar(false);

        Swal.fire({
          icon: "success",
          title: "Production Completed!",
          text: "Shipment created successfully and database record updated.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Shipment Issue",
          text:
            response.data?.message || "Failed to finalize shipment records.",
          confirmButtonColor: "#8B0021",
        });
      }
    } catch (errors) {
      console.error("Actual JS Crash Details:", errors);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          errors?.response?.data?.message ||
          errors.message ||
          "Something went wrong.",
        confirmButtonColor: "#8B0021",
      });
    } finally {
      setLoading(false);
    }
  };

  const currentStatus =
    order?.status === "Completed" ||
    order?.status?.toLowerCase() === "completed"
      ? "Completed"
      : "Pending";

  if (loading) {
    return (
      <div className="bot_ordertracker-wrapper">
        <div className="bot_ordertracker-page-shell">
          <SkeletonOrderTracker />
        </div>
      </div>
    );
  }

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
              {currentStatus}
            </span>
            <p className="bot_ordertracker-due">
              Due:{" "}
              {formatDashboardDate(order?.request?.deadLine || order?.deadLine)}
            </p>
          </div>
        </div>

        <div className="bot_ordertracker-card">
          <section className="bot_measurements-card">
            <h3 className="bot_section-title">
              <FaRulerCombined /> Body Measurements
            </h3>

            <div className="bot_measurement-note">
              <FiInfo /> All measurements are in inches unless otherwise stated.
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

          {/* DYNAMIC SHIPMENT DETAILS RECEIPT PANEL */}
          {(recep?.success || order?.shipment || order?.payment?.pickup) && (
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
                  <strong>Tracking Code:</strong>{" "}
                  {recep?.shipment?.trackingCode ||
                    order?.shipment?.trackingCode ||
                    order?.shipment?.tracking_code ||
                    order?.payment?.pickup?.tracking_code}
                </p>
                <p>
                  <strong>Courier:</strong>{" "}
                  {recep?.shipment?.courier ||
                    order?.shipment?.courier ||
                    order?.shipment?.courier_name ||
                    order?.payment?.pickup?.courier_name}
                </p>
                {(recep?.shipment?.shippingFee ||
                  order?.shipment?.shippingFee) && (
                  <p>
                    <strong>Shipping Fee:</strong>{" "}
                    {recep?.shipment?.currency || "₦"}{" "}
                    {recep?.shipment?.shippingFee ||
                      order?.shipment?.shippingFee}
                  </p>
                )}

                {(recep?.shipment?.trackingUrl ||
                  order?.shipment?.trackingUrl ||
                  order?.shipment?.tracking_url) && (
                  <a
                    href={
                      recep?.shipment?.trackingUrl ||
                      order?.shipment?.trackingUrl ||
                      order?.shipment?.tracking_url
                    }
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
                <FiImage /> Design Description
              </h3>
              <p>
                {order?.request?.description ||
                  "No specific tailoring notes provided."}
              </p>
            </section>

            <section className="bot_images-section">
              <h3 className="bot_section-title">
                <FiImage /> Inspiration Images
              </h3>

              <div className="bot_image-scroll">
                {order?.request?.inspirationalImage &&
                order.request.inspirationalImage.length > 0 ? (
                  order.request.inspirationalImage.map((imgUrl, idx) => (
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

        {currentStatus === "Completed" ? (
          <div
            className="bot_task-completed-msg"
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              backgroundColor: "#f4f4f4",
              borderLeft: "4px solid #00c851",
              borderRight: "4px solid #00c851",
              color: "#00c851",
              fontWeight: "500",
              borderRadius: "0 4px 4px 0",
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            This Order has already been completed
          </div>
        ) : (
          <button
            className="bot_ordertracker-done-btn"
            type="button"
            onClick={() => Donar(true)}
          >
            Done
          </button>
        )}

        {Dobbe && (
          <div className="Warni">
            <Warning
              onClose={() => Donar(false)}
              orderData={order}
              handleConfirm={handleConfirm}
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MvpPage;
