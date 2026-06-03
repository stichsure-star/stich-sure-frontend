import React from "react";
 import "../styles/Designer.css";
import man from '../assets/daniel/Man fashion.jpg'
import gown from '../assets/daniel/Lace Dressed.png'
import Fine from '../assets/daniel/Fine lace.png'
import Man from '../assets/daniel/Men dem.png'
import lady from '../assets/daniel/Lady lace.png'
import Hair from '../assets/daniel/Hairtire.png'
import senate from '../assets/daniel/Senate.png'
import wear from '../assets/daniel/Wear.png'
import main from '../assets/daniel/Main wear.png'
import elli from '../assets/daniel/Ellipse 1.png'

const designers = [
  {
    id: 1,
    image:gown ,
    name: "Mia D. Johnson",
    role: "Bespoke Fashion Designer",
    location: "Lagos, Nigeria",
    reviews: "4.9 (127 reviews)",
    score: "86%",
  },
  {
    id: 2,
     image: Fine,
    name: "John E. Clyde",
    role: "Brand & Lifestyle Designer",
    location: "Lagos, Nigeria",
    reviews: "4.8 (98 reviews)",
    score: "90%",
  },
  {
    id: 3,
    image:Man,
    name: "Jerome Awoyale",
    role: "Textile & Print Designer",
    location: "Lagos, Nigeria",
    reviews: "4.9 (156 reviews)",
    score: "96%",
  },
  {
    id: 4,
     image:lady,
    name: "Tiana Okoro",
    role: "Streetwear Designer",
    location: "Lagos, Nigeria",
    reviews: "4.7 (112 reviews)",
    score: "79%",
  },
  {
    id: 5,
    image: Hair,
    name: "Nneka Eze",
    role: "Textile Designer",
    location: "Lagos, Nigeria",
    reviews: "5.0 (207 reviews)",
    score: "88%",
  },
  {
    id: 6,
    image:senate,
    name: "Seun Daniel",
    role: "Fashion Designer",
    location: "Lagos, Nigeria",
    reviews: "4.8 (134 reviews)",
    score: "92%",
  },
  {
    id: 7,
    image:wear,
    name: "Sonayon Blessing",
    role: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "5.0(127 reviews)",
    score:"87%",
    
  },
  {
    id: 8,
    image:main,
    name: "Yemi Blessing",
    role: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "5.0(127 reviews)",
    score:"96%",
  },
  {
    id: 9,
    image:elli,
    name: "Chidera.B.Patrick",
    role: "Bridal & Evening Wear",
    location: "Lagos, Nigeria",
    reviews: "5.0(127 reviews)",
    score:"70%",
  }
];

const Designer = () => {
  return (


      <div className="designers-grid">
        {designers.map((designer) => (
          <div className="designer-card" key={designer.id}>
            <div className="card-top">
              <img src={designer.image} alt={designer.name} />

              <div>
                <h3>{designer.name}</h3>
                <p>{designer.role}</p>
                <span>{designer.location}</span>
              </div>
            </div>

            <p className="reviews">{designer.reviews}</p>

            <div className="score-section">
              <div className="score-header">
                <span>Reliability Score</span>
                <strong>{designer.score}</strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: designer.score }}
                ></div>
              </div>
            </div>

            <button>View Profile</button>
          </div>
        ))}
      </div>
  );
};

export default Designer;