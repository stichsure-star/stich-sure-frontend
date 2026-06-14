import { useState } from "react";
import "../../styles/ForgetPassword.css";
import { IoChevronBack } from "react-icons/io5";
import InputField from "../../components/reuasbleComponents/InputField";
import AuthCard from "../../components/reuasbleComponents/AuthCard";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../config/auth";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const roleFromRedux = useSelector((state) => state.auth.role);
  const role = roleFromRedux || localStorage.getItem("role") || "customer";

  const [formData, setFormData] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      Swal.fire({
        icon: "warning",
        title: "Email required",
      });
      return;
    }

    try {
      setLoading(true);

      await authApi.forgotPassword(role, {
        email: formData.email,
      });

      // store for next step
      localStorage.setItem("email", formData.email);

      Swal.fire({
        icon: "success",
        title: "OTP sent",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/verification", {
        state: {
          flow: "forgot-password",
          email: formData.email,
          role,
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot_content">
      <div className="forgot_header" onClick={() => navigate(-1)}>
        <p className="back_text">
          <IoChevronBack />
          Back
        </p>
      </div>

      <AuthCard
        title="Forgot your password?"
        subtitle="Enter your email to receive reset instructions"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />

        <button className="create_btn" type="submit">
          {loading ? (
            <>
              Processing...
              <FaSpinner className="loading_icon" />
            </>
          ) : (
            "Continue"
          )}
        </button>
      </AuthCard>
    </div>
  );
};

export default ForgotPassword;
