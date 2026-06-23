import React, { useEffect, useState } from "react";
// import "../styles/DesignersCatalog.css";
import "../styles/designers-upload-catlog.css";
import { FiSearch, FiSliders } from "react-icons/fi";
// import { FaHeart } from "react-icons/fa";
// import { authApi } from "../config/customer";
// import vid from "../assets/gbenga/Repeater-Animation.mp4";
import { useSelector } from "react-redux";
import { customerApi } from "../config/customer";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";

const DesignersUploadCatlog = () => {
  const user = useSelector((state) => state.auth.user);
  const [activeFilter, setActiveFilter] = useState("All");
  //   const [favorites, setFavorites] = useState({});
  const [design, setcartd] = useState([]);
  const [category, setCategory] = useState(["All"]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  //   const toggleFavorite = (id) => {
  //     setFavorites((prev) => ({
  //       ...prev,
  //       [id]: !prev[id],
  //     }));
  //   };

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

  const matchesSearch = item.designTitle
    ?.toLowerCase()
    .includes(search.toLowerCase());

  return matchesCategory && matchesSearch;
});

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
              activeFilter === cat ? "pill-active" : ""
            }`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}

      <div className="catalog-products-grid">
        {filteredDesigns.map((design) => (
          <div key={design.id} className="product-showcase-card">
            <div className="card-media-wrapper">
              <img
                src={design.designImage}
                alt="design"
                className="product-thumbnail-img"
              />
            </div>

            <div className="card-textual-details">
              <div className="details-left-metadata">
                <h3 className="apparel-display-heading">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignersUploadCatlog;
