import React, { useState } from "react";

export const Navbar = () => {
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
            <h3 className="m-0">ConnectSync</h3>
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
            {/* Conditional Render start */}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item px-1">
                <button className="btn btn-primary">Register</button>
              </li>
              <li className="nav-item px-1">
                <button className="btn btn-secondary">Login</button>
              </li>
            </ul>
            {/* Conditional Render end */}
          </div>
        </div>
      </nav>
    </div>
  );
};
