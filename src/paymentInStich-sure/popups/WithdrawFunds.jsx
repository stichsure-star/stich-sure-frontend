import React, { useState } from "react";
import "./css/modal-responsive-screen.css";
import WithdrawalSuccessful from "./WithdrawalSuccessful";
import Swal from "sweetalert2";
import { designerApi } from "../../config/designer"; // Adjust paths based on layout

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

const WithdrawFunds = ({ onClose, walleted }) => {
  const [showSuccessful, setShowSuccessful] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract profiles safely out of dynamic payload values
  const availableBalance = Number(walleted?.data?.availableBalance) || 0;
  const bankName = walleted?.data?.bankName || "";
  const accountNumber = walleted?.data?.accountNumber || "";
  const accountName = walleted?.data?.accountName || "";
  const bankCode = walleted?.data?.bankCode || "";

  const formatNaira = (value) => {
    return `₦${new Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 0,
    }).format(value)}`;
  };

  const handleWithdrawalSubmit = async () => {
    const numericAmount = Number(amount);

    // Frontend sanity checks before making API requests
    if (!numericAmount || numericAmount <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
    }

    if (numericAmount > availableBalance) {
      alert("Insufficient funds for this withdrawal value.");
      return;
    }

    // Prepare matching payload properties
    const payload = {
      amount: numericAmount,
      useNewAccount: false,
      bankName: bankName,
      accountNumber: accountNumber,
      accountName: accountName,
      bankCode: bankCode,
    };

    setLoading(true);

    try {
      // Hit the post route wrapper you mapped out in your config structure
      const response = await designerApi.requestWithdrawal(payload);
      console.log("✅ Withdrawal Initialized Successfully:", response.data);

      // Open success modal if api responds with successful status flags
      setShowSuccessful(true);
    } catch (error) {
      console.error(
        "💥 Withdrawal Execution Failure:",
        error?.response?.data || error.message,
      );

      Swal.fire({
        icon: "error",
        title: "Transaction Denied",
        text:
          error?.response?.data?.message ||
          "Failed to finalize payout processing routines.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const isWithdrawalDisabled = availableBalance === 0 || loading;

  return (
    <div className="modal-overlay">
      <div className="custom-modal" style={styles.modal}>
        <h2 style={styles.heading}>Withdraw Funds</h2>

        <div style={styles.balanceSection}>
          <span style={styles.balanceLabel}>Available Balance</span>
          <span style={styles.balanceAmount}>
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
            disabled={loading}
          />

          <span style={styles.feeText}>• Charge Fee: ₦100</span>
        </div>

        <div style={styles.accountCard}>
          <p style={styles.accountLabel}>Withdraw to</p>

          <p style={styles.accountName}>
            {bankName || "No Bank Bound"} • {accountNumber || "******"}
          </p>
        </div>

        <div className="modal-footer" style={styles.footer}>
          <button
            type="button"
            style={styles.cancelButton}
            onClick={onClose}
            disabled={loading}
          >
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
            onClick={handleWithdrawalSubmit}
            disabled={isWithdrawalDisabled}
          >
            {loading ? "Processing..." : "Confirm Withdrawal"}
          </button>
        </div>

        {showSuccessful && (
          <WithdrawalSuccessful
            onClose={() => {
              setShowSuccessful(false);
              onClose(); // Auto-closes back to fresh main layout after success confirmation hooks
            }}
          />
        )}
      </div>
    </div>
  );
};

export default WithdrawFunds;
