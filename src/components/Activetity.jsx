import React from "react";
import "../styles/Activetity.css";

import { FaWallet } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import { FiTrendingUp } from "react-icons/fi";
import { IoStatsChartOutline } from "react-icons/io5";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import WithdrawFunds from "../popups/WithdrawFunds";
import { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);

  const [showWithdrawal, setShowWithdrawal] = useState(false);

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="top-header">
        <h2>Earnings & Wallet</h2>
        <p>Overview of earnings and wallet</p>
      </div>

      {/* STATS CARDS */}
      <div className="stats-row">
        <div className="stats-card">
          <p className="card-icon">
            <IoStatsChartOutline />
          </p>
          <div className="card-info">
            <h3>{user.profile.totalEarnings}</h3>

            <p>Total Earnings</p>
          </div>
        </div>

        <div className="stats-card">
          <MdAccountBalanceWallet className="card-icon" />
          <div className="card-info">
            <h3>{user.profile.availableBalance}</h3>
            <p>Wallet Balance</p>
          </div>
        </div>

        <div className="stats-card withdraw-card">
          <BiMoneyWithdraw className="card-icon" />
          <div className="card-info">
            <h3>{user.profile.withdrawn}</h3>
            <p>Withdrawable</p>
          </div>
        </div>
      </div>

      {/* HISTORY HEADER */}
      <div className="history-header">
        <h3>Recent Transactions</h3>

        <div className="">
          <button
            onClick={() => setShowWithdrawal(true)}
            className="withdraw-btn"
          >
            Withdraw
          </button>
        </div>
        {showWithdrawal && (
          <WithdrawFunds onClose={() => setShowWithdrawal(false)} />
        )}
      </div>

      {/* SCROLLABLE HISTORY */}
    </div>
  );
};

export default Dashboard;
