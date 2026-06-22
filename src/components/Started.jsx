import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRole } from "../global/authSlice";
import "../styles/Started.css";

const Started = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chooseRole = (role, route) => {
    dispatch(setRole(role));
    navigate(route);
  };

  return (
    <div className="get_started_page">
      {/* <button className="back_home_btn" onClick={() => navigate("/")}>
        Back to Home
      </button> */}

      <div className="get_started_page_container">
        <div className="designer_card">
          <div className="card_text">
            <h2>Designer</h2>

            <ul>
              <li>Get discovered by more customers</li>
              <li>Manage orders and deadlines easily</li>
              <li>Build your brand profile online</li>
              <li>Earn more with reliable delivery</li>
            </ul>
          </div>

          <button onClick={() => chooseRole("designer", "/signup")}>
            Continue as a Designer
          </button>
        </div>

        <div className="customer_card">
          <div className="card_text">
            <h2>Customer</h2>

            <ul>
              <li>Find trusted designers easily</li>
              <li>Order custom outfits stress-free</li>
              <li>Track orders in real time</li>
              <li>View Reviews before choosing</li>
            </ul>
          </div>

          <button onClick={() => chooseRole("customer", "/customersignup")}>
            Continue as a Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Started;
