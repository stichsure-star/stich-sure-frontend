import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import { authApi } from "../../config/auth";
import { logout } from "../../global/authSlice";
import "./css/modal-responsive-screen.css";

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

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logoutUser();
      dispatch(logout());
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
      dispatch(logout());
      window.location.href = "/login";
    }
  };

  const handleCancel = () => {
    navigate("/designer/dashboard");
  };

  return (
    <div className="modal-overlay">
      <div className="custom-modal" style={styles.modal}>
        <div style={styles.iconWrapper}>
          <FiAlertTriangle size={48} color="#8B0021" />
        </div>

        <h2 style={styles.title}>Are you sure you want to Logout?</h2>

        <div style={styles.buttonContainer}>
          <button style={styles.yesButton} onClick={handleLogout}>
            Yes
          </button>
          <button style={styles.noButton} onClick={handleCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
