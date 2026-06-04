import React, { useState } from "react";
import stitchimg from "../../assets/gbenga/stitchsure.png";
import "../../styles/Header.css";
import { FiAlignJustify } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="Header_con">
      <section className="Header_sec">
        <article className="Header_img">
          <img src={stitchimg} alt="" className="Headerimgg" />
        </article>
        <article className="Header_text">
          <ul>
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
          </ul>
        </article>
        <article className="Header_button">
          <button className="Header_sign">
            <NavLink to="/login" className="NavLinked">
              Sign In
            </NavLink>
          </button>

          <button className="Header_sign2">
            <NavLink to="/getstarted" className="NavLink">
              Get Started
            </NavLink>
          </button>

          <FiAlignJustify
            className="Header_three"
            onClick={() => setShow(!show)}
          />
          {show && <h2>Home</h2>}
        </article>
      </section>
    </div>
  );
};

export default Header;
