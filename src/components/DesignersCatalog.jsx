import React, { useEffect, useState } from "react";
import "../styles/DesignersCatalog.css";
import { FiSearch, FiSliders, FiHeart, FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import beautifullace from "../assets/daniel/beautifullace.png";
import frame from "../assets/daniel/Framelace.png";
import green from "../assets/daniel/Greensenate.png";
import Brown from "../assets/daniel/Brownfit.png";
import Purple from "../assets/daniel/PurpleAkara.png";
import wine from "../assets/daniel/wine.png";
import native from "../assets/daniel/native.png";
import white from "../assets/daniel/whitenative.png";
import children from "../assets/daniel/childrenAnkara.png";
import { ApiClient } from "../config/AxiosInstance";
import { authApi } from "../config/customer";
import Designer from "./Designer";

const DesignersCatalog = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState({});
  const [designers, setDesigners] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filterCategories = [
    "All",
    "Traditional",
    "Bridal",
    "Corporate",
    "Casual",
    "Accessories",
  ];

  const catalogItems = [
    {
      id: 1,
      title: "Ankara dress",
      designer: "Chisom couture",
      price: 45000,
      imgUrl: beautifullace,
    },
    {
      id: 2,
      title: "Ankara dress",
      designer: "Chisom couture",
      price: 45000,
      imgUrl: frame,
    },
    {
      id: 3,
      title: "Ankara dress",
      designer: "Chisom couture",
      price: 45000,
      imgUrl: green,
    },
    {
      id: 4,
      title: "Ankara dress",
      designer: "Chisom couture",
      price: 45000,
      imgUrl: Brown,
    },
    {
      id: 5,
      title: "Ankara dress",
      designer: "Chisom couture",
      price: 45000,
      imgUrl: native,
    },
    {
      id: 6,
      title: "Ankara dress",
      designer: "Chisom couture",
      price: 45000,
      imgUrl: Purple,
    },
    {
      id: 7,
      title: "Ankara dress",
      designer: "Chisom couture",
      price: 35000,
      imgUrl: wine,
    },
    {
      id: 8,
      title: "Velvet dress",
      designer: "Matthew Sothis",
      price: 300000,
      imgUrl: white,
    },
    {
      id: 9,
      title: "Ankara dress",
      designer: "Chisom couture",
      price: 45000,
      imgUrl: children,
    },
  ];

  const FetchData = async () => {
    try {
      const response = await authApi.design();
      console.log("response", response);
      console.log("response", response.data);
      console.log("respse", response.data.data);

      setDesigners(response.data.data);
      console.log("designers", designers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    console.log("designers updated:", designers);
  }, [designers]);

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
      <div className="catalog-products-grid">
        {designers.map((item) => (
          <div key={item.id} className="product-showcase-card">
            <div className="card-media-wrapper">
              <img
                src={item.designImage}
                alt="designs"
                className="product-thumbnail-img"
              />
              <button
                className={`floating-heart-favorite-icon ${favorites[item.id] ? "is-active" : ""}`}
                onClick={() => toggleFavorite(item.id)}
                aria-label="Add to wishlist"
              >
                {favorites[item.id] ? (
                  <FaHeart size={15} />
                ) : (
                  <FiHeart size={15} />
                )}
              </button>
            </div>

            <div className="card-textual-details">
              <div className="details-left-metadata">
                <h3 className="apparel-display-heading">{item.designTitle}</h3>
                <p className="designer-sub-title">by {item.designer}</p>
                <span className="price-numeric-tag">&#8358;{item.price}</span>
              </div>
              <button
                className="cart-action-square-btn"
                aria-label="View product workspace"
              >
                <FiShoppingBag size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignersCatalog;
