import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiWarningOutline } from "react-icons/ti";
import "./css/War.css";

// 1. Accept 'loading' as a prop from the parent component instead of a local state
const Warning = ({ onClose, orderData, handleConfirm, loading }) => {
  return (
    <div className="custom-modal modal">
      <div className="iconWrapper">
        <TiWarningOutline />
      </div>

      <h2 className="title">Are you sure this production is done?</h2>

      <div className="buttonContainer">
        <button
          className="yesButton"
          onClick={handleConfirm}
          disabled={loading} // Now properly disables when parent API is running
          type="button"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <span>Yes</span>
          )}
        </button>
        <button className="noButton" onClick={onClose} disabled={loading}>
          No
        </button>
      </div>
    </div>
  );
};

export default Warning;
