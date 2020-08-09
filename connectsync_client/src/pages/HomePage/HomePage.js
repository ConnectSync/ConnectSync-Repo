import React from "react";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile/Profile";
import Posts from "../../components/Posts/Posts";
import PostTextarea from "../../components/Posts/PostTextarea";
import "./HomePage.scss";
import Loader from "../../components/Loader";

import { connect } from "react-redux";

const HomePage = ({ loading }) => {
  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="public">
        <Navbar currentPage="HomePage" />
        <div className="container ">
          <div className="row mt-5 p-5 mt-5">
            <div className="col-lg-3 mb-5 p-0 w-75 mx-lg-0 mx-auto">
              <Profile />
            </div>
            <div className="col-lg-6 ml-lg-4 px-5">
              <PostTextarea />
              <Posts />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(HomePage);
