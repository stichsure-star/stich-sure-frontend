import { useState } from "react";
// import { Link } from "react-router-dom";

import AuthLayout2 from "../../components/AuthLayout2";
import "../../styles/auth-form2.css"
import "../../styles/register2.css"

const Register2 = ({ userType = "designer" }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log(formData);
  };

  return (
    <AuthLayout2>
      {/* <AuthImage2 /> */}

        <div className="register-card">
          <h2 className="auth-form-title">Create an account</h2>

          <p className="auth-form-subtitle">
            Register as a {userType} and start using StitchSuite.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />

                {errors.firstName && (
                  <span className="error-text">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Last Name</label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />

                {errors.lastName && (
                  <span className="error-text">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              {errors.email && (
                <span className="error-text">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              {errors.phone && (
                <span className="error-text">
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              {errors.password && (
                <span className="error-text">
                  {errors.password}
                </span>
              )}
            </div>

            <button type="submit" className="auth-btn">
              Create Account
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button className="google-btn">
            Continue with Google
          </button>

          {/* <div className="register-footer">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </div> */}
        </div>
    </AuthLayout2>
  );
};

export default Register2;