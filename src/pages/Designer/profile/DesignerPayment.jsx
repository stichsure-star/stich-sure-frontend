import React, { useState } from "react";
import "../../../styles/designer-payment.css";
import { designerApi } from "../../../config/designer";

const DesignerPayment = () => {
  const [formData, setFormData] = useState({
    accountName: "",
    bankName: "",
    accountNumber: "",
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
        showToast("Payment information updated successfully!", "success");
      }
    } catch (error) {
      console.error("Wallet update failed:", error);
      showToast(
        error.response?.data?.message || "Failed to update payment details.",
        "error"
      );
    }
  };

  return (
    <main className="designer-payment-page">
      {toast.show && (
        <div className={`payment-toast payment-toast-${toast.type}`}>
          <span className="payment-toast-icon">
            {toast.type === "success" ? "✓" : "✕"}
          </span>
          {toast.message}
        </div>
      )}

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