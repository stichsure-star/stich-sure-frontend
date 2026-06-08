import React, { useState } from "react";
import stitchimg from "../../assets/gbenga/stitchsure.png";
import "../../styles/Header.css";
import { FiAlignJustify } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="Header_con">
        <section className="Header_sec">
          {/* LOGO */}
          <article className="Header_img">
            <img src={stitchimg} alt="Stitchsure" className="Headerimgg" />
          </article>

          {/* DESKTOP NAV */}
          <article className="Header_text">
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/features"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                >
                  Features
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/designers"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                >
                  Designers
                </NavLink>
              </li>
            </ul>
          </article>

          {/* RIGHT SIDE */}
          <article className="Header_button">
            <NavLink to="/login" className="NavLinked">
              <button className="Header_sign">Sign In</button>
            </NavLink>

            <NavLink to="/getstarted" className="NavLinked">
              <button className="Header_sign2">Get Started</button>
            </NavLink>

            <IoNotificationsOutline className="Header_notification" />

            <FiAlignJustify
              className="Header_three"
              onClick={() => setShow(true)}
            />
          </article>
        </section>
      </div>

      {/* OVERLAY */}
      <div
        className={`sidebar_overlay ${show ? "show" : ""}`}
        onClick={() => setShow(false)}
      ></div>

      {/* SIDEBAR */}
      <div className={`Header_sidebar ${show ? "show" : ""}`}>
        <div className="sidebar_top">
          <img src={stitchimg} alt="logo" />

          <button className="close_btn" onClick={() => setShow(false)}>
            ✕
          </button>
        </div>

        <ul>
          <li>
            <NavLink to="/" onClick={() => setShow(false)}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/features" onClick={() => setShow(false)}>
              Features
            </NavLink>
          </li>

          <li>
            <NavLink to="/designers" onClick={() => setShow(false)}>
              Designers
            </NavLink>
          </li>

          <li>
            <NavLink to="/getstarted" onClick={() => setShow(false)}>
              Get Started
            </NavLink>
          </li>

          <li>
            <NavLink to="/login" onClick={() => setShow(false)}>
              Sign In
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
