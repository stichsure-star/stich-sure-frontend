import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Designerspage from "./pages/Designerspage";
// import Signp from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import ForgetPassword from "./pages/auth/ForgetPassword"
import SetPassword from "./pages/auth/SetPassword"
import Verification from "./pages/auth/Verification"
import Signup from "./pages/auth/Signup";
import DesignerVerification from "./components/DesignerVerification";
import IdentityDesignerPage from "./pages/kyc/IdentityDesignerPage";
import InformationDesigner from "./pages/kyc/InformationDesigner";
import WalletDesigner from "./pages/kyc/WalletDesigner";
import ProfilePage from "./pages/kyc/ProfilePage";
import Featurepage from "./pages/Featurepage ";
import StartedPage from "./pages/StartedPage";
// import Login from "./pages/auth/Login";
// import SetPassword from "./pages/auth/SetPassword";
// import ForgetPassword from "./pages/auth/ForgetPassword";
// import Signup from "./pages/auth/Signup";
// import Verification from "./pages/auth/Verification";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/designers" element={<Designerspage />} />
          <Route path="/features" element={<Featurepage />} />
          <Route path="/getstarted" element={<StartedPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setpassword" element={<SetPassword />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verification" element={<Verification />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
