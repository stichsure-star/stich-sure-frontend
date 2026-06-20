import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../styles/customer-security.css";
import { customerApi } from "../../../config/customer";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../global/authSlice";
import Swal from "sweetalert2";

const CustomerSecurity = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 VALIDATION
    if (!form.currentPassword.trim()) {
      return alert("Current password is required");
    }

    if (!form.newPassword.trim()) {
      return alert("New password is required");
    }

    if (form.newPassword.length < 6) {
      return alert("New password must be at least 6 characters");
    }

    if (form.newPassword !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    console.log("READY TO SEND:", form);

    try {
      const res = await customerApi.updatepassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      console.log("SUCCESS:", res.data);
      dispatch(
        setCredentials({
          currentPassword: form.currentPassword,
          password: form.newPassword,
          confirmPassword: form.confirmPassword,
        }),
      );
      Swal.fire({
        icon: "success",
        title: "Password updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log("API ERROR:", error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: "Password update failed",
      });
    }

    //
  };

  return (
    <main className="customer-security-page">
      <section className="customer-security-panel">
        <h1>Security Settings</h1>

        <form className="customer-security-form" onSubmit={handleSubmit}>
          {/* CURRENT PASSWORD */}
          <label className="security-field">
            <span>Current Password</span>

            <div className="security-input-wrapper">
              <input
                name="currentPassword"
                type={showCurrent ? "text" : "password"}
                value={form.currentPassword}
                onChange={handleChange}
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

          {/* NEW PASSWORD */}
          <label className="security-field">
            <span>New Password</span>

            <div className="security-input-wrapper">
              <input
                name="newPassword"
                type={showNew ? "text" : "password"}
                value={form.newPassword}
                onChange={handleChange}
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

          {/* CONFIRM PASSWORD */}
          <label className="security-field">
            <span>Confirm New Password</span>

            <div className="security-input-wrapper">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
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

export default CustomerSecurity;
