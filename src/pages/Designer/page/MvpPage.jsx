import React from "react";
import { FiImage, FiInfo } from "react-icons/fi";
import { FaRulerCombined } from "react-icons/fa";
import "../css/mvp.css";
import designImage from "../../../assets/daniel/Colorful Ankara.png";

const MvpPage = () => {
  const order = {
    item: "Bridal Gown",
    customer: "Faith E.",
    orderId: "ORD-101",
    amount: "₦200,000",
    dueDate: "June 10, 2026",
    status: "15 days left",
  };

  const measurements = [
    { label: "Chest", note: "Fullest part of bust", value: "30" },
    { label: "Hip Length", note: "Shoulder to hem", value: "22" },
    { label: "Shoulder", note: "Shoulder to shoulder", value: "15" },
    { label: "Neck", note: "Around the neck", value: "14" },
    { label: "Sleeve Length", note: "Shoulder to wrist", value: "24" },
    { label: "Bust", note: "Underbust measurement", value: "36" },
    { label: "Waist", note: "Natural waist line", value: "28" },
    { label: "Round Sleeve", note: "Around upper arm", value: "13" },
    { label: "Dress Length", note: "Shoulder to floor", value: "62" },
  ];

  return (
    <div className="ordertracker-wrapper">
      <div className="ordertracker-page-shell">
        <div className="ordertracker-header">
          <div>
            <h2 className="ordertracker-title">{order.item}</h2>
            <p className="ordertracker-customer">for {order.customer}</p>
            <p className="ordertracker-id">Order ID: {order.orderId}</p>
          </div>

          <div className="ordertracker-header-right">
            <h3 className="ordertracker-price">{order.amount}</h3>
            <span className="ordertracker-status-badge">{order.status}</span>
            <p className="ordertracker-due">Due: {order.dueDate}</p>
          </div>
        </div>

        <div className="ordertracker-card">
          <section className="measurements-card">
            <h3 className="section-title">
              <FaRulerCombined />
              Body Measurements
            </h3>

            <div className="measurement-note">
              <FiInfo />
              All measurements are in inches unless otherwise stated.
            </div>

            <div className="measurement-design-grid">
              <div className="measurements-scroll">
                {measurements.map((item) => (
                  <div key={item.label} className="measurement-row">
                    <div>
                      <span>{item.label}</span>
                      <small>{item.note}</small>
                    </div>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>

              <div className="your-design-panel">
                <h3 className="section-title">
                  <FiImage />
                  Your Design
                </h3>
                <button className="design-preview-button" type="button">
                  <img src={designImage} alt="Selected bridal gown design" />
                </button>
              </div>
            </div>
          </section>

          <section className="description-section">
            <h3 className="section-title">
              <FiImage />
              Design Description
            </h3>

            <p>
              I would love a beautiful Ankara peplum top with ruffled sleeves.
              The fabric should be a vibrant orange and gold wax print. I want
              the neckline to be a modest round neck with a slight V dip. The
              peplum should flare out below the waist. Please add a hidden
              zipper at the back for easy dressing. The overall look should be
              elegant yet festive, suitable for an owambe party.
            </p>
          </section>

          <section className="images-section">
            <h3 className="section-title">
              <FiImage />
              Inspiration Images
            </h3>

            <div className="image-scroll">
              <button className="inspiration-image-button" type="button">
                <img src={designImage} alt="Inspiration for bridal gown" />
              </button>
            </div>

            <p className="image-helper-text">
              Client has uploaded reference images to guide the design. Click
              each image to view full size.
            </p>
          </section>
        </div>

        <button className="ordertracker-done-btn" type="button">
          Done
        </button>
      </div>
    </div>
  );
};

export default MvpPage;
