import { useState } from "react";
import "../styles/BasicInfo.css";

const BasicInfo = ({ onNext, setDesignerInfo, designerInfo }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDesignerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!designerInfo.businessName?.trim())
      newErrors.businessName = "Business name required";

    if (!designerInfo.currentHouseAddress?.trim())
      newErrors.currentHouseAddress = "Address required";

    if (!designerInfo.phoneNumber?.trim())
      newErrors.phoneNumber = "Phone required";

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
        <h4>Basic Information</h4>

        <form className="basic-info-form" onSubmit={handleSubmit}>
          <label>Business Name</label>
          <input
            name="businessName"
            value={designerInfo.businessName || ""}
            onChange={handleChange}
          />
          {errors.businessName && (
            <p className="error-text">{errors.businessName}</p>
          )}

          <label>Current Business Address</label>
          <input
            name="currentHouseAddress"
            value={designerInfo.currentHouseAddress || ""}
            onChange={handleChange}
          />
          {errors.currentHouseAddress && (
            <p className="error-text">{errors.currentHouseAddress}</p>
          )}

          <label>Phone Number</label>
          <input
            name="phoneNumber"
            value={designerInfo.phoneNumber || ""}
            onChange={handleChange}
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
