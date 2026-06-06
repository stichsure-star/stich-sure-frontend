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
            <button> Continue as Designer</button>
          </Link>
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

          <Link to="/signup?role=designer" className="btn">
            <button>Sign Up as Designer</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Started;
