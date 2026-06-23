import React, { useEffect, useState } from "react";
import { HiMapPin, HiStar, HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { FiSearch, FiSliders, FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../styles/DesignersGrid.css";

import { authApi } from "../config/auth";
import { customerApi } from "../config/customer";

const DEFAULT_CATEGORIES = [
  "All",
  "Traditional",
  "Bridal",
  "Corporate",
  "Casual",
  "Accessories",
];

const DEFAULT_CATEGORY_NAMES = new Set(
  DEFAULT_CATEGORIES.map((category) => category.toLowerCase()),
);

const DesignersGrid = () => {
  const [designers, setDesigners] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState({});
  const [loadingFav, setLoadingFav] = useState({});
  const [animatingHeart, setAnimatingHeart] = useState({});

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const normalizeCategory = (text) => {
    if (!text) return "";

    return String(text)
      .replace(/["'[\]]/g, "")
      .trim()
      .toLowerCase();
  };

  const fixCategoryTypo = (text) => {
    const map = {
      accesories: "accessories",
      accesory: "accessories",
      corporatc: "corporate",
    };

    return map[text] || text;
  };

  const formatCategory = (text) =>
    text
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const getDesignerCategories = (designer) => {
    const raw = designer.profile?.specialization;

    if (!raw) return [];

    let values = raw;

    if (!Array.isArray(values)) {
      const rawText = String(raw).trim();

      try {
        const parsed = JSON.parse(rawText);
        values = Array.isArray(parsed) ? parsed : rawText.split(",");
      } catch {
        values = rawText.split(",");
      }
    }

    return values
      .map(normalizeCategory)
      .filter(Boolean)
      .map(fixCategoryTypo)
      .map(formatCategory);
  };

  // ======================
  // SAVE / UNSAVE
  // ======================
  const toggleFavorite = async (designerId) => {
    if (!designerId || loadingFav[designerId]) return;

    setLoadingFav((prev) => ({
      ...prev,
      [designerId]: true,
    }));

    const isSaved = favorites[designerId];

    try {
      if (isSaved) {
        // UNSAVE
        await customerApi.removeDesigner(designerId);

        setFavorites((prev) => {
          const updated = { ...prev };
          delete updated[designerId];
          return updated;
        });

        Swal.fire({
          icon: "success",
          title: "Removed",
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        // SAVE
        await customerApi.saveDesigner(designerId);

        // update favorites
        setFavorites((prev) => ({
          ...prev,
          [designerId]: true,
        }));

        // 🔥 trigger pop AFTER icon is visible
        setTimeout(() => {
          setAnimatingHeart((prev) => ({
            ...prev,
            [designerId]: true,
          }));

          setTimeout(() => {
            setAnimatingHeart((prev) => ({
              ...prev,
              [designerId]: false,
            }));
          }, 600);
        }, 50);

        Swal.fire({
          icon: "success",
          title: "Saved",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Favorite Error:", error.response?.data || error);
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoadingFav((prev) => ({
        ...prev,
        [designerId]: false,
      }));
    }
  };

  // ======================
  // GET DESIGNERS
  // ======================
  const fetchDesigners = async () => {
    setLoading(true);

    try {
      const res = await authApi.allDesigners();
      const allDesigners = res.data.data;

      const verifiedDesigners = allDesigners.filter((designer) => {
        const profile = designer.profile || {};
        return (
          profile.isKycVerified === true ||
          profile.IsProfileCompleted === true ||
          profile.isProfileCompleted === true
        );
      });

      setDesigners(verifiedDesigners);

      const generatedCategories = [
        ...Array.from(
          new Set(
            verifiedDesigners.flatMap((designer) =>
              getDesignerCategories(designer),
            ),
          ),
        ).sort((a, b) => a.localeCompare(b)),
      ];

      const orderedCategories = [
        ...DEFAULT_CATEGORIES,
        ...generatedCategories.filter(
          (category) => !DEFAULT_CATEGORY_NAMES.has(category.toLowerCase()),
        ),
      ];

      if (generatedCategories.length > 1) {
        setCategories(orderedCategories);
      }
    } catch (error) {
      console.error("Fetch Designers Error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // GET SAVED DESIGNERS
  // ======================
  const fetchSavedDesigners = async () => {
    try {
      const res = await customerApi.savedDesigner();
      const saved = {};

      res.data.data.forEach((item) => {
        // Matches target designer ID schema
        const id = item.designerId || item._id;
        if (id) saved[id] = true;
      });

      setFavorites(saved);
    } catch (error) {
      console.error("Fetch Saved Error:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchDesigners();
    fetchSavedDesigners();
  }, []);

  // ======================
  // FILTER
  // ======================
  const filteredDesigners = designers.filter((designer) => {
    const name = designer.profile?.businessName?.toLowerCase() || "";
    const specialization = getDesignerCategories(designer)
      .join(" ")
      .toLowerCase();

    const searchMatch =
      name.includes(search.toLowerCase()) ||
      specialization.includes(search.toLowerCase());

    const categoryMatch =
      activeFilter === "All" ||
      specialization.includes(activeFilter.toLowerCase());

    return searchMatch && categoryMatch;
  });

  return (
    <div className="dg-page-wrapper">
      <main className="dg-main-content">
        {/* SEARCH */}
        <div className="top-search-filter-row">
          <div className="search-bar-input-box">
            <FiSearch className="search-input-icon" />

            <input
              type="text"
              placeholder="Search designers by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <p className="items-counter-caption">
          Showing {filteredDesigners.length} designers
        </p>

        {/* CATEGORIES */}
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
          <h4>Loading....</h4>
        ) : (
          <div className="dg-cards-grid">
            {filteredDesigners.map((designer) => {
              // Graceful fallback helper for database fields
              const designerId = designer._id || designer.id;

              return (
                <div key={designerId} className="dg-designer-card">
                  <div className="dg-card-image-wrap">
                    <img
                      src={designer.profile?.profilePhoto}
                      alt={designer.profile?.businessName}
                      className="dg-card-img"
                    />

                    <button
                      disabled={loadingFav[designerId]}
                      className={`dg-heart-btn ${
                        favorites[designerId] ? "is-active" : ""
                      } ${animatingHeart[designerId] ? "heart-pop" : ""}`}
                      onClick={() => toggleFavorite(designerId)}
                    >
                      {loadingFav[designerId] ? (
                        <FiLoader className="heart-spinner" />
                      ) : favorites[designerId] ? (
                        <HiHeart />
                      ) : (
                        <HiOutlineHeart />
                      )}
                    </button>
                  </div>

                  <div className="dg-card-info">
                    <div className="dg-name-rating-row">
                      <h3 className="dg-designer-name">
                        {designer.profile?.businessName}
                      </h3>

                      <div className="dg-rating-badge">
                        <HiStar />
                        <span>{designer.profile?.ratingCount || 0}</span>
                      </div>
                    </div>

                    <p className="dg-designer-specialty">
                      {getDesignerCategories(designer).join(", ")}
                    </p>

                    <p className="dg-designer-desc">
                      {designer.profile?.shortBio}
                    </p>

                    <div className="dg-meta-row">
                      <span className="dg-meta-item">
                        <HiMapPin />
                        {designer.profile?.state}, {designer.profile?.country}
                      </span>

                      <span className="dg-meta-divider">•</span>

                      <span className="dg-meta-item">
                        {designer.profile?.completedOrders || 0} orders
                      </span>
                    </div>

                    <button
                      className="dg-profile-btn"
                      onClick={() =>
                        navigate(`/user/designer-profile/${designerId}`)
                      }
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default DesignersGrid;
