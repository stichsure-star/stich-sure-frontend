import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Updated imports

// Page & Component Imports
import HomePage from "./pages/HomePage";
import Designerspage from "./pages/Designerspage";
import ForgetPassword from "./pages/auth/ForgetPassword";
import DesignerVerification from "./components/DesignerVerification";
import IdentityDesignerPage from "../src/pages/kyc/IdentityDesignerPage";
import InformationDesigner from "./pages/kyc/InformationDesigner";
import WalletDesigner from "./pages/kyc/WalletDesigner";
import ProfilePage from "./pages/kyc/ProfilePage";
import Featurepage from "./pages/Featurepage ";
import StartedPage from "./pages/StartedPage";
import OrderDetails from "./components/OrderDetails";
import OrderTracker from "./pages/Designer/page/Ordertrackerpage";
import DashboardLayout from "../src/Layout/DashboardLayout";
import DashboardHome from "../src/pages/Designer/page/DashboardHome";
import UserLayout from "../src/Layout/UserLayout";
import Orders from "../src/pages/Designer/page/Orders";
import Products from "../src/pages/Designer/page/Products";
import Register2 from "./pages/auth/Register2";
import Login2 from "./pages/auth/Login2";
import PasswordForgotten2 from "./pages/auth/PasswordForgotten2";
import PasswordReset2 from "./pages/auth/PasswordReset2";
import OtpVerification2 from "./pages/auth/OtpVerification2";
import SuccessfulDesignerPage from "./pages/kyc/SuccessfulDesignerPage";
import Upload from "../src/pages/Designer/page/Upload";
import HomeLayout from "./Layout/HomeLayout";
import UserDashboard from "./pages/User/page/UserDashboard";
import MyOrders from "./pages/User/page/MyOrders";
import BrowseDesigners from "./pages/User/page/BrowseDesigners";
import BrowseDesign from "./pages/User/page/BrowseDesign";
import SavedDesigners from "./pages/User/page/SavedDesigners";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SetPassword from "./pages/auth/SetPassword";
import Verification from "./pages/auth/Verification";
import AuthLayout from "./components/AuthLayout";
import DesignerProfile from "./pages/Designer/profile/DesignerProfile";
import DesignerSecurity from "./pages/Designer/profile/DesignerSecurity";
import DesignerPayment from "./pages/Designer/profile/DesignerPayment";

// 1. Define your router layout and configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomePage /> }, // Replaced 'index' prop with 'index: true'
      { path: "designers", element: <Designerspage /> },
      { path: "features", element: <Featurepage /> },
      { path: "getstarted", element: <StartedPage /> },
      { path: "designerverification", element: <DesignerVerification /> },
      { path: "identitydesigner", element: <IdentityDesignerPage /> },
      { path: "informationdesigner", element: <InformationDesigner /> },
      { path: "walletdesigner", element: <WalletDesigner /> },
      { path: "profilepage", element: <ProfilePage /> },
      { path: "orderdetails", element: <OrderDetails /> },
      { path: "/successfull", element: <SuccessfulDesignerPage /> },
    ],
  },

  ,
  /* AUTH ROUTES */
  // { path: "/login", element: <Login2 /> },
  // { path: "/setpassword", element: <PasswordReset2 /> },
  // { path: "/forgetpassword", element: <PasswordForgotten2 /> },
  // { path: "/signup", element: <Register2 /> },
  // { path: "/verification", element: <OtpVerification2 /> },
  /* DASHBOARD ROUTES (Pathless Layout Route) */
  {
    path: "/designer",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <DashboardHome /> },
      { path: "products", element: <Products /> },
      { path: "orders", element: <Orders /> },
      { path: "ordertracker", element: <OrderTracker /> },
      { path: "upload", element: <Upload /> },
      { path: "designerprofile", element: <DesignerProfile /> },
      { path: "designersecurity", element: <DesignerSecurity /> },
      { path: "designerpayment", element: <DesignerPayment /> },





    ],
  },

  /* ==========================================================================
     2. AUTH ROUTES (Separated to pass specific layout image classes)
     ========================================================================== */
  {
    element: <AuthLayout imageClassName="login_image_section" />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    element: <AuthLayout imageClassName="signup_image_section" />,
    children: [{ path: "/signup", element: <Signup /> }],
  },
  {
    element: <AuthLayout imageClassName="forgot_image_section" />,
    children: [{ path: "/forgetpassword", element: <ForgetPassword /> }],
  },
  {
    element: <AuthLayout imageClassName="setpassword_image_section" />,
    children: [{ path: "/setpassword", element: <SetPassword /> }],
  },
  {
    element: <AuthLayout imageClassName="forgot_image_section" />,
    children: [{ path: "/verification", element: <Verification /> }],
  },

  {
    path: "/user",
    element: <UserLayout />,
    children: [
      { path: "dashboard", element: <UserDashboard /> },
      { path: "myorders", element: <MyOrders /> },
      { path: "browsedesigners", element: <BrowseDesigners /> },
      { path: "browsedesigns", element: <BrowseDesign /> },
      { path: "saveddesigners", element: <SavedDesigners /> },
    ],
  },
]);

// 2. Render the RouterProvider with the defined configuration
const App = () => {

  return <RouterProvider router={router} />;
};

export default App;
