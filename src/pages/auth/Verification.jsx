import { useState, useEffect, useRef } from "react";
import { IoChevronBack } from "react-icons/io5";
import AuthCard from "../../components/reuasbleComponents/AuthCard";
import "../../styles/Verification.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom"; // Added hooks here

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Allows us to read the background data passed from Signup

  const [codeArray, setCodeArray] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Safely capture the role payload from navigation history. Fall back to "user" if blank.
  const userRole = location.state?.role || "user";

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...codeArray];
    newCode[index] = value.slice(-1);
    setCodeArray(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!codeArray[index] && index > 0) {
        const newCode = [...codeArray];
        newCode[index - 1] = "";
        setCodeArray(newCode);
        inputRefs.current[index - 1].focus();
      } else {
        const newCode = [...codeArray];
        newCode[index] = "";
        setCodeArray(newCode);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setCodeArray(digits);
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = (e) => {
    // If your AuthCard component executes form submissions natively,
    // it will trigger this function perfectly.
    if (e && e.preventDefault) e.preventDefault();

    const finalCode = codeArray.join("");

    if (finalCode.length < 6) {
      alert("Please enter all 6 digits.");
      return;
    }

    console.log(`Verifying Code ${finalCode} for role profile:`, userRole);

    // Dynamic routing path based on the user's role profile
    if (userRole === "designer") {
      // Designers proceed straight to their professional verification/KYC setup
      // navigate("/designerverification");
      navigate("/designerVerified");

    } else {
      // Regular users/customers proceed straight to their standard hub dashboard
      navigate("/user/dashboard");
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(59);
    setCanResend(false);
    setCodeArray(Array(6).fill(""));
    inputRefs.current[0].focus();
  };

  return (
    <div className="verify_content">
      <div className="verify_header">
        {/* Added a dynamic backward step link back to signup if they want to escape */}
        <NavLink
          to="/signup"
          className="back_text_link"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <p className="back_text">
            <IoChevronBack />
            Back
          </p>
        </NavLink>
      </div>
      <AuthCard
        title="Enter verification code"
        subtitle={
          <>
            Verification code has been sent to your email <br />
            <strong>Johnwick@gmail.com</strong>
          </>
        }
        buttonText="Continue"
        onSubmit={handleSubmit}
      >
        <div className="otp_container" onPaste={handlePaste}>
          <label className="otp_label">Verification Code</label>

          <div className="otp_inputs">
            {codeArray.map((digit, index) => (
              <input
                key={index}
                type="text"
                name={`code-${index}`}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength={1}
                inputMode="numeric"
                placeholder="-"
                className="otp_input"
              />
            ))}
          </div>
        </div>

        <p className="resend_text">
          {canResend ? (
            <span onClick={handleResend} style={{ cursor: "pointer" }}>
              Resend code
            </span>
          ) : (
            `Resend after ${timer} seconds`
          )}
        </p>

        {/* CRITICAL FIX: Removed the <NavLink to="/user/dashboard"> wrapper from here.
            The submit handler above handles navigation securely via navigate() instead. */}
        <button className="create_btn" type="submit" onClick={handleSubmit}>
          Continue
        </button>
      </AuthCard>
    </div>
  );
};

export default VerifyCode;
