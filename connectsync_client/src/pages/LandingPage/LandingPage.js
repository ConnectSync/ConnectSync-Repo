import React, { useRef, useState } from "react";
import "./LandingPageStyles.scss";
import { HeroSection } from "../../components/Landing/HeroSection";
import { Navbar } from "../../components/Navigation/Navbar";


export const LandingPage = () => {
  //declare model ref
  const modalRef = useRef();


  return (
    <div className="landing-page">
      <Navbar currentPage="LandingPage" />
      <HeroSection />
    </div>
  );
};
