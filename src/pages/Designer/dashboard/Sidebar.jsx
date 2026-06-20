import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { GoHome } from "react-icons/go";
import { RiImageAddLine } from "react-icons/ri";
import { GoCreditCard } from "react-icons/go";
import { PiHandshakeLight } from "react-icons/pi";
import { IoStarOutline } from "react-icons/io5";
import { IoShirtOutline, IoSettingsOutline } from "react-icons/io5";
import { IoCubeOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { logout } from "../../../global/authSlice";
import { useDispatch } from "react-redux";
import { authApi } from "../../../config/auth";

const Sidebar = ({ onClose = () => {} }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isSettings =
    location.pathname.startsWith("/designer/setting") ||
    location.pathname.startsWith("/designer/security") ||
    location.pathname.startsWith("/designer/payment");

  const handleLogout = async () => {
    try {
      await authApi.logoutUser();

      dispatch(logout());

      window.location.href = "/login";
    } catch (error) {
      console.log(error);

      dispatch(logout());
      window.location.href = "/login";
    }
  };

  return (
    <aside className="sidebar">
      <div className="menu">
        {/* SETTINGS MENU */}
        {isSettings ? (
          <>
            <NavLink to="/designer/setting" className="link" onClick={onClose}>
              Profile Settings
            </NavLink>

            <NavLink to="/designer/security" className="link" onClick={onClose}>
              Security
            </NavLink>

            <NavLink to="/designer/payment" className="link" onClick={onClose}>
              Billing
            </NavLink>
            <NavLink
              to="/designer/dashboard"
              className="link"
              onClick={onClose}
            >
              Back to dashboard
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/designer/dashboard"
              className="link"
              onClick={onClose}
            >
              <GoHome className="trd" />
              Dashboard
            </NavLink>

            <NavLink to="/designer/uploadedcatlog" className="link" onClick={onClose}>
              <RiImageAddLine className="trd" />
              My Designs
            </NavLink>

            <NavLink to="/designer/active" className="link" onClick={onClose}>
              <IoCubeOutline className="trd" />
              Active Orders
            </NavLink>

            <NavLink to="/designer/earning" className="link" onClick={onClose}>
              <GoCreditCard className="trd" />
              Earnings & Wallet
            </NavLink>

            <NavLink
              to="/designer/collaboration"
              className="link"
              onClick={onClose}
            >
              <PiHandshakeLight className="trd" />
              Collaboration
            </NavLink>

            <NavLink to="/designer/ratings" className="link" onClick={onClose}>
              <IoStarOutline className="trd" />
              Ratings
            </NavLink>

            <NavLink
              to="/designer/templates"
              className="link"
              onClick={onClose}
            >
              <IoShirtOutline className="trd" />
              Templates
            </NavLink>

            <NavLink to="/designer/setting" className="link" onClick={onClose}>
              <IoSettingsOutline className="trd" />
              Settings
            </NavLink>
          </>
        )}
      </div>

      <div className="logout">
        <button className="logoutBtn" onClick={handleLogout}>
          <MdLogout className="trd" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
