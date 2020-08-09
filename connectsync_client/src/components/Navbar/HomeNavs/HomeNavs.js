import React from "react";
import { Link } from "react-router-dom";

const HomeNavs = () => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item px-1">
        <Link to="/home" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-item px-1">
        <Link to="/members" className="nav-link">
          Members
        </Link>
      </li>
      <li className="nav-item px-1">
        <Link to="/chats" className="nav-link">
          Chats
        </Link>
      </li>
      <li className="nav-item px-1">
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </li>
    </ul>
  );
};

export default HomeNavs;
