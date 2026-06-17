import React, { useEffect, useState } from "react";
import "../css/Findcollab.css";

import { FaScissors } from "react-icons/fa6";
import { IoCubeOutline, IoCalendarOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { designerApi } from "../../../config/designer";

const FindCollab = () => {
  const [findcollab_filter, setFindcollab_filter] = useState("All");
  const [findcollab_data, setFindcollab_data] = useState([]);

  const fetchData = async () => {
    try {
      const response = await designerApi.mycollabs();

      setFindcollab_data(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("findcollab_data", findcollab_data);

  useEffect(() => {
    fetchData();
  }, []);

  const findcollab_filtered =
    findcollab_filter === "All"
      ? findcollab_data
      : findcollab_data.filter((item) => item.status === findcollab_filter);

  const getStatusClass = (status) => {
    if (!status) return "default";

    if (status === "accepted") return "Active";
    if (status === "rejected") return "Rejected";

    return status.toLowerCase();
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";

    const date = new Date(isoDate);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
        {findcollab_data.map((item) => (
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
                  <div className="findcollab_name">
                    {item.receiver.lastName} {item.receiver.firstName}
                  </div>

                  <div className="findcollab_location">
                    <FaLocationDot />
                    {item.location}
                  </div>
                </div>
              </div>

              <div
                className={`findcollab_status findcollab_${getStatusClass(item.status)}`}
              >
                {item.status}
              </div>
            </div>

            {/* MESSAGE */}
            <div className="findcollab_message">{item.taskDetails}</div>

            {/* TAGS */}
            <div className="findcollab_tags">
              <div className="findcollab_tag">
                <FaScissors />
                {item.taskType}
              </div>

              <div className="findcollab_tag">
                <IoCubeOutline />
                {item.pieces}
              </div>

              <div className="findcollab_tag">
                <IoCalendarOutline />
                {formatDate(item.deadline)}
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
                {item.status === "accepted"
                  ? "Proceed to Payment"
                  : "Review" || item.status === "rejected"
                    ? "Rejected"
                    : "Review"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindCollab;
