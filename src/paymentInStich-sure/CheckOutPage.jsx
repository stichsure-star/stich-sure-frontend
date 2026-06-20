import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../styles/Bili.css";
import { authApi } from "../config/auth";

const CheckOutPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [Appy, setAppy] = useState({});
  const [orderId, setOrder] = useState({});

  // Get merged state (holding + response data) from navigation or sessionStorage
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
      if (stored) {
        finalState = JSON.parse(stored);
      } else {
        finalState = {};
      }
    } catch (e) {
      finalState = {};
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Concatenate all address fields into one
    const fullAddress = `${formData.address || "Not provided"}, ${formData.city || "Not provided"}, ${formData.state || "Not provided"}, ${formData.country || "Not provided"}`;

    const payload = {
      amount: finalState.amount,
      designId: finalState.designId,
      designerId: finalState.designerId,
      itemName: finalState.itemName,
      requestId: finalState.requestId,
      address: fullAddress,
    };
    console.log("payloaded", payload);
    try {
      const response = await authApi.profileOrder(payload);
      console.log("Order response:", response);
      const orderId = response.data.id;
      setAppy(response.data);
      setOrder(response.data.data?.id);
    } catch (error) {
      console.log("Order error:", error);
    }
  };
  console.log("appy", Appy);
  console.log("orderId", Appy.data?.id);

  const finalPayment = async () => {
    // Concatenate all address fields into one
    const fullAddress = `${formData.address || "Not provided"}, ${formData.city || "Not provided"}, ${formData.state || "Not provided"}, ${formData.country || "Not provided"}`;

    const payload = {
      orderId,
      deliveryAddress: fullAddress,
      email: formData.email,
    };
    const blaga = payload;
    console.log("blaga", blaga);
    console.log("payload", payload);
    try {
      const response = await authApi.finalPay(payload);
      console.log("responsed", response);
    } catch (error) {}
  };

  useEffect(() => {
    handleSubmit();
    console.log("CheckOutPage mounted with finalState:", finalState);
  }, []);
  // Log merged state to console only
  console.log("CheckOutPage - Merged State (holding + response):", finalState);

  return (
    <div>
      <div className="checkout-page">
        <div className="checkout-left">
          <div className="info-card">
            <h4>Personal Information</h4>

            <input placeholder="Sonayan Blessing" />
            <input
              name="email"
              placeholder="peculiar..."
              value={formData.email}
              onChange={handleChange}
            />
            <input placeholder="070..." />
          </div>

          <div className="info-card">
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

            <div className="location-row">
              <input
                name="city"
                placeholder="Lagos"
                value={formData.city}
                onChange={handleChange}
              />

              <input
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="order-card">
          <div className="product-row">
            <img src="image.png" />

            <div>
              <h3>Corset Wedding Gown</h3>
              <p className="price">₦5,000,000</p>
            </div>
          </div>

          <div className="summary">
            <p>
              Subtotal
              <span>₦5,000,000</span>
            </p>

            <p>
              Shipping
              <span>₦10,000</span>
            </p>

            <h2>
              Total
              <span>₦3,010,000</span>
            </h2>
          </div>

          <button onClick={finalPayment}>Complete Order</button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
