import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoChevronBack } from "react-icons/io5";
import InputField from "../../../components/reuasbleComponents/InputField";
import AuthCard from "../../../components/reuasbleComponents/AuthCard";
import "../../../styles/Signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { onboardingApi } from "../../../config/onBoarding";
import { FaSpinner } from "react-icons/fa";

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

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter valid email";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await onboardingApi.customerSignup(formData);

      console.log("res", res.data);
      const role = res?.data?.user?.role;
      console.log("role", role);
      Swal.fire({
        icon: "success",
        title: "Account created",
        timer: 1500,
        showConfirmButton: false,
      });

      // ✅ SAVE ONLY AFTER SUCCESS

      navigate("/verification", {
        state: {
          email: formData.email,
          role: role,
          flow: "signup",
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup_content">
      <div className="back_home" onClick={() => navigate("/")}>
        <IoChevronBack />
        <span>Back to Home</span>
      </div>

      <AuthCard
        title="Create a customer"
        subtitle="Create your customer account"
        onSubmit={handleSubmit}
      >
        <div className="name_row">
          <InputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className="error-text">{errors.firstName}</span>
          )}

          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
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
        />
        {errors.email && <span className="error-text">{errors.email}</span>}

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}

        <button className="create_btn">
          {loading ? (
            <>
              Loading...
              <FaSpinner />
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="forgot_password">
          Already have an account?
          <NavLink to="/login">Login</NavLink>
        </p>
      </AuthCard>
    </div>
  );
};

export default Signup;
