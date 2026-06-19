import React, { useState, useRef } from "react";
import {
  HiOutlineCalendar,
  HiOutlineCloudArrowUp,
  HiXMark,
} from "react-icons/hi2";
import "../styles/RequestDetails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RequestSent from "../popups/RequestSent";
import { authApi } from "../config/customer";

const RequestDetails = () => {
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const [called, setCalled] = useState("");

  const { id: designerId } = useParams();

  console.log("designer id:", designerId);

  const location = useLocation();
  const holding = location.state;

  console.log("holding", holding);

  console.log("state coming:", location.state);

  console.log("state coming:", location.state);

  console.log("state coming:", location.state);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [showSent, setShowSent] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    deadline: "",
    measurements: "Chest\nShoulder\nSleeve Length\nTop Length\nNeck\nBust",
    description: "",
  });

  console.log("formData", formData);

  // ✅ ISO CONVERTER (ADDED ONLY)
  const convertToISO = (value) => {
    if (!value) return null;

    const numbers = value.replace(/\D/g, "");

    // must be at least 8 digits (DDMMYYYY)
    if (numbers.length < 8) return null;

    const day = numbers.slice(0, 2);
    const month = numbers.slice(2, 4);
    const year = numbers.slice(4, 8);

    const date = new Date(`${year}-${month}-${day}`);

    if (isNaN(date.getTime())) return null;

    return date.toISOString();
  };
  const formatDeadline = (value) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }

    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "deadline") {
      newValue = formatDeadline(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required";
    }

    if (!formData.measurements.trim()) {
      newErrors.measurements = "Measurement is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,

        deadLine: convertToISO(formData.deadline),

        measurement: formData.measurements,

        description: formData.description,
      };

      console.log("REQUEST PAYLOAD", payload);
      let response;

      if (!designerId) {
        throw new Error("Designer id missing");
      }

      if (selectedFile) {
        const fd = new FormData();

        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null) fd.append(key, value);
        });

        fd.append("inspiration", selectedFile);

        response = await authApi.request(designerId, fd);
      } else {
        response = await authApi.request(designerId, payload);
      }

      console.log("response full", response);

      setCalled(response.data);

      // robust extraction of id from possible response shapes
      const requestId =
        response?.data?.id ||
        response?.data?.requestId ||
        response?.data?.data?.id ||
        response?.data?._id ||
        response?.id ||
        null;

      // merge holding and response data into a single object for checkout
      const mergedState = {
        ...(holding || {}),
        ...(response?.data || {}),
        requestId,
        responseData: response?.data ?? response,
      };

      // persist merged state temporarily so the checkout page can recover it
      try {
        sessionStorage.setItem("checkoutState", JSON.stringify(mergedState));
      } catch (e) {
        console.warn("Could not write checkoutState to sessionStorage", e);
      }

      console.log("navigating with mergedState", mergedState);

      navigate(`/user/checkout/${requestId || ""}`, {
        state: mergedState,
      });
    } catch (error) {
      console.log(error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();

    setSelectedFile(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  console.log("called", called);
  // console.log("holder", holder);

  return (
    <div className="rd-container">
      <div className="rd-card">
        <h2 className="rd-title">Request Details</h2>

        <form onSubmit={(e) => e.preventDefault()} className="rd-form">
          {/* Full Name */}
          <div className="rd-form-group">
            <label htmlFor="fullName">Full Name</label>

            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />

            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
          </div>

          {/* Deadline */}
          <div className="rd-form-group rd-relative">
            <label htmlFor="deadline">Deadline</label>

            <div className="rd-input-icon-wrapper">
              <HiOutlineCalendar className="rd-calendar-icon" />

              <input
                type="text"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>

            {errors.deadline && <p className="error-text">{errors.deadline}</p>}
          </div>

          {/* Measurements */}
          <div className="rd-form-group">
            <label htmlFor="measurements">
              Input needed measurement from Designer
            </label>

            <textarea
              id="measurements"
              name="measurements"
              rows="6"
              value={formData.measurements}
              onChange={handleChange}
            />

            {errors.measurements && (
              <p className="error-text">{errors.measurements}</p>
            )}
          </div>

          {/* Description */}
          <div className="rd-form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              placeholder="Describe your design vision in detail.."
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />

            {errors.description && (
              <p className="error-text">{errors.description}</p>
            )}
          </div>

          {/* Upload */}
          <div className="rd-form-group">
            <label>Upload Inspiration Images (Optional)</label>

            <input
              type="file"
              id="inspiration-upload"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleFileChange}
            />

            <div className="rd-upload-zone" onClick={handleUploadClick}>
              {imagePreview ? (
                <div className="rd-preview-wrapper">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="rd-image-preview"
                  />

                  <button
                    type="button"
                    className="rd-remove-img-btn"
                    onClick={handleRemoveImage}
                  >
                    <HiXMark />
                  </button>

                  <p className="rd-preview-filename">{selectedFile?.name}</p>
                </div>
              ) : (
                <div className="rd-upload-placeholder">
                  <HiOutlineCloudArrowUp className="rd-upload-icon" />

                  <p className="rd-upload-text">Click to upload</p>

                  <p className="rd-upload-subtext">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="rd-action-footer">
            <button
              type="button"
              className="rd-back-btn"
              onClick={() => navigate("/user/designer-profile")}
            >
              Back
            </button>

            <button
              type="button"
              className="rd-next-btn"
              onClick={handleSubmit}
            >
              {loading ? "Sending..." : "Next"}
            </button>
          </div>
        </form>
      </div>

      {/* <RequestSent
        isOpen={showSent}
        onClose={() => {
          setShowSent(false);
          navigate("/user/dashboard");
        }}
      /> */}
    </div>
  );
};

export default RequestDetails;
