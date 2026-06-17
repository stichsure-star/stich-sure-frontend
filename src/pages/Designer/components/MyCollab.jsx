import React from "react";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import "../css/MyCollab.css";
import { useNavigate } from "react-router-dom";

const DesignersPage = () => {

  const navigate =useNavigate();
  const designers = [
    {
      id: 1,
      name: "Apan Okoro",
      role: "Suit & Corporate Attire",
      location: "Lagos, Nigeria",
      rating: "5.0 (127 reviews)",
      score: 86,
    },
    {
      id: 2,
      name: "Chinedu Mark",
      role: "Streetwear Designer",
      location: "Abuja, Nigeria",
      rating: "4.8 (98 reviews)",
      score: 78,
    },
    {
      id: 3,
      name: "Aisha Bello",
      role: "Luxury Fashion",
      location: "Lagos, Nigeria",
      rating: "4.9 (210 reviews)",
      score: 92,
    },
    {
      id: 4,
      name: "David Kings",
      role: "Menswear Specialist",
      location: "Port Harcourt",
      rating: "4.7 (65 reviews)",
      score: 74,
    },
    {
      id: 5,
      name: "Zainab Musa",
      role: "Evening Wear Designer",
      location: "Kano, Nigeria",
      rating: "4.6 (88 reviews)",
      score: 81,
    },
    {
      id: 6,
      name: "Emeka John",
      role: "Tailoring Expert",
      location: "Lagos, Nigeria",
      rating: "5.0 (301 reviews)",
      score: 95,
    },
  ];

  return (
    <div className="list_container">
      {designers.map((item) => (
        <div className="card" key={item.id}>
          {/* TOP */}
          <div className="card_top">
            <div className="avatar_wrap">
              <img
                className="avatar"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                alt="profile"
              />
            </div>

            <div className="verified">✔ Verified</div>
          </div>

          {/* TEXT */}
          <div className="name">{item.name}</div>
          <div className="role">{item.role}</div>

          <div className="location">
            <FaLocationDot />
            <span>{item.location}</span>
          </div>

          <div className="rating">
            <FaStar />
            <span>{item.rating}</span>
          </div>

          {/* SCORE */}
          <div className="score_block">
            <div className="score_header">
              <span>Reliability Score</span>
              <h2>{item.score}%</h2>
            </div>

            <div className="bar">
              <div className="fill" style={{ width: `${item.score}%` }} />
            </div>

            <div className="ontime">On-Time Deliveries</div>
          </div>

          {/* BUTTONS */}
          <div className="buttons">
            <button 
            onClick={() =>navigate ("/designer/send-request")}
            className="btn_primary"
            >
              Send Request
            </button>

            <button
            onClick={() => navigate ("/designer/profileonMount")}
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
