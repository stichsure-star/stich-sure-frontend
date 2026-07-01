import React, { useEffect, useState } from "react";
import "./css/modal-responsive-screen.css";
import WithdrawalSuccessful from "./WithdrawalSuccessful";
import Swal from "sweetalert2";
import { designerApi } from "../../config/designer"; // Adjust paths based on layout

// Hardcoded bank map matching standard Korapay NUBAN codes
const KORAPAY_BANK_MAP = {
  "access bank": "044",
  citibank: "009",
  ecobank: "050",
  "fidelity bank": "070",
  "first bank": "011",
  "first bank of nigeria": "011",
  "first city monument bank": "214",
  fcmb: "214",
  "globus bank": "103",
  "guaranty trust bank": "058",
  gtbank: "058",
  gtco: "058",
  "keystone bank": "082",
  moniepoint: "796",
  "optimus bank": "107",
  palmpay: "855",
  "parallex bank": "104",
  "polaris bank": "076",
  "providus bank": "101",
  "stanbic ibtc": "221",
  "standard chartered": "068",
  "sterling bank": "232",
  "suntrust bank": "100",
  "taj bank": "302",
  "titan trust bank": "102",
  "union bank": "032",
  "united bank for africa": "033",
  uba: "033",
  "unity bank": "215",
  "wema bank": "035",
  "zenith bank": "057",
};

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

  const [resolvedBankCode, setResolvedBankCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedName, setVerifiedName] = useState("");

  // Safely extract values from passed wallet details
  const availableBalance = Number(walleted?.data?.availableBalance) || 0;
  const bankName = walleted?.data?.bankName || "";
  const accountNumber = walleted?.data?.accountNumber || "";
  const initialAccountName = walleted?.data?.accountName || "";
  const fallbackBankCode = walleted?.data?.bankCode || "";

  const formatNaira = (value) => {
    return `₦${new Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 0,
    }).format(value)}`;
  };

  // Process mapping using the hardcoded dictionary
  useEffect(() => {
    const runVerificationPipeline = async () => {
      // Force a stop if the data hasn't finished loading into the component yet
      if (!accountNumber || !bankName) {
        console.log("⏳ Waiting for wallet data to stream in...");
        return;
      }

      setIsVerifying(true);

      // Look up bank code from hardcoded map using bankName string
      const normalizedBankName = bankName.toLowerCase().trim();
      const mappedCode =
        KORAPAY_BANK_MAP[normalizedBankName] || fallbackBankCode;

      setResolvedBankCode(mappedCode);

      if (mappedCode) {
        try {
          // Matches the explicit fields specified in image_da34fe.png

          console.log("📡 Sending verification payload:", verificationPayload);

          // FIX: Using your precise config method name from your original verifyAccc function

          console.log("📡 Response received from verification:", res?.data);

          // Safely extract the verified account name based on your network response shape
          if (res?.data?.accountName) {
            setVerifiedName(res.data.accountName);
          } else if (res?.data?.data?.accountName) {
            setVerifiedName(res.data.data.accountName);
          } else if (res?.data?.message) {
            // If your backend drops a custom string format inside message field
            setVerifiedName(res.data.message);
          }
        } catch (error) {
          console.error(
            "💥 Live Account Lookup Failed:",
            error?.response?.data || error.message,
          );
        } finally {
          setIsVerifying(false);
        }
      } else {
        setIsVerifying(false);
        console.warn("⚠️ No bank code matched in internal map dictionary.");
      }
    };

    // FIX: Including accountNumber ensures this kicks off the split second your wallet context hydrates!
  }, [bankName, accountNumber, fallbackBankCode]);

  const Verlly = async () => {
    try {
      const verificationPayload = {
        account: "7016707546",
        bank: "855",
      };
      const res = await designerApi.WithdrawalWithdrawal(verificationPayload);
    } catch (errors) {
      console.log("error", error);
    }
  };

  const handleWithdrawalSubmit = async () => {
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
    }

    if (numericAmount > availableBalance) {
      alert("Insufficient funds for this withdrawal value.");
      return;
    }

    if (!resolvedBankCode) {
      alert(
        "Verification Error: Valid system bank code required to map this payout.",
      );
      return;
    }

    // Matching strict parameters specified under image_da34c9.png
    const payload = {
      amount: numericAmount,
      useNewAccount: false,
      bankName: bankName,
      accountNumber: accountNumber,
      accountName: verifiedName || initialAccountName,
      bankCode: "855",
    };

    setLoading(true);

    try {
      const response = await designerApi.requestWithdrawal(payload);
      console.log("✅ Payout Process Complete:", response.data);
      setShowSuccessful(true);
    } catch (error) {
      console.error(
        "💥 Withdrawal Failed:",
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

  useEffect(() => {
    Verlly();
  }, []);

  const isWithdrawalDisabled =
    availableBalance === 0 || loading || isVerifying || !resolvedBankCode;

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
          <span
            style={{
              fontSize: "12px",
              color: "#666666",
              display: "block",
              marginTop: "4px",
            }}
          >
            {isVerifying
              ? "Mapping bank properties & running verification checks..."
              : `Account Name: ${verifiedName || initialAccountName || "Not Verified"}`}
          </span>
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
            onClick={Verlly}
            disabled={isWithdrawalDisabled}
          >
            {loading ? "Processing..." : "Confirm Withdrawal"}
          </button>
        </div>

        {showSuccessful && (
          <WithdrawalSuccessful
            onClose={() => {
              setShowSuccessful(false);
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default WithdrawFunds;
