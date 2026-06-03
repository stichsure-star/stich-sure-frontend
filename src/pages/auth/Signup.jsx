import { useState } from "react";
import {FcGoogle} from "react-icons/fc";
import InputField from "../../components/reuasbleComponents/InputField";
import AuthCard from "../../components/reuasbleComponents/AuthCard";
import AuthLayout from "../../components/reuasbleComponents/AuthLayout";
import "../../styles/Signup.css"
const Signup = () => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <AuthLayout imageClassName="signup_image_section">
      <AuthCard
        title="Create an account"
        subtitle="Create your account to manage fashion orders, track deliveries and connect with trusted designers."
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

        <button
  className="create_btn"
  type="submit"
>
  Create Account
</button>

<div className="divider">
  <span></span>
  <p>Or</p>
  <span></span>
</div>

<button
  type="button"
  className="google_btn"
>
  <FcGoogle/>
  Continue with Google
</button>





        {/* <div className="divider">
          <span></span>
          <p>Or</p>
          <span></span>
        </div>

        <button
          type="button"
          className="google_btn"
        >
          Continue with Google
        </button> */}

      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;