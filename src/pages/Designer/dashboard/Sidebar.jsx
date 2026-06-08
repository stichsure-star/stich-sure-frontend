import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { GoHome } from "react-icons/go";
import { RiImageAddLine } from "react-icons/ri";
import { GoCreditCard } from "react-icons/go";
import { PiHandshakeLight } from "react-icons/pi";
import { IoStarOutline } from "react-icons/io5";
import { IoShirtOutline, IoSettingsOutline } from "react-icons/io5";
import { IoCubeOutline } from "react-icons/io5";

import { MdLogout } from "react-icons/md";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* TOP MENU */}
      <div className="menu">
        <NavLink to="/designer/dashboard" className="link">
          <GoHome className="trd" />
          Dashboard
        </NavLink>

        <NavLink to="/designer/upload" className="link">
          <RiImageAddLine className="trd" />
          Upload Designs
        </NavLink>

        <NavLink to="/designer/active" className="link">
          <IoCubeOutline className="trd" />
          Active Orders
        </NavLink>

        <NavLink to="/designer/earning" className="link">
          <GoCreditCard className="trd" />
          Earnings & Wallet
        </NavLink>

        <NavLink to="/designer/collaboration" className="link">
          <PiHandshakeLight className="trd" />
          Collaboration
        </NavLink>

        <NavLink to="/designer/ratings" className="link">
          <IoStarOutline className="trd" />
          Reliability Ratings
        </NavLink>

        <NavLink to="/designer/templates" className="link">
          <IoShirtOutline className="trd" />
          Style Templates
        </NavLink>

        <NavLink to="/designer/setting" className="link">
          <IoSettingsOutline className="trd" />
          Settings
        </NavLink>
      </div>

      {/* BOTTOM LOGOUT */}
      <div className="logout">
        <button className="logoutBtn">
          <MdLogout className="trd" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
