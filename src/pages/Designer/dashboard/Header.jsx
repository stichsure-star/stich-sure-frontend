import React, { useState } from "react";
import "../../Designer/css/Header.css";
import Img from "../../../assets/gbenga/stitchsure.png";
import Gold from "../../../assets/gbenga/Gold.png";
import empty from "../../../assets/gbenga/empty.jpg";

import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";

import Sidebar from "../dashboard/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);
  // const navigate = useNavigate();
  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={Img} alt="Logo" className="bet" />
        </div>

        <div className="right">
          <div className="mobile-icon notif">
            <IoMdNotificationsOutline className="Notify" />
            <span className="badge">0</span>
          </div>

          <div className="mobile-icon-menu-btn" onClick={() => setOpen(true)}>
            <FiMenu />
          </div>

          <div className="Picky" onClick={() => setOpen(true)}>
            <img
              src={user.profile.profilePhoto || empty}
              alt="Logo"
              className="Goldie"
            />
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer ${open ? "active" : ""}`}>
        <div className="drawer-top">
          <img src={Img} alt="Logo" className="bet" />
          <button className="drawer-close" onClick={() => setOpen(false)}>
            <FiX />
          </button>
        </div>

        <Sidebar onClose={() => setOpen(false)} />
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
};

export default Header;
