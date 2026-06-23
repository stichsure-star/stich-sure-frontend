import { useEffect, useState } from "react";
import "../css/ActiveOrder.css";
import { useNavigate } from "react-router-dom";
import { designerApi } from "../../../config/designer";
import { useSelector } from "react-redux";
import { SkeletonTableRows } from "../../../components/reuasbleComponents/Skeleton";

const tabs = ["New", "Preparing", "Ready", "Completed"];

export default function Orders() {
  const [active, setActive] = useState("New");
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const userId = user?.id;

  const handleSubmit = async (status) => {
    try {
      if (!userId) return;

      setLoading(true);

      const response = await designerApi.allAders(userId, status);

      console.log("orders response", response.data);

      setOrdersData(response.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("ordersData", ordersData);

  useEffect(() => {
    handleSubmit(active);
  }, [active, userId]);

  return (
    <div className="collab_container">
      {/* TITLE */}
      <div className="collab_header">Active Order — {active}</div>

      {/* SEARCH */}
      <div className="collab_search">
        <input className="collab_searcher" placeholder="Search" />
      </div>

      {/* TABS */}
      <div className="collab_tabs">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`collab_tab ${active === t ? "active" : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TABLE HEADER */}
      <div className="collab_tableHeader">
        <div>Order ID</div>
        <div>Time placed</div>
        <div>Customer</div>
        <div>Item</div>
        <div>Order Value</div>
      </div>

      {/* TABLE BODY */}
      {/* TABLE BODY */}
      <div className="collab_tableBody">
        {loading ? (
          <SkeletonTableRows rows={5} cols={5} />
        ) : ordersData.length === 0 ? (
          <p style={{ padding: "20px" }}>No orders found</p>
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
              <div>{o.orderNumber}</div>
              <div>{o.placedAt}</div>

              {/* FIX: Access the name properties on the customer object safely */}
              <div>
                {o.customer
                  ? `${o.customer.firstName || ""} ${o.customer.lastName || ""}`.trim() ||
                    o.customer.email
                  : "Unknown"}
              </div>

              <div>{o.itemName}</div>
              <div>{o.amount}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
