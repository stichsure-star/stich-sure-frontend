import { useNavigate } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";
import Swal from "sweetalert2";
import "../paymentInStich-sure/styles/CheckoutPayment.css";
import { authApi } from "../config/auth";
import { useSelector, useDispatch } from "react-redux";
import { clearPaymentData } from "../global/authSlice";

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Reads rehydrated state on landing redirect
  const paymentData = useSelector((state) => state.auth.paymentData);
  console.log("paymentData recovered on success screen layout:", paymentData);

  const handleSubmit = async () => {
    if (!paymentData) return;

    // 1. Try gathering standard references
    let reference =
      paymentData?.payment?.reference ||
      paymentData?.payment?.transactionReference ||
      paymentData?.data?.payment?.reference ||
      paymentData?.data?.reference ||
      paymentData?.reference;

    // 2. Fallback: If Korapay requires the KPY Invoice reference string from the URL layout
    if (!reference && paymentData?.checkoutUrl) {
      const match = paymentData.checkoutUrl.match(/(KPY-[A-Z0-9_-]+)/i);
      if (match) {
        reference = match[1];
      }
    }

    console.log(
      "🔍 EXTRACTED KORAPAY REFERENCE SENDING TO BACKEND:",
      reference,
    );

    if (!reference) {
      console.warn(
        "Missing Reference: Could not locate transaction reference credentials.",
      );
      return;
    }

    const payload = { reference };

    try {
      const res = await authApi.webHooked(payload);
      console.log("✅ Verification Response:", res.data);

      dispatch(clearPaymentData());
      navigate("/user/myorders");
    } catch (error) {
      console.error(
        "💥 Verification Error Details:",
        error?.response?.data || error.message,
      );
      const apiError = error?.response?.data;
    }
  };

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

        {/* ✅ Directly bound to handleSubmit trigger */}
        <button onClick={handleSubmit} className="payment-btn">
          Go to My Orders
        </button>
      </div>
    </div>
  );
};

export default CheckoutPayment;
