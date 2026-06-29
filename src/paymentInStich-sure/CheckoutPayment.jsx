import { useEffect } from "react";
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

  // ✅ Seamlessly reads rehydrated state on landing redirect
  const paymentData = useSelector((state) => state.auth.paymentData);
  console.log("paymentData recovered on success screen layout:", paymentData);

  const handleSubmit = async () => {
    if (!paymentData) return;

    const reference =
      paymentData?.payment?.reference ||
      paymentData?.data?.payment?.reference ||
      paymentData?.data?.reference ||
      paymentData?.reference;

    if (!reference) {
      Swal.fire({
        icon: "warning",
        title: "Missing Reference",
        text: "Could not locate transaction credentials in Redux state configuration.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const payload = { reference };

    try {
      Swal.fire({
        title: "Verifying Transaction...",
        text: "Please wait while we secure your layout order properties.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await authApi.webHooked(payload);
      console.log("✅ Verification Response:", res.data);

      Swal.close();

      // ✅ Wipe clean from storage now that confirmation passed successfully
      dispatch(clearPaymentData());
    } catch (error) {
      console.error(
        "💥 Verification Error:",
        error?.response?.data || error.message,
      );
      const apiError = error?.response?.data;

      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text:
          apiError?.message ||
          error.message ||
          "Failed to complete payment verification layout.",
        confirmButtonColor: "#d33",
      });
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [paymentData]);

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
          onClick={() => navigate("/user/myorders")}
          className="payment-btn"
        >
          Go to My Orders
        </button>
      </div>
    </div>
  );
};

export default CheckoutPayment;
