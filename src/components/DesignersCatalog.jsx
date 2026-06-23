import React, { useEffect, useState } from "react";
import "../styles/DesignersCatalog.css";
import { FiSearch, FiSliders, FiHeart, FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { customerApi } from "../config/customer";
import { SkeletonCardGrid } from "./reuasbleComponents/Skeleton";
import { useNavigate } from "react-router-dom";

const DesignersCatalog = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState({});
  const [cartd, setcartd] = useState([]);
  const [category, setCategory] = useState(["All"]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const goToRequestDetails = (item) => {
    console.log("CLICK CARD:", item);

    navigate(`/user/requiredetails/${item.designerId}`, {
      state: {
        designId: item.id,
        designerId: item.designerId,
        itemName: item.designTitle,
        amount: Number(item.price),
        design: item.designImage,
      },
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const FetchData = async () => {
    setLoading(true);
    try {
      const response = await customerApi.design();

      const designs = response.data.data;

      console.log("designs:", designs);

      setcartd(designs);

      // get unique categories from array
      const categories = [
        "All",
        ...new Set(designs.map((item) => item.category)),
      ];

      setCategory(categories);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  // filter designs by category
  // filter by category + search
  const filteredDesigns = cartd.filter((item) => {
    console.log("CHECK:", item.category, activeFilter);

    const matchesCategory =
      activeFilter === "All" || item.category === activeFilter;

    const matchesSearch = item.designTitle
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });
  console.log("ACTIVE FILTER:", activeFilter);
  console.log("CATEGORIES:", category);
  console.log("SAMPLE ITEM:", cartd[0]);
  console.log("cartd", cartd.id);

  console.log("cartd", cartd);

  if (loading) {
    return (
      <div className="catalog-outer-container">
        <SkeletonCardGrid count={8} />
      </div>
    );
  }

  return (
    <div className="catalog-outer-container">
      <div className="catalog-search-header">
        <div className="search-bar-input-box">
          <FiSearch className="search-input-icon" />
          <input
            type="text"
            placeholder="Search designs by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="catalog-filter-trigger-btn">
          <FiSliders size={14} />
          Filters
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
              activeFilter === cat ? "pill-active" : ""
            }`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}

      {/* PRODUCTS */}
      <div className="catalog-products-grid">
        {filteredDesigns.map((design) => (
          <div
            key={`${design.id}-${design.designerId}`}
            className="product-showcase-card"
          >
            <div className="card-media-wrapper">
              <img
                src={design.designImage}
                alt={design.designTitle || "design"}
                className="product-thumbnail-img"
                onClick={() => goToRequestDetails(design)}
              />
            </div>

            <div className="card-textual-details">
              <div className="details-left-metadata">
                <h3 className="apparel-display-heading">
                  {design.designTitle}
                </h3>

                <p className="designer-sub-title">
                  by{" "}
                  {design.designer?.profile?.businessName || "Unknown Designer"}
                </p>

                <span className="price-numeric-tag">₦{design.price}</span>
              </div>

              <button
                className="cart-action-square-btn"
                onClick={() => goToRequestDetails(design)}
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
