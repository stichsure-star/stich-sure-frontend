import React from "react";
import "../styles/Reliablity.css";
import { LiaCertificateSolid } from "react-icons/lia";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiCoinsLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { PiHandshakeBold } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { GrLineChart } from "react-icons/gr";
import { MdOutlineTimer } from "react-icons/md";

const Reliability = () => {
  const Templates_benefits = [
    {
      id: 1,
      title: "Premium Pricing",
      description: "Charge 15–25% higher prices due to proven reliability",
      icon: <RiCoinsLine />,
    },
    {
      id: 2,
      title: "Priority Visibility",
      description: "Featured in top search results and recommendations",
      icon: <FaRegStar />,
    },
    {
      id: 3,
      title: "Verified Badge",
      description: 'Display "Certified Timely" badge on your profile',
      icon: <MdVerifiedUser />,
    },
    {
      id: 4,
      title: "Express Order Access",
      description: "Eligible to accept high-paying express orders",
      icon: <BsLightningCharge />,
    },
    {
      id: 5,
      title: "Platform Partnership",
      description: "Unlock at 98% on-time rate for exclusive opportunities",
      icon: <PiHandshakeBold />,
    },
  ];
  const Templates_orders = [
    {
      id: 1,
      title: "Bridal Gown",
      customer: "Faith E.",
      status: "1 day early",
      due: "May 10",
    },
    {
      id: 2,
      title: "Agbada Set",
      customer: "Kalu D.",
      status: "On Time",
      due: "May 12",
    },
    {
      id: 3,
      title: "Corporate Suit",
      customer: "Blessing O.",
      status: "1 day early",
      due: "May 15",
    },
    {
      id: 4,
      title: "Ankara Dress",
      customer: "Prince U.",
      status: "2 days late",
      due: "May 18",
    },
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
          <div>
            <GrLineChart className="Reliability_iconed" />
          </div>
          <div>
            <h3>94%</h3>
            <p>Rating</p>
          </div>
        </div>

        <div className="Reliability_metricCard">
          <div>
            <IoMdCheckmarkCircleOutline className="Reliability_iconed" />
          </div>
          <div>
            <h3>12</h3>
            <p>Days Active</p>
          </div>
        </div>

        <div className="Reliability_metricCard">
          <div>
            <IoMdCheckmarkCircleOutline className="Reliability_iconed" />
          </div>
          <div>
            {" "}
            <h3>4.9/5</h3>
            <p>Reviews</p>
          </div>
        </div>

        <div className="Reliability_metricCard">
          <div>
            <MdOutlineTimer className="Reliability_iconed" />
          </div>
          <div>
            <h3>2 hrs</h3>
            <p>Response</p>
          </div>
        </div>
      </div>

      {/* Main Content */}

      <div className="Reliability_content">
        <div className="Reliability_card">
          <h3>Premium Benefits</h3>

          {Templates_benefits.map((item, index) => (
            <div className="Reliability_benefitItem" key={index}>
              <div className="Reliability_bene">
                <article className="Premium_bat">
                  {item.icon}
                  <h5>{item.title}</h5>
                  <span className="Reliability_check">✓</span>
                </article>
                <small>{item.description}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="Reliability_card">
          <h3>Recent Delivery Performance</h3>

          {Templates_orders.map((item, index) => (
            <div className="Reliability_deliveryRow">
              <div>
                <h5>{item.title} </h5>
                <small>Customer:{item.customer}</small>
              </div>
              <div className="lasyt">
                <h5>{item.status}</h5>
                <br />
                <CiCalendar /> <small>Due:{item.due}</small>
              </div>
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
