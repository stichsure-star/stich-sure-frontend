import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoChevronBack } from "react-icons/io5";
import InputField from "../../../components/reuasbleComponents/InputField";
import AuthCard from "../../../components/reuasbleComponents/AuthCard";
import "../../../styles/Signup.css"
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting registration data:", formData);

    navigate("/verification");
  };

  return (
    <div className="signup_content">
    <div className="back_home" onClick={() => navigate("/")}>
      <IoChevronBack />
      <span>Back to Home</span>
   
    </div>
      <AuthCard
        title="Create a customer "
        subtitle="Create your customer designer account to receive orders, manage deliveries and grow your fashion business."
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

          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            error={errors.lastName}
          />
        </div>

        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email"
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          error={errors.password}
        />

        <button className="create_btn" type="submit">
          Create Account
        </button>

        <p className="forgot_password">
          Already have an account?
          <NavLink to="/login" className="NavLinked">
            Login your customer account
          </NavLink>
        </p>

        <div className="divider">
          <span></span>
          <p>Or</p>
          <span></span>
        </div>

        <button type="button" className="google_btn">
          <FcGoogle />
          Continue with Google
        </button>
      </AuthCard>
    </div>
  );
};

export default Signup;