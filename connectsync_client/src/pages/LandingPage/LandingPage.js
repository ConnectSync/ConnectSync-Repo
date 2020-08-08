import React from "react";
import "./LandingPageStyles.scss";
import { HeroSection } from "../../components/Landing/HeroSection";
import { Navbar } from "../../components/Navigation/Navbar";

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar currentPage="LandingPage" />
      <HeroSection />
    </div>
  );
};
