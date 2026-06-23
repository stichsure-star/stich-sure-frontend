import { useRef } from "react";
import "../styles/Feats.css";
import { GrLocation } from "react-icons/gr";
import darky from "../assets/gbenga/darky.png";
import gold from "../assets/gbenga/Gold.png";
import manip from "../assets/gbenga/manip.png";
import { useNavigate } from "react-router-dom";

const designers = [
  // {
  //   id: 1,
  //   name: "Glory Okafor",
  //   image: gold,
  //   specialty: "Bridal & Evening Wear",
  //   location: "Lagos, Nigeria",
  //   reviews: "5.0(127 reviews)",
  //   reliability: "86%",
  // },
  // {
  //   id: 2,
  //   name: "Daniel Mensah",
  //   image: darky,
  //   specialty: "Luxury Fashion",
  //   location: "Abuja, Nigeria",
  //   reviews: "5.0(127 reviews)",
  //   reliability: "91%",
  // },
  // {
  //   id: 3,
  //   name: "Amaka Johnson",
  //   image: manip,
  //   specialty: "Traditional Wear",
  //   location: "Port Harcourt",
  //   reviews: "5.0(127 reviews)",
  //   reliability: "88%",
  // },
];

function FeaturedDesigners() {
  const navigate = useNavigate();

  if (designers.length === 0)  {
    return null;
  }
  return (
    <section className="featured-designers">
      <div className="headong">
        <h1>Featured Designers</h1>
        <p className="subtitle">
          Verified professionals ready to bring your fashion vision to life
        </p>
      </div>

      <div className="Feat_cards">
        {designers.map((designer) => (
          <div className="Feat_card" key={designer.id}>
            <div className="top">
              <img
                src={designer.image}
                alt={designer.name}
                className="avatars"
              />
              <span className="verified">✓ Verified</span>
            </div>

            <h3>{designer.name}</h3>
            <p className="specialty">{designer.specialty}</p>

            <p className="info">
              <GrLocation />
              {designer.location}
            </p>

            <p className="info">⭐ {designer.reviews}</p>

            <div className="bottom-section">
              <div className="score">
                <span>Reliability Score</span>
                <span>{designer.reliability}</span>
              </div>

              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: designer.reliability }}
                ></div>
              </div>

              <p className="delivery">On-Time Deliveries</p>

              <button 
              onClick={() => navigate("/getstarted")}
              className="profile-btn">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedDesigners;
