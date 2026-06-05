// import { Link } from "react-router-dom";

import AuthLayout2 from "../../components/AuthLayout2";
import "../../styles/auth-form2.css"
import "../../styles/success2.css"

const PasswordReset2 = () => {
  return (
    <AuthLayout2>
      <div className="success-card">

        <div className="success-icon">
          ✅
        </div>

        <h2 className="auth-form-title">
          Password Reset Successful
        </h2>

        <p className="auth-form-subtitle">
          Your password has been updated
          successfully.
        </p>

        {/* <Link to="/login">
          <button className="auth-btn">
            Back to Login
          </button>
        </Link> */}

      </div>
    </AuthLayout2>
  );
};

export default PasswordReset2;