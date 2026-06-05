import { useState } from "react";
// import { Link } from "react-router-dom";

import AuthLayout2 from "../../components/AuthLayout2";
import "../../styles/auth-form2.css"
import "../../styles/login2.css"

const Login2 = () => {
  const [formData, setFormData] = useState({
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

  const validate = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
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
      <div className="login-card">

        {/* <Link to="/" className="back-link">
          ← Back
        </Link> */}

        <h2 className="auth-form-title">
          Welcome Back
        </h2>

        <p className="auth-form-subtitle">
          Login to continue enjoying our services
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="sonayonblessing@gmail.com"
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
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <span className="error-text">
                {errors.password}
              </span>
            )}
          </div>

          {/* <div className="forgot-password">
            <Link to="/forgot-password">
              Forget password?
            </Link>
          </div> */}

          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>
        </form>

      </div>
    </AuthLayout2>
  );
};

export default Login2;