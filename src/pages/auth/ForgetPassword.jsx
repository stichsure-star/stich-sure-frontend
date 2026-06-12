import { useState } from "react";
import "../../styles/ForgetPassword.css";
import { IoChevronBack } from "react-icons/io5";
import InputField from "../../components/reuasbleComponents/InputField";
import AuthCard from "../../components/reuasbleComponents/AuthCard";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../config/auth";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const role = localStorage.getItem("role") || "customer";

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
      const res = await authApi.forgotPassword(role, {
        email: formData.email,
      });
      console.log("res", res.data);

      Swal.fire({
        icon: "success",
        title: "Reset link sent",
        timer: 1500,
        showConfirmButton: false,
      });

      // store correct email for next step
      localStorage.setItem("email", formData.email);

      navigate("/verification", {
        state: {
          flow: "forget-password",
          role: "customer",
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message,
      });
    }
  };
  console.log("res", res.data);

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
          Continue
        </button>
      </AuthCard>
    </div>
  );
};

export default ForgotPassword;
