import { useState } from "react";
import "../../../styles/Login.css";
import { IoChevronBack } from "react-icons/io5";
import { FaRegDotCircle } from "react-icons/fa";
import InputField from "../../../components/reuasbleComponents/InputField";
import AuthCard from "../../../components/reuasbleComponents/AuthCard";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState("customer");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="login_content">
      <div className="login_header">
        <p className="back_text">
          <IoChevronBack />
          Back
        </p>
      </div>

    <div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  }}
>
  <button
    onClick={() => setRole("designer")}
    style={{
      padding: "10px 20px",
      border: "1px solid #8B0000",
      borderRadius: "20px",
      backgroundColor: role === "designer" ? "#8B0000" : "white",
      color: role === "designer" ? "white" : "#8B0000",
      cursor: "pointer",
    }}
  >
    Login as Designer
  </button>

  <button
    onClick={() => setRole("customer")}
    style={{
      padding: "10px 20px",
      border: "1px solid #8B0000",
      borderRadius: "20px",
      backgroundColor: role === "customer" ? "#8B0000" : "white",
      color: role === "customer" ? "white" : "#8B0000",
      cursor: "pointer",
    }}
  >
    Login as Customer
  </button>
</div>
      <AuthCard
        title="Welcome Back"
        subtitle="Login to continue enjoying our services"
        buttonText="Login"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your  email"
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your  password"
        />

        <p className="forgot_password">
          <NavLink to="/forgetpassword" className="NavLinked">
            Forgot Password?
          </NavLink>
        </p>

        <NavLink to="/user/dashboard" className="NavLinked">
          <button className="create_btn" type="submit">
            Login
          </button>
        </NavLink>

        <p className="forgot_password">
          Don't have an account?
          <NavLink to="/signup" className="NavLinked">
            Sign Up
          </NavLink>
        </p>
      </AuthCard>
    </div>
  );
};

export default Login;
