import React from "react";
import "../css/Header.css";
import Img from "../../../assets/gbenga/stitchsure.png";
import pif from "../../../assets/gbenga/Gold.png";
import { IoMdNotificationsOutline } from "react-icons/io";
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
import { useSelector } from "react-redux";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);

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
            <IoMdNotificationsOutline className="Notify" />
            <span className="badge">5</span>
          </div>
          <div className="dammy">
            <div className="avatarde">
              <img src={user?.profilePhoto || pif} alt="" />
            </div>
          </div>
          <div className="dropdowned">
            <FiMenu onClick={() => setOpen(true)} />
          </div>
        </div>
      </header>

      <div className={`mobile-drawed ${open ? "active" : ""}`}>
        <div className="drawer-ted" onClick={() => setOpen(false)}>
          <img src={Img} alt="Logo" className="bet" />
        </div>

        <ul>
          <li>
            {" "}
            <NavLink to="/user/dashboard" className="link">
              <GoHome className="trd" />
              Dashboard
            </NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/user/browsedesigners" className="link">
              <RiImageAddFill className="trd" />
              Browse Designers
            </NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/user/browsedesigns" className="link">
              <HiCube className="trd" />
              Browse Designs
            </NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/user/myorders" className="link">
              <IoIosCard className="trd" />
              My Orders
            </NavLink>
          </li>

          <li>
            <NavLink to="/user/saveddesigners" className="link">
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
