import React, { useState } from "react";
import { connect } from "react-redux";

import HeroSection from "../../components/Landing/HeroSection";
import Navbar from "../../components/Navbar";
import AuthPopup from "../../components/Popup/AuthPopup";
import Loader from "../../components/Loader";

import "./LandingPageStyles.scss";

const LandingPage = ({ loading, isAuthenticated, popup }) => {
  return (
    <div className="landing-page">
      <Navbar currentPage="LandingPage" />
      <HeroSection />

      {/* login/register popup */}
      {!isAuthenticated &&
        (popup.activePopup === "REGISTER" || popup.activePopup === "LOGIN") && (
          <AuthPopup type={popup.activePopup} data={popup.data} />
        )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  popup: state.popup,
});

export default connect(mapStateToProps)(LandingPage);
