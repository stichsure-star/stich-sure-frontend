import React, { useEffect, useState } from "react";
import "../css/Incoming.css";
import { FaScissors } from "react-icons/fa6";
import { IoCubeOutline, IoCalendarOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { designerApi } from "../../../config/designer";
import { SkeletonOrderList } from "../../../components/reuasbleComponents/Skeleton";

const CollabCard = () => {
  const [collaby, setCollaby] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH COLLABS
  const fetchCollabs = async () => {
    try {
      setLoading(true);
      const response = await designerApi.acceptrecevied();
      console.log("fetch response:", response.data);

      setCollaby(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ACCEPT
  const acceptCollab = async (id) => {
    try {
      await designerApi.acceptcollab(id);

      setCollaby((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "accepted" } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // REJECT
  const rejectCollab = async (id) => {
    try {
      await designerApi.rejectcollab(id);

      setCollaby((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "rejected" } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // FORMAT DATE
  const formatDate = (isoDate) => {
    if (!isoDate) return "";

    const date = new Date(isoDate);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchCollabs();
  }, []);

  return (
    <div className="collab_wrapper">
      {loading ? (
        <SkeletonOrderList count={3} />
      ) : (
        collaby.map((item) => (
        <div className="collab_card" key={item.id}>
          {/* TOP */}
          <div className="collab_top">
            <div className="profile">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                alt="profile"
              />
            </div>

            <div className="info">
              <div className="name">
                {item.sender?.lastName} {item.sender?.firstName}
              </div>

              <div className="location">
                <FaLocationDot />
                <span>{item.sender?.location || "Lagos State"}</span>
              </div>
            </div>
          </div>

          {/* MESSAGE */}
          <div className="message_box">{item.taskDetails}</div>

          {/* TAGS */}
          <div className="tags">
            <div className="tag">
              <FaScissors />
              {item.taskType}
            </div>

            <div className="tag">
              <IoCubeOutline />
              {item.quantity || "N/A"}
            </div>

            <div className="tag">
              <IoCalendarOutline />
              {formatDate(item.deadline)}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="actions">
            <button
              className="accept"
              disabled={item.status === "accepted"}
              onClick={() => acceptCollab(item.id)}
            >
              {item.status === "accepted" ? "Accepted" : "Accept"}
            </button>

            <button
              className="decline"
              disabled={
                item.status === "rejected" || item.status === "accepted"
              }
              onClick={() => rejectCollab(item.id)}
            >
              Decline
            </button>
          </div>
        </div>
      ))
      )}
    </div>
  );
};

export default CollabCard;
