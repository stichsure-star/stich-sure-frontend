import "../../Designer/css/DashboardHome.css";
import { TbCubeSpark } from "react-icons/tb";
import { LuDollarSign } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);

  return (
    <main className="dashboard">
      <h2>Welcome Back,{user.lastName}</h2>

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

          <b>8</b>
        </div>

        <div className="cardww">
          <div className="crde">
            <span>
              <LuDollarSign />
            </span>
            <small>Total Earnings</small>
          </div>

          <b>₦850K</b>
        </div>

        <div className="cardww">
          <div className="crde">
            <div className="father">
              <FaRegStar />
            </div>
            <small>Avg. Rating</small>
          </div>

          <b>4.9</b>
        </div>

        <div className="cardww">
          <div className="crde">
            <div className="father">◎</div>
            <small>Completed</small>
          </div>

          <b>45</b>
        </div>
      </div>

      {/* BUSINESS */}

      <section className="business">
        <h3>Grow Your Business</h3>

        <p>Upload new designs and respond to customer requests</p>

        <button>↥ Upload Designs</button>
      </section>

      {/* ACTIVE ORDERS */}

      <section className="orders">
        <h3>Active Order</h3>

        <div className="order-list">
          <div className="order-card">
            <h4>Bridal Gown</h4>

            <p>
              <b>Name:</b> Sonayon Peculiar
            </p>

            <p>
              <b>Order ID:</b> QI-245678
            </p>

            <p>
              <b>Items:</b> Bridal Gown
            </p>

            <p>
              <b>Price:</b> ₦200,000
            </p>

            <p>
              <b>Time placed:</b> 14/04/2026. 3:15
            </p>
          </div>

          <div className="order-card">
            <h4>Bridal Gown</h4>

            <p>
              <b>Name:</b> Sonayon Peculiar
            </p>

            <p>
              <b>Order ID:</b> QI-245678
            </p>

            <p>
              <b>Items:</b> Bridal Gown
            </p>

            <p>
              <b>Price:</b> ₦200,000
            </p>

            <p>
              <b>Time placed:</b> 14/04/2026. 3:15
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
