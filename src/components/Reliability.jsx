import React from "react";
import "../styles/Reliablity.css";
import { LiaCertificateSolid } from "react-icons/lia";

const Reliability = () => {
  const benefits = [
    "Priority Dispatch",
    "Faster Payouts",
    "Exclusive Access",
    "Express Order Support",
    "Platform Visibility",
  ];

  const deliveries = [
    { title: "Order No.1", status: "DELIVERED" },
    { title: "Order No.2", status: "DELIVERED" },
    { title: "Customer Return", status: "RETURNED" },
    { title: "Address Error", status: "MISSED" },
    { title: "Late Delivery", status: "DELIVERED" },
  ];

  return (
    <div className="Reliability_dashboard">
      {/* Header */}

      <div className="Reliability_header">
        <div className="Reliability_scoreDetails">
          <div className="Reliability_badge">
            <LiaCertificateSolid className="Ben" /> <p>Certified Timely</p>
          </div>
          <div className="Reliability_scors">
            <p className="Reliability_title">Reliability Score</p>

            <h1 className="Reliability_score">
              94 <span>/100</span>
            </h1>

            <p className="Reliability_level">Premium Level</p>
          </div>
          <div className="Reliability_badge">
            <article>
              <small>Total Orders</small>
              <h2>156</h2>
            </article>
            <article>
              <small>Total Orders</small>
              <h2>156</h2>
            </article>
          </div>
        </div>

        <div className="Reliability_circle">
          <div className="Reliability_circleInner">
            <span>Excellent</span>
            <small>94%</small>
          </div>
        </div>
      </div>

      {/* Metrics */}

      <div className="Reliability_metrics">
        <div className="Reliability_metricCard">
          <h3>94%</h3>
          <p>Rating</p>
        </div>

        <div className="Reliability_metricCard">
          <h3>12</h3>
          <p>Days Active</p>
        </div>

        <div className="Reliability_metricCard">
          <h3>4.9/5</h3>
          <p>Reviews</p>
        </div>

        <div className="Reliability_metricCard">
          <h3>2 hrs</h3>
          <p>Response</p>
        </div>
      </div>

      {/* Main Content */}

      <div className="Reliability_content">
        <div className="Reliability_card">
          <h3>Premium Benefits</h3>

          {benefits.map((benefit, index) => (
            <div key={index} className="Reliability_benefitItem">
              <span className="Reliability_check">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div className="Reliability_card">
          <h3>Recent Delivery Performance</h3>

          {deliveries.map((delivery, index) => (
            <div key={index} className="Reliability_deliveryRow">
              <span>{delivery.title}</span>

              <span
                className={`Reliability_badge Reliability_${delivery.status.toLowerCase()}`}
              >
                {delivery.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}

      <div className="Reliability_footer">
        <h3>Want to increase your score?</h3>

        <button className="Reliability_button">Explore Guidelines</button>
      </div>
    </div>
  );
};

export default Reliability;
