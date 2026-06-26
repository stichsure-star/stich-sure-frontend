import React, { useEffect, useState } from "react";
import "../styles/designers-upload-catlog.css";
import { FiSearch, FiUpload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { designerApi } from "../config/designer";
import Swal from "sweetalert2";

const DesignersUploadCatlog = () => {
  const user = useSelector((state) => state.auth.user);
  const [activeFilter, setActiveFilter] = useState("All");
  const [cartd, setcartd] = useState([]);
  const [category, setCategory] = useState(["All"]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const designerId = user?.id;

  const allDes = async () => {
    if (!designerId) return;
    try {
      setLoading(true);

      // FIX: Added a cache-busting timestamp parameter (?t=...)
      const response = await designerApi.allDesigns(designerId, {
        params: { t: new Date().getTime() },
      });

      const designsData = response.data?.data || response.data || [];
      setcartd(designsData);

      const uniqueCategories = [
        "All",
        ...new Set(designsData.map((item) => item.category).filter(Boolean)),
      ];
      setCategory(uniqueCategories);
    } catch (error) {
      console.error("Error fetching catalog designs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allDes();
  }, [designerId]);

  const filteredDesigns = cartd.filter((item) => {
    const matchesCategory =
      activeFilter === "All" ||
      item.category?.trim().toLowerCase() === activeFilter.trim().toLowerCase();

    const matchesSearch = item.designTitle
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleDelete = async (id, e) => {
    e.stopPropagation();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this design deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7a0018",
      cancelButtonColor: "#555555",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await designerApi.delTe(id);

        // Optional: Wait 500ms for MongoDB Atlas node replication if needed
        await new Promise((resolve) => setTimeout(resolve, 500));

        setcartd((prevDesigns) =>
          prevDesigns.filter((item) => item.id !== id && item._id !== id),
        );

        Swal.fire({
          title: "Deleted!",
          text: "Your design has been removed from your catalog.",
          icon: "success",
          confirmButtonColor: "#7a0018",
        });
      } catch (error) {
        console.error("Failed to delete design:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while trying to delete this design.",
          icon: "error",
          confirmButtonColor: "#7a0018",
        });
      }
    }
  };

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

      {/* PRODUCTS OR EMPTY STATE CONFIGURATION */}
      {loading ? (
        <p
          className="items-counter-caption"
          style={{ textAlign: "center", padding: "2rem" }}
        >
          Loading your designs...
        </p>
      ) : filteredDesigns.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#8a8a8a" }}>
          <p>No designs found matching your current selections.</p>
        </div>
      ) : (
        <div className="catalog-products-grid">
          {filteredDesigns.map((designItem) => {
            const currentId = designItem.id || designItem._id;
            return (
              <div key={currentId} className="product-showcase-card">
                <div className="card-media-wrapper">
                  <button
                    className="catalog-trash-action-btn"
                    onClick={(e) => handleDelete(currentId, e)}
                    title="Delete Design"
                  >
                    <FaRegTrashAlt size={16} />
                  </button>
                  <img
                    src={designItem.designImage}
                    alt={designItem.designTitle || "design"}
                    className="product-thumbnail-img"
                  />
                </div>
                <div className="card-textual-details">
                  <div className="details-left-metadata">
                    <h3 className="apparel-display-heading">
                      {designItem.designTitle}
                    </h3>
                    <p className="designer-sub-title">
                      {designItem.description}
                    </p>
                    <span className="price-numeric-tag">
                      ₦
                      {new Intl.NumberFormat("en-NG").format(
                        designItem.price || 0,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DesignersUploadCatlog;
