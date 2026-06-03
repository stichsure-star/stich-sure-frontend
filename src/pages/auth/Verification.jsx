import { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import InputField from "../../components/reuasbleComponents/InputField";
import AuthCard from "../../components/reuasbleComponents/AuthCard";
import AuthLayout from "../../components/reuasbleComponents/AuthLayout";
import "../../styles/Verification.css"





const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Verification Code:", code);

    // later:
    // axios.post(`${BaseURL}/auth/verify-code`, { code })
  };

  const handleResend = () => {
    if (!canResend) return;

    console.log("Resending code...");

    setTimer(59);
    setCanResend(false);

    // later:
    // axios.post(`${BaseURL}/auth/resend-code`)
  };

  return (
    <AuthLayout imageClassName="verification_image_section">
      <p className="back_text">
  <IoChevronBack />
  Back
</p>
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
        <InputField
          label="Verification Code"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
        />

        <p className="resend_text">
          {canResend ? (
            <span onClick={handleResend} style={{ cursor: "pointer" }}>
              Resend code
            </span>
          ) : (
            `Resend after ${timer} seconds`
          )}
        </p>
          <button
  className="create_btn"
  type="submit"
>
  Continue
</button>



        
      </AuthCard>
    </AuthLayout>
  );
};

export default VerifyCode;