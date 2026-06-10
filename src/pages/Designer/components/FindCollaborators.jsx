import React, { useState } from "react";
import "../css/Findcollab.css";

import { FaScissors } from "react-icons/fa6";
import { IoCubeOutline, IoCalendarOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const FindCollab = () => {
  const [findcollab_filter, setFindcollab_filter] = useState("All");

  const findcollab_data = [
    {
      id: 1,
      name: "Adebayo Styles",
      location: "Lagos State",
      status: "Pending",
      message:
        "Hi! I'm currently overloaded with 12 active bridal orders and need a skilled hand...",
      type: "Bridal Gown",
      pieces: "6 Pieces",
      date: "14 June, 2026",
      action: "Accept / Decline",
    },
    {
      id: 2,
      name: "Merry Gold Stitches",
      location: "Lagos State",
      status: "In Review",
      message:
        "Hi! I'm currently overloaded with 12 active bridal orders and need a skilled hand...",
      type: "Bridal Gown",
      pieces: "6 Pieces",
      date: "14 June, 2026",
      action: "Proceed to payment",
    },
    {
      id: 3,
      name: "Elite Fashion Hub",
      location: "Abuja",
      status: "Active",
      message: "Need urgent tailoring support for ongoing client orders...",
      type: "Corporate Wear",
      pieces: "4 Pieces",
      date: "10 June, 2026",
      action: "View Progress",
    },
  ];

  const findcollab_filtered =
    findcollab_filter === "All"
      ? findcollab_data
      : findcollab_data.filter((item) => item.status === findcollab_filter);

  return (
    <div className="findcollab_board">
      {/* FILTER */}
      <div className="findcollab_filter_bar">
        {["All", "Active", "Pending", "In Review"].map((item) => (
          <button
            key={item}
            onClick={() => setFindcollab_filter(item)}
            className={
              findcollab_filter === item
                ? "findcollab_active_btn"
                : "findcollab_btn"
            }
          >
            {item}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="findcollab_card_list">
        {findcollab_filtered.map((item) => (
          <div className="findcollab_card" key={item.id}>
            {/* TOP */}
            <div className="findcollab_top">
              <div className="findcollab_left_group">
                <div className="findcollab_avatar">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                    alt="profile"
                  />
                </div>

                <div className="findcollab_info">
                  <div className="findcollab_name">{item.name}</div>

                  <div className="findcollab_location">
                    <FaLocationDot />
                    {item.location}
                  </div>
                </div>
              </div>

              <div
                className={`findcollab_status findcollab_${item.status.replace(
                  " ",
                  "",
                )}`}
              >
                {item.status}
              </div>
            </div>

            {/* MESSAGE */}
            <div className="findcollab_message">{item.message}</div>

            {/* TAGS */}
            <div className="findcollab_tags">
              <div className="findcollab_tag">
                <FaScissors />
                {item.type}
              </div>

              <div className="findcollab_tag">
                <IoCubeOutline />
                {item.pieces}
              </div>

              <div className="findcollab_tag">
                <IoCalendarOutline />
                {item.date}
              </div>
            </div>

            {/* ACTION */}
            <div className="findcollab_action">
              <button
                className={
                  item.status === "In Review"
                    ? "findcollab_primary_full"
                    : "findcollab_primary"
                }
              >
                {item.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindCollab;
