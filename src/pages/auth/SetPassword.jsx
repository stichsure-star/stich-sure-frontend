import { useState } from "react";
import "../../styles/ForgetPassword.css";
import InputField from "../../components/reuasbleComponents/InputField";
import AuthCard from "../../components/reuasbleComponents/AuthCard";
import { useNavigate, useLocation } from "react-router-dom";
import { authApi } from "../../config/auth";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || localStorage.getItem("email");
  const role =
    location.state?.role || localStorage.getItem("role") || "customer";

  const [formData, setFormData] = useState({
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password) {
      return Swal.fire({
        icon: "warning",
        title: "Password required",
      });
    }

    try {
      setLoading(true);

      await authApi.resetPassword(role, {
        password: formData.password,
      });

      Swal.fire({
        icon: "success",
        title: "Password reset successful",
        timer: 1500,
        showConfirmButton: false,
      });

      // cleanup
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Reset failed",
        text: error.response?.data?.message || "Try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter your new password"
      onSubmit={handleSubmit}
    >
      <InputField
        label="New Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter new password"
      />

      <button className="create_btn" type="submit">
        {loading ? (
          <>
            Resetting...
            <FaSpinner className="loading_icon" />
          </>
        ) : (
          "Reset Password"
        )}
      </button>
    </AuthCard>
  );
};

export default ResetPassword;
