import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import "../styles/BasicInfo.css";

const BasicInfo = ({ onNext, onPrev, setDesignerInfo, designerInfo }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      // 1. Strip out everything except pure numbers (0-9)
      const pureDigits = value.replace(/[^0-9]/g, "");

      // 2. Hard stop: do not allow typing past 11 digits
      if (pureDigits.length > 11) return;

      setDesignerInfo((prev) => ({ ...prev, [name]: pureDigits }));
      return;
    }

    setDesignerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!designerInfo.businessName?.trim()) {
      newErrors.businessName = "Business name required";
    }

    // ADDRESS SPECIFIC STRUCTURAL VALIDATION
    const fullAddress = designerInfo.address?.trim() || "";
    if (!fullAddress) {
      newErrors.address = "Full business address is required";
    } else {
      // Split by commas and filter out empty strings caused by extra commas
      const addressParts = fullAddress
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);

      // Ensure there are at least 3 parts (Street, City/Area, State/Country) to maintain compatibility with logistics matching
      if (addressParts.length < 3) {
        newErrors.address =
          "Please format as: Street, City/Area, State, Country";
      }
    }

    // 3. Strict length check for exactly 11 digits
    if (!designerInfo.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Phone number required";
    } else if (designerInfo.phoneNumber.length !== 11) {
      newErrors.phoneNumber = "Phone number must be exactly 11 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onNext();
  };

  return (
    <div className="BasicInfo-page">
      <div className="basic-info-card">
        <button type="button" className="wizard-back-icon" onClick={onPrev}>
          <IoChevronBack />
        </button>

        <h4>Basic Information</h4>

        <form className="basic-info-form" onSubmit={handleSubmit}>
          <label>Business Name</label>
          <input
            name="businessName"
            value={designerInfo?.businessName || ""}
            onChange={handleChange}
            placeholder="e.g. Adebayo Styles"
          />
          {errors.businessName && (
            <p className="error-text">{errors.businessName}</p>
          )}

          <label>Business Address</label>
          <input
            name="address"
            value={designerInfo?.address || ""}
            onChange={handleChange}
            placeholder="e.g. 71 ojora street, Ajegunle Apapa, Lagos, Nigeria"
          />
          {/* Subtext instruction to visually reinforce formatting style */}
          <small className="input-hint-text">
            Format: Street Address, City/LGA, State, Country
          </small>
          {errors.address && <p className="error-text">{errors.address}</p>}

          <label>Phone Number</label>
          <input
            name="phoneNumber"
            type="tel"
            value={designerInfo?.phoneNumber || ""}
            onChange={handleChange}
            placeholder="e.g. 07056491653"
          />
          {errors.phoneNumber && (
            <p className="error-text">{errors.phoneNumber}</p>
          )}

          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default BasicInfo;
