import React from "react";
import Header from "../components/reuasbleComponents/Header";
import Footer from "../components/reuasbleComponents/Footer";
import HeroSection from "../components/HeroSection";
import HowitWorks from "../components/HowitWorks";
import FeaturedDesigners from "../components/Feats";
import Design from "../components/Design";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <HowitWorks />
      <FeaturedDesigners />
      <Design />
      <Footer />
    </div>
  );
};

export default HomePage;
