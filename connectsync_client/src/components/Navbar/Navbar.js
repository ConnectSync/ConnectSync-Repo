import React, { useState } from "react";
import { Link } from "react-router-dom";

import HomeNavs from "./HomeNavs";
import LandingNavs from "./LandingNavs";
import "./NavBarStyles.scss";

const Navbar = ({ currentPage }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const [navStatus, setNavStatus] = useState("collapse navbar-collapse");

  const navbarHandler = () => {
    setNavbarOpen(!navbarOpen);
    setNavStatus(
      `collapse navbar-collapse text-center ${navbarOpen ? "" : "show"}`
    );
  };

  return (
    <div className="navigation-bar">
      <nav className="navbar navbar-expand-sm navbar-light fixed-top">
        <div className="container">
          <div className="navbar-brand text-white">
            <Link to="/" className="text-white">
              <h3 className="m-0">ConnectSync</h3>
            </Link>
          </div>

          {/* Navbar Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={navbarHandler}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={navStatus}>
            {/* Conditional NavList Render */}
            {currentPage !== "LandingPage" && <HomeNavs />}
            {currentPage === "LandingPage" && <LandingNavs />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
