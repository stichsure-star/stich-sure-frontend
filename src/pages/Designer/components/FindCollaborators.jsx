import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Added Redux Hook
import "../css/Findcollab.css";

import { FaScissors } from "react-icons/fa6";
import { IoCubeOutline, IoCalendarOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { designerApi } from "../../../config/designer";
import { SkeletonOrderList } from "../../../components/reuasbleComponents/Skeleton";
import { useNavigate } from "react-router-dom";

const FindCollab = () => {
  // Pulling current user's ID straight from the redux store
  // (Note: Adjust state.auth.user if your auth slice structure uses different keys)
  const currentUserId = useSelector(
    (state) => state.auth?.user?.id || state.auth?.user?._id,
  );

  const [findcollab_filter, setFindcollab_filter] = useState("All");
  const [findcollab_data, setFindcollab_data] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await designerApi.mycollabs();
      setFindcollab_data(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("findcollab_data", findcollab_data);

  useEffect(() => {
    fetchData();
  }, []);

  // Normalizing filters to match item status casing
  const findcollab_filtered =
    findcollab_filter === "All"
      ? findcollab_data
      : findcollab_data.filter(
          (item) =>
            item.status?.toLowerCase() === findcollab_filter.toLowerCase(),
        );

  const getStatusClass = (status) => {
    if (!status) return "default";
    const normalized = status.toLowerCase();
    if (normalized === "accepted") return "Active";
    if (normalized === "rejected") return "Rejected";
    if (normalized === "pending") return "Active";
    if (normalized === "in review") return "In Review";
    return normalized;
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

  // Helper function to dynamically output button configuration
  const renderButtonConfig = (item) => {
    const status = item.status?.toLowerCase();

    // Forcing both variables into Strings explicitly fixes type mismatches (Object vs String)
    const isSender =
      currentUserId &&
      item.sender?.id &&
      String(currentUserId) === String(item.sender.id);

    if (status === "accepted") {
      return isSender
        ? {
            text: "Proceed to Payment",
            className: "findcollab_primary",
            disabled: false,
            onClick: () =>
              navigate(`/designer/checkout2/${item.id || item._id}`),
          }
        : {
            text: "Awaiting Payment",
            className: "findcollab_primary",
            disabled: true,
            onClick: null,
          };
    }

    if (status === "pending") {
      return {
        text: "Pending",
        className: "findcollab_primary",
        disabled: true,
        onClick: null,
      };
    }

    if (status === "in review") {
      return {
        text: "In Review",
        className: "findcollab_primary",
        disabled: false,
        onClick: null,
      };
    }

    if (status === "rejected") {
      return {
        text: "Rejected",
        className: "findcollab_rejected",
        disabled: true,
        onClick: null,
      };
    }

    return { text: "Review", className: "findcollab_primary", disabled: false };
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
        {loading ? (
          <SkeletonOrderList count={4} />
        ) : (
          findcollab_filtered.map((item) => {
            const btnConfig = renderButtonConfig(item);

            // Adjust profile dynamically based on who is looking at the card
            const profileDisplay =
              currentUserId &&
              item.receiver?.id &&
              String(currentUserId) === String(item.receiver.id)
                ? item.sender
                : item.receiver;

            return (
              <div className="findcollab_card" key={item.id}>
                {/* TOP */}
                <div className="findcollab_top">
                  <div className="findcollab_left_group">
                    <div className="findcollab_avatar">
                      <img
                        src={profileDisplay?.profilePhoto || "/placeholder.png"}
                        alt="profile"
                      />
                    </div>

                    <div className="findcollab_info">
                      <div className="findcollab_name">
                        {profileDisplay?.lastName} {profileDisplay?.firstName}
                      </div>

                      <div className="findcollab_location">
                        <FaLocationDot />
                        Lagos, State
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
                    {item.pieces} Pieces
                  </div>

                  <div className="findcollab_tag">
                    <IoCalendarOutline />
                    {formatDate(item.deadline)}
                  </div>
                </div>

                {/* ACTION */}
                <div className="findcollab_action">
                  <button
                    className={btnConfig.className}
                    disabled={btnConfig.disabled}
                    onClick={btnConfig.onClick}
                  >
                    {btnConfig.text}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FindCollab;
