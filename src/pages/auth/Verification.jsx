import { useState, useEffect, useRef } from "react";
import { IoChevronBack } from "react-icons/io5";
import AuthCard from "../../components/reuasbleComponents/AuthCard";
import "../../styles/Verification.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { authApi } from "../../config/auth";
import Swal from "sweetalert2";

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || sessionStorage.getItem("otp_email");

  const role = location.state?.role || sessionStorage.getItem("otp_role");

  const flow =
    location.state?.flow || sessionStorage.getItem("otp_flow") || "signup";

  // ================= STATE =================
  const [codeArray, setCodeArray] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // ================= INPUT HANDLERS =================
  const handleChange = (value, index) => {
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...codeArray];
    newCode[index] = value.slice(-1);
    setCodeArray(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...codeArray];

      if (!codeArray[index] && index > 0) {
        newCode[index - 1] = "";
        setCodeArray(newCode);
        inputRefs.current[index - 1]?.focus();
      } else {
        newCode[index] = "";
        setCodeArray(newCode);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pastedData)) {
      setCodeArray(pastedData.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  // ================= VERIFY OTP =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const otp = codeArray.join("");

    if (otp.length !== 6) {
      return Swal.fire({
        icon: "warning",
        title: "Incomplete OTP",
      });
    }

    if (!email) {
      return Swal.fire({
        icon: "error",
        title: "Missing email",
        text: "Please restart the process",
      });
    }

    try {
      setIsVerifying(true);
      // ================= FORGOT PASSWORD FLOW =================
      if (flow === "forgot-password") {
        await authApi.verifyOtp(role, { email, otp });

        Swal.fire({
          icon: "success",
          title: "Verified",
          timer: 1500,
          showConfirmButton: false,
        });

        // cleanup
        sessionStorage.removeItem("otp_email");
        sessionStorage.removeItem("otp_role");
        sessionStorage.removeItem("otp_flow");

        return navigate("/setpassword", { state: { email, role } });
      }

      // ================= SIGNUP FLOW =================
      await authApi.verifyOtp(role, { email, otp });

      Swal.fire({
        icon: "success",
        title: "Account Verified",
        timer: 1500,
        showConfirmButton: false,
      });

      // cleanup
      sessionStorage.removeItem("otp_email");
      sessionStorage.removeItem("otp_role");
      sessionStorage.removeItem("otp_flow");

      return navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification failed",
        text: error.response?.data?.message || "Invalid OTP",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // ================= RESEND OTP =================
  const handleResend = async () => {
    setCanResend(false);
setTimer(300);

    if (timer > 0 || isResending) return;

    try {
      await authApi.resendOtp(role, { email });

      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        timer: 1500,
        showConfirmButton: false,
      });

      setCodeArray(Array(6).fill(""));
      setCanResend(false);
       setTimer(300);


    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message,
      });
      } finally {
        setIsResending(false);
    }
  };

  return (
    <div className="verify_content">
      <div className="verify_header">
        <NavLink to="/" className="back_text_link">
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
            Verification code sent to <br />
            <strong>{email}</strong>
          </>
        }
        onSubmit={handleSubmit}
      >
        <div className="otp_inputs" onPaste={handlePaste}>
          {codeArray.map((digit, index) => (
            <input
              key={index}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength={1}
              inputMode="numeric"
              className="otp_input"
            />
          ))}
        </div>

        <p className="resend_text">
          {canResend ? (
            <span
            className={`resend_btn ${isResending ? "disabled" : ""}`}
             onClick={handleResend}
             >
              {isResending ? "Sending..." : "Resend Code"}
              Resend code
            </span>
          ) : (
            `Resend after ${formatTime(timer)}`
          )}
        </p>

        <button
         type="submit"
          className="create_btn"
          disabled={isVerifying}
          >
          {isVerifying ? "Verifying..." : "Continue"}
        </button>
      </AuthCard>
    </div>
  );
};

export default VerifyCode;
