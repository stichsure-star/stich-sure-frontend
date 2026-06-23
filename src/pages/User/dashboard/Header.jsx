import React from "react";
import "../css/Header.css";
import Img from "../../../assets/gbenga/stitchsure.png";
import pif from "../../../assets/gbenga/Gold.png";
import empty from "../../../assets/gbenga/empty.jpg";
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
import { FiMenu, FiX } from "react-icons/fi";
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
            <span className="badge">0</span>
          </div>

          <div className="Picky" onClick={() => setOpen(true)}>
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" className="Goldie" />
            ) : (
              <div className="Goldie-initials">
                 {user?.firstName?.charAt(0).toUpperCase()}
                {user?.lastName?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="dropdowned">
            <FiMenu onClick={() => setOpen(true)} />
          </div>
        </div>
      </header>

      <div className={`mobile-drawed ${open ? "active" : ""}`}>
        <div className="drawer-ted">
          <img src={Img} alt="Logo" className="bet" />
          <button className="drawer-close" onClick={() => setOpen(false)}>
            <FiX />
          </button>
        </div>

        <ul>
          <li>
            {" "}
            <NavLink
              to="/user/dashboard"
              className="link"
              onClick={() => setOpen(false)}
            >
              <GoHome className="trd" />
              Dashboard
            </NavLink>
          </li>

         
          <li>
            {" "}
            <NavLink
              to="/user/browsedesigns"
              className="link"
              onClick={() => setOpen(false)}
            >
              <HiCube className="trd" />
              Browse Designs
            </NavLink>
          </li>

           <li>
            {" "}
            <NavLink
              to="/user/browsedesigners"
              className="link"
              onClick={() => setOpen(false)}
            >
              <RiImageAddFill className="trd" />
              Browse Designers
            </NavLink>
          </li>


          <li>
            {" "}
            <NavLink
              to="/user/myorders"
              className="link"
              onClick={() => setOpen(false)}
            >
              <IoIosCard className="trd" />
              My Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/user/saveddesigners"
              className="link"
              onClick={() => setOpen(false)}
            >
              <PiHandshakeFill className="trd" />
              Saved Designs
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className="link"
              onClick={() => setOpen(false)}
            >
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
