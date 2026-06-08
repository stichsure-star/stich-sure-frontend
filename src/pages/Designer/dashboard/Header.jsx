import React, { useState } from "react";
import "../../Designer/css/Header.css";
import Img from "../../../assets/gbenga/stitchsure.png";
import Gold from "../../../assets/gbenga/Gold.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RiImageAddFill } from "react-icons/ri";
import { IoIosCard } from "react-icons/io";
import { PiHandshakeFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { IoShirtOutline, IoSettings } from "react-icons/io5";
import { HiCube } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={Img} alt="Logo" className="bet" />
        </div>

        <div className="right">
          <div className="mobile-icon notif">
            <IoMdNotificationsOutline className="Notify" />

            <span className="badge">5</span>
          </div>

          <div className="mobile-icon-menu-btn" onClick={() => setOpen(true)}>
            <FiMenu />
          </div>
          <div className="Picky" onClick={() => setOpen(true)}>
            <img src={Gold} alt="Logo" className="Goldie" />
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}

      <div className={`mobile-drawer ${open ? "active" : ""}`}>
        <div className="drawer-top" onClick={() => setOpen(false)}>
          <img src={Img} alt="Logo" className="bet" />
        </div>

        <ul>
          <li>
            {" "}
            <NavLink to="/designer/dashboard" className="link">
              <GoHome className="trd" />
              Dashboard
            </NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/designer/upload" className="link">
              <RiImageAddFill className="trd" />
              Upload Designs
            </NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/designer/ordertracker" className="link">
              <HiCube className="trd" />
              Active Orders
            </NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/designer/earning" className="link">
              <IoIosCard className="trd" />
              Earnings & Wallet
            </NavLink>
          </li>

          <li>
            <NavLink to="/designer/collaboration" className="link">
              <PiHandshakeFill className="trd" />
              Collaboration
            </NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/designer/ratings" className="link">
              <FaStar className="trd" />
              Reliability Ratings
            </NavLink>
          </li>

          <li>
            <NavLink to="/designer/templates" className="link">
              <IoShirtOutline className="trd" />
              Style Templates
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
