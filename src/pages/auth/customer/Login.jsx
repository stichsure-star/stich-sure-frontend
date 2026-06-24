import { useState } from "react";
import "../../../styles/Login.css";

import { IoChevronBack } from "react-icons/io5";
import InputField from "../../../components/reuasbleComponents/InputField";
import AuthCard from "../../../components/reuasbleComponents/AuthCard";

import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";

import { setCredentials, updateUser } from "../../../global/authSlice";
import { useDispatch } from "react-redux";

import { authApi } from "../../../config/auth";
import { designerApi } from "../../../config/designer";
import { customerApi } from "../../../config/customer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("designer");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,

      [e.target.name]: "",
    });

    setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
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

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await authApi.login(role, formData);
      const user = res.data.data;
      const token = res.data.token;
      const userRole = user.role;

      // 1. Save base authentication credentials first
      dispatch(setCredentials({ user, token }));

      let fullUser = { ...user };

      // 2. Fetch the correct deep profile depending on who is logging in
      // Keep this exact segment in your Login's handleSubmit code:
      if (userRole === "designer") {
        try {
          const profile = await designerApi.getProfile(user.id);
          // Extracted target data cleanly
          const profileData = profile.data?.data || profile.data || {};
          fullUser = { ...fullUser, ...profileData };
        } catch (err) {
          console.log("Designer Profile fetch failed:", err);
        }
      } else if (userRole === "customer") {
        try {
          const prof = await customerApi.getProfile(user.id);
          // Merge deep profile data safely
          fullUser = { ...fullUser, ...prof.data.data };
        } catch (error) {
          console.log("Customer Profile fetch failed:", error);
        }
      }

      // 3. Dispatch to update Redux EXACTLY ONCE with complete info
      dispatch(updateUser(fullUser));

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      // 4. Clean and predictable navigation routes
      if (userRole === "designer") {
        navigate("/designer/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      const message = err.response?.data?.message;
      const data = err.response?.data;

      console.log("LOGIN ERROR:", data);

      // ================= EMAIL NOT VERIFIED =================
      if (
        message === "Please verify your email to continue" ||
        data?.code === "EMAIL_NOT_VERIFIED"
      ) {
        const email = formData.email;

        Swal.fire({
          icon: "warning",
          title: "Email not verified",
          text: "Verify your email to continue",
          timer: 1500,
          showConfirmButton: false,
        });

        try {
          await authApi.resendOtp(role, { email });

          navigate("/verification", {
            state: {
              email,
              role,
              flow: "verify-email",
            },
          });
          return;
        } catch (otpError) {
          Swal.fire({
            icon: "error",
            title: "OTP failed",
            text:
              otpError.response?.data?.message ||
              "Could not send verification code",
          });
          return;
        }
      }

      setServerError(message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_content">
      <div className="login_header">
        <NavLink to="/signup" className="back_text_link">
          <p className="back_text">
            <IoChevronBack />
            Back
          </p>
        </NavLink>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <button
          type="button"
          onClick={() => setRole("designer")}
          style={{
            padding: "10px 20px",

            border: "1px solid #8B0000",

            borderRadius: "20px",

            background: role === "designer" ? "#8B0000" : "white",

            color: role === "designer" ? "white" : "#8B0000",

            cursor: "pointer",
          }}
        >
          Login as Designer
        </button>

        <button
          type="button"
          onClick={() => setRole("customer")}
          style={{
            padding: "10px 20px",

            border: "1px solid #8B0000",

            borderRadius: "20px",

            background: role === "customer" ? "#8B0000" : "white",

            color: role === "customer" ? "white" : "#8B0000",

            cursor: "pointer",
          }}
        >
          Login as Customer
        </button>
      </div>

      <AuthCard
        title={`Welcome Back ${role}`}
        subtitle="Login to continue enjoying our services"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        {errors.email && <span className="error-text">{errors.email}</span>}

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}

        {serverError && <p className="error-text">{serverError}</p>}

        <p className="forgot_password">
          <NavLink to="/forgetpassword" className="NavLinked">
            Forgot Password?
          </NavLink>
        </p>

        <button type="submit" disabled={loading} className="create_btn">
          {loading ? (
            <>
              Logging in...
              <FaSpinner className="loading_icon" />
            </>
          ) : (
            "Login"
          )}
        </button>

        <p className="forgot_password">
          Don't have an account?
          <NavLink to="/getstarted" className="NavLinked">
            Get Started
          </NavLink>
        </p>
      </AuthCard>
    </div>
  );
};

export default Login;
