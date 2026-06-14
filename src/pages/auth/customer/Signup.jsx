import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoChevronBack } from "react-icons/io5";
import InputField from "../../../components/reuasbleComponents/InputField";
import AuthCard from "../../../components/reuasbleComponents/AuthCard";
import "../../../styles/Signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { setCredentials } from "../../../global/authSlice";
import { FaSpinner } from "react-icons/fa";
import { authed } from "../../../config/google";
import { onboardingApi } from "../../../config/onBoarding";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isValid = validateForm();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const res = await onboardingApi.designerSignup(formData);

      console.log("res", res.data);
      const role = res?.data?.user?.role;
      console.log("role", role);

      Swal.fire({
        icon: "success",
        title: "Account created",
        timer: 1500,
        showConfirmButton: false,
      });

      // localStorage.setItem("email", formData.email);

      navigate("/verification", {
        state: {
          flow: "signup",
          role: "designer",
          email: formData.email,
        },
      });
      sessionStorage.setItem("otp_email", formData.email);
      sessionStorage.setItem("otp_role", "customer");
      sessionStorage.setItem("otp_flow", "signup");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup failed",
        text: error.response?.data?.message,
      });
    }

    setLoading(false);
  };

  const handleGoogleLogin = () => {
    authed.google();
  };

  return (
    <div className="signup_content">
      <div className="back_home" onClick={() => navigate("/")}>
        <IoChevronBack />
        <span>Back to Home</span>
      </div>

      <AuthCard
        title="Create an account"
        subtitle="Create your professional designer account to receive orders, manage deliveries and grow your fashion business."
        buttonText="Create Account"
        onSubmit={handleSubmit}
      >
        <div className="name_row">
          <InputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            error={errors.firstName}
          />

          {errors.firstName && (
            <span className="error-text">{errors.firstName}</span>
          )}

          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            error={errors.lastName}
          />
          {errors.lastName && (
            <span className="error-text">{errors.lastName}</span>
          )}
        </div>

        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email"
          error={errors.email}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          error={errors.password}
        />
        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}

        <button className="create_btn" type="submit">
          {loading ? (
            <>
              Processing...
              <FaSpinner className="loading_icon" />
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="forgot_password">
          Already have an account?
          <NavLink to="/login" className="NavLinked">
            Login into your account
          </NavLink>
        </p>

        <div className="divider">
          <span></span>

          <p>Or</p>

          <span></span>
        </div>

        <button
          type="button"
          className="google_btn"
          onClick={handleGoogleLogin}
        >
          <FcGoogle />
          Continue with Google
        </button>
      </AuthCard>
    </div>
  );
};

export default Signup;
