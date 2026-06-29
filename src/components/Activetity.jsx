import React, { useEffect, useState } from "react";
import "../styles/Activetity.css";

import { FiTrendingUp } from "react-icons/fi";
import { IoStatsChartOutline } from "react-icons/io5";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import WithdrawFunds from "../paymentInStich-sure/popups/WithdrawFunds";
import { designerApi } from "../config/designer";

const Dashboard = () => {
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [wallet, SetUpWallet] = useState(null); // Changed to null for easier loading states
  const [transactions, setTransactions] = useState([]); // Initialized as an array since we map over it

  // Helper utility to format raw numeric string inputs to Naira currency style layouts
  const formatNaira = (value) => {
    const num = Number(value) || 0;
    return `₦${new Intl.NumberFormat("en-NG", {
      maximumFractionDigits: 0,
    }).format(num)}`;
  };

  const walletBal = async () => {
    try {
      const response = await designerApi.walletData();
      console.log("Wallet Balance API Response:", response.data);
      SetUpWallet(response.data);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  const history = async () => {
    try {
      // ✅ Added await keyword directly to handle server response before reading properties
      const response = await designerApi.walletHistory();
      console.log("Wallet History API Response:", response.data);

      // Target the exact array block depending on whether your backend returns it nested in .data or .data.data
      const historyArray = response?.data?.data || response?.data || [];
      setTransactions(historyArray);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  useEffect(() => {
    // ✅ Trigger both network handshakes when the dashboard mounts
    walletBal();
    history();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="top-header">
        <h2>Earnings & Wallet</h2>
        <p>Overview of earnings and wallet</p>
      </div>

      <div className="stats-row">
        {/* Total Earnings Card */}
        <div className="stats-card">
          <IoStatsChartOutline className="card-icon" />
          <div className="card-info">
            {/* ✅ Safe structural checks using optional chaining fallbacks */}
            <h3>
              {formatNaira(
                wallet?.data?.totalEarnings || wallet?.totalEarnings,
              )}
            </h3>
            <p>Total Earnings</p>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <div className="stats-card">
          <MdAccountBalanceWallet className="card-icon" />
          <div className="card-info">
            <h3>
              {formatNaira(
                wallet?.data?.availableBalance || wallet?.availableBalance,
              )}
            </h3>
            <p>Wallet Balance</p>
          </div>
        </div>

        {/* Withdrawable Balance Card */}
        <div className="stats-card withdraw-card">
          <BiMoneyWithdraw className="card-icon" />
          <div className="card-info">
            <h3>{formatNaira(wallet?.data?.withdrawn || wallet?.withdrawn)}</h3>
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
          <WithdrawFunds
            onClose={() => setShowWithdrawal(false)}
            walleted={wallet}
          />
        )}
      </div>

      {/* SCROLLABLE HISTORY WRAPPER */}
      <div className="transactions-wrapper">
        {Array.isArray(transactions) && transactions.length > 0 ? (
          transactions.map((item) => (
            <div className="transaction-item" key={item.id || item._id}>
              <div className="transaction-left">
                <div className="trend-icon">
                  <FiTrendingUp />
                </div>

                <div>
                  <h4>
                    {item.title ||
                      item.itemName ||
                      item.description ||
                      "Order Payment"}
                  </h4>
                  <small>
                    {item.date || new Date(item.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>

              <div className="transaction-right">
                +{formatNaira(item.amount)}
              </div>
            </div>
          ))
        ) : (
          <p
            className="no-data-text"
            style={{ padding: "20px", color: "#888", textAlign: "center" }}
          >
            No transactions recorded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
