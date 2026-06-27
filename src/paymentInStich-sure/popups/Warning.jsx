import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiWarningOutline } from "react-icons/ti";
import Swal from "sweetalert2"; // Added SweetAlert2
import "./css/War.css";
import { designerApi } from "../../config/designer";

const Warning = ({ onClose, orderData, handleConfirm }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [recep, Reciept] = useState({});

  console.log("recep", recep);

  console.log("orderData", orderData);

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
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <span>Yes</span>
          )}
        </button>
        <button className="noButton" onClick={onClose}>
          No
        </button>
      </div>
    </div>
  );
};

export default Warning;
