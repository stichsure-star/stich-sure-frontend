import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { GoHome } from "react-icons/go";
import { RiImageAddFill } from "react-icons/ri";
import { IoIosCard } from "react-icons/io";
import { PiHandshakeFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { IoShirtOutline, IoSettings } from "react-icons/io5";
import { HiCube } from "react-icons/hi2";
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
          <RiImageAddFill className="trd" />
          Upload Designs
        </NavLink>

        <NavLink to="/designer/ordertracker" className="link">
          <HiCube className="trd" />
          Active Orders
        </NavLink>

        <NavLink to="/designer/wallet" className="link">
          <IoIosCard className="trd" />
          Earnings & Wallet
        </NavLink>

        <NavLink to="/designer/collaboration" className="link">
          <PiHandshakeFill className="trd" />
          Collaboration
        </NavLink>

        <NavLink to="/designer/ratings" className="link">
          <FaStar className="trd" />
          Reliability Ratings
        </NavLink>

        <NavLink to="/designer/templates" className="link">
          <IoShirtOutline className="trd" />
          Style Templates
        </NavLink>

        <NavLink to="/settings" className="link">
          <IoSettings className="trd" />
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
