import React, { useEffect, useState } from "react";
import "../styles/designers-upload-catlog.css";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";

const DesignersUploadCatlog = () => {
  const user = useSelector((state) => state.auth.user);
  const [activeFilter, setActiveFilter] = useState("All");
  const [cartd, setcartd] = useState([]);
  const [category, setCategory] = useState(["All"]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.designs) {
      setcartd(user.designs);

      // Extract categories exactly as they are written in the database
      const uniqueCategories = [
        "All",
        ...new Set(user.designs.map((item) => item.category).filter(Boolean)),
      ];
      setCategory(uniqueCategories);
    }
  }, [user]);

  const filteredDesigns = cartd.filter((item) => {
    const matchesCategory =
      activeFilter === "All" ||
      item.category?.trim().toLowerCase() === activeFilter.trim().toLowerCase();

    const matchesSearch = item.designTitle
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="designer-upload-catalog catalog-outer-container">
      <div className="catalog-search-header">
        <div className="search-bar-input-box">
          <FiSearch className="search-input-icon" />
          <input
            type="text"
            placeholder="Search your designs by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="catalog-filter-trigger-btn"
          onClick={() => navigate("/designer/upload")}
        >
          <FiUpload size={14} />
          Add Design
        </button>
      </div>

      <p className="items-counter-caption">
        Showing {filteredDesigns.length} designs
      </p>

      {/* CATEGORY BUTTONS */}
      <div className="categories-pill-row">
        {category.map((cat) => (
          <button
            key={cat}
            className={`category-pill-btn ${
              // FIX: Ensure active button styling works regardless of string casing variations
              activeFilter.toLowerCase() === cat.toLowerCase()
                ? "pill-active"
                : ""
            }`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="catalog-products-grid">
        {filteredDesigns.map((designItem) => (
          <div key={designItem.id} className="product-showcase-card">
            <div className="card-media-wrapper">
              <img
                src={designItem.designImage}
                alt="design"
                className="product-thumbnail-img"
              />
            </div>

            <div className="card-textual-details">
              <div className="details-left-metadata">
                <h3 className="apparel-display-heading">
                  {designItem.designTitle}
                </h3>
                <p className="designer-sub-title"> {designItem.description}</p>
                <span className="price-numeric-tag">₦{designItem.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignersUploadCatlog;
