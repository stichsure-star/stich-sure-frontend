import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Designer/dashboard/Sidebar";
import Header from "../pages/Designer/dashboard/Header";

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
    </div>
  );
};

export default DashboardLayout;
