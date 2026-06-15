import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../../Designer/dashboard/Sidebar.css";
import { GoHome } from "react-icons/go";
import { RiImageAddLine } from "react-icons/ri";
import { GoCreditCard } from "react-icons/go";
import { PiHandshakeLight } from "react-icons/pi";
import { IoStarOutline } from "react-icons/io5";
import { IoShirtOutline, IoSettingsOutline } from "react-icons/io5";
import { IoCubeOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { ApiClient } from "../../../config/AxiosInstance";
import { logout } from "../../../global/authSlice";
import { useDispatch } from "react-redux";
import { authApi } from "../../../config/auth";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isSettings =
    location.pathname.startsWith("/user/customer-profile") ||
    location.pathname.startsWith("/user/customer-security") ||
    location.pathname.startsWith("/user/setting");

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
            <NavLink to="/user/customer-profile" className="link">
              Profile Settings
            </NavLink>

            <NavLink to="/user/customer-security" className="link">
              Security
            </NavLink>

            <NavLink to="/user/dashboard" className="link">
              Back to dashboard
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/user/dashboard" className="link">
              <GoHome className="trd" />
              Dashboard
            </NavLink>

            <NavLink to="/user/browsedesigners" className="link">
              <RiImageAddLine className="trd" />
              Browse Designers
            </NavLink>

            <NavLink to="/user/browsedesigns" className="link">
              <IoIosNotificationsOutline className="trd" />
              Browse Designs
            </NavLink>

            <NavLink to="/user/myorders" className="link">
              <GoCreditCard className="trd" />
              My Orders
            </NavLink>

            <NavLink to="/user/saveddesigners" className="link">
              <PiHandshakeLight className="trd" />
              Saved Designers
            </NavLink>

            <NavLink to="/user/setting" className="link">
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
