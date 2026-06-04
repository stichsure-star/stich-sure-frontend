import "../../Designer/css/DashboardHome.css";

const Dashboard = () => {
  return (
    <main className="dashboard">
      <h2>Welcome Back, Adebayo!</h2>
      <p>Here's what's happening with your business today</p>

      <div className="stats">
        <div className="cardww">
          <div className="crde">
            <span>₦</span>
            <small>Active Orders</small>
          </div>

          <b>8</b>
        </div>

        <div className="cardww">
          <div className="crde">
            <span>₦</span>
            <small>Total Earnings</small>
          </div>

          <b>₦850K</b>
        </div>

        <div className="cardww">
          <div className="crde">
            <span>₦</span>
            <small>Avg. Rating</small>
          </div>
          <b>4.9</b>
        </div>

        <div className="cardww">
          <div className="crde">
            <span>◎</span>
            <small>Completed</small>
          </div>

          <b>45</b>
        </div>
      </div>

      <section className="business">
        <h3>Grow Your Business</h3>
        <p>Upload new designs and respond to customer requests</p>

        <button>↥ Upload Designs</button>
      </section>

      <section className="orders">
        <h3>Active Order</h3>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Time placed</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Order Value</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>QI-245678</td>
              <td>14/04/2026, 5:15</td>
              <td>Sonayon Peculiar</td>
              <td>Bridal Gown</td>
              <td>₦200,000</td>
            </tr>

            <tr>
              <td>QI-245678</td>
              <td>14/04/2026, 5:15</td>
              <td>Sonayon Peculiar</td>
              <td>Bridal Gown</td>
              <td>₦200,000</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Dashboard;
