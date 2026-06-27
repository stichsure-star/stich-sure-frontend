import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiWarningOutline } from "react-icons/ti";
import Swal from "sweetalert2"; // Added SweetAlert2
import "./css/War.css";
import { designerApi } from "../../config/designer";

const Warning = ({ onClose, orderData }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [recep, Reciept] = useState({});

  const handleConfirm = async () => {
    setLoading(true);

    // Safely mapping your dynamic payload structure
    const payload = {
      request_token: orderData?.payment.pickup.request_token,
      courier_id: orderData?.payment.pickup.courier_id,
      service_code: orderData?.payment.pickup.service_code,
      is_cod_label: "false",
    };

    try {
      const response = await designerApi.Valid(payload);
      Reciept(response.data);

      // Assuming your backend sends a status of 200/true or success field
      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Production Completed!",
          text: "The shipping details have been verified successfully.",
          timer: 2000, // Auto closes after 2 seconds
          showConfirmButton: false,
        });

        // Trigger auto-close of modal and redirect after alert finishes

        if (onClose) onClose();
      }
    } catch (error) {
      console.error("Validation error:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error?.response?.data?.message ||
          "Something went wrong tracking this order.",
        confirmButtonColor: "#8B0021",
      });
    } finally {
      setLoading(false);
    }
  };

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
