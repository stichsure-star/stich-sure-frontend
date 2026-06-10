import React from 'react'
import "./css/modal-responsive-screen.css"

const styles = {
  modal: {
    width: "448px",
    height: "246px",
    borderRadius: "16px",
    padding: "24px",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  iconWrapper: {
    marginBottom: "20px",
  },

  title: {
    fontSize: "20px",
    fontWeight: 600,
    textAlign: "center",
    lineHeight: "30px",
    color: "#1E1E1E",
    marginBottom: "40px",
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "auto",
  },

  yesButton: {
    width: "84px",
    height: "40px",
    borderRadius: "8px",
    border: "none",
    background: "#8B0021",
    color: "#FFFFFF",
    fontSize: "16px",
    cursor: "pointer",
  },

  noButton: {
    width: "84px",
    height: "40px",
    borderRadius: "8px",
    border: "1px solid #8B0021",
    background: "#FFFFFF",
    color: "#1E1E1E",
    fontSize: "16px",
    cursor: "pointer",
  },
};

const Warning = () => {
  return (
    <div className="custom-modal" style={styles.modal}>
  <div style={styles.iconWrapper}>
    <WarningIcon />
  </div>

  <h2 style={styles.title}>
    Are you sure this production is done
  </h2>

  <div style={styles.buttonContainer}>
    <button style={styles.yesButton}>Yes</button>
    <button style={styles.noButton}>No</button>
  </div>
</div>

    
      
  )
}

export default Warning
