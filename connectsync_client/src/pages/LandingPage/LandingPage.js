import React, { useRef, useState } from "react";
import "./LandingPageStyles.scss";
import { HeroSection } from "../../components/Landing/HeroSection";
import { Navbar } from "../../components/Navigation/Navbar";
import AuthPopup from '../../components/Popup/AuthPopup';
import { connect } from 'react-redux';



export const LandingPage = (props) => {


  return (
    <div className="landing-page">
      <Navbar currentPage="LandingPage" />
      <HeroSection />
    </div>
  );
};

const mapStateToProps = (state) => ({
  popup: state.popup,
});

export default connect(mapStateToProps)(Landing);