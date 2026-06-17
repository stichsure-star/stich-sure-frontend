import React, { useState } from "react";
// import { designerApi } from "../config/designerApi"; 
import "../../../styles/designer-payment.css";

const DesignerPayment = () => {
  // Setup standard state mirroring the schema keys: bankName, accountNumber, accountName
  const [formData, setFormData] = useState({
    accountName: "",
    bankName: "",
    accountNumber: "",
  });

  // Track field input state changes
  const handleChange = (e) => {
    const { name, value } = e.target;
   };
  // Process data payload on form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      accountName: formData.accountName,
    };

    try {
      const response = await designerApi.updateWallet(payload);
      if (response.status === 200 || response.status === 201) {
        alert("Payment information updated successfully!");
      }
    } catch (error) {
      console.error("Wallet update failed:", error);
      alert(error.response?.data?.message || "Failed to update payment details.");
    }
  };

  return (
    <main className="designer-payment-page">
      <section className="designer-payment-panel">
        <h1>Profile Settings</h1>

        <form className="designer-payment-form" onSubmit={handleSubmit}>
          <div className="payment-current-account">
            <label className="payment-field">
              <span>Account Name</span>
              <input 
                type="text" 
                name="accountName"
                placeholder="Account Name"
                value={formData.accountName}
                onChange={handleChange}
              /> 
            </label>
          </div>

          <label className="payment-field">
            <span>Bank Name</span>
            <input 
              type="text" 
              name="bankName"
              placeholder="Gtb" 
              value={formData.bankName}
              onChange={handleChange}
            />
          </label>

          <label className="payment-field">
            <span>Account Number</span>
            <input 
              type="text" 
              name="accountNumber"
              placeholder="0123456789" 
              inputMode="numeric" 
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="payment-update-button">
            Update Payment Info
          </button>
        </form>
      </section>
    </main>
  );
};

export default DesignerPayment;