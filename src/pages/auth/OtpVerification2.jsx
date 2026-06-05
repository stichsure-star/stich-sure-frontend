import { useState } from "react";
// import { Link } from "react-router-dom";

import AuthLayout2 from "../../components/AuthLayout2";
import "../../styles/auth-form2.css"
import "../../styles/otp2.css"

const OtpVerification2 = () => {
  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
  ]);

  const handleChange = (value, index) => {
    const updatedOtp = [...otp];

    updatedOtp[index] = value;

    setOtp(updatedOtp);
  };

  return (
    <AuthLayout2>
      <div className="otp-card">

        {/* <Link to="/forgot-password" className="back-link">
          ← Back
        </Link> */}

        <h2 className="auth-form-title">
          OTP Verification
        </h2>

        <p className="auth-form-subtitle">
          Enter the 4-digit code sent to
          your email address.
        </p>

        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  index
                )
              }
            />
          ))}
        </div>

        <button className="auth-btn">
          Verify
        </button>

      </div>
    </AuthLayout2>
  );
};

export default OtpVerification2;