import React, { useEffect, useState } from "react";
import { HiMapPin, HiStar } from "react-icons/hi2";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import "../styles/SavedDesign.css";
import { useNavigate } from "react-router-dom";

import green from "../assets/daniel/lightgreen.png";
import chioma from "../assets/daniel/chiomalace.png";
import thicker from "../assets/daniel/Thickgreener.png";
import elder from "../assets/daniel/Elderwar.png";
import mengreen from "../assets/daniel/Anothergreen.png";
import cleanwear from "../assets/daniel/Containlace.png";
import { NavLink } from "react-router-dom";
import { customerApi } from "../config/customer";

function SavedDesign() {
  const navigate = useNavigate();
  const [designers, setDesigners] = useState([]);

  const fetchData = async () => {
    try {
      const response = await customerApi.savedDesigner();
      console.log("response", response);
      setDesigners(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("designers", designers);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dg-page-wrapper">
      <main className="dg-main-content">
        <div className="dg-cards-grid">
          {designers?.map((designer) => (
            <div key={designer.id} className="dg-designer-card">
              <div className="dg-card-image-wrap">
                <img
                  src={designer.designer?.profile?.profilePhoto}
                  alt={designer.name}
                  className="dg-card-img"
                />
              </div>

              <div className="dg-card-info">
                <div className="dg-name-rating-row">
                  <h3 className="dg-designer-name">
                    {designer.designer?.profile?.businessName}
                  </h3>
                  <div className="dg-rating-badge">
                    <HiStar className="dg-star-icon" />
                    <span>{designer.designer?.profile?.ratingCount}</span>
                  </div>
                </div>

                <p className="dg-designer-specialty">
                  {designer.designer?.profile?.specialization}
                </p>
                <p className="dg-designer-desc">
                  {designer.designer?.profile?.shortBio}
                </p>

                <div className="dg-meta-row">
                  <span className="dg-meta-item">
                    <HiMapPin className="dg-pin-icon" />{" "}
                    {designer.designer?.profile?.state},
                    {designer.designer?.profile?.country}
                  </span>
                  <span className="dg-meta-divider">•</span>
                  <span className="dg-meta-item">{designer.orders}</span>
                </div>

                  <button 
                  onClick={() => {
                    console.log("Designer:", designer)
                    navigate(`/user/designer-profile/${designer.id}`);
                  }}   
                  className="dg-profile-btn"
                  >
                    View Profile
                  </button>
                
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default SavedDesign;
