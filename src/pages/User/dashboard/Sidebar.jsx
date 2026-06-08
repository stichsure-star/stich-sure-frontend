import React from "react";
import { NavLink } from "react-router-dom";
import "../../Designer/dashboard/Sidebar.css";
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
        <NavLink to="/user/dashboard" className="link">
          <GoHome className="trd" />
          Dashboard
        </NavLink>

        <NavLink to="/user/browsedesigners" className="link">
          <RiImageAddFill className="trd" />
          Browse Designers
        </NavLink>

        <NavLink to="/user/browsedesigns" className="link">
          <HiCube className="trd" />
          Browse Designs
        </NavLink>

        <NavLink to="/user/myorders" className="link">
          <IoIosCard className="trd" />
          MY Orders
        </NavLink>

        <NavLink to="/user/saveddesigners" className="link">
          <PiHandshakeFill className="trd" />
          Saved Designs
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
