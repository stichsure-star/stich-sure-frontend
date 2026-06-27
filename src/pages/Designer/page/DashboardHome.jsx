import "../../Designer/css/DashboardHome.css";
import { TbCubeSpark } from "react-icons/tb";
import { LuDollarSign } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { designerApi } from "../../../config/designer";
import { useEffect, useState } from "react";
import { setCredentials, updateUser } from "../../../global/authSlice";
import { useDispatch } from "react-redux";
import { SkeletonOrderList } from "../../../components/reuasbleComponents/Skeleton";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state management specifically for mapping active orders
  const [activeOrders, setActiveOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const userId = user?.id;

  const dashBoard = async (e) => {
    try {
      const res = await designerApi.dashBoard();
      dispatch(updateUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  // Dedicated function fetching active orders from the server payload
  const fetchDashboardOrders = async () => {
    try {
      if (!userId) return;
      setOrdersLoading(true);
      const response = await designerApi.allAders(userId);

      // Grab only the top 3 records from the array
      const fullList = response.data?.data || [];
      setActiveOrders(fullList.slice(0, 3));
    } catch (error) {
      console.log("Error fetching dashboard feed:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Clean up timestamp (e.g. 2026-06-22T12:26:23.000Z -> 22 June, 2026)
  const formatDashboardDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  useEffect(() => {
    dashBoard();
  }, []);

  // Fetch the live order content whenever the logged-in user profile id is ready
  useEffect(() => {
    fetchDashboardOrders();
  }, [userId]);

  return (
    <main className="dashboard">
      <h2>Welcome Back,{user?.lastName || ""}.</h2>

      <p>Here's what's happening with your business today</p>

      {/* STATS */}
      <div className="stats">
        <div className="cardww">
          <div className="crde">
            <span>
              <TbCubeSpark />
            </span>
            <small>Active Orders</small>
          </div>
          <b>{user?.data?.activeOrders} </b>
        </div>

        <div className="cardww">
          <div className="crde">
            <span>
              <LuDollarSign />
            </span>
            <small>Total Earnings</small>
          </div>
          <b>₦{user?.data?.totalEarnings}</b>
        </div>

        <div className="cardww">
          <div className="crde">
            <div className="father">
              <FaRegStar />
            </div>
            <small>Avg. Rating</small>
          </div>
          <b>{user?.profile?.completedOrders}</b>
        </div>

        <div className="cardww">
          <div className="crde">
            <div className="father">◎</div>
            <small>Completed</small>
          </div>
          <b>{user?.data?.completedOrders}</b>
        </div>
      </div>

      <section className="business">
        <h3>Grow Your Business</h3>
        <p>Upload new designs and respond to customer requests</p>
        <button onClick={() => navigate("/designer/upload")}>
          ↥ Upload Designs
        </button>
      </section>

      {/* ACTIVE ORDERS */}
      <section className="orders">
        <h3>Active Order</h3>

        <div className="order-list">
          {ordersLoading ? (
            <SkeletonOrderList count={3} />
          ) : activeOrders.length === 0 ? (
            <div className="designer-empty-orders-state">
              <div className="designer-empty-orders-icon">
                <FaScissors />
              </div>
              <h4>No active orders found</h4>
              <p>
                New customer orders will appear here once they are assigned to
                your studio.
              </p>
            </div>
          ) : (
            activeOrders.map((order) => (
              <div
                className="order-carded"
                key={order.id}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/designer/mvp", {
                    state: {
                      orderId: order.id,
                    },
                  })
                }
              >
                <h4>{order?.itemName || "Custom Order"}</h4>

                <p>
                  <b>Name:</b>{" "}
                  {order?.customer
                    ? `${order.customer.firstName || ""} ${order.customer.lastName || ""}`.trim()
                    : "Unknown"}
                </p>

                <p>
                  <b>Order ID:</b> {order?.orderNumber || "N/A"}
                </p>

                <p>
                  <b>Items:</b> {order?.itemName || "N/A"}
                </p>

                <p>
                  <b>Price:</b> {order?.amount || "N/A"}
                </p>

                <p>
                  <b>Time placed:</b> {formatDashboardDate(order?.placedAt)}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
