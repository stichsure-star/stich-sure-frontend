import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import "../paymentInStich-sure/styles/CheckoutPayment.css";
import { authApi } from "../config/auth";
import { useSelector } from "react-redux";

const CheckoutPayment = () => {
  const navigate = useNavigate();

  const paymentData = useSelector((state) => state.auth.paymentData);

  console.log("paymentData", paymentData);

  const handleSubmit = async () => {
    const payload = {
      reference: paymentData?.payment.reference,
    };
    try {
      const res = await authApi.webHooked(payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <div className="checkoutPayment-page">
      <div className="verification-card">
        <div className="icon-circle">
          <MdVerifiedUser className="shield-icon" />
        </div>

        <h2>Payment Successful !</h2>

        <p className="description">
          Your order has been successfully confirmed, and your designer will
          begin processing it shortly.
        </p>

        <button
          onClick={() => {
            handleSubmit(navigate("/user/myorders"));
          }}
          className="payment-btn "
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CheckoutPayment;
