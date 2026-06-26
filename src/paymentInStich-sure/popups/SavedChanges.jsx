import React from "react";
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

const SavedChanges = () => {
  return (
    <div className="custom-modal" style={styles.modal}>
      <div style={styles.iconWrapper}>
        <CheckCircle size={40} color="#34A853" />
      </div>

      <h2 style={styles.title}>Your Changes Has Been Saved</h2>
    </div>
  );
};

export default SavedChanges;
