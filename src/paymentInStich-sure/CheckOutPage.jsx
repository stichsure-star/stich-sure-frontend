import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Bili.css";
import { authApi } from "../config/auth";
import { useDispatch, useSelector } from "react-redux";
import { SkeletonCheckout } from "../components/reuasbleComponents/Skeleton";
import { setPaymentData, updateUser } from "../global/authSlice";
import { customerApi } from "../config/customer";

const CheckOutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Appy, setAppy] = useState({});
  const [demmy, Reppy] = useState(null);
  const dispatch = useDispatch();

  const [orderId, setOrder] = useState(null);
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);

  let finalState = location.state;
  console.log("finalState", finalState);

  const [loading, setLoading] = useState(false);
  const [orderPreparing, setOrderPreparing] = useState(true);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    address: "",
    email: user?.email || "",
    phone: user?.phone || user?.phoneNumber || "",
  });

  useEffect(() => {
    if (!user) return;

    setFormData((prev) => ({
      ...prev,
      email: prev.email || user.email || "",
      phone: prev.phone || user.phone || user.phoneNumber || "",
    }));
  }, [user]);

  if (!finalState) {
    try {
      const stored = sessionStorage.getItem("checkoutState");
      finalState = stored ? JSON.parse(stored) : {};
    } catch (e) {
      finalState = {};
    }
  }

  const subtotal = Number(finalState.amount) || 5000000;
  const shipping = 840;
  const total = subtotal + shipping;

  const formatNaira = (value) =>
    `₦${new Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 0,
    }).format(value)}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const getDeliveryAddress = () =>
    (formData.address || "Not provided").slice(0, 255);

  const createOrder = async () => {
    const payload = {
      amount: finalState.amount,
      designId: finalState.designId,
      designerId: finalState.designerId,
      itemName: finalState.itemName,
      requestId: finalState.requestId,
    };

    const response = await authApi.profileOrder(payload);
    setAppy(response.data);
    const id = response.data.data?.id || response.data.id;
    setOrder(id);
    return id;
  };

  const syncCustomerProfile = async (phone) => {
    const deliveryAddress = getDeliveryAddress();

    // SANITIZATION FIX: Strips out numbers/special symbols and guarantees non-empty fallbacks
    const cleanFirstName =
      (user?.firstName || "John").replace(/[^a-zA-Z\s]/g, "").trim() || "John";
    const cleanLastName =
      (user?.lastName || "Doe").replace(/[^a-zA-Z\s]/g, "").trim() || "Doe";

    const profileData = new FormData();
    profileData.append("firstName", cleanFirstName);
    profileData.append("lastName", cleanLastName);
    profileData.append("email", user?.email || formData.email || "");
    profileData.append("phone", phone);
    profileData.append("address", deliveryAddress);

    await customerApi.updateprofile(user?.id, profileData);

    const profileRes = await customerApi.getProfile(user?.id);
    const profile = profileRes?.data?.data || {};
    const savedPhone = profile.phone?.trim();
    const savedAddress = profile.address?.trim();

    if (!savedPhone) {
      throw new Error(
        "Your phone could not be saved to your profile. Please update your profile and try again.",
      );
    }

    if (!savedAddress) {
      throw new Error(
        "Your address could not be saved to your profile. Please update your profile and try again.",
      );
    }

    const updatedUserData = {
      ...profile,
      phone: savedPhone,
      address: savedAddress,
    };

    // 1. SAVE TO REDUX
    dispatch(updateUser(updatedUserData));

    // 2. SAVE TO LOCAL STORAGE (Double Backup)
    try {
      localStorage.setItem("user", JSON.stringify(updatedUserData));
    } catch (e) {
      console.error("Local storage backup failed:", e);
    }

    return { phone: savedPhone, address: savedAddress };
  };

  const buildPaymentPayload = (currentOrderId, email, deliveryAddress) => ({
    orderId: currentOrderId,
    email,
    deliveryAddress,
  });

  const validateForm = () => {
    let tempErrors = {};

    const email = (formData.email || user?.email || "").trim();
    if (!email) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    const cleanPhone = (formData.phone || "").replace(/\s/g, "");
    if (!cleanPhone) {
      tempErrors.phone = "Phone number is required.";
    } else if (!/^0\d{10}$/.test(cleanPhone)) {
      tempErrors.phone = "Enter a valid Nigerian phone number.";
    }

    if (!formData.address.trim()) {
      tempErrors.address = "Full delivery address is required.";
    } else if (formData.address.trim().length < 10) {
      tempErrors.address =
        "Please enter a complete address layout (Street, City, State).";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const verifyAddress = async () => {
    return true;
  };

  const finalPayment = async () => {
    if (!validateForm()) return;

    const addressValid = await verifyAddress();
    if (!addressValid) return;

    setLoading(true);

    const phone = (formData.phone || "").trim();
    const email = (formData.email || user?.email || "").trim();
    const deliveryAddress = getDeliveryAddress();

    try {
      await syncCustomerProfile(phone);
      const currentOrderId = await createOrder();
      const payload = buildPaymentPayload(
        currentOrderId,
        email,
        deliveryAddress,
      );

      console.log("Payment initialize payload:", payload);

      const response = await authApi.finalPay(payload);
      console.log("FULL PAYMENT RESPONSE:", response);

      // 1. SAVE TO REDUX
      dispatch(setPaymentData(response.data));

      // 2. SAVE TO LOCAL STORAGE (Double Backup)
      try {
        if (response?.data) {
          localStorage.setItem("paymentData", JSON.stringify(response.data));
        }
      } catch (e) {
        console.error("Local storage payment backup failed:", e);
      }

      const checkoutUrl =
        response?.data?.checkoutUrl ||
        response?.data?.data?.checkoutUrl ||
        response?.data?.payment?.checkoutUrl;

      if (checkoutUrl) {
        window.location.assign(checkoutUrl);
        return;
      }

      alert("Unable to start payment. Checkout URL missing.");
    } catch (error) {
      console.log(
        "Payment error response:",
        error?.response?.data || error.message,
      );
      const apiError = error?.response?.data;

      alert(
        apiError?.action ||
          apiError?.message ||
          error.message ||
          "Failed to initialize payment.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state) {
      sessionStorage.setItem("checkoutState", JSON.stringify(location.state));
    }

    setOrderPreparing(false);
  }, [location.state]);

  if (orderPreparing) {
    return (
      <div className="Check_screen">
        <main className="Check_main">
          <SkeletonCheckout />
        </main>
      </div>
    );
  }

  return (
    <div className="Check_screen">
      <main className="Check_main">
        <div className="Check_page">
          <div className="Check_left">
            <div className="Check_info-card">
              <h4>Personal Information</h4>

              <input
                value={
                  `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
                  "Customer Name"
                }
                readOnly
              />
              <input
                value={user?.email || formData.email}
                style={errors.email ? { borderColor: "#ff0000" } : {}}
                readOnly
              />
              {errors.email && (
                <span
                  style={{
                    color: "#ff0000",
                    fontSize: "10px",
                    marginTop: "-10px",
                  }}
                >
                  {errors.email}
                </span>
              )}

              {/* FIXED VALUE BINDING: Changed from user?.phoneNumber to formData.phone */}
              <input
                name="phone"
                placeholder="07056491653"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  setFormData((prev) => ({
                    ...prev,
                    phone: value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    phone: "",
                  }));
                }}
                maxLength={11}
                style={errors.phone ? { borderColor: "#ff0000" } : {}}
              />
              {errors.phone && (
                <span
                  style={{
                    color: "#ff0000",
                    fontSize: "10px",
                    marginTop: "-10px",
                  }}
                >
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="Check_info-card">
              <h4>Address Information</h4>

              <input
                name="address"
                placeholder="60, Idowu Street, Ajegunle, Lagos, Nigeria"
                value={formData.address}
                onChange={handleChange}
                style={errors.address ? { borderColor: "#ff0000" } : {}}
              />
              {errors.address && (
                <span
                  style={{
                    color: "#ff0000",
                    fontSize: "10px",
                    marginTop: "-10px",
                    display: "block",
                  }}
                >
                  {errors.address}
                </span>
              )}

              <div className="Asave-info">
                <input type="checkbox" id="saveInfo" />
                <label htmlFor="saveInfo">
                  Save this information for a faster next time
                </label>
              </div>
            </div>
          </div>

          <div className="Check_order-card">
            <div className="Check_product-row">
              <img src={finalState.design} alt="Corset Wedding Gown" />
              <h3>{finalState.itemName || "Corset Wedding Gown"}</h3>
              <p className="Check_price">{formatNaira(subtotal)}</p>
            </div>

            <div className="Check_summary">
              <div className="Check_summary-row">
                <span className="Check_summary-label">Subtotal</span>
                <span className="Check_summary-value">
                  {formatNaira(subtotal)}
                </span>
              </div>

              <div className="Check_summary-row">
                <span className="Check_summary-label">Shipping</span>
                <span className="Check_summary-value">
                  {formatNaira(shipping)}
                </span>
              </div>

              <div className="Check_summary-row Check_total-row">
                <span className="Check_summary-label">Total</span>
                <span className="Check_total-value">
                  <small>NGN</small>
                  {formatNaira(total)}
                </span>
              </div>
            </div>

            <button
              onClick={finalPayment}
              disabled={loading || orderPreparing}
              style={{
                cursor: loading || orderPreparing ? "not-allowed" : "pointer",
                opacity: loading || orderPreparing ? 0.6 : 1,
              }}
            >
              {loading ? "Completing Order..." : "Complete Order"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckOutPage;
