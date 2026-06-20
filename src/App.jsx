import React from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom"; // Updated imports
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
import Tracker from "./components/Tracker";
import DashboardLayout from "../src/Layout/DashboardLayout";
import DashboardHome from "./pages/Designer/page/DashboardHome";
import UserLayout from "../src/Layout/UserLayout";
import Orders from "./pages/Designer/page/Relaibiy";
import Products from "../src/pages/Designer/page/Products";

import SuccessfulDesignerPage from "./pages/kyc/SuccessfulDesignerPage";
import Upload from "../src/pages/Designer/page/Upload";
import DesignersGrid from "./components/DesignersGrid";
import RateDesigner from "../src/components/RateDesigner";
import ActiveOrderTracker from "./components/ActiveOrderTracker";
import DesignersCatalog from "../src/components/DesignersCatalog";
import HomeLayout from "./Layout/HomeLayout";
import UserDashboard from "./pages/User/page/UserDashboard";
import MyOrders from "./pages/User/page/MyOrders";
import BrowseDesigners from "./pages/User/page/BrowseDesigners";
import BrowseDesign from "./pages/User/page/BrowseDesign";
import SavedDesigners from "./pages/User/page/SavedDesigners";
import Login from "./pages/auth/customer/Login";

import Signup2 from "./pages/auth/customer/Signup";
import SetPassword from "./pages/auth/SetPassword";
import Verification from "./pages/auth/Verification";
import AuthLayout from "./components/AuthLayout";
import DesignerDirectory from "./components/DesignerDirectory";
import DesignerProfile from "./pages/Designer/profile/DesignerProfile";
import DesignerSecurity from "./pages/Designer/profile/DesignerSecurity";
import DesignerPayment from "./pages/Designer/profile/DesignerPayment";
import Earning from "./pages/Designer/page/Earning";
import CollaborationPage from "./pages/Designer/page/Collaboration";
import Relaibiy from "./pages/Designer/page/Relaibiy";
import CustomerProfile from "./pages/User/profile/CustomerProfile";
import CustomerSecurity from "./pages/User/profile/CustomerSecurity";
import DesignerIsVerifiedSuccessfullyPage from "./pages/kyc/DesignerIsVerifiedSuccessfullyPage";
import Template from "./pages/Designer/page/Template";
import Setting from "./pages/Designer/page/Setting";
import Try from "./pages/Designer/page/Try";
import ActiveOrder from "./pages/Designer/page/Active";
import NotFound from "./components/NotFound";
import CheckoutPage from "./paymentInStich-sure/CheckOutPage";
import Login3 from "./pages/auth/customer/Login";
import RatingAdebayor from "./components/RatingAdebayor";
import DanDesignerProfile from "./components/DanDesignerProfile";
import requiredetails from "../src/components/RequestDetails";
import RequestDetails from "../src/components/RequestDetails";
import WithdrawFunds from "../src/popups/WithdrawFunds";
import WithdrawalSuccessful from "../src/popups/WithdrawalSuccessful";
import Warning from "../src/popups/Warning";
import SavedChanges from "../src/popups/SavedChanges";
import RequestSent from "../src/popups/RequestSent";
import ProposalSent from "../src/popups/ProposalSent";
import ProductionIsDone from "../src/popups/ProductionIsDone";
import DesignPublished from "../src/popups/DesignPublished";
import AddedRatings from "../src/popups/AddedRatings ";
import PaymentSuccessful from "../src/pages/kyc/PaymentSuccessful";
import Signup from "./pages/auth/customer/Signup";
import CustomerSignup from "./pages/auth/customer/CustomerSignup";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import GoogleSuccess from "./pages/auth/GoogleSuccess";
import CheckoutPayment from "./paymentInStich-sure/CheckoutPayment";
import Settings from "./pages/User/page/Settings";
import SendCollaborationRequest from "./pages/Designer/components/SendCollaborationRequest";
import CollaborationRequestPage from "./pages/Designer/page/CollaborationRequestPage";
import Ordertrackerpage from "./pages/Designer/page/Ordertrackerpage";
import MvpPage from "./pages/Designer/page/MvpPage";
import DesignersUploadCatlog from "./components/DesignersUploadCatlog";
import DesignerUploadedDesigners from "./pages/Designer/page/DesignerUploadedDesigners";

// active order renders ordertrackerpage => which shows ordertracker component for designer/dashboard
// user stores tracker,

// 1. Define your router layout and configuration
const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomePage /> }, // Replaced 'index' prop with 'index: true'
      { path: "designers", element: <Designerspage /> },
      { path: "features", element: <Featurepage /> },
      { path: "getstarted", element: <StartedPage /> },

      { path: "profilepage", element: <ProfilePage /> },
      { path: "orderdetails", element: <OrderDetails /> },
      { path: "profilepage", element: <ProfilePage /> },
      // { path: "orderdetails", element: <OrderDetails /> },

      { path: "/successfulpayment", element: <PaymentSuccessful /> },

      { path: "/checkoutpayment", element: <CheckoutPayment /> },
      { path: "informationdesigner", element: <InformationDesigner /> },
      { path: "designerverification", element: <DesignerVerification /> },
      { path: "identitydesigner", element: <IdentityDesignerPage /> },
      { path: "successfull", element: <SuccessfulDesignerPage /> },
      {
        path: "/designerVerified",
        element: <DesignerIsVerifiedSuccessfullyPage />,
      },

      { path: "/successfulpayment", element: <PaymentSuccessful /> },

      { path: "/checkoutpayment", element: <CheckoutPayment /> },
      { path: "walletdesigner", element: <WalletDesigner /> },
    ],
  },

  {
    path: "/designer",
    element: <ProtectedRoutes role="designer" />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <DashboardHome /> },
          { path: "products", element: <Products /> },
          { path: "orders", element: <Orders /> },
          { path: "tracker", element: <Tracker /> },
          { path: "upload", element: <Upload /> },
          { path: "uploadedcatlog", element: <DesignersUploadCatlog /> },

          { path: "designersupload", element: <DesignerUploadedDesigners /> },
          { path: "earning", element: <Earning /> },
          { path: "collaboration", element: <CollaborationPage /> },
          { path: "profileonMount", element: <DesignerDirectory /> },
          { path: "designerpage", element: <Designerspage /> },
          { path: "send-request", element: <CollaborationRequestPage /> },

          { path: "ratings", element: <Relaibiy /> },
          { path: "templates", element: <Template /> },
          { path: "setting", element: <Setting /> },
          { path: "active", element: <ActiveOrder /> },
          { path: "order-tracking", element: <Ordertrackerpage /> },

          { path: "profile", element: <DesignerProfile /> },
          { path: "payment", element: <DesignerPayment /> },
          { path: "security", element: <DesignerSecurity /> },
          { path: "withdraw", element: <WithdrawFunds /> },
          { path: "withdraw-successful", element: <WithdrawalSuccessful /> },
          { path: "warning", element: <Warning /> },
          { path: "saved-changes", element: <SavedChanges /> },
          { path: "request-sent", element: <RequestSent /> },
          { path: "proposal", element: <ProposalSent /> },
          { path: "production", element: <ProductionIsDone /> },
          { path: "published", element: <DesignPublished /> },
          { path: "ratings", element: <AddedRatings /> },
          { path: "mvp", element: <MvpPage /> },
        ],
      },
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
  // Customer
  {
    element: <AuthLayout imageClassName="signup_image_section" />,
    children: [{ path: "/customersignup", element: <CustomerSignup /> }],
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

  <Route path="/auth/google/callback" element={<GoogleSuccess />} />,

  {
    path: "/user",
    element: <ProtectedRoutes role="customer" />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { path: "dashboard", element: <UserDashboard /> },
          { path: "myorders", element: <MyOrders /> },
          { path: "browsedesigners", element: <BrowseDesigners /> },
          { path: "browsedesigns", element: <BrowseDesign /> },
          { path: "saveddesigners", element: <SavedDesigners /> },
          { path: "designerscatalog", element: <DesignersCatalog /> },
          { path: "des", element: <RateDesigner /> },
          { path: "customer-profile", element: <CustomerProfile /> },
          { path: "customer-security", element: <CustomerSecurity /> },
          { path: `requiredetails/:id`, element: <RequestDetails /> },

          // { path: "rating-adebayor",   element: <RatingAdebayor /> },
          { path: `designer-profile/:id`, element: <DanDesignerProfile /> },
          { path: "setting", element: <Settings /> },
          { path: "checkout", element: <CheckoutPage /> },
          { path: "checkout/:id", element: <CheckoutPage /> },
        ],
      },
    ],
  },
]);

// 2. Render the RouterProvider with the defined configuration
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
