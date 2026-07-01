import React, { useEffect, useState } from "react";
import { HiMapPin, HiStar } from "react-icons/hi2";
import "../styles/SavedDesign.css";
import { useNavigate } from "react-router-dom";
import { customerApi } from "../config/customer";
import { SkeletonCardGrid } from "./reuasbleComponents/Skeleton";
import { PropagateLoader } from "react-spinners";

function SavedDesign() {
  const navigate = useNavigate();
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await customerApi.savedDesigner();
      console.log("response", response);
      // Fallback to empty array if data structure nested irregularly
      setDesigners(response?.data?.data || response?.data || []);
    } catch (error) {
      console.error("Error fetching saved designers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dg-page-wrapper">
      <main className="dg-main-content">
        {loading ? (
          // 1. Show skeleton cards while data network request runs
          <SkeletonCardGrid count={6} />
        ) : designers.length === 0 ? (
          // 2. Clear empty fallback state view layout
          <div className="Loader">
            <h3>No saved designers yet</h3>
            <p>Designers you save will show up right here.</p>
            <PropagateLoader size={30} />
          </div>
        ) : (
          // 3. Render list normally if array has elements
          <div className="dg-cards-grid">
            {designers?.map((designer) => (
              <div key={designer.id} className="dg-designer-card">
                <div className="dg-card-image-wrap">
                  <img
                    src={
                      designer.designer?.profile?.profilePhoto ||
                      "https://via.placeholder.com/150"
                    }
                    alt={designer.designer?.profile?.businessName || "Designer"}
                    className="dg-card-img"
                  />
                </div>

                <div className="dg-card-info">
                  <div className="dg-name-rating-row">
                    <h3 className="dg-designer-name">
                      {designer.designer?.profile?.businessName ||
                        "Unknown Brand"}
                    </h3>
                    <div className="dg-rating-badge">
                      <HiStar className="dg-star-icon" />
                      <span>
                        {designer.designer?.profile?.ratingCount || 0}
                      </span>
                    </div>
                  </div>

                  <p className="dg-designer-specialty">
                    {designer.designer?.profile?.specialization ||
                      "Fashion Designer"}
                  </p>
                  <p className="dg-designer-desc">
                    {designer.designer?.profile?.shortBio ||
                      "No bio description provided."}
                  </p>

                  <div className="dg-meta-row">
                    <span className="dg-meta-item">
                      <HiMapPin className="dg-pin-icon" />{" "}
                      {designer.designer?.profile?.state || "Lagos"},{" "}
                      {designer.designer?.profile?.country || "Nigeria"}
                    </span>
                    <span className="dg-meta-divider">•</span>
                    <span className="dg-meta-item">
                      {designer.orders || 0} orders completed
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      console.log(
                        "Selected Designer context tracking:",
                        designer,
                      );
                      // Best practice: redirecting to the actual designer context account ID
                      const profileId =
                        designer.designerId ||
                        designer.designer?.id ||
                        designer.id;
                      navigate(`/user/designer-profile/${profileId}`);
                    }}
                    className="dg-profile-btn"
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
}

export default SavedDesign;
