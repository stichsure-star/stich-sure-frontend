import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { ApiClient } from "../../../config/AxiosInstance"; 

const DesignerSecurity = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: "", text: "" });

    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setStatusMessage({ type: "error", text: "Please fill out all fields." });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setStatusMessage({ type: "error", text: "New password fields do not match!" });
      return;
    }

    try {
      setLoading(true);
    
      const response = await ApiClient.put("/designer/update-password-setting", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword,
      });
    

    
      setStatusMessage({ type: "success", text: "Password updated successfully!" });
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    
    } catch (error) {
      
      const errMsg = error.response?.data?.message
      setStatusMessage({ type: "error", text: errMsg });
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div style={{ maxWidth: "800px", padding: "20px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "32px", fontFamily: "serif", color: "#111" }}>
        Security Settings
      </h2>
      
      {statusMessage.text && (
        <div 
          style={{ 
            padding: "14px", 
            marginBottom: "20px", 
            borderRadius: "6px",
            fontSize: "14px",
            backgroundColor: statusMessage.type === "success" ? "#e6f4ea" : "#fce8e6",
            color: statusMessage.type === "success" ? "#137333" : "#c5221f",
            border: `1px solid ${statusMessage.type === "success" ? "#ceead6" : "#fad2cf"}`
          }}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleUpdatePassword} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
     
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "13px", color: "#333", fontWeight: "500" }}>Current Password</label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              style={{ width: "100%", padding: "14px", borderRadius: "6px", border: "1px solid #dcdcdc", paddingRight: "45px", fontSize: "15px" }}
            />
            <span 
              onClick={() => setShowCurrent(!showCurrent)} 
              style={{ position: "absolute", right: "16px", top: "35%", cursor: "pointer", color: "#777", fontSize: "18px" }}
            >
              {showCurrent ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
            </span>
          </div>
        </div>

        {/* New Password */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "13px", color: "#333", fontWeight: "500" }}>New Password</label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              style={{ width: "100%", padding: "14px", borderRadius: "6px", border: "1px solid #dcdcdc", paddingRight: "45px", fontSize: "15px" }}
            />
            <span 
              onClick={() => setShowNew(!showNew)} 
              style={{ position: "absolute", right: "16px", top: "35%", cursor: "pointer", color: "#777", fontSize: "18px" }}
            >
              {showNew ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
            </span>
          </div>
        </div>

        {/* Confirm New Password */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "13px", color: "#333", fontWeight: "500" }}>Confirm New Password</label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              style={{ width: "100%", padding: "14px", borderRadius: "6px", border: "1px solid #dcdcdc", paddingRight: "45px", fontSize: "15px" }}
            />
            <span 
              onClick={() => setShowConfirm(!showConfirm)} 
              style={{ position: "absolute", right: "16px", top: "35%", cursor: "pointer", color: "#777", fontSize: "18px" }}
            >
              {showConfirm ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#6c0319",
            color: "#ffffff",
            padding: "16px",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "12px",
            opacity: loading ? 0.7 : 1,
            transition: "background-color 0.2s"
          }}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default DesignerSecurity;