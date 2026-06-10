import React from 'react'
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


};

const RequestSent = () => {
  return (
 <div className="custom-modal" style={styles.modal}>
    <div style={styles.iconWrapper}>
      <CheckCircle size={40} color="#34A853" />
    </div>

    <h2 style={styles.title}>
      Request Sent!
    </h2>

    <p style={styles.description}>
      The Fashion Designer will review your request and get back to you.
    </p>
 </div>
  )
}

export default RequestSent
