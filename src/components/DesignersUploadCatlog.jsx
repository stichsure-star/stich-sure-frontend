import React, { useEffect, useState } from "react";
import "../styles/designers-upload-catlog.css";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";

const DesignersUploadCatlog = () => {
  const user = useSelector((state) => state.auth.user);
  const [activeFilter, setActiveFilter] = useState("All");
<<<<<<< HEAD
  const [cartd, setcartd] = useState([]);
=======
  //   const [favorites, setFavorites] = useState({});
  const [design, setcartd] = useState([]);
>>>>>>> a2495b82c7a55b2c5281fb859a6a166522809757
  const [category, setCategory] = useState(["All"]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.designs) {
      setcartd(user.designs);

<<<<<<< HEAD
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
=======
  const FetchData = async () => {
    setLoading(true);
    try {
      const response = await customerApi.design(data);

      const designs = response.data.data;

      console.log("designs:", designs);

      const myDesigns = designs.filter((item) => item.designerId === user?.id);

      setcartd(myDesigns);

      // get unique categories from array
      const categories = [
        "All",
        ...new Set(myDesigns.map((item) => item.category)),
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
  const filteredDesigns = (user.designs || []).filter((item) => {
  const matchesCategory =
    activeFilter === "All" || item.category === activeFilter;
>>>>>>> a2495b82c7a55b2c5281fb859a6a166522809757

  const matchesSearch = item.designTitle
    ?.toLowerCase()
    .includes(search.toLowerCase());

  return matchesCategory && matchesSearch;
});

<<<<<<< HEAD
=======
console.log("user designs", user?.designs);
console.log("design", design);
console.log("filteredDesigns", filteredDesigns);

  //   console.log("design", design.id);

  //   console.log("design", design);

  //   if (loading) {
  //     return (
  //       <div className="loading">
  //         <video autoPlay loop muted className="loadined">
  //           <source src={vid} type="video/mp4" className="loadined" />
  //         </video>
  //       </div>
  //     );
  //   }

  console.log("user", user);

>>>>>>> a2495b82c7a55b2c5281fb859a6a166522809757
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
<<<<<<< HEAD
        {filteredDesigns.map((designItem) => (
          <div key={designItem.id} className="product-showcase-card">
            <div className="card-media-wrapper">
              <img
                src={designItem.designImage}
=======
        {filteredDesigns.map((design) => (
          <div key={design.id} className="product-showcase-card">
            <div className="card-media-wrapper">
              <img
                src={design.designImage}
>>>>>>> a2495b82c7a55b2c5281fb859a6a166522809757
                alt="design"
                className="product-thumbnail-img"
              />
            </div>

            <div className="card-textual-details">
              <div className="details-left-metadata">
                <h3 className="apparel-display-heading">
<<<<<<< HEAD
                  {designItem.designTitle}
                </h3>
                <p className="designer-sub-title"> {designItem.description}</p>
                <span className="price-numeric-tag">₦{designItem.price}</span>
              </div>
=======
                  {design.designTitle}
                  </h3>

                <p className="designer-sub-title"> 
                  {design.description}
                  </p>

                <span className="price-numeric-tag">
                  ₦
                  {design.price}
                  </span>
              </div>

              {/* <button
                className="cart-action-square-btn"
                onClick={() => {
                  console.log("CLICK CARD:", design);

                  navigate(`/user/requiredetails/${design.designerId}`, {
                    state: {
                      designId: design.id,
                      designerId: design.designerId,
                      itemName: design.designTitle,
                      amount: design.price,
                    },
                  });
                }}
              >
                <FiShoppingBag size={15} />
              </button> */}
>>>>>>> a2495b82c7a55b2c5281fb859a6a166522809757
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignersUploadCatlog;
