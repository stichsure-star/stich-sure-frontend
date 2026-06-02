import React from "react";
import Header from "../components/reuasbleComponents/Header";
import Footer from "../components/reuasbleComponents/Footer";
import Hero from "../components/Hero";
import Designer from "../components/Designer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero/>
      <Designer />
      <Footer />
    </div>
  );
};

export default HomePage;
