import React, { useEffect, useState } from "react";
import "../styles/designers-upload-catlog.css";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { designerApi } from "../config/designer";
import Swal from "sweetalert2"; // IMPORT SWEETALERT

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

  // const allDes = async ()=>{
  //   try {
  //     const respone
  //   } catch (error) {

  //   }
  // }

  const filteredDesigns = cartd.filter((item) => {
    const matchesCategory =
      activeFilter === "All" ||
      item.category?.trim().toLowerCase() === activeFilter.trim().toLowerCase();

    const matchesSearch = item.designTitle
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // UPDATED: SweertAlert2 Implementation
  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Prevents click bubbling to card wrappers

    // SweetAlert Confirmation Modal
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this design deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7a0018", // Matching your catalog action color
      cancelButtonColor: "#555555",
      confirmButtonText: "Yes, delete it!",
    });

    // If user clicks "Yes, delete it!"
    if (result.isConfirmed) {
      try {
        await designerApi.delTe(id);

        // Instantly update UI state
        setcartd((prevDesigns) => prevDesigns.filter((item) => item.id !== id));

        // SweetAlert Success Modal
        Swal.fire({
          title: "Deleted!",
          text: "Your design has been removed from your catalog.",
          icon: "success",
          confirmButtonColor: "#7a0018",
        });
      } catch (error) {
        console.error("Failed to delete design:", error);

        // SweetAlert Error Modal
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

      {/* PRODUCTS */}
      <div className="catalog-products-grid">
        {filteredDesigns.map((designItem) => (
          <div key={designItem.id} className="product-showcase-card">
            <div className="card-media-wrapper">
              {/* DELETE BUTTON FIXED TOP LEFT */}
              <button
                className="catalog-trash-action-btn"
                onClick={(e) => handleDelete(designItem.id, e)}
                title="Delete Design"
              >
                <FaRegTrashAlt size={16} />
              </button>
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
