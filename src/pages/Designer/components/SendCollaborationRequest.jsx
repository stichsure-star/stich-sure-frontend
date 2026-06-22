import { useState } from "react";
import "../css/SendCollaboration.css";
import RequestSent from "../../../popups/RequestSent";
import { useLocation, useNavigate } from "react-router-dom";
import { designerApi } from "../../../config/designer";
import Swal from "sweetalert2";

const SendCollaborationRequest = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const designer = location.state;

  console.log("selected designer:", designer);

  const [form, setForm] = useState({
    taskType: "Embroidery",
    taskDetails: "",
    currentAddress: "",
    deadline: "",
    offeredPayment: "",
  });

  const [errors, setErrors] = useState({});
  const [showRequest, setShowRequest] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!designer?.designerId) {
      newErrors.designer = "Designer information missing";
    }

    if (!form.taskType.trim()) {
      newErrors.taskType = "Task type is required";
    }

    if (!form.taskDetails.trim()) {
      newErrors.taskDetails = "Task details are required";
    }

    if (!form.currentAddress.trim()) {
      newErrors.currentAddress = "Address is required";
    }

    if (!form.deadline.trim()) {
      newErrors.deadline = "Deadline is required";
    }

    if (!form.offeredPayment.trim()) {
      newErrors.offeredPayment = "Payment is required";
    } else if (isNaN(Number(form.offeredPayment))) {
      newErrors.offeredPayment = "Payment must be a number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const formatToISO = (dateStr) => {
        const [day, month, year] = dateStr.split("/");
        return new Date(`${year}-${month}-${day}`).toISOString();
      };

      const payload = {
        receiverDesignerId: designer?.designerId,
        taskType: form.taskType,
        taskDetails: form.taskDetails,
        currentAddress: form.currentAddress,
        deadline: formatToISO(form.deadline),
        offeredPayment: form.offeredPayment,
      };

      console.log("sending request:", {
        receiverDesignerId: designer.designerId,
        ...form,
      });

      const response = await designerApi.collaborationrequest(payload);

      console.log("response:", response);
      Swal.fire({
        icon: "success",
        title: "Request Sent",
      });

      setShowRequest(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="collab-request-card">
      <h2 className="collab-title">Send Collaboration Request</h2>

      <p className="collab-recipient">
        to <span>{designer?.designerName || "Designer"}</span>
      </p>

      {errors.designer && <p className="error">{errors.designer}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Type</label>

          <input
            name="taskType"
            value={form.taskType}
            onChange={handleChange}
            placeholder="Beading"
          />

          {errors.taskType && <p className="error">{errors.taskType}</p>}
        </div>

        <div className="form-group">
          <label>Deadline</label>
          <input
            name="deadline"
            value={form.deadline}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");

              if (value.length > 2) {
                value = value.slice(0, 2) + "/" + value.slice(2);
              }

              if (value.length > 5) {
                value = value.slice(0, 5) + "/" + value.slice(5, 9);
              }

              setForm((prev) => ({
                ...prev,
                deadline: value,
              }));

              setErrors((prev) => ({
                ...prev,
                deadline: "",
              }));
            }}
            placeholder="DD/MM/YYYY"
          />

          {errors.deadline && <p className="error">{errors.deadline}</p>}
        </div>

        <div className="form-group">
          <label>Current Address</label>

          <input
            name="currentAddress"
            value={form.currentAddress}
            onChange={handleChange}
          />

          {errors.currentAddress && (
            <p className="error">{errors.currentAddress}</p>
          )}
        </div>

        <div className="form-group">
          <label>Offered Payment</label>

          <input
            name="offeredPayment"
            value={form.offeredPayment}
            onChange={handleChange}
            placeholder="10000"
          />

          {errors.offeredPayment && (
            <p className="error">{errors.offeredPayment}</p>
          )}
        </div>

        <div className="form-group">
          <label>Task Details</label>

          <textarea
            name="taskDetails"
            value={form.taskDetails}
            onChange={handleChange}
            rows={5}
            placeholder="Describe what you need done..."
          />

          {errors.taskDetails && <p className="error">{errors.taskDetails}</p>}
        </div>

        <div className="button-row">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/designer/collaboration")}
            style={{ cursor: "pointer" }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
            style={{ cursor: "pointer" }}
          >
            <span className="send-icon">✈</span>

            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </form>

      {showRequest && <RequestSent onClose={() => setShowRequest(false)} />}
    </div>
  );
};

export default SendCollaborationRequest;
