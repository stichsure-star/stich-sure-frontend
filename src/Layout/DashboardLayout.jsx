import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Designer/dashboard/Sidebar";
import Header from "../pages/Designer/dashboard/Header";
import Footer from "../pages/Designer/dashboard/Footer";
import "../styles/DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Header />

      <div className="dashboard-body">
        <aside className="sidebar-wrapper">
          <Sidebar />
        </aside>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
