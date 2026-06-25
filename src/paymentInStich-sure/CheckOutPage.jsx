import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/Bili.css";
import { authApi } from "../config/auth";
import productImage from "../assets/gbenga/Gown.png";
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

  // States for checkbox and save indication text
  const [saveInfo, setSaveInfo] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Streamlined to a single address string
  const [formData, setFormData] = useState({
    address: "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Load saved address on mount
  useEffect(() => {
    try {
      const savedAddressInfo = JSON.parse(
        localStorage.getItem("saved_checkout_address") || "null",
      );
      if (savedAddressInfo?.address) {
        setFormData((prev) => ({ ...prev, address: savedAddressInfo.address }));
        setSaveInfo(true);
      }
    } catch (e) {
      console.error("Error reading from localStorage", e);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    setFormData((prev) => ({
      ...prev,
      email: prev.email || user.email || "",
      phone: prev.phone || user.phone || "",
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

  // Handles the dynamic feedback indication when checking/unchecking
  const handleSaveCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setSaveInfo(isChecked);

    if (isChecked) {
      if (formData.address.trim()) {
        localStorage.setItem(
          "saved_checkout_address",
          JSON.stringify({ address: formData.address }),
        );
        setSaveStatus("✓ Saved to device");
      } else {
        setSaveStatus("Address is empty");
      }
    } else {
      localStorage.removeItem("saved_checkout_address");
      setSaveStatus("Cleared");
    }

    // Hide the indication tag after 2.5 seconds
    setTimeout(() => {
      setSaveStatus("");
    }, 2500);
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

    const profileData = new FormData();
    profileData.append("firstName", user?.firstName || "");
    profileData.append("lastName", user?.lastName || "");
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

    dispatch(
      updateUser({
        ...profile,
        phone: savedPhone,
        address: savedAddress,
      }),
    );

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
    const fullAddress = formData.address;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(
          fullAddress,
        )}`,
        { headers: { "Accept-Language": "en" } },
      );

      const data = await response.json();
      console.log("ADDRESS RESULTS:", data);
      return true;
    } catch (error) {
      console.log("Address verification error:", error);
      return true;
    }
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
      // Secondary fallback persistence catch during checkout submission
      if (saveInfo && formData.address.trim()) {
        localStorage.setItem(
          "saved_checkout_address",
          JSON.stringify({ address: formData.address }),
        );
      }

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

      dispatch(setPaymentData(response.data));

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
  const derivedFullName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "Guest User";

  return (
    <div className="Check_screen">
      <main className="Check_main">
        <div className="Check_page">
          <div className="Check_left">
            <div className="Check_info-card">
              <h4>Personal Information</h4>

              <input placeholder={derivedFullName} readOnly />
              <input
                value={user?.email}
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

              <input
                name="phone"
                placeholder="07056491653"
                value={user?.phoneNumber}
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

              <div
                className="Asave-info"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="checkbox"
                  id="saveInfo"
                  checked={saveInfo}
                  onChange={handleSaveCheckboxChange}
                />
                <label htmlFor="saveInfo" style={{ cursor: "pointer" }}>
                  Save this information for a faster next time
                </label>
                {saveStatus && (
                  <span
                    style={{
                      color: saveStatus.includes("Saved")
                        ? "#2e7d32"
                        : "#757575",
                      fontSize: "11px",
                      fontWeight: "500",
                      marginLeft: "8px",
                      animation: "fadeIn 0.3s ease",
                    }}
                  >
                    {saveStatus}
                  </span>
                )}
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
