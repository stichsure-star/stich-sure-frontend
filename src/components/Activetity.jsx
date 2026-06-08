import React from "react";
import "../styles/Activetity.css";

import { FaWallet } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import { FiTrendingUp } from "react-icons/fi";
import { IoStatsChartOutline } from "react-icons/io5";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";

const Dashboard = () => {
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
            <h3>₦850,000</h3>

            <p>Total Earnings</p>
          </div>
        </div>

        <div className="stats-card">
          <MdAccountBalanceWallet className="card-icon" />
          <div className="card-info">
            <h3>₦320,000</h3>
            <p>Wallet Balance</p>
          </div>
        </div>

        <div className="stats-card withdraw-card">
          <BiMoneyWithdraw className="card-icon" />
          <div className="card-info">
            <h3>₦530,000</h3>
            <p>Withdrawable</p>
          </div>
        </div>
      </div>

      {/* HISTORY HEADER */}
      <div className="history-header">
        <h3>Recent Transactions</h3>

        <div className="">
          <button className="withdraw-btn">Withdraw</button>
        </div>
      </div>

      {/* SCROLLABLE HISTORY */}
      <div className="transactions-wrapper">
        <div className="transaction-item">
          <div className="transaction-left">
            <div className="trend-icon">
              <FiTrendingUp />
            </div>
            <div>
              <h4>Bridal Gown for Faith E.</h4>
              <small>May 15, 2026 • ORD-101</small>
            </div>
          </div>

          <div className="transaction-right">+₦180,000</div>
        </div>

        <div className="transaction-item">
          <div className="transaction-left">
            <div className="trend-icon">
              <FiTrendingUp />
            </div>
            <div>
              <h4>Bridal Gown for Faith E.</h4>
              <small>May 15, 2026 • ORD-101</small>
            </div>
          </div>
          <div className="transaction-right">+₦180,000</div>
        </div>

        <div className="transaction-item">
          <div className="transaction-left">
            <div className="trend-icon">
              <FiTrendingUp />
            </div>
            <div>
              <h4>Bridal Gown for Faith E.</h4>
              <small>May 15, 2026 • ORD-101</small>
            </div>
          </div>
          <div className="transaction-right">+₦180,000</div>
        </div>

        <div className="transaction-item">
          <div className="transaction-left">
            <div className="trend-icon">
              <FiTrendingUp />
            </div>
            <div>
              <h4>Bridal Gown for Faith E.</h4>
              <small>May 15, 2026 • ORD-101</small>
            </div>
          </div>
          <div className="transaction-right">+₦180,000</div>
        </div>

        <div className="transaction-item">
          <div className="transaction-left">
            <div className="trend-icon">
              <FiTrendingUp />
            </div>
            <div>
              <h4>Bridal Gown for Faith E.</h4>
              <small>May 15, 2026 • ORD-101</small>
            </div>
          </div>
          <div className="transaction-right">+₦180,000</div>
        </div>

        <div className="transaction-item">
          <div className="transaction-left">
            <div className="trend-icon">
              <FiTrendingUp />
            </div>
            <div>
              <h4>Bridal Gown for Faith E.</h4>
              <small>May 15, 2026 • ORD-101</small>
            </div>
          </div>
          <div className="transaction-right">+₦180,000</div>
        </div>

        <div className="transaction-item">
          <div className="transaction-left">
            <div className="trend-icon">
              <FiTrendingUp />
            </div>
            <div>
              <h4>Bridal Gown for Faith E.</h4>
              <small>May 15, 2026 • ORD-101</small>
            </div>
          </div>
          <div className="transaction-right">+₦180,000</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
