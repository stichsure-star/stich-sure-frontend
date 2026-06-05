import AuthImage2 from "./AuthImage2";
import AuthCard2 from "./AuthCard2";
import "../styles/auth-layout2.css"

const AuthLayout2 = ({ children }) => {
  return (
    <div className="auth-page">
      <div className="auth-layout">
        <AuthImage2 />
        
         <AuthCard2>
            {children}
        </AuthCard2>

      </div>
    </div>
  );
};

export default AuthLayout2;