import { Outlet } from "react-router-dom";
import signupImage from "../assets/faith/signup-image.jpg";
import "../styles/AuthLayout.css";

const AuthLayout = ({ imageClassName = "" }) => {
  return (
    <div className="auth_container">
      <div className="auth_wrapper">
        <div className={`image_section ${imageClassName}`}>
          <div className="layout_image_holder">
            <img src={signupImage} alt="Authentication background" />
          </div>
        </div>

        <div className="form_section">
          <div className="form_container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
