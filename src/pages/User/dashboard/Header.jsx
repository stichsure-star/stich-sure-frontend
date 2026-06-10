import React from "react";
import "../css/Header.css";
import Img from "../../../assets/gbenga/stitchsure.png";
import pif from "../../../assets/gbenga/Gold.png";
import { IoNotificationsSharp } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RiImageAddFill } from "react-icons/ri";
import { IoIosCard } from "react-icons/io";
import { PiHandshakeFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { IoShirtOutline, IoSettings } from "react-icons/io5";
import { HiCube } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <header className="header">
        {/* LEFT LOGO */}
        <div className="logo">
          <img src={Img} alt="Logo" className="bet" />
        </div>

        {/* RIGHT SECTION */}
        <div className="right">
          {/* NOTIFICATION */}
          <div className="notif">
            <IoNotificationsSharp className="Notify" />
            <span className="badge">5</span>
          </div>
          <div>
            <FiMenu onClick={() => setOpen(true)} />
          </div>
          <div className="avatared">
            <div className="avatar">
              <img src={pif} alt="" />
            </div>
          </div>
        </div>
      </header>

      <div className={`mobile-drawed ${open ? "active" : ""}`}>
        <div className="drawer-ted" onClick={() => setOpen(false)}>
          <img src={Img} alt="Logo" className="bet" />
        </div>

        <ul>
          <li>
            <NavLink to="/designer/dashboard" className="link">
              <GoHome className="trd" />
              Dashboard
            </NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/designer/upload" className="link">
              <RiImageAddFill className="trd" />
              Browse Designers
            </NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/designer/ordertracker" className="link">
              <HiCube className="trd" />
              Browse Designs
            </NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/designer/earning" className="link">
              <IoIosCard className="trd" />
              My Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/designer/collaboration" className="link">
              <PiHandshakeFill className="trd" />
              Saved Designs
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" className="link">
              <IoSettings className="trd" />
              Settings
            </NavLink>
          </li>
        </ul>
        <button className="logoutBtn">
          <MdLogout className="trd" />
          Logout
        </button>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
};

export default Header;
