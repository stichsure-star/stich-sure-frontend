import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Designerspage from "./pages/Designerspage";
import ForgetPassword from "./pages/auth/ForgetPassword";
import DesignerVerification from "./components/DesignerVerification";
import IdentityDesignerPage from "./pages/kyc/IdentityDesignerPage";
import InformationDesigner from "./pages/kyc/InformationDesigner";
import WalletDesigner from "./pages/kyc/WalletDesigner";
import ProfilePage from "./pages/kyc/ProfilePage";
import Featurepage from "./pages/Featurepage ";
import StartedPage from "./pages/StartedPage";
import OrderDetails from "./components/OrderDetails";
import OrderTracker from "./pages/Designer/page/Ordertrackerpage";
import DashboardLayout from "../src/Layout/DashboardLayout";
import DashboardHome from "../src/pages/Designer/page/DashboardHome";
import Orders from "../src/pages/Designer/page/Orders";
import Products from "../src/pages/Designer/page/Products";
import Register2 from "./pages/auth/Register2";
import Login2 from "./pages/auth/Login2";
import PasswordForgotten2 from "./pages/auth/PasswordForgotten2";
import PasswordReset2 from "./pages/auth/PasswordReset2";
import OtpVerification2 from "./pages/auth/OtpVerification2";
import SuccessfulDesignerPage from "./pages/kyc/SuccessfulDesignerPage";
import Upload from "../src/pages/Designer/page/Upload";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/designers" element={<Designerspage />} />
          <Route path="/features" element={<Featurepage />} />
          <Route path="/getstarted" element={<StartedPage />} />
          <Route
            path="/designerverification"
            element={<DesignerVerification />}
          />
          <Route path="/identitydesigner" element={<IdentityDesignerPage />} />
          <Route
            path="/informationdesigner"
            element={<InformationDesigner />}
          />
          <Route path="/walletdesigner" element={<WalletDesigner />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/orderdetails" element={<OrderDetails />} />

          {/* AUTH */}
          <Route path="/login" element={<Login2 />} />
          <Route path="/setpassword" element={<PasswordReset2 />} />
          <Route path="/forgetpassword" element={<PasswordForgotten2 />} />
          <Route path="/signup" element={<Register2 />} />
          <Route path="/verification" element={<OtpVerification2 />} />
          <Route path="/successfull" element={<SuccessfulDesignerPage />} />

          {/* ================= DASHBOARD (NEW) ================= */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/ordertracker" element={<OrderTracker />} />
            <Route path="/upload" element={<Upload />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
