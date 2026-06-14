import React, { useState } from "react";
import "../../Designer/css/Header.css";
import Img from "../../../assets/gbenga/stitchsure.png";
import Gold from "../../../assets/gbenga/Gold.png";

import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMenu } from "react-icons/fi";

import Sidebar from "../dashboard/Sidebar";

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

        {/* 🔥 IMPORTANT: reuse Sidebar (same logic as desktop) */}
        <Sidebar />
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
};

export default Header;
