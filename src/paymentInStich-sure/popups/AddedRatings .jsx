import React from 'react'
import { CheckCircle } from "lucide-react";
import "./css/modal-responsive-screen.css"

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

  description: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    color: "#4B5563",
    textAlign: "center",
    margin: 0,
  },

  button: {
    width: "100%",
    height: "48px",
    borderRadius: "8px",
    border: "none",
    background: "#8B0021",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "auto",
  },
};

const AddedRatings = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
 <div className='modal-overlay'>
 <div className="custom-modal" style={styles.modal}>
    <div style={styles.iconWrapper}>
      <CheckCircle size={40} color="#34A853" />
    </div>

    <h2 style={styles.title}>
      Your Ratings Has Been Added!
    </h2>

    <p style={styles.description}>
      Your rating's would appear on designer's profile.
    </p>

    <button
      onClick={onClose}
      className="submit-btn"
      style={styles.button}
    >
      Close
    </button>
 </div>
 </div>
  )
}

export default AddedRatings
