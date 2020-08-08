import React, { useState } from "react";
import { NavLists } from "./NavLists";
import { Link } from "react-router-dom";

export const Navbar = ({ currentPage }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [navStatus, setNavStatus] = useState("collapse navbar-collapse");
  const navbarHandler = () => {
    setNavbarOpen(!navbarOpen);
    setNavStatus(
      `collapse navbar-collapse text-center ${navbarOpen ? "" : "show"}`
    );
  };
  return (
    <div>
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
            <NavLists currentPage={currentPage} />
          </div>
        </div>
      </nav>
    </div>
  );
};
