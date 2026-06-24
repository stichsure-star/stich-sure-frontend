import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import "../styles/BasicInfo.css";

const BasicInfo = ({ onNext, onPrev, setDesignerInfo, designerInfo }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // FIX: Removed the trailing space from "phoneNumber"
    if (name === "phoneNumber") {
      const cleanValue = value.replace(/[^0-9+\s-]/g, "");
      setDesignerInfo((prev) => ({ ...prev, [name]: cleanValue }));
      return;
    }

    if (name === "state" || name === "country") {
      const cleanValue = value.replace(/[0-9]/g, "");
      setDesignerInfo((prev) => ({ ...prev, [name]: cleanValue }));
      return;
    }

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

    // 3. Strict verification: Ensure phoneNumber  number does not contain alphabets
    if (!designerInfo.phoneNumber?.trim()) {
      newErrors.phoneNumber = "phoneNumber  required";
    } else if (/[a-zA-Z]/.test(designerInfo.phoneNumber)) {
      newErrors.phoneNumber = "phoneNumber  number must not contain letters";
    }

    // 4. Strict verification: Ensure state does not contain numbers
    if (!designerInfo.state?.trim()) {
      newErrors.state = "State required";
    } else if (/[0-9]/.test(designerInfo.state)) {
      newErrors.state = "State must not contain numbers";
    }

    // 5. Strict verification: Ensure country does not contain numbers
    if (!designerInfo.country?.trim()) {
      newErrors.country = "Country required";
    } else if (/[0-9]/.test(designerInfo.country)) {
      newErrors.country = "Country must not contain numbers";
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
          />
          {errors.businessName && (
            <p className="error-text">{errors.businessName}</p>
          )}

          <label>Current Business Address</label>
          <input
            name="currentHouseAddress"
            value={designerInfo?.currentHouseAddress || ""}
            onChange={handleChange}
          />
          {errors.currentHouseAddress && (
            <p className="error-text">{errors.currentHouseAddress}</p>
          )}

          <label>phoneNumber Number</label>
          <input
            name="phoneNumber" // FIX: Changed from "phoneNumber " to "phoneNumber"
            type="tel"
            value={designerInfo?.phoneNumber || ""}
            onChange={handleChange}
          />

          {errors.phoneNumber && (
            <p className="error-text">{errors.phoneNumber}</p>
          )}
          <div className="Addie">
            <article>
              <label>State</label>
              <input
                name="state"
                value={designerInfo?.state || ""}
                onChange={handleChange}
              />
              {errors.state && <p className="error-text">{errors.state}</p>}
            </article>
            <article>
              <label>Country</label>
              <input
                name="country"
                value={designerInfo?.country || ""}
                onChange={handleChange}
              />

              {errors.country && <p className="error-text">{errors.country}</p>}
            </article>
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default BasicInfo;
