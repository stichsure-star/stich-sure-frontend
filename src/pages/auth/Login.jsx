import { useState } from "react";
import "../../styles/Login.css";
import { IoChevronBack } from "react-icons/io5";
import InputField from "../../components/reuasbleComponents/InputField";
import AuthCard from "../../components/reuasbleComponents/AuthCard";
import AuthLayout from "../../components/reuasbleComponents/AuthLayout";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    <AuthLayout imageClassName="login_image_section" >
      <div className="login_content">
        <div className="login_header">
          <p className="back_text">
             <IoChevronBack />
               Back
          </p>
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
            Forget password?
          </p>

          <button
            className="create_btn"
            type="submit"
          >
          Login
          </button>

          </AuthCard>
      </div>
    </AuthLayout>
  );
};

export default Login;