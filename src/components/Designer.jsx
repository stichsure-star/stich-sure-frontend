import React from "react";
import "../styles/Designer.css";
import { IoLocationSharp } from "react-icons/io5"; 
import { GoCheckCircleFill } from "react-icons/go"; 

import gown from '../assets/daniel/Lace Dressed.png';
import Fine from '../assets/daniel/Fine lace.png';
import Man from '../assets/daniel/Men dem.png';
import lady from '../assets/daniel/Lady lace.png';
import Hair from '../assets/daniel/Hairtire.png';
import senate from '../assets/daniel/Senate.png';
import wear from '../assets/daniel/Wear.png';
import main from '../assets/daniel/Main wear.png';
import elli from '../assets/daniel/Ellipse 1.png';

const designers = [
  {
    id: 1,
    image: gown,
    name: "Rita .O. Johnson",
    role: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "5.0 (127 reviews)",
    score: "86%",
    scoreNum: 86,
  },
  {
    id: 2,
    image: Fine,
    name: "Juliet .C. Ogidi",
    role: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "5.0 (127 reviews)",
    score: "90%",
    scoreNum: 90,
  },
  {
    id: 3,
    image: Man,
    name: "Steven Joseph",
    role: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "5.0 (127 reviews)",
    score: "96%",
    scoreNum: 96,
  },
  {
    id: 4,
    image: lady,
    name: "Ekaette Okon",
    role: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "5.0 (127 reviews)",
    score: "79%",
    scoreNum: 79,
  },
  {
    id: 5,
    image: Hair,
    name: "Bridget Achafu",
    role: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "5.0 (127 reviews)",
    score: "88%",
    scoreNum: 88,
  },
  {
    id: 6,
    image: senate,
    name: "Ifeji A. Olawale",
    role: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "5.0 (127 reviews)",
    score: "92%",
    scoreNum: 92,
  },
  {
    id: 7,
    image: wear,
    name: "Sonayon Blessing",
    role: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "5.0 (127 reviews)",
    score: "83%",
    scoreNum: 83,
  },
  {
    id: 8,
    image: main,
    name: "Yemi Blessing",
    role: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "5.0 (127 reviews)",
    score: "96%",
    scoreNum: 96,
  },
  {
    id: 9,
    image: elli,
    name: "Chidera.B.Patrick",
    role: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "5.0 (127 reviews)",
    score: "70%",
    scoreNum: 70,
  }
];

const Designer = () => {
  return (
    <div className="designers-grid">
      {designers.map((designer) => (
        <div className="designer-card" key={designer.id}>
          
          <div className="card-top-header-row">
            <img src={designer.image} alt={designer.name} className="designer-avatar" />
            <div className="verified-badge">
              <GoCheckCircleFill className="verified-icon" />
              Verified
            </div>
          </div>

          <div className="designer-details-block">
            <h3>{designer.name}</h3>
            <p className="role">{designer.role}</p>
            
            <div className="location-row">
              <IoLocationSharp className="location-icon" />
              <span>{designer.location}</span>
            </div>

            <p className="reviews-row">
              <span className="star-icon">⭐</span>
              {designer.reviews}
            </p>
          </div>

          <div className="score-section">
            <div className="score-header">
              <span>Reliability Score</span>
              <strong>{designer.score}</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${designer.scoreNum}%` }}>
              </div>
            </div>
            <p className="delivery-text">On-Time Deliveries</p>
          </div>

          <button className="view-profile-btn">View Profile</button>
        </div>
      ))}
    </div>
  );
};

export default Designer;