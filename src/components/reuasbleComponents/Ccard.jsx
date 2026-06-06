import React from "react";
import "../../styles/Ccard.css";

const Ccard = ({ item }) => {
  return (
    <div className="Profile_card">
      <div className="Profile_top">
        <img src={item.image} />

        <div className="Profile_info">
          <h3>{item.name}</h3>

          <p>📍 {item.location}</p>
        </div>
      </div>

      <p className="Profile_text">{item.text}</p>

      <div className="Profile_status">
        <span className="Status_dot"></span>

        <p>Available</p>
      </div>

      <div className="Profile_buttons">
        <button>Message</button>

        <button className="primary">Collaborate</button>
      </div>
    </div>
  );
};

export default Ccard;
