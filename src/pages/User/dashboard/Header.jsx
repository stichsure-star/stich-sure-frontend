import React from "react";
import "../../User/css/Header.css";
import Img from "../../../assets/gbenga/stitchsure.png";
import pif from "../../../assets/gbenga/Gold.png";
import { IoNotificationsSharp } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

const Header = () => {
  return (
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

        <div className="avatared">
          <div className="avatar">
            <img src={pif} alt="" />
            <RiArrowDropDownLine />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
