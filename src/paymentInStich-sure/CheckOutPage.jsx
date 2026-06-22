import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useLocation, useNavigate } from "react-router-dom";
=======
import { useLocation, useNavigate, useParams } from "react-router-dom";
>>>>>>> 4ab529db544035235d8a706bab83a25dac2098ea
import "../styles/Bili.css";
// import "../styles/money-A.css"
import { authApi } from "../config/auth";
import productImage from "../assets/gbenga/Gown.png";
import { useSelector } from "react-redux";

const CheckOutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Appy, setAppy] = useState({});
  const [orderId, setOrder] = useState("");
  

  let finalState = location.state;
  console.log("finalState", finalState);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    email: "",
    phoneNumber: "", // Added phone number to form state
  });
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);

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
      const createdOrderId = response.data.data?.id || response.data.id;
      setOrder(createdOrderId || "");
      return createdOrderId;
    } catch (error) {
      console.log("Order error:", error);
      return "";
    }
  };
  console.log("appy", Appy);
  console.log("orderId", Appy.data?.id);

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = "Phone number is required.";
    }
    if (!formData.address.trim())
      tempErrors.address = "Delivery address is required.";
    if (!formData.country.trim()) tempErrors.country = "Country is required.";
    if (!formData.city.trim()) tempErrors.city = "City is required.";
    if (!formData.state.trim()) tempErrors.state = "State is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const finalPayment = async () => {
<<<<<<< HEAD
    const currentOrderId = orderId || Appy.data?.id || Appy.id;
=======
    if (!validateForm()) return;

    setLoading(true);

>>>>>>> 4ab529db544035235d8a706bab83a25dac2098ea
    const payload = {
      orderId: currentOrderId,
      deliveryAddress: getFullAddress(),
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    };

    console.log("payload", payload);

    try {
<<<<<<< HEAD
      if (currentOrderId) {
        const response = await authApi.finalPay(payload);
        console.log("responsed", response);
=======
      const response = await authApi.finalPay(payload);

      console.log("payment response", response);

      // get checkout url from backend
      const checkoutUrl =
        response.data?.data?.checkoutUrl || response.data?.checkoutUrl;

      if (checkoutUrl) {
        // straight to payment page
        window.location.href = checkoutUrl;
      } else {
        console.log("Checkout url missing");
        navigate("/user/checkoutpayment");
>>>>>>> 4ab529db544035235d8a706bab83a25dac2098ea
      }
    } catch (error) {
      console.log("Payment error:", error);
    } finally {
<<<<<<< HEAD
      navigate("/checkoutpayment");
=======
      setLoading(false);
>>>>>>> 4ab529db544035235d8a706bab83a25dac2098ea
    }
  };

  useEffect(() => {
    handleSubmit();
    console.log("CheckOutPage mounted with finalState:", finalState);
  }, []);

  console.log("CheckOutPage - Merged State (holding + response):", finalState);

  return (
<<<<<<< HEAD
    <div className="Acheckout-screen">
      <main className="A-main">
        <div className="A-page">
          <div className="A-left">
            <div className="Ainfo-card">
=======
    <div className="Check_screen">
      <main className="Check_main">
        <div className="Check_page">
          <div className="Check_left">
            <div className="Check_info-card">
>>>>>>> 4ab529db544035235d8a706bab83a25dac2098ea
              <h4>Personal Information</h4>

              <input placeholder={user?.lastName} readOnly />
              <input
                name="email"
                placeholder="peculiarsewanu@gmail.com"
                value={formData.email}
                onChange={handleChange}
                style={errors.email ? { borderColor: "#ff0000" } : {}}
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
                onChange={handleChange}
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

<<<<<<< HEAD
            <div className="Ainfo-card">
=======
            <div className="Check_info-card">
>>>>>>> 4ab529db544035235d8a706bab83a25dac2098ea
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

<<<<<<< HEAD
              <div className="Alocation-row">
                <input
                  name="city"
                  placeholder="Lagos"
                  value={formData.city}
                  onChange={handleChange}
                />
=======
              <div className="Check_location-row">
                <div>
                  <input
                    name="city"
                    placeholder="Lagos"
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
>>>>>>> 4ab529db544035235d8a706bab83a25dac2098ea

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
              <div className="Asave-info">
               <input
                type="checkbox"
                id="saveInfo"
               />

               <label htmlFor="saveInfo">
                 Save this information for a faster A next time
               </label>
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <div className="Aorder-card">
            <div className="Aproduct-row">
=======
          <div className="Check_order-card">
            <div className="Check_product-row">
>>>>>>> 4ab529db544035235d8a706bab83a25dac2098ea
              <img src={productImage} alt="Corset Wedding Gown" />
              <h3>{finalState.itemName || "Corset Wedding Gown"}</h3>
              <p className="Check_price">{formatNaira(subtotal)}</p>
            </div>

<<<<<<< HEAD
            <div className="Asummary">
              <div className="Asummary-row">
                <span className="Asummary-label">Subtotal</span>
                <span className="Asummary-value">{formatNaira(subtotal)}</span>
              </div>

              <div className="Asummary-row">
                <span className="Asummary-label">Shipping</span>
                <span className="Asummary-value">{formatNaira(shipping)}</span>
              </div>

              <div className="Asummary-row total-row">
                <span className="Asummary-label">Total</span>
                <span className="Atotal-value">
=======
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
>>>>>>> 4ab529db544035235d8a706bab83a25dac2098ea
                  <small>NGN</small>
                  {formatNaira(total)}
                </span>
              </div>
            </div>

<<<<<<< HEAD
            <button
            className="complete-order"
             onClick={finalPayment}
             >
              Complete Order
=======
            <button onClick={finalPayment} disabled={loading}>
              {loading ? "Completing Orders ..." : "Complete Order"}
>>>>>>> 4ab529db544035235d8a706bab83a25dac2098ea
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckOutPage;
