import React from 'react';
import Navbar from '../../components/Navbar';
import Profile from "../../components/Profile/Profile"
import Posts from "../../components/Posts/Posts"
import "./HomePage.scss"

const HomePage = () => {
  return (
    <div>
      <Navbar currentPage="HomePage" />
      <div className="container">
        <div className="row mt-5 px-4 ">
        <div className="col-lg-3 mb-5 p-0 w-75 mx-lg-0 mx-auto">
            <Profile />
        </div>
        <div className="col-lg-6 ml-lg-4 px-5">
              <Posts />
        </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
