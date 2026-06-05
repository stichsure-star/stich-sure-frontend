import React from "react";
import "../styles/Started.css";
import Header from "../components/reuasbleComponents/Header";
import Footer from "../components/reuasbleComponents/Footer";
import { NavLink } from "react-router-dom";

const Started = () => {
  return (
    <div className="get_started_page">
      <div className="get_started_page_container">
        <div className="designer_card">
          <div className="card_text">
            <h2>Designer</h2>

            <ul>
              <li>Get discovered by more customers</li>
              <li>Manage orders and deadlines easily</li>
              <li>Build your brand profile online</li>
              <li>Earn more with reliable delivery</li>
            </ul>
          </div>

          <button>
            <NavLink to="/signup" className="NavLink">
              Continue as Designer
            </NavLink>
          </button>
        </div>

        <div className="customer_card">
          <div className="card_text">
            <h2>Customer</h2>

            <ul>
              <li>Get discovered by more customers</li>
              <li>Manage orders and deadlines easily</li>
              <li>Build your brand profile online</li>
              <li>Earn more with reliable delivery</li>
            </ul>
          </div>

          <button>Continue as Customer</button>
        </div>
      </div>
    </div>
  );
};

export default Started;
