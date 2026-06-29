import React from "react";
import { useState } from "react";
import "./css/modal-responsive-screen.css";
import WithdrawalSuccessful from "./WithdrawalSuccessful";

const styles = {
  modal: {
    width: "448px",
    borderRadius: "16px",
    padding: "32px",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  heading: {
    fontSize: "32px",
    fontWeight: 700,
    lineHeight: "40px",
    color: "#1E1E1E",
  },
  balanceSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  balanceLabel: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#1E1E1E",
  },
  balanceAmount: {
    fontSize: "40px",
    fontWeight: 700,
    color: "#1E1E1E",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "16px",
    fontWeight: 500,
    color: "#1E1E1E",
  },
  input: {
    width: "100%",
    height: "56px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    padding: "0 16px",
    outline: "none",
  },
  feeText: {
    fontSize: "12px",
    color: "#666666",
  },
  accountCard: {
    width: "100%",
    background: "#F8F8F8",
    borderRadius: "12px",
    padding: "20px",
  },
  accountLabel: {
    fontSize: "14px",
    color: "#666666",
    marginBottom: "8px",
  },
  accountName: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#1E1E1E",
  },
  footer: {
    display: "flex",
    gap: "12px",
    marginTop: "auto",
  },
  cancelButton: {
    flex: 1,
    height: "48px",
    borderRadius: "8px",
    border: "1px solid #D9D9D9",
    background: "#FFFFFF",
    cursor: "pointer",
  },
  confirmButton: {
    flex: 1,
    height: "48px",
    borderRadius: "8px",
    border: "none",
    background: "#8B0021",
    color: "#FFFFFF",
    cursor: "pointer",
  },
};

// ✅ Destructured the walleted prop passed down from Dashboard
const WithdrawFunds = ({ onClose, walleted }) => {
  const [showSuccessful, setShowSuccessful] = useState(false);
  const [amount, setAmount] = useState("");

  // ✅ Extract data fields directly from the real-time API response structure
  const availableBalance = Number(walleted?.data?.availableBalance) || 0;
  const bankName = walleted?.data?.bankName || "Not Linked";
  const accountNumber = walleted?.data?.accountNumber || "******";

  // Helper utility to format raw numbers to clean currency view string layouts
  const formatNaira = (value) => {
    return `₦${new Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 0,
    }).format(value)}`;
  };

  // Condition layouts to disable button triggers dynamically
  const isWithdrawalDisabled = availableBalance === 0;

  return (
    <div className="modal-overlay">
      <div className="custom-modal" style={styles.modal}>
        <h2 style={styles.heading}>Withdraw Funds</h2>

        <div style={styles.balanceSection}>
          <span style={styles.balanceLabel}>Available Balance</span>
          <span style={styles.balanceAmount}>
            {/* ✅ Displays real-time API data cleanly */}
            {formatNaira(availableBalance)}
          </span>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Withdrawal Amount</label>

          <input
            type="text"
            placeholder={`₦0 - ${formatNaira(availableBalance)}`}
            style={styles.input}
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
          />

          <span style={styles.feeText}>• Charge Fee: ₦100</span>
        </div>

        <div style={styles.accountCard}>
          <p style={styles.accountLabel}>Withdraw to</p>

          <p style={styles.accountName}>
            {/* ✅ Populates dynamic settlement profiles */}
            {bankName} • {accountNumber}
          </p>
        </div>

        <div className="modal-footer" style={styles.footer}>
          <button type="button" style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>

          <button
            type="button"
            style={{
              ...styles.confirmButton,
              background: isWithdrawalDisabled ? "#CCCCCC" : "#8B0021",
              color: isWithdrawalDisabled ? "#666666" : "#FFFFFF",
              cursor: isWithdrawalDisabled ? "not-allowed" : "pointer",
            }}
            onClick={() => setShowSuccessful(true)}
            disabled={isWithdrawalDisabled}
          >
            Confirm Withdrawal
          </button>
        </div>

        {showSuccessful && (
          <WithdrawalSuccessful onClose={() => setShowSuccessful(false)} />
        )}
      </div>
    </div>
  );
};

export default WithdrawFunds;
