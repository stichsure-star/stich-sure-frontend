import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/Bili.css";
import { authApi } from "../config/auth";
import productImage from "../assets/gbenga/Gown.png";
import { useDispatch, useSelector } from "react-redux";
import { SkeletonCheckout } from "../components/reuasbleComponents/Skeleton";
import { setPaymentData } from "../global/authSlice";

const CheckOutPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [Appy, setAppy] = useState({});
  const [demmy, Reppy] = useState(null);
  const dispatch = useDispatch();
  // Before

  // After
  const [orderId, setOrder] = useState(null);
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);

  let finalState = location.state;
  console.log("finalState", finalState);

  const [loading, setLoading] = useState(false);
  const [orderPreparing, setOrderPreparing] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    email: user?.email,
    phoneNumber: user?.phone || "", // Added phone number to form state
  });

  if (!finalState) {
    try {
      const stored = sessionStorage.getItem("checkoutState");
      finalState = stored ? JSON.parse(stored) : {};
    } catch (e) {
      finalState = {};
    }
  }

  const subtotal = Number(finalState.amount) || 5000000;
  const shipping = 420;
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

  const getFullAddress = () =>
    `${formData.address || "Not provided"}, ${formData.city || "Not provided"}, ${
      formData.state || "Not provided"
    }, ${formData.country || "Not provided"}`;

  const handleSubmit = async () => {
    const payload = {
      amount: finalState.amount,
      designId: finalState.designId,
      designerId: finalState.designerId,
      itemName: finalState.itemName,
      requestId: finalState.requestId,
      address: getFullAddress(),
    };
    console.log("payloaded", payload);
    try {
      const response = await authApi.profileOrder(payload);
      console.log("Order response:", response);
      setAppy(response.data);
      console.log("Full response:", JSON.stringify(response.data));
      setOrder(response.data.data?.id || response.data.id);
    } catch (error) {
      console.log("Order error:", error);
    } finally {
      setOrderPreparing(false);
    }
  };
  console.log("appy", Appy);
  console.log("orderId", Appy.data?.id);
  console.log("demmy", demmy);

  const validateForm = () => {
    let tempErrors = {};

    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    const cleanPhone = formData.phoneNumber.replace(/\s/g, "");

    if (!cleanPhone) {
      tempErrors.phoneNumber = "Phone number is required.";
    } else if (!/^0\d{10}$/.test(cleanPhone)) {
      tempErrors.phoneNumber = "Enter a valid Nigerian phone number.";
    }

    if (!formData.address.trim()) {
      tempErrors.address = "Delivery address is required.";
    }

    if (!formData.country.trim()) {
      tempErrors.country = "Country is required.";
    }

    if (!formData.city.trim()) {
      tempErrors.city = "City is required.";
    }

    if (!formData.state.trim()) {
      tempErrors.state = "State is required.";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const verifyAddress = async () => {
    const fullAddress = getFullAddress();

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(
          fullAddress,
        )}`,
        { headers: { "Accept-Language": "en" } },
      );

      const data = await response.json();
      console.log("ADDRESS RESULTS:", data);

      // Nominatim has poor Nigerian coverage — don't block if no results
      if (!data.length) return true;

      const result = data[0];
      const addr = result.address || {};

      const foundCity = (
        addr.city ||
        addr.town ||
        addr.village ||
        addr.suburb || // ← covers areas like Ajegunle
        addr.neighbourhood || // ← another fallback
        ""
      ).toLowerCase();

      const foundState = (addr.state || "").toLowerCase();
      const foundCountry = (addr.country || "").toLowerCase();

      const userCity = formData.city.toLowerCase();
      const userState = formData.state.toLowerCase();
      const userCountry = formData.country.toLowerCase();

      // Fix: check if the FOUND value includes the USER's input (not reversed)
      if (foundCountry && !foundCountry.includes(userCountry)) {
        setErrors((prev) => ({
          ...prev,
          address: `Country mismatch. Found: "${addr.country}"`,
        }));
        return false;
      }

      if (foundState && !foundState.includes(userState)) {
        setErrors((prev) => ({
          ...prev,
          address: `State mismatch. Found: "${addr.state}"`,
        }));
        return false;
      }

      // City check is optional — skip if Nominatim can't resolve it
      if (
        foundCity &&
        userCity &&
        !foundCity.includes(userCity) &&
        !userCity.includes(foundCity)
      ) {
        console.warn(
          `City soft mismatch: found "${foundCity}", user entered "${userCity}" — allowing`,
        );
        // Don't block — Nigerian city names often differ from Nominatim labels
      }

      return true;
    } catch (error) {
      console.log("Address verification error:", error);
      return true; // Don't block payment if service fails
    }
  };
  const finalPayment = async () => {
    if (!validateForm()) return;

    if (!orderId) {
      alert("Order is still being prepared. Please wait a moment.");
      return;
    }

    const addressValid = await verifyAddress();
    if (!addressValid) return;

    setLoading(true);
    const payload = {
      orderId: orderId,
      deliveryAddress: getFullAddress(),
      email: user?.email,
      phone: formData.phoneNumber.trim(),
      name: `${user?.firstName} ${user?.lastName}`.trim(), // ← was missing entirely
      address: getFullAddress(), // ← backend also wants "address"
    };

    console.log("Final payload being sent:", payload);

    try {
      const response = await authApi.finalPay(payload);
      console.log("Payment response:", response);

      dispatch(setPaymentData(res.data));

      const checkoutUrl =
        response.data?.data?.checkoutUrl || response.data?.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        navigate("checkoutpayment");
      }
    } catch (error) {
      console.log("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit();
    console.log("CheckOutPage mounted with finalState:", finalState);
  }, []);

  console.log("CheckOutPage - Merged State (holding + response):", finalState);

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

              <input placeholder={user?.lastName} readOnly />
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
                name="phoneNumber"
                placeholder="07056491653"
                value={formData.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    phoneNumber: "",
                  }));
                }}
                maxLength={11}
                style={errors.phoneNumber ? { borderColor: "#ff0000" } : {}}
              />
              {errors.phoneNumber && (
                <span
                  style={{
                    color: "#ff0000",
                    fontSize: "10px",
                    marginTop: "-10px",
                  }}
                >
                  {errors.phoneNumber}
                </span>
              )}
            </div>

            <div className="Check_info-card">
              <h4>Address Information</h4>

              <input
                name="address"
                placeholder="60, Idowu Street"
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
                  }}
                >
                  {errors.address}
                </span>
              )}

              <input
                name="country"
                placeholder="Nigeria"
                value={formData.country}
                onChange={handleChange}
                style={errors.country ? { borderColor: "#ff0000" } : {}}
              />
              {errors.country && (
                <span
                  style={{
                    color: "#ff0000",
                    fontSize: "10px",
                    marginTop: "-10px",
                  }}
                >
                  {errors.country}
                </span>
              )}

              <div className="Check_location-row">
                <div>
                  <input
                    name="city"
                    placeholder="Ajegunle"
                    value={formData.city}
                    onChange={handleChange}
                    style={errors.city ? { borderColor: "#ff0000" } : {}}
                  />
                  {errors.city && (
                    <span
                      style={{
                        color: "#ff0000",
                        fontSize: "10px",
                        display: "block",
                        marginTop: "4px",
                      }}
                    >
                      {errors.city}
                    </span>
                  )}
                </div>

                <div>
                  <input
                    name="state"
                    placeholder="Lagos"
                    value={formData.state}
                    onChange={handleChange}
                    style={errors.state ? { borderColor: "#ff0000" } : {}}
                  />
                  {errors.state && (
                    <span
                      style={{
                        color: "#ff0000",
                        fontSize: "10px",
                        display: "block",
                        marginTop: "4px",
                      }}
                    >
                      {errors.state}
                    </span>
                  )}
                </div>
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

            <button onClick={finalPayment} disabled={loading}>
              {loading ? "Completing Orders ..." : "Complete Order"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckOutPage;
