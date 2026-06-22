import "../styles/SetUpWallet.css";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";

const SetUpWallet = ({ onNext, onPrev, designerInfo, setDesignerInfo }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDesignerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error as user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!designerInfo.bankName?.trim()) {
      newErrors.bankName = "Bank name is required";
    }

    if (!designerInfo.accountNumber?.trim()) {
      newErrors.accountNumber = "Account number is required";
    } else if (!/^\d{10}$/.test(designerInfo.accountNumber)) {
      newErrors.accountNumber = "Account number must be 10 digits";
    }

    if (!designerInfo.accountName?.trim()) {
      newErrors.accountName = "Account name is required";
    } else if (designerInfo.accountName.length < 3) {
      newErrors.accountName = "Enter a valid account name";
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
    <div className="SetUpWallet-page">
      <div className="set-up-card">
        <button type="button" className="wizard-back-icon" onClick={onPrev}>
          <IoChevronBack />
        </button>

        <h4>Set Up Your Wallet</h4>

        <form className="set-up-form" onSubmit={handleSubmit}>
          <label>Bank Name</label>
          <input
            name="bankName"
            value={designerInfo.bankName || ""}
            onChange={handleChange}
            placeholder="Enter bank name"
          />
          {errors.bankName && <p className="error-text">{errors.bankName}</p>}

          <label>Account Number</label>
          <input
            name="accountNumber"
            value={designerInfo.accountNumber || ""}
            onChange={handleChange}
            placeholder="Enter account number"
          />
          {errors.accountNumber && (
            <p className="error-text">{errors.accountNumber}</p>
          )}

          <label>Account Name</label>
          <input
            name="accountName"
            value={designerInfo.accountName || ""}
            onChange={handleChange}
            placeholder="Enter account name"
          />
          {errors.accountName && (
            <p className="error-text">{errors.accountName}</p>
          )}

          <div className="btn-group">
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetUpWallet;
