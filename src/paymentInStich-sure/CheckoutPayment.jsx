import { useNavigate } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";
import Swal from "sweetalert2";
import "../paymentInStich-sure/styles/CheckoutPayment.css";
import { authApi } from "../config/auth";
import { useSelector, useDispatch } from "react-redux";
import { clearPaymentData } from "../global/authSlice";
import { useEffect } from "react";

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const paymentData = useSelector((state) => state.auth.paymentData);
  console.log("paymentData", paymentData);

  const refrence = paymentData?.payment.reference;
  console.log("refrence", refrence);
  const handleSubmit = async () => {
    try {
      const res = await authApi.webHooked(refrence);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleSubmit();
  });

  return (
    <div className="checkoutPayment-page">
      <div className="verification-card">
        <div className="icon-circle">
          <MdVerifiedUser className="shield-icon" />
        </div>

        <h2>Payment Successful!</h2>

        <p className="description">
          Your order has been successfully confirmed, and your designer will
          begin processing it shortly.
        </p>

        <button
          className="payment-btn"
          onClick={() => navigate("/user/myorders")}
        >
          Go to My Orders
        </button>
      </div>
    </div>
  );
};

export default CheckoutPayment;
