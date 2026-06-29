import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";
import Swal from "sweetalert2"; // Imported SweetAlert2
import "../paymentInStich-sure/styles/CheckoutPayment.css";
import { authApi } from "../config/auth";
import { useSelector } from "react-redux";

const CheckoutPayment = () => {
  const navigate = useNavigate();

  // Fetch payment data configuration from global redux slices
  const paymentData = useSelector((state) => state.auth.paymentData);
  console.log("paymentData verified on success layout:", paymentData);

  const handleSubmit = async () => {
    const reference =
      paymentData?.payment?.reference ||
      paymentData?.data?.payment?.reference ||
      paymentData?.data?.reference;

    if (!reference) {
      Swal.fire({
        icon: "warning",
        title: "Missing Reference",
        text: "Could not find a valid transaction reference. Please verify your transaction dashboard status.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const payload = { reference };

    try {
      // Optional: Show an inline processing loading state while hitting backend hook
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

      // Close loading popup on complete success
      Swal.close();
    } catch (error) {
      console.error(
        "💥 Verification Error:",
        error?.response?.data || error.message,
      );

      const apiError = error?.response?.data;
      const errorMessage =
        apiError?.message ||
        error.message ||
        "Failed to confirm shipment layout synchronization.";

      // SweetAlert error injection layout
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: errorMessage,
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
