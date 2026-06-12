import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const role = params.get("role");
    const user = params.get("user");

    if (token) {
      localStorage.setItem("token", token);

      if (user) {
        localStorage.setItem("user", user);
      }

      if (role === "designer") {
        navigate("/designer/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Signing you in with Google...</div>;
};

export default GoogleSuccess;
