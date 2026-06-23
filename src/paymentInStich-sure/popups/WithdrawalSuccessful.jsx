import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import "./css/modal-responsive-screen.css";

const styles = {
  modal: {
    width: "448px",
    height: "290px",
    borderRadius: "16px",
    padding: "32px",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    boxSizing: "border-box",
  },

  iconWrapper: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "#F5F5F5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "8px",
  },

  title: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#1E1E1E",
    textAlign: "center",
    margin: 0,
  },
};

const WithdrawalSuccessful = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.(); // auto close after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="custom-modal"
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.iconWrapper}>
          <CheckCircle size={40} color="#34A853" />
        </div>

        <h2 style={styles.title}>Withdrawal Successful!</h2>
      </div>
    </div>
  );
};

export default WithdrawalSuccessful;
