import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Designerspage from "./pages/Designerspage";
import Signp from "./pages/auth/Signup"
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
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />


         
          <Route path="/designers" element={<Designerspage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
