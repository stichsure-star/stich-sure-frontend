import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../styles/designer-security.css";

const DesignerSecurity = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <main className="designer-security-page">
      <section className="designer-security-panel">
        <h1>Security Settings</h1>

        <form className="designer-security-form">
          <label className="security-field">
            <span>Current Password</span>

            <div className="security-input-wrapper">
              <input
                type={showCurrent ? "text" : "password"}
              />

              <button
                type="button"
                className="security-eye-button"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          <label className="security-field">
            <span>New Password</span>

            <div className="security-input-wrapper">
              <input
                type={showNew ? "text" : "password"}
              />

              <button
                type="button"
                className="security-eye-button"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          <label className="security-field">
            <span>Confirm New Password</span>

            <div className="security-input-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
              />

              <button
                type="button"
                className="security-eye-button"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          <button type="submit" className="security-update-button">
            Update Password
          </button>
        </form>
      </section>
    </main>
  );
};

export default DesignerSecurity;