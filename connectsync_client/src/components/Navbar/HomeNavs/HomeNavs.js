import React from 'react';
import { Link } from 'react-router-dom';

const HomeNavs = () => {
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
};

export default HomeNavs;
