import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import "../css/MyCollab.css";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../config/auth";

const DesignersPage = () => {
  const navigate = useNavigate();

  const [collab, setCollab] = useState([]);

  const fetchData = async () => {
    try {
      const response = await authApi.allDesigners();

      console.log("all designers:", response.data.data);

      const verifiedOnly = response.data.data.filter(
        (item) => item.profile?.isKycVerified === true,
      );

      setCollab(verifiedOnly);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("collab", collab);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list_container">
      {collab.map((item) => (
        <div className="card" key={item.id}>
          {/* TOP */}
          <div className="card_top">
            <div className="avatar_wrap">
              <img
                className="avatar"
                src={item.profile?.profilePhoto}
                alt="profile"
              />
            </div>

            <div className="verified">✔ Verified</div>
          </div>

          {/* TEXT */}
          <div className="name">
            {item.lastName}
            {item.firstName}
          </div>
          <div className="role">{item.profile?.specialization}</div>

          <div className="location">
            <FaLocationDot />
            <span>{item.profile?.currentHouseAddress}</span>
          </div>

          <div className="rating">
            <FaStar />
            <span>{item.profile?.ratingCount}</span>
          </div>

          {/* SCORE */}
          <div className="score_block">
            <div className="score_header">
              <span>Reliability Score</span>
              <h2>{item.profile?.reliabilityScore}%</h2>
            </div>

            <div className="bar">
              <div
                className="fill"
                style={{
                  width: `${item.profile?.reliabilityScore || 0}%`,
                }}
              />
            </div>

            <div className="ontime">On-Time Deliveries</div>
          </div>

          {/* BUTTONS */}
          <div className="buttons">
            <button
              onClick={() => {
                console.log("sending designer:", item);
                navigate("/designer/send-request", {
                  state: {
                    designerId: item.id,
                    designerName: `${item.lastName} ${item.firstName}`,
                    designerImage: item.profile?.profilePhoto,
                    specialization: item.profile?.specialization,
                    location: item.profile?.currentHouseAddress,
                  },
                });
              }}
              className="btn_primary"
            >
              Send Request
            </button>

            <button
              onClick={() => navigate("/designer/profileonMount")}
              className="btn_outline"
            >
              View Profile
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesignersPage;
