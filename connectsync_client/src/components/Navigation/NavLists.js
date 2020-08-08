import React from "react";

export const NavLists = ({ currentPage }) => {
  if (currentPage === "LandingPage") {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item px-1">
          <button className="btn btn-primary">Register</button>
        </li>
        <li className="nav-item px-1">
          <button className="btn btn-secondary">Login</button>
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
