import React from "react";
import { HiMapPin, HiStar, HiOutlineHeart } from "react-icons/hi2";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import "../../../styles/DesignerGrid.css";

 function DesignersGrid() {
  const designers = [
    {
      id: 1,
      name: "Adebayo Styles",
      specialty: "Traditional Wear",
      rating: "4.9",
      description: "Specialist in Yoruba traditional attire with 15+ years experience",
      location: "Lagos",
      orders: "156 orders",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Chioma Couture",
      specialty: "Bridal Fashion",
      rating: "5",
      description: "Award-winning bridal designer creating dream wedding outfits",
      location: "Abuja",
      orders: "211 orders",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Emeka Tailoring",
      specialty: "Corporate Attire",
      rating: "4.8",
      description: "Premium corporate suits and professional menswear tailoring",
      location: "Port Harcourt",
      orders: "98 orders",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      name: "Grace Fashion House",
      specialty: "Casual Wear",
      rating: "4.6",
      description: "Contemporary casual styles for the modern day individual",
      location: "Ibadan",
      orders: "142 orders",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      name: "Kings Couture",
      specialty: "Traditional Wear",
      rating: "5",
      description: "Master craftsman in all traditional Nigerian styles and fittings",
      location: "Lagos",
      orders: "178 orders",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80"
    },
    {
      id: 6,
      name: "Bella Bridal",
      specialty: "Bridal Fashion",
      rating: "4.7",
      description: "Elegant and sophisticated bridal collections for custom orders",
      location: "Enugu",
      orders: "96 orders",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="dg-page-wrapper">
      <main className="dg-main-content">
        <div className="dg-cards-grid">
          {designers.map((designer) => (
            <div key={designer.id} className="dg-designer-card">
              <div className="dg-card-image-wrap">
                <img src={designer.image} alt={designer.name} className="dg-card-img" />
                <button className="dg-heart-btn" aria-label="Favorite">
                  <HiOutlineHeart />
                </button>
              </div>

              <div className="dg-card-info">
                <div className="dg-name-rating-row">
                  <h3 className="dg-designer-name">{designer.name}</h3>
                  <div className="dg-rating-badge">
                    <HiStar className="dg-star-icon" />
                    <span>{designer.rating}</span>
                  </div>
                </div>

                <p className="dg-designer-specialty">{designer.specialty}</p>
                <p className="dg-designer-desc">{designer.description}</p>

                <div className="dg-meta-row">
                  <span className="dg-meta-item">
                    <HiMapPin className="dg-pin-icon" /> {designer.location}
                  </span>
                  <span className="dg-meta-divider">•</span>
                  <span className="dg-meta-item">{designer.orders}</span>
                </div>

                <button className="dg-profile-btn">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="dg-footer">
        <div className="dg-footer-inner">
          <p className="dg-copyright">© 2026 Stichsure. All rights reserved.</p>
          <div className="dg-footer-socials">
            <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
            <a href="#twitter" aria-label="Twitter"><FaTwitter /></a>
            <a href="#facebook" aria-label="Facebook"><FaFacebook /></a>
            <a href="#linkedin" aria-label="Linkedin"><FaLinkedin /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default DesignersGrid