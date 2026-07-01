import React from "react";
import Header from "../components/reuasbleComponents/Header";
import Footer from "../components/reuasbleComponents/Footer";
import { Outlet } from "react-router-dom";
import "../styles/HomeLayout.css";

const HomeLayout = () => {
  return (
    <div className="HomeLayout">
      <Header />
      <main className="HomeLayout_main">
        <Outlet className="global-slide-up" />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
