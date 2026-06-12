import { useState } from "react";
import "../../styles/SetPassword.css";
import { IoChevronBack } from "react-icons/io5";
import InputField from "../../components/reuasbleComponents/InputField";
import AuthCard from "../../components/reuasbleComponents/AuthCard";
import { useNavigate, useLocation } from "react-router-dom";
import { authApi } from "../../config/auth";
import Swal from "sweetalert2";

const SetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || localStorage.getItem("email");
  const role = localStorage.getItem("role") || "customer";

  const [formData, setFormData] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Email missing",
        text: "Please restart the reset flow",
      });
      return navigate("/forgot-password");
    }

    try {
      await authApi.resetPassword(role, {
        password: formData.password,
      });

      Swal.fire({
        icon: "success",
        title: "Password reset successful",
        timer: 1500,
        showConfirmButton: false,
      });

      // clear temp data
      localStorage.removeItem("email");

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Reset failed",
        text: error.response?.data?.message,
      });
    }
  };

  return (
    <div className="setpassword_content">
      <div
        className="setpassword_header"
        onClick={() => navigate("/login")}
        style={{ cursor: "pointer" }}
      >
        <p className="back_text">
          <IoChevronBack />
          Back
        </p>
      </div>

      <AuthCard
        title="Set password"
        subtitle="Enter your new password"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter new password"
        />

        <button className="create_btn" type="submit">
          Reset Password
        </button>
      </AuthCard>
    </div>
  );
};

export default SetPassword;
