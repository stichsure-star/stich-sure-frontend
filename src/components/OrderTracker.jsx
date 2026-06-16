import React from "react";
// import "../styles/OrderTracker.css";
// import "../designer/ordertracker.css"
import "../pages/Designer/css/ordertracker.css"
import { GiCardPickup } from "react-icons/gi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

const OrderTracker = () => {
  const order = {
    item: "Bridal Gown",
    customer: "Faith E.",
    orderId: "QI-245678",
    amount: "₦200,000",
    dueDate: "June 10, 2026",
    status: "Completed",
  };

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

  const progress =
    (steps.filter((step) => step.completed).length / steps.length) * 100;

  return (
    <div className="ordertracker-wrapper">
      <div className="ordertracker-card">
        {/* HEADER */}
        <div className="ordertracker-header">
          <div>
            <h2 className="ordertracker-title">{order.item}</h2>

            <p className="ordertracker-customer">
              for {order.customer}
            </p>

            <p className="ordertracker-id">
              {order.orderId}
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

       

        {/* PROGRESS */}
        <div className="ordertracker-progress-section">
          <div className="ordertracker-progress-header">
            <span>Overall Progress</span>
            {/* <strong>{Math.round(progress)}%</strong> */}
            <strong>100%</strong>
          </div>

          <div className="ordertracker-progress-track">
            <div
              className="ordertracker-progress-fill"
            //   style={{ width: `${progress}%` }}
            style={{ width: "100%" }}
            />
          </div>
        </div>

         {/* STEPS */}
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
      </div>
    </div>
  );
};

export default OrderTracker;