import React, { useEffect, useState } from "react";
import { HiMapPin, HiStar, HiOutlineHeart, HiHeart } from "react-icons/hi2";

import { FiSearch, FiSliders } from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";

import "../styles/DesignersGrid.css";

import { authApi } from "../config/auth";

const DesignersGrid = () => {
  const [designers, setDesigners] = useState([]);

  const [categories, setCategories] = useState(["All"]);

  const [activeFilter, setActiveFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const fetchDesigners = async () => {
    setLoading(true);
    try {
      const res = await authApi.allDesigners();

      const allDesigners = res.data.data;
      console.log("allDesigners", allDesigners);

      const verifiedDesigners = allDesigners.filter((designer) => {
        const profile = designer.profile || {};
        return (
          profile.isKycVerified === true ||
          profile.IsProfileCompleted === true ||
          profile.isProfileCompleted === true
        );
      });

      setDesigners(verifiedDesigners);

      console.log(verifiedDesigners.length);

      const generatedCategories = [
        "All",
        ...new Set(
          verifiedDesigners.flatMap((designer) =>
            (designer.profile?.specialization || "")
              .split(",")
              .map((spec) => spec.trim())
              .filter(Boolean),
          ),
        ),
      ];

      setCategories(generatedCategories);
    } catch (error) {
      console.log(error.response?.data);
    }
    setLoading(false);
  };

  const filteredDesigners = designers.filter((designer) => {
    const name = designer.profile?.businessName?.toLowerCase() || "";

    const specialization =
      designer.profile?.specialization?.toLowerCase() || "";

    const searchMatch =
      name.includes(search.toLowerCase()) ||
      specialization.includes(search.toLowerCase());

    const categoryMatch =
      activeFilter === "All" ||
      specialization.includes(activeFilter.toLowerCase());

    return searchMatch && categoryMatch;
  });

  useEffect(() => {
    fetchDesigners();
  }, []);
  const navigate = useNavigate();

  return (
    <div className="dg-page-wrapper">
      <main className="dg-main-content">
        {/* SEARCH */}

        <div className="top-search-filter-row">
          <div className="search-bar-input-box">
            <FiSearch className="search-input-icon" />

            <input
              type="text"
              placeholder="Search designers by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="catalog-filter-trigger-btn">
              <FiSliders size={18} />
              Filters
            </button>
          </div>
        </div>

        <p className="items-counter-caption">
          Showing {filteredDesigners.length} designers
        </p>

        <div className="categories-pill-row">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-pill-btn ${
                activeFilter === category ? "pill-active" : ""
              }`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* CARDS */}

        {loading ? (
          <div>
            <h4>Loading....</h4>
          </div>
        ) : (
          <div className="dg-cards-grid">
            {filteredDesigners.map((designer) => (
              <div key={designer.id} className="dg-designer-card">
                <div className="dg-card-image-wrap">
                  <img
                    src={designer.profile?.profilePhoto}
                    alt={designer.profile?.businessName}
                    className="dg-card-img"
                  />

                  <button
                    className={`dg-heart-btn ${
                      favorites[designer.id] ? "is-active" : ""
                    }`}
                    onClick={() => toggleFavorite(designer.id)}
                  >
                    {favorites[designer.id] ? <HiHeart /> : <HiOutlineHeart />}
                  </button>
                </div>

                <div className="dg-card-info">
                  <div className="dg-name-rating-row">
                    <h3 className="dg-designer-name">
                      {designer.profile?.businessName}
                    </h3>

                    <div className="dg-rating-badge">
                      <HiStar className="dg-star-icon" />

                      <span>{designer.profile?.ratingCount || 0}</span>
                    </div>
                  </div>

                  <p className="dg-designer-specialty">
                    {designer.profile?.specialization}
                  </p>

                  <p className="dg-designer-desc">
                    {designer.profile?.shortBio}
                  </p>

                  <div className="dg-meta-row">
                    <span className="dg-meta-item">
                      <HiMapPin className="dg-pin-icon" />

                      {designer.profile?.currentHouseAddress}
                    </span>

                    <span className="dg-meta-divider">•</span>

                    <span className="dg-meta-item">
                      {designer.profile?.completedOrders || 0} orders
                    </span>
                  </div>

                  <button
                    className="dg-profile-btn"
                    onClick={() =>
                      navigate(`/user/designer-profile/${designer.id}`)
                    }
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DesignersGrid;
