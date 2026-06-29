import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Bili.css";
import { authApi } from "../config/auth";
import { useDispatch, useSelector } from "react-redux";
import { SkeletonCheckout } from "../components/reuasbleComponents/Skeleton";
import { setPaymentData, updateUser } from "../global/authSlice";
import { customerApi } from "../config/customer";

const DesignerCheckOutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [orderId, setOrder] = useState(null);
  const user = useSelector((state) => state.auth.user);

  // Parse state from routing context safely
  let finalState = location.state?.collabDetails || location.state;

  const [loading, setLoading] = useState(false);
  const [orderPreparing, setOrderPreparing] = useState(true);
  const [errors, setErrors] = useState({});
  const [saveInfo, setSaveInfo] = useState(false);

  const [formData, setFormData] = useState({
    address: user?.address || "",
    email: user?.email || "",
    phone: user?.phone || user?.phoneNumber || "",
  });

  useEffect(() => {
    if (!user) return;

    setFormData((prev) => ({
      ...prev,
      email: prev.email || user.email || "",
      phone: prev.phone || user.phone || user.phoneNumber || "",
      address: prev.address || user.address || "",
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

  // Cost calculations
  const subtotal =
    Number(finalState.amount) || Number(finalState.taskPrice) || 0;

  // Logistics cost covering dispatch to and from the studio
  const baseShippingPerTrip = 840;
  const shipping = baseShippingPerTrip * 2; // Going and coming logistics fee
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
      amount: total,
      designId: finalState.designId || finalState.id,
      designerId: finalState.designerId || finalState.receiver?.id || user?.id,
      itemName:
        finalState.taskType ||
        finalState.itemName ||
        "Designer Workspace Collaboration",
      requestId: finalState.id || finalState._id,
    };

    const response = await authApi.profileOrder(payload);
    const id = response.data.data?.id || response.data.id;
    setOrder(id);
    return id;
  };

  const syncDesignerProfile = async (phone) => {
    const deliveryAddress = getDeliveryAddress();

    const cleanFirstName = (user?.firstName || "Designer")
      .replace(/[^a-zA-Z\s]/g, "")
      .trim();
    const cleanLastName = (user?.lastName || "Workspace")
      .replace(/[^a-zA-Z\s]/g, "")
      .trim();

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

    if (!savedPhone || !savedAddress) {
      throw new Error(
        "Could not update profile information. Please verify your fields and retry.",
      );
    }

    const updatedUserData = {
      ...profile,
      phone: savedPhone,
      address: savedAddress,
    };

    dispatch(updateUser(updatedUserData));

    try {
      localStorage.setItem("user", JSON.stringify(updatedUserData));
    } catch (e) {
      console.error("Profile cache sync mismatch:", e);
    }

    return { phone: savedPhone, address: savedAddress };
  };

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
      tempErrors.address = "Studio or pickup address layout is required.";
    } else if (formData.address.trim().length < 10) {
      tempErrors.address =
        "Please enter a specific physical address for courier matching.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const finalPayment = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const phone = (formData.phone || "").trim();
    const email = (formData.email || user?.email || "").trim();
    const deliveryAddress = getDeliveryAddress();

    try {
      if (saveInfo) {
        await syncDesignerProfile(phone);
      }

      const currentOrderId = await createOrder();

      const payload = {
        orderId: currentOrderId,
        email,
        deliveryAddress,
      };

      const response = await authApi.finalPay(payload);
      dispatch(setPaymentData(response.data));

      try {
        if (response?.data) {
          localStorage.setItem("paymentData", JSON.stringify(response.data));
        }
      } catch (e) {
        console.error("Storage fallback failed:", e);
      }

      const checkoutUrl =
        response?.data?.checkoutUrl ||
        response?.data?.data?.checkoutUrl ||
        response?.data?.payment?.checkoutUrl;

      if (checkoutUrl) {
        window.location.assign(checkoutUrl);
        return;
      }

      alert(
        "Unable to initiate terminal interface. Redirect property missing.",
      );
    } catch (error) {
      console.log(
        "Payment initialization crash details:",
        error?.response?.data || error.message,
      );
      const apiError = error?.response?.data;
      alert(
        apiError?.action ||
          apiError?.message ||
          "Failed to initialize payment gateway integration.",
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
            {/* PERSONAL INFO */}
            <div className="Check_info-card">
              <h4>Designer Personal Profile</h4>
              <input
                value={
                  `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
                  "Designer Account"
                }
                readOnly
              />
              <input
                value={user?.email || formData.email}
                style={errors.email ? { borderColor: "#ff0000" } : {}}
                readOnly
              />
              {errors.email && (
                <span style={{ color: "#ff0000", fontSize: "10px" }}>
                  {errors.email}
                </span>
              )}

              <input
                name="phone"
                placeholder="07056491653"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData((prev) => ({ ...prev, phone: value }));
                  setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                maxLength={11}
                style={errors.phone ? { borderColor: "#ff0000" } : {}}
              />
              {errors.phone && (
                <span style={{ color: "#ff0000", fontSize: "10px" }}>
                  {errors.phone}
                </span>
              )}
            </div>

            {/* LOGISTICS PICKUP / DROP OFF INFORMATION */}
            <div className="Check_info-card">
              <h4>Studio Address (Round-Trip Shipping Location)</h4>
              <input
                name="address"
                placeholder="Enter workspace address for materials delivery and product return"
                value={formData.address}
                onChange={handleChange}
                style={errors.address ? { borderColor: "#ff0000" } : {}}
              />
              {errors.address && (
                <span
                  style={{
                    color: "#ff0000",
                    fontSize: "10px",
                    display: "block",
                  }}
                >
                  {errors.address}
                </span>
              )}

              <div className="Asave-info">
                <input
                  type="checkbox"
                  id="saveInfo"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                />
                <label htmlFor="saveInfo">
                  Save workspace layout properties for active design contracts
                </label>
              </div>
            </div>
          </div>

          {/* ORDER CALCULATION SIDEBAR - REMOVED IMAGE CONTAINER */}
          <div className="Check_order-card">
            <div className="Check_product-row" style={{ display: "block" }}>
              <h3>
                {finalState.taskType ||
                  finalState.itemName ||
                  "Design Workspace Assignment"}
              </h3>
              <p className="Check_price" style={{ marginTop: "4px" }}>
                {formatNaira(subtotal)}
              </p>
            </div>

            <div className="Check_summary">
              <div className="Check_summary-row">
                <span className="Check_summary-label">Project Escrow Base</span>
                <span className="Check_summary-value">
                  {formatNaira(subtotal)}
                </span>
              </div>

              <div className="Check_summary-row" style={{ color: "#d97706" }}>
                <span className="Check_summary-label">
                  Logistics (Round-Trip: Going & Coming)
                </span>
                <span className="Check_summary-value">
                  {formatNaira(shipping)}
                </span>
              </div>

              <div className="Check_summary-row Check_total-row">
                <span className="Check_summary-label">Total Outlay</span>
                <span className="Check_total-value">
                  <small>NGN</small> {formatNaira(total)}
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
              {loading ? "Initializing Gateway..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DesignerCheckOutPage;
