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
  const { id: designerId } = useParams();

  const location = useLocation();
  const holding = location.state;

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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

  const [formData, setFormData] = useState({
    fullName: derivedFullName,
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

  const getMinAllowedDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  };

  const minDate = getMinAllowedDate();

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
    } else if (formData.deadLine < minDate) {
      newErrors.deadLine = "Deadline must be at least 2 days from today";
    }

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
      const formattedMeasurementsArray = Object.entries(
        formData.measurement,
      ).map(([key, val]) => ({
        name: key,
        value: val,
      }));
      const stringifiedMeasurements = JSON.stringify(
        formattedMeasurementsArray,
      );

      const dataPayload = new FormData();
      dataPayload.append("fullName", derivedFullName);
      dataPayload.append("deadLine", formData.deadLine);
      dataPayload.append("measurement", stringifiedMeasurements);
      dataPayload.append("description", formData.description);
      dataPayload.append(
        "amount",
        holding?.amount ? parseInt(holding.amount, 10) : 0,
      );
      dataPayload.append("itemName", holding?.itemName || "Custom Outfit");

      if (holding?.designId) {
        dataPayload.append("designId", holding.designId);
      }

      if (holding?.design) {
        dataPayload.append("designImage", holding.design);
      }

      selectedFiles.forEach((file) => {
        dataPayload.append("inspirationalImage", file);
      });

      console.log("Submitting perfectly matched multi-part form payload...");

      const response = await customerApi.request(designerId, dataPayload);

      const targetId =
        response.data?.id ||
        response.data?.data?.id ||
        response.data?.data?._id;

      navigate(`/user/checkout/${targetId}`, {
        state: {
          ...holding,
          requestId: targetId,
        },
      });
    } catch (error) {
      console.error("Submission failed:", error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newFiles = [...selectedFiles, ...files].slice(0, 2);
      setSelectedFiles(newFiles);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
    }
  };

  const handleRemoveImage = (index, e) => {
    e.stopPropagation();
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setSelectedFiles(newFiles);
    setImagePreviews(newPreviews);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rd-container">
      <div className="rd-card">
        <h2 className="rd-title">Request Details</h2>

        <form onSubmit={(e) => e.preventDefault()} className="rd-form">
          <div className="rd-form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={derivedFullName}
              readOnly
              className="read-only-input"
            />
          </div>

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

          <div className="rd-form-group">
            <label>Input needed measurement from Designer</label>
            {/* Added scrollable grid container element */}
            <div className="measurement-grid-container">
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
            </div>
            {errors.measurement && (
              <p className="error-text">{errors.measurement}</p>
            )}
          </div>

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

          <div className="rd-form-group">
            <label>Upload Inspiration Images (Optional, Max 2)</label>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/png,image/jpeg,image/jpg"
              multiple
              onChange={handleFileChange}
            />
            <div className="rd-upload-zone" onClick={handleUploadClick}>
              {imagePreviews.length > 0 ? (
                /* Changed container layout to side-by-side configuration */
                <div className="rd-images-row-container">
                  {imagePreviews.map((preview, index) => (
                    <div className="rd-preview-wrapper" key={index}>
                      <img
                        src={preview}
                        alt={`preview ${index + 1}`}
                        className="rd-image-preview"
                      />
                      <button
                        type="button"
                        className="rd-remove-img-btn"
                        onClick={(e) => handleRemoveImage(index, e)}
                      >
                        <HiXMark />
                      </button>
                      <p className="rd-preview-filename">
                        {selectedFiles[index]?.name}
                      </p>
                    </div>
                  ))}
                  {imagePreviews.length < 2 && (
                    <p className="rd-add-more-hint">+ Add 2nd image</p>
                  )}
                </div>
              ) : (
                <div className="rd-upload-placeholder">
                  <HiOutlineCloudArrowUp className="rd-upload-icon" />
                  <p className="rd-upload-text">Click to upload</p>
                  <p className="rd-upload-subtext">
                    PNG, JPG up to 10MB (Limit 2)
                  </p>
                </div>
              )}
            </div>
          </div>

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
