// import React from "react";
// import "../styles/Activetity.css";

// import { FaWallet } from "react-icons/fa";
// import { BsCashCoin } from "react-icons/bs";
// import { IoMdDownload } from "react-icons/io";
// import { FiTrendingUp } from "react-icons/fi";
// import { IoStatsChartOutline } from "react-icons/io5";
// import { MdAccountBalanceWallet } from "react-icons/md";
// import { BiMoneyWithdraw } from "react-icons/bi";
// import WithdrawFunds from "../popups/WithdrawFunds";
// import { useState } from "react";
// import { useSelector } from "react-redux";

// const Dashboard = () => {
//   const user = useSelector((state) => state.auth.user);
//   console.log("user", user);

//   const [showWithdrawal, setShowWithdrawal] = useState(false);

//   return (
//     <div className="dashboard-container">
//       {/* HEADER */}
//       <div className="top-header">
//         <h2>Earnings & Wallet</h2>
//         <p>Overview of earnings and wallet</p>
//       </div>

//       {/* STATS CARDS */}
//       <div className="stats-row">
//         <div className="stats-card">
//           <p className="card-icon">
//             <IoStatsChartOutline />
//           </p>
//           <div className="card-info">
//             <h3>{user.data.totalEarnings}</h3>

//             <p>Total Earnings</p>
//           </div>
//         </div>

//         <div className="stats-card">
//           <MdAccountBalanceWallet className="card-icon" />
//           <div className="card-info">
//             <h3>{user.data.availableBalance}</h3>
//             <p>Wallet Balance</p>
//           </div>
//         </div>

//         <div className="stats-card withdraw-card">
//           <BiMoneyWithdraw className="card-icon" />
//           <div className="card-info">
//             <h3>{user.data.withdrawn}</h3>
//             <p>Withdrawable</p>
//           </div>
//         </div>
//       </div>

//       {/* HISTORY HEADER */}
//       <div className="history-header">
//         <h3>Recent Transactions</h3>

//         <div className="">
//           <button
//             onClick={() => setShowWithdrawal(true)}
//             className="withdraw-btn"
//           >
//             Withdraw
//           </button>
//         </div>
//         {showWithdrawal && (
//           <WithdrawFunds onClose={() => setShowWithdrawal(false)} />
//         )}
//       </div>

//       {/* SCROLLABLE HISTORY */}

//       <div className="transactions-wrapper">
//         <div className="transaction-item">
//           <div className="transaction-left">
//             <div className="trend-icon">
//               <FiTrendingUp />
//             </div>
//             <div>
//               <h4>Bridal Gown for Faith E.</h4>
//               <small>May 15, 2026 • ORD-101</small>
//             </div>
//           </div>

//           <div className="transaction-right">+₦180,000</div>
//         </div>

//         <div className="transaction-item">
//           <div className="transaction-left">
//             <div className="trend-icon">
//               <FiTrendingUp />
//             </div>
//             <div>
//               <h4>Bridal Gown for Faith E.</h4>
//               <small>May 15, 2026 • ORD-101</small>
//             </div>
//           </div>
//           <div className="transaction-right">+₦180,000</div>
//         </div>

//         <div className="transaction-item">
//           <div className="transaction-left">
//             <div className="trend-icon">
//               <FiTrendingUp />
//             </div>
//             <div>
//               <h4>Bridal Gown for Faith E.</h4>
//               <small>May 15, 2026 • ORD-101</small>
//             </div>
//           </div>
//           <div className="transaction-right">+₦180,000</div>
//         </div>

//         <div className="transaction-item">
//           <div className="transaction-left">
//             <div className="trend-icon">
//               <FiTrendingUp />
//             </div>
//             <div>
//               <h4>Bridal Gown for Faith E.</h4>
//               <small>May 15, 2026 • ORD-101</small>
//             </div>
//           </div>
//           <div className="transaction-right">+₦180,000</div>
//         </div>

//         <div className="transaction-item">
//           <div className="transaction-left">
//             <div className="trend-icon">
//               <FiTrendingUp />
//             </div>
//             <div>
//               <h4>Bridal Gown for Faith E.</h4>
//               <small>May 15, 2026 • ORD-101</small>
//             </div>
//           </div>
//           <div className="transaction-right">+₦180,000</div>
//         </div>

//         <div className="transaction-item">
//           <div className="transaction-left">
//             <div className="trend-icon">
//               <FiTrendingUp />
//             </div>
//             <div>
//               <h4>Bridal Gown for Faith E.</h4>
//               <small>May 15, 2026 • ORD-101</small>
//             </div>
//           </div>
//           <div className="transaction-right">+₦180,000</div>
//         </div>

//         <div className="transaction-item">
//           <div className="transaction-left">
//             <div className="trend-icon">
//               <FiTrendingUp />
//             </div>
//             <div>
//               <h4>Bridal Gown for Faith E.</h4>
//               <small>May 15, 2026 • ORD-101</small>
//             </div>
//           </div>
//           <div className="transaction-right">+₦180,000</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import "../styles/Activetity.css";

import { FiTrendingUp } from "react-icons/fi";
import { IoStatsChartOutline } from "react-icons/io5";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import WithdrawFunds from "../popups/WithdrawFunds";
import { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const [showWithdrawal, setShowWithdrawal] = useState(false);

  const wallet = user?.data || {};

  const transactions = wallet.transactions || [];

  const designs = user?.designs || [];

  return (
    <div className="dashboard-container">
      <div className="top-header">
        <h2>Earnings & Wallet</h2>
        <p>Overview of earnings and wallet</p>
      </div>

      <div className="stats-row">
        <div className="stats-card">
          <IoStatsChartOutline className="card-icon" />

          <div className="card-info">
            <h3>₦{wallet.totalEarnings || 0}</h3>

            <p>Total Earnings</p>
          </div>
        </div>

        <div className="stats-card">
          <MdAccountBalanceWallet className="card-icon" />

          <div className="card-info">
            <h3>₦{wallet.availableBalance || 0}</h3>

            <p>Wallet Balance</p>
          </div>
        </div>

        <div className="stats-card withdraw-card">
          <BiMoneyWithdraw className="card-icon" />

          <div className="card-info">
            <h3>₦{wallet.withdrawn || 0}</h3>

            <p>Withdrawable</p>
          </div>
        </div>
      </div>

      <div className="history-header">
        <h3>Recent Transactions</h3>

        <button
          onClick={() => setShowWithdrawal(true)}
          style={{ cursor: "pointer" }}
          className="withdraw-btn"
        >
          Withdraw
        </button>

        {showWithdrawal && (
          <WithdrawFunds onClose={() => setShowWithdrawal(false)} />
        )}
      </div>

      <div className="transactions-wrapper">
        {transactions.length > 0 ? (
          transactions.map((item) => (
            <div className="transaction-item" key={item.id}>
              <div className="transaction-left">
                <div className="trend-icon">
                  <FiTrendingUp />
                </div>

                <div>
                  <h4>{item.title}</h4>

                  <small>{item.date}</small>
                </div>
              </div>

              <div className="transaction-right">+₦{item.amount}</div>
            </div>
          ))
        ) : (
          <p>No transactions yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
