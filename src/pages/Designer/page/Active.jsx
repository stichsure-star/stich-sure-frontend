import { useEffect, useState } from "react";
import "../css/ActiveOrder.css";
import { useNavigate } from "react-router-dom";
import { designerApi } from "../../../config/designer";
import { useSelector } from "react-redux";
import { SkeletonTableRows } from "../../../components/reuasbleComponents/Skeleton";

// // Kept lowercase to match your API requirements perfectly
// const tabs = ["new", "preparing", "ready", "completed"];

export default function Orders() {
  // FIX: Default state changed to lowercase "new" to match tabs array
  const [active, setActive] = useState("new");
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const designerId = user?.id;

  const handleSubmit = async () => {
    try {
      if (!designerId) return;

      setLoading(true);
      const response = await designerApi.allAders(designerId);

      console.log("Full Axios Response Structure:", response);

      // FIX: Cleaned up the duplicate setOrdersData overrides
      const fetchedData = response.data?.data || [];
      setOrdersData(fetchedData);
    } catch (error) {
      console.error("API Fetch Error:", error);
      setOrdersData([]); // Fail-safe fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit(active);
  }, [active, designerId]);

  return (
    <div className="collab_container">
      {/* TITLE */}
      <div className="collab_header" style={{ textTransform: "capitalize" }}>
        Active Order — {active}
      </div>

      {/* SEARCH */}
      <div className="collab_search">
        <input className="collab_searcher" placeholder="Search" />
      </div>

      {/* TABS */}
      {/* <div className="collab_tabs">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`collab_tab ${active === t ? "active" : ""}`}
            style={{ textTransform: "capitalize" }} // Keeps display beautiful while value stays lowercase
          >
            {t}
          </button>
        ))}
      </div> */}

      {/* TABLE HEADER */}
      <div className="collab_tableHeader">
        <div>Order ID</div>
        <div>Time placed</div>
        <div>Customer</div>
        <div>Item</div>
        <div>Order Value</div>
      </div>

      {/* TABLE BODY */}
      <div className="collab_tableBody">
        {loading ? (
          <SkeletonTableRows rows={5} cols={5} />
        ) : ordersData.length === 0 ? (
          <p style={{ padding: "20px", textAlign: "center" }}>
            No orders found
          </p>
        ) : (
          ordersData.map((o) => (
            <div
              className="collab_row"
              key={o.id}
              onClick={() =>
                navigate("/designer/mvp", {
                  state: {
                    orderId: o.id,
                  },
                })
              }
            >
              <div>{o.orderNumber || "—"}</div>
              <div>
                {o.placedAt
                  ? new Date(o.placedAt).toLocaleDateString("en-NG", {
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </div>

              {/* Customer Safe Drill */}
              <div>
                {o.customer
                  ? `${o.customer.firstName || ""} ${o.customer.lastName || ""}`.trim() ||
                    o.customer.email
                  : "Unknown"}
              </div>

              <div>{o.itemName || "Custom Item"}</div>
              <div>₦{Number(o.amount).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
