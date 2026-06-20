import React, { useState, useRef } from "react";
import {
  HiOutlineCalendar,
  HiOutlineCloudArrowUp,
  HiXMark,
} from "react-icons/hi2";
import "../styles/RequestDetails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RequestSent from "../popups/RequestSent";
import { customerApi } from "../config/customer";

const RequestDetails = () => {
  const fileInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const navigate = useNavigate();

  const [called, setCalled] = useState("");
  const { id: designerId } = useParams();

  const location = useLocation();
  const holding = location.state;

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    deadline: "",
    measurements:
      "Chest:\nShoulder:\nSleeve Length:\nTop Length:\nNeck:\nBust:\nHip:",
    description: "",
  });

  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const minDate = getTomorrowDate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  const handleDateClick = () => {
    if (!dateInputRef.current) return;

    // best modern browsers
    if (dateInputRef.current.showPicker) {
      dateInputRef.current.showPicker();
    } else {
      // fallback
      dateInputRef.current.focus();
      dateInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        deadLine: formData.deadline, // already YYYY-MM-DD
        measurement: formData.measurements,
        description: formData.description,
        amount: holding?.amount ? parseInt(holding.amount, 10) : 0,
        designId: holding?.designId,
      };

      console.log("PAYLOAD:", payload);

      const response = await customerApi.request(designerId, payload);

      setCalled(response.data);

      navigate(`/user/checkout/${response.data.id}`, {
        state: {
          ...holding,
          requestId: response.data.id,
        },
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
              <HiOutlineCalendar
                className="rd-calendar-icon"
                onClick={handleDateClick}
                style={{ cursor: "pointer" }}
              />

              <input
                ref={dateInputRef}
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                min={minDate}
                className="Date-pick"
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
    </div>
  );
};

export default RequestDetails;
