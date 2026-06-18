import React from "react";
import { GiCardPickup } from "react-icons/gi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import "../css/mvp.css"

const MvpPage = () => {
  const order = {
    item: "Bridal Gown",
    customer: "Faith E.",
    orderId: "QI-245678",
    amount: "₦200,000",
    dueDate: "June 10, 2026",
    status: "Completed",
  };

  const measurements = [
    { label: "Chest", value: "36" },
    { label: "Waist", value: "28" },
    { label: "Hip", value: "42" },
    { label: "Shoulder", value: "15" },
    { label: "Sleeve", value: "24" },
    { label: "Length", value: "62" },
    { label: "Neck", value: "14" },
    { label: "Upper Arm", value: "13" },
  ];

  const images = [
    "/img1.jpg",
  ];

  const steps = [
    {
      title: "Picked Up",
      date: "May 10",
      icon: <GiCardPickup />,
      className: "pickedup",
    },
    {
      title: "Ready",
      date: "May 10",
      icon: <IoCheckmarkCircle />,
      className: "ready",
    },
    {
      title: "Delivered",
      date: "May 10",
      icon: <TbTruckDelivery />,
      className: "delivered",
    },
  ];

  return (
    <div className="ordertracker-wrapper">
      <div className="ordertracker-card">

        {/* Header */}
        <div className="ordertracker-header">
          <div>
            <h2 className="ordertracker-title">{order.item}</h2>
            <p className="ordertracker-customer">
              for {order.customer}
            </p>
            <p className="ordertracker-id">
              Order ID: {order.orderId}
            </p>
          </div>

          <div className="ordertracker-header-right">
            <h3 className="ordertracker-price">
              {order.amount}
            </h3>

            <span className="ordertracker-status-badge">
              {order.status}
            </span>

            <p className="ordertracker-due">
              Due: {order.dueDate}
            </p>
          </div>
        </div>

       {/* DESIGN SECTION */}

<div className="design-layout">

  {/* LEFT SIDE */}
  <div className="measurements-card">
    <h3>Body Measurements</h3>

    <div className="measurements-scroll">
      {measurements.map((item) => (
        <div
          key={item.label}
          className="measurement-row"
        >
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="design-brief-card">

    <div className="description-section">
      <h3>Design Details</h3>

      <p>
        Mermaid silhouette gown with long sleeves,
        cathedral train and detailed lace work.
        Fitted upper body with flowing lower
        structure.
      </p>

      <p>
        Additional embroidery should be added
        around neckline and sleeves.
      </p>
    </div>

    <div className="images-section">
      <h3>Inspiration Images</h3>

      <div className="image-scroll">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Reference ${index}`}
          />
        ))}
      </div>
    </div>

  </div>

</div>

        {/* Timeline - Unchanged */}
        <div className="ordertracker-steps">
          {steps.map((step) => (
            <div
              key={step.title}
              className={`ordertracker-step-card ${step.className}`}
            >
              <div className="ordertracker-step-left">
                <div className="ordertracker-icon">
                  {step.icon}
                </div>

                <div>
                  <h4>{step.title}</h4>
                  <p>Completed: {step.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="ordertracker-progress-section">
          <div className="ordertracker-progress-header">
            <span>Overall Progress</span>
            <strong>100%</strong>
          </div>

          <div className="ordertracker-progress-track">
            <div
              className="ordertracker-progress-fill"
              style={{ width: "100%" }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default MvpPage;