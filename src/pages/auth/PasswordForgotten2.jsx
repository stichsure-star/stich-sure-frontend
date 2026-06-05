import { useState } from "react";
// import { Link } from "react-router-dom";

import AuthLayout2 from "../../components/AuthLayout2";
import "../../styles/auth-form2.css"
import "../../styles/forgot-password2.css"

const PasswordForgotten2 = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setError("");

    console.log(email);
  };

  return (
    <AuthLayout2>
      <div className="forgot-password-card">

        {/* <Link to="/login" className="back-link">
          ← Back
        </Link> */}

        <h2 className="auth-form-title">
          Forgot Password?
        </h2>

        <p className="auth-form-subtitle">
          Enter your email address and we'll send
          you a verification code.
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            {error && (
              <span className="error-text">
                {error}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            Send Code
          </button>
        </form>

      </div>
    </AuthLayout2>
  );
};

export default PasswordForgotten2;