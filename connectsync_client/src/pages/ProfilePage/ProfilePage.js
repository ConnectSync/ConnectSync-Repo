import React from "react";
import Navbar from "../../components/Navbar";
import "./ProfilePageStyles.scss";

export const ProfilePage = () => {
  return (
    <div className="profilePage py-5">
      <Navbar />
      <div className="all-center flex-column text-center mt-5">
        <div>
          <img src="" className="profileImg" />
        </div>
        <div className="all-center flex-column w-50 p-5 bg-white">
          <button class="btn btn-light btn-sm">Edit profile image</button>
          <h5 className="pt-2">Name</h5>
          <small>Email</small>
        </div>

        {/* workplaces */}
        <div className="workplaces mt-5">
          <h5>Workplaces:</h5>
        </div>
      </div>
    </div>
  );
};
