import "../styles/SetUpWallet.css";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";

const SetUpWallet = ({ onNext, onPrev, designerInfo, setDesignerInfo }) => {
  const [errors, setErrors] = useState({});

  const banks = [
    { name: "Access Bank", code: "044" },
    { name: "GTBank", code: "058" },
    { name: "First Bank", code: "011" },
    { name: "Zenith Bank", code: "057" },
    { name: "UBA", code: "033" },
    { name: "Kuda Bank", code: "50211" },
    { name: "Opay", code: "999992" },
    { name: "PalmPay", code: "999991" },
    { name: "Moniepoint", code: "50515" },
    { name: "Polaris Bank", code: "076" },
    { name: "Fidelity Bank", code: "070" },
    { name: "FCMB", code: "214" },
    { name: "Stanbic IBTC Bank", code: "221" },
    { name: "Sterling Bank", code: "232" },
    { name: "Wema Bank", code: "035" },
    { name: "Union Bank", code: "032" },
    { name: "Ecobank", code: "050" },
    { name: "Keystone Bank", code: "082" },
    { name: "Heritage Bank", code: "030" }, // Note: Heritage Bank's license was revoked in 2024, but code is kept for legacy systems
    { name: "Providus Bank", code: "101" },
    { name: "Titan Trust Bank", code: "102" },
    { name: "Globus Bank", code: "103" },
    { name: "Nova Bank", code: "561" },
    { name: "Parallex Bank", code: "104" },
    { name: "Premium Trust Bank", code: "105" },
    { name: "Signature Bank", code: "000034" },
    { name: "Jaiz Bank", code: "301" },
    { name: "Lotus Bank", code: "303" },
    { name: "TAJ Bank", code: "302" },
    { name: "SunTrust Bank", code: "100" },
    { name: "Sparkle Bank", code: "51310" },
    { name: "Rubies Bank", code: "125" },
    { name: "Mintyn Bank", code: "50304" },
    { name: "Eyowo", code: "50126" },
    { name: "Carbon", code: "565" },
    { name: "FairMoney", code: "090551" },
    { name: "VFD Microfinance Bank", code: "566" },
    { name: "Branch", code: "050006" },
    { name: "Renmoney", code: "090198" },
    { name: "Quickteller Paypoint", code: "311" },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDesignerInfo((prev) => ({
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

          <select
            name="bankName"
            value={designerInfo.bankName || ""}
            onChange={handleChange}
            className="Selecy"
          >
            <option value="">Select bank</option>

            {banks.map((bank) => (
              <option key={bank.code} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>

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
