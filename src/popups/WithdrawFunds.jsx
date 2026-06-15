import React from 'react'
import { useState } from 'react';
import "./css/modal-responsive-screen.css"
import WithdrawalSuccessful from './WithdrawalSuccessful';


const styles = {
  modal: {
    width: "448px",
    // height: "520px",
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

const WithdrawFunds = ({onClose}) => {
  const [showSuccessful , setShowSuccessful] = useState(false);
  
  return (
    <div className='modal-overlay'>
       <div className="custom-modal" style={styles.modal}>
    <h2 style={styles.heading}>Withdraw Funds</h2>

    <div style={styles.balanceSection}>
      <span style={styles.balanceLabel}>Available Balance</span>
      <span style={styles.balanceAmount}>₦320,000</span>
    </div>

    <div style={styles.formGroup}>
      <label style={styles.label}>Withdrawal Amount</label>

      <input
        type="text"
        placeholder="₦50,000"
        style={styles.input}
      />

      <span style={styles.feeText}>
        Fee: ₦100 • You'll receive: ₦49,900
      </span>
    </div>

    <div style={styles.accountCard}>
      <p style={styles.accountLabel}>Withdraw to</p>

      <p style={styles.accountName}>
        GTBank • ****4532
      </p>
    </div>

    <div className="modal-footer" style={styles.footer}>
      <button
        type="button"
        style={styles.cancelButton}
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        type="button"
        style={styles.confirmButton}
        onClick={() => setShowSuccessful(true)}
      >
        Confirm Withdrawal
      </button>
    </div>
    { showSuccessful && (
      <WithdrawalSuccessful
      onClose ={() => setShowSuccessful(false)}
      />
    )}
  </div>





    </div>

 
);
    
}

export default WithdrawFunds
