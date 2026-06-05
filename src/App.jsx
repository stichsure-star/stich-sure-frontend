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

// Dashboard
import DashboardLayout from "../src/Layout/DashboardLayout";
import DashboardHome from "../src/pages/Designer/page/DashboardHome";
import Orders from "../src/pages/Designer/page/Orders";
import Products from "../src/pages/Designer/page/Products";
import Register2 from "./pages/auth/Register2";
import Login2 from "./pages/auth/Login2";
import PasswordForgotten2 from "./pages/auth/PasswordForgotten2";
import PasswordReset2 from "./pages/auth/PasswordReset2";
import OtpVerification2 from "./pages/auth/OtpVerification2";

const App = () => {
  return (
    // <>

    // <Register2/>
    // <Login2/>
    // <PasswordForgotten2/>
    // <OtpVerification2/>
    // <PasswordReset2/>
    
    // </>
    <div>
      <BrowserRouter>
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<HomePage />} />
          <Route path="/designers" element={<Designerspage />} />
          <Route path="/features" element={<Featurepage />} />
          <Route path="/getstarted" element={<StartedPage />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/setpassword" element={<SetPassword />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verification" element={<Verification />} />

          {/* ================= DASHBOARD (NEW) ================= */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
