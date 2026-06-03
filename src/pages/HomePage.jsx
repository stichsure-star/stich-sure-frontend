import React from "react";
import Header from "../components/reuasbleComponents/Header";
import Footer from "../components/reuasbleComponents/Footer";
import Hero from "../components/Hero";
import Designer from "../components/Designer";
import FeaturedDesigners from "../components/Feats";
import Design from "../components/Design";
import HowItWorks from "../components/HowitWorks";
import HeroSection from "../components/HeroSection";
import Ratings from "../components/Ratings";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <HowItWorks />
      <FeaturedDesigners />
      <Design />
      <Ratings />
      <Footer />
    </div>
  );
};

export default HomePage;
