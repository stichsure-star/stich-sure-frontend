import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/User/dashboard/Sidebar";
import Header from "../pages/User/dashboard/Header";
import Footer from "../pages/User/dashboard/Footer";

const DashboardLayout = () => {
  return (
    <div>
      <Header />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
