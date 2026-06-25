import React, { useState, useRef } from "react";
import {
  HiOutlineCalendar,
  HiOutlineCloudArrowUp,
  HiXMark,
} from "react-icons/hi2";
import "../styles/RequestDetails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RequestSent from "../paymentInStich-sure/popups/RequestSent";
import { customerApi } from "../config/customer";
import { useSelector } from "react-redux";

const RequestDetails = () => {
  const fileInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  const derivedFullName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "Guest User";

  const navigate = useNavigate();

  const [called, setCalled] = useState("");
  const { id: designerId } = useParams();

  const location = useLocation();
  const holding = location.state;

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const measurementFields = [
    "Chest",
    "Shoulder",
    "Sleeve Length",
    "Top Length",
    "Neck",
    "Bust",
    "Hip",
  ];

  // Initialize measurement as an empty object so tracking nested keys doesn't break
  const [formData, setFormData] = useState({
    fullName: user?.lastName || "",
    deadLine: "",
    description: "",
    measurement: {},
  });

  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      measurement: {
        ...prev.measurement,
        [name]: value,
      },
    }));
  };

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

    if (!formData.deadLine) {
      newErrors.deadLine = "Deadline is required";
    }

    // Check if any of the defined fields are missing/empty in the state object
    const hasEmptyField = measurementFields.some(
      (field) =>
        !formData.measurement[field] ||
        formData.measurement[field].trim() === "",
    );

    if (hasEmptyField) {
      newErrors.measurement = "All measurements are required";
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

    if (dateInputRef.current.showPicker) {
      dateInputRef.current.showPicker();
    } else {
      dateInputRef.current.focus();
      dateInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // FIX: Convert the measurement object into a string to satisfy backend rules
      const stringifiedMeasurements = JSON.stringify(formData.measurement);

      const payload = {
        fullName: derivedFullName, // Using derived full name instead of just last name
        deadLine: formData.deadLine,
        measurement: stringifiedMeasurements, // Now a clean string payload
        description: formData.description,
        amount: holding?.amount ? parseInt(holding.amount, 10) : 0,
        designId: holding?.designId,
        designImg: holding?.design,
        itemName: holding?.itemName,
      };

      console.log("PAYLOAD BEING SENT:", payload);

      const response = await customerApi.request(designerId, payload);

      setCalled(response.data);

      // Cleaned up the undefined console logs and directly passed routing state context
      navigate(`/user/checkout/${response.data.id}`, {
        state: {
          ...holding,
          requestId: response.data.id,
        },
      });
    } catch (error) {
      console.error("Submission failed:", error?.response?.data || error);
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
              value={derivedFullName}
              readOnly // Keeps it locked to the actual user data logged in
              className="read-only-input"
            />
          </div>

          {/* Deadline */}
          <div className="rd-form-group rd-relative">
            <label htmlFor="deadline">DeadLine</label>

            <div className="rd-input-icon-wrapper">
              <HiOutlineCalendar
                className="rd-calendar-icon"
                onClick={handleDateClick}
                style={{ cursor: "pointer" }}
              />

              <input
                ref={dateInputRef}
                type="date"
                id="deadLine"
                name="deadLine"
                value={formData.deadLine}
                onChange={handleChange}
                min={minDate}
                className="Date-pick"
              />
            </div>

            {errors.deadLine && <p className="error-text">{errors.deadLine}</p>}
          </div>

          {/* Measurements */}
          <div className="rd-form-group">
            <label>Input needed measurement from Designer</label>

            {measurementFields.map((field) => (
              <div key={field} className="measurement-row">
                <div className="Blopp">
                  <label className="Blop">{field}</label>

                  <input
                    type="number"
                    name={field}
                    value={formData.measurement[field] || ""}
                    onChange={handleMeasurementChange}
                    placeholder={`Enter ${field}`}
                    className="beep"
                  />
                </div>
              </div>
            ))}

            {errors.measurement && (
              <p className="error-text">{errors.measurement}</p>
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
              disabled={loading}
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
