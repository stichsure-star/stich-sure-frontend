import React, { useState } from "react";
import "./css/modal-responsive-screen.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiWarningOutline } from "react-icons/ti";

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
    border: "1px solid #1E1E1E",
  },

  iconWrapper: {
    marginBottom: "10px",
    fontSize: "50px",
    color: "#8B0021",
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
  const [loading, setLoading] = useState(false);
  const shipPing = async ({ onClose }) => {
    setLoading(true);
    const payloa = {
      request_token: "",
      courier_id: "",
      service_code: "",
      is_cod_label: "",
    };
    try {
      await designerApi.Valid(payloa);
      if (onClose) onClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    navigate("/designer/active");
  };

  return (
    <div className="custom-modal" style={styles.modal}>
      <div style={styles.iconWrapper}>
        <TiWarningOutline />
      </div>

      <h2 style={styles.title}>Are you sure this production is done</h2>

      <div style={styles.buttonContainer}>
        <button style={styles.yesButton} onClick={shipPing}>
          {loading ? <AiOutlineLoading3Quarters /> : <h4>Yes</h4>}
        </button>
        <button style={styles.noButton} onClick={handleCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default Warning;
