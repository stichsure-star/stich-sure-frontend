import React, { useState, useRef } from "react";
import {
  HiOutlineCalendar,
  HiOutlineCloudArrowUp,
  HiXMark,
} from "react-icons/hi2";
import "../styles/RequestDetails.css";
import { useNavigate } from "react-router-dom";
import RequestSent from "../popups/RequestSent";


const RequestDetails = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showSent, setShowSent] =useState(false);
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    deadline: "",
    measurements: "Chest\nShoulder\nSleeve Length\nTop Length\nNeck\nBust",
    description: "",
  });

  const handleNext = () => {
    console.log("Next button clicked. Form Data:", formData);
    setShowSent(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
          </div>

          {/* Upload */}
          <div className="rd-form-group">
            <label>Upload Inspiration Images (Optional)</label>

            <input
              type="file"
              id="inspiration-upload"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />

            <div className="rd-upload-zone" onClick={handleUploadClick}>
              {imagePreview ? (
                <div className="rd-preview-wrapper">
                  <img
                    src={imagePreview}
                    alt="Inspiration Preview"
                    className="rd-image-preview"
                  />

                  <button
                    type="button"
                    className="rd-remove-img-btn"
                    onClick={handleRemoveImage}
                  >
                    <HiXMark />
                  </button>

                  <p className="rd-preview-filename">
                    {selectedFile?.name}
                  </p>
                </div>
              ) : (
                <div className="rd-upload-placeholder">
                  <HiOutlineCloudArrowUp className="rd-upload-icon" />
                  <p className="rd-upload-text">Click to upload</p>
                  <p className="rd-upload-subtext">
                    PNG, JPG up to 10MB
                  </p>
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
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </form>
      </div>
          
          <RequestSent 
            isOpen={showSent}
                onClose={() => {
                 setShowSent(false);
                navigate("/user/dashboard"); 

               }}
            />
    </div>
  );
};

export default RequestDetails;