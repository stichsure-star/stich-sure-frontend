import { useState } from "react";
import "../../styles/ForgetPassword.css";
import { NavLink } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import InputField from "../../components/reuasbleComponents/InputField";
import AuthCard from "../../components/reuasbleComponents/AuthCard";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    identifier: "", // email or phone number
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Forgot Password Request:", formData);

    // later: send to backend
    // axios.post(`${BaseURL}/auth/forgot-password`, formData)
  };

  return (
    <div className="forgot_content">
      <div className="forgot_header">
        <p className="back_text">
          <IoChevronBack />
          Back
        </p>
      </div>
      <AuthCard
        title="Forgot your password?"
        subtitle="Enter the email or phone number associated with your account and we will send you a verification code to reset your password"
        buttonText="Continue"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Email / Phone Number"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          placeholder="Enter email or phone number"
        />

        <button className="create_btn" type="submit">
          <NavLink to="/verification" className="NavLink">
            Create Account
          </NavLink>
        </button>
      </AuthCard>
    </div>
  );
};

export default ForgotPassword;
