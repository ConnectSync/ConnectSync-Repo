import React from "react";
import { Link } from "react-router-dom";

export const NavLists = ({ currentPage }) => {
  if (currentPage === "LandingPage") {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item px-1">
          <Link to="/" className="btn btn-primary">
            Register
          </Link>
        </li>
        <li className="nav-item px-1">
          <Link to="/" className="btn btn-secondary">
            Login
          </Link>
        </li>
      </ul>
    );
  }

  if (currentPage === "HomePage") {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item px-1">
          <div className="nav-link">Home</div>
        </li>
        <li className="nav-item px-1">
          <div className="nav-link">Members</div>
        </li>
        <li className="nav-item px-1">
          <div className="nav-link">Chats</div>
        </li>
        <li className="nav-item px-1">
          <div className="nav-link">Profile</div>
        </li>
      </ul>
    );
  }
};
