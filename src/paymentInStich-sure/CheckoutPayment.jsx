import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import "../paymentInStich-sure/styles/CheckoutPayment.css"

const CheckoutPayment = () => {
  const navigate = useNavigate();
  return (
    <div className="checkoutPayment-page">
      <div className="verification-card">
        <div className="icon-circle">
          <MdVerifiedUser className="shield-icon" />
        </div>

        <h2>Payment Successful !</h2>

        <p className="description">
          Your order has been successfully confirmed, and your 
          designer will begin processing it shortly.
        </p>

        <button 
        onClick={() => navigate ("/user/dashboard")}
        className="payment-btn ">
          Go Back 
        </button>
      </div>
    </div>
  );
};

export default CheckoutPayment;
