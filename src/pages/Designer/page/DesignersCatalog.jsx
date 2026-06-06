import React, { useState } from "react";
import "../../../styles/DesignersCatalog.css";
import { 
  FiSearch, 
  FiSliders, 
  FiHeart, 
  FiShoppingBag 
} from "react-icons/fi";
import { 
  FaInstagram, 
  FaTwitter, 
  FaFacebookF, 
  FaLinkedinIn 
} from "react-icons/fa";

const DesignersCatalog = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filterCategories = ["All", "Traditional", "Bridal", "Corporate", "Casual", "Accessories"];

  // Placeholder catalog data reproducing values directly from your screen layout structure
  const catalogItems = [
    { id: 1, title: "Ankara dress", designer: "Chisom couture", price: 45000, imgUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500" },
    { id: 2, title: "Ankara dress", designer: "Chisom couture", price: 45000, imgUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500" },
    { id: 3, title: "Ankara dress", designer: "Chisom couture", price: 45000, imgUrl: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?w=500" },
    { id: 4, title: "Ankara dress", designer: "Chisom couture", price: 45000, imgUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500" },
    { id: 5, title: "Ankara dress", designer: "Chisom couture", price: 45000, imgUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500" },
    { id: 6, title: "Ankara dress", designer: "Chisom couture", price: 45000, imgUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500" },
    { id: 7, title: "Ankara dress", designer: "Chisom couture", price: 35000, imgUrl: "https://images.unsplash.com/photo-1549064482-6779ba3292fe?w=500" },
    { id: 8, title: "Velvet dress", designer: "Matthew Sothis", price: 300000, imgUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500" },
    { id: 9, title: "Ankara dress", designer: "Chisom couture", price: 45000, imgUrl: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=500" },
  ];

  return (
    <div className="catalog-outer-container">
      {/* Top Search Operations Header Bar Section */}
      <div className="catalog-search-header">
        <div className="search-bar-input-box">
          <FiSearch className="search-input-icon" />
          <input type="text" placeholder="Search designs by name..." />
        </div>
        <button className="catalog-filter-trigger-btn">
          <FiSliders size={14} /> Filters
        </button>
      </div>

      <p className="items-counter-caption">Showing 9 designers</p>

      {/* Categories Horizontally Scrollable Bar Links Selection */}
      <div className="categories-pill-row">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            className={`category-pill-btn ${activeFilter === cat ? "pill-active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Primary Display Products Dynamic Auto Responsive Grid Block */}
      <div className="catalog-products-grid">
        {catalogItems.map((item) => (
          <div key={item.id} className="product-showcase-card">
            
            <div className="card-media-wrapper">
              <img src={item.imgUrl} alt={item.title} className="product-thumbnail-img" />
              <button className="floating-heart-favorite-icon" aria-label="Add to wishlist">
                <FiHeart size={15} />
              </button>
            </div>

            <div className="card-textual-details">
              <div className="details-left-metadata">
                <h3 className="apparel-display-heading">{item.title}</h3>
                <p className="designer-sub-title">by {item.designer}</p>
                <span className="price-numeric-tag">&#8358;{item.price.toLocaleString()}</span>
              </div>
              <button className="cart-action-square-btn" aria-label="View product workspace">
                <FiShoppingBag size={15} />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Webapp Sticky-base Universal Footer Component styling references */}
      <footer className="catalog-bottom-footer">
        <div className="footer-alignment-box">
          <p className="legal-copyright-claim">&copy; 2026 Stichsure. All rights reserved.</p>
          <div className="footer-socials-wrapper-row">
            <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
            <a href="#twitter" aria-label="Twitter"><FaTwitter /></a>
            <a href="#facebook" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#linkedin" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DesignersCatalog;