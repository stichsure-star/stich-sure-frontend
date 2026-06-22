import React, { useEffect, useState } from "react";
import { useLocation, useParams , useNavigate } from "react-router-dom";
import "../styles/Bili.css";
// import "../styles/money-A.css"
import { authApi } from "../config/auth";
import productImage from "../assets/gbenga/Gown.png";

const CheckOutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [Appy, setAppy] = useState({});
  const [orderId, setOrder] = useState({});
  

  let finalState = location.state;
  console.log("finalState", finalState);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    email: "",
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
  const shipping = 10000;
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
      setOrder(response.data.data?.id || response.data.id);
    } catch (error) {
      console.log("Order error:", error);
    }
  };
  console.log("appy", Appy);
  console.log("orderId", Appy.data?.id);

  const finalPayment = async () => {
    const payload = {
      orderId,
      deliveryAddress: getFullAddress(),
      email: formData.email,
    };
    console.log("payload", payload);
    try {
      const response = await authApi.finalPay(payload);
      console.log("responsed", response);
      navigate("/checkoutpayment");
    } catch (error) {
      console.log("Payment error:", error);
    }
  };

  useEffect(() => {
    handleSubmit();
    console.log("CheckOutPage mounted with finalState:", finalState);
  }, []);

  console.log("CheckOutPage - Merged State (holding + response):", finalState);

  return (
    <div className="Acheckout-screen">
      <main className="A-main">
        <div className="A-page">
          <div className="A-left">
            <div className="Ainfo-card">
              <h4>Personal Information</h4>

              <input placeholder="Sonayon Blessing" />
              <input
                name="email"
                placeholder="peculiarsewanu@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              <input placeholder="07056491653" />
            </div>

            <div className="Ainfo-card">
              <h4>Address Information</h4>

              <input
                name="address"
                placeholder="60, Idowu Street"
                value={formData.address}
                onChange={handleChange}
              />
              <input
                name="country"
                placeholder="Nigeria"
                value={formData.country}
                onChange={handleChange}
              />

              <div className="Alocation-row">
                <input
                  name="city"
                  placeholder="Lagos"
                  value={formData.city}
                  onChange={handleChange}
                />

                <input
                  name="state"
                  placeholder="Lagos"
                  value={formData.state}
                  onChange={handleChange}
                />
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

          <div className="Aorder-card">
            <div className="Aproduct-row">
              <img src={productImage} alt="Corset Wedding Gown" />
              <h3>{finalState.itemName || "Corset Wedding Gown"}</h3>
              <p className="price">{formatNaira(subtotal)}</p>
            </div>

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
                  <small>NGN</small>
                  {formatNaira(total)}
                </span>
              </div>
            </div>

            <button
            className="complete-order"
             onClick={finalPayment}
             >
              Complete Order
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckOutPage;
