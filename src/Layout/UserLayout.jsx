import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/User/dashboard/Sidebar";
import Header from "../pages/User/dashboard/Header";
import Footer from "../pages/User/dashboard/Footer";
import "../styles/UserLayout.css";

const DashboardLayout = () => {
  return (
    <div>
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
