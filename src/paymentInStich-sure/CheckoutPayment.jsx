import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import "../paymentInStich-sure/styles/CheckoutPayment.css"

const CheckoutPayment = ({ onNext, onPrev }) => {
  return (
    <div className="checkoutPayment-page">
      <div className="verification-card">
        <div className="icon-circle">
          <MdVerifiedUser className="shield-icon" />
        </div>

        <h2>Payment Successful !</h2>

        <p className="description">
          Your order has been successfully processed , and your fashion project is 
          now moving to the next stage.
        </p>

        <button className="submit-btn ">
          Go Back 
        </button>
      </div>
    </div>
  );
};

export default CheckoutPayment;
