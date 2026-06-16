import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../styles/designer-security.css";
import { ApiClient } from "../../../config/AxiosInstance";

const DesignerSecurity = () => {
  const [passwords, setPasswords] = useState({
    currentPassword:"",
    newPassord:"",
    confirmPaasowrd:"",
});
  const [loading,setLoading] =useState(false);
  const [statusMessage, setStatusMessage] = useState({
     type: "",
      text: "" 
});

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({...prev, [name]: value }));
  };

  const handleUpdatePassword =  async (e) => {
    e.preventDefault();
    setStatusMessage({
       type: "",
        text: ""
   });

    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setStatusMessage({ 
        type: "error",
         text: "Please fill out all fields." 
    });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setStatusMessage({ 
        type: "error", 
        text: "New password fields do not match!" 
    });
      return;
    }

    try {
      setLoading(true);
       const response = await ApiClient.put("/designer/update-password-setting", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword,
      });

      setStatusMessage({
         type: "success", 
         text: "Password updated successfully!" 
      });
      setPasswords({ 
        currentPassword: "",
         newPassword: "", 
         confirmPassword: "" 
      });

    } catch (error) {
      console.log(error)
       const errMsg = error.response?.data?.message
      setStatusMessage({
         type: "error",
          text: errMsg 
      });
      
    } finally {
      setLoading(false);
    }
  };


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