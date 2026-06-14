import React from "react";
import "../css/Incoming.css";
import { FaScissors } from "react-icons/fa6";
import { IoCubeOutline, IoCalendarOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const CollabCard = () => {
  return (
    <div className="collab_card">
      {/* TOP */}
      <div className="collab_top">
        <div className="profile">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
            alt="profile"
          />
        </div>

        <div className="info">
          <div className="name">Adebayo Styles</div>

          <div className="location">
            <FaLocationDot />
            <span>Lagos State</span>
          </div>
        </div>
      </div>

      {/* MESSAGE */}
      <div className="message_box">
        "Hi! I'm currently overloaded with 12 active bridal orders and need a
        skilled hand for stitching and finishing. I'm handle all client fittings
        and design direction. Happy to split revenue 60/40 and provide all
        fabric upfront."
      </div>

      {/* TAGS */}
      <div className="tags">
        <div className="tag">
          <FaScissors />
          Bridal Gown
        </div>

        <div className="tag">
          <IoCubeOutline />6 Pieces
        </div>

        <div className="tag">
          <IoCalendarOutline />
          14 June, 2026
        </div>
      </div>

      {/* BUTTONS */}
      <div className="actions">
        <button className="accept">Accept</button>
        <button className="decline">Decline</button>
      </div>
    </div>
  );
};

export default CollabCard;
