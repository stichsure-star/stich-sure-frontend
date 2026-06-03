import signupImage from "../../assets/faith/signup-image.jpg"
import "../../styles/AuthLayout.css"
const AuthLayout = ({ children, imageClassName = "" }) => {
  return (
    <div className="auth_container">
      <div className="auth_wrapper">

        <div className={`image_section ${imageClassName}`}>
          <img
            src={signupImage}
            alt="signup"
          />
        </div>

        <div className="form_section">
          {children}
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;