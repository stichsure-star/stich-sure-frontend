import React from "react";
import "../styles/Started.css";
import Header from "../components/reuasbleComponents/Header";
import Footer from "../components/reuasbleComponents/Footer";
import { Link } from "react-router-dom";

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

          <Link to="/signup?role=user">
            <button> Continue as a Designer</button>
          </Link>
        </div>

        <div className="customer_card">
          <div className="card_text">
            <h2>Customer</h2>

            <ul>
              <li>Find trusted designers easily</li>
              <li>Order custom outfits stress-free</li>
              <li>Track orders in real time </li>
              <li>View Reviews before choosing</li>
            </ul>
          </div>

          <Link to="/signup?role=designer" className="btn">
            <button> Continue as a Customer</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Started;
