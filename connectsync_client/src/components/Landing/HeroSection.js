import React from "react";
import Vector from "../../images/LandingVector.png";

export const HeroSection = () => {
  return (
    <div className="hero-section  pt-5 text-white">
      <div className="container">
        <div className="row mt-sm-5 text-lg-left text-center">
          <div className="col-lg-6 mt-xl-5 pt-5">
            <p>Welcome to ConnectSync</p>
            <h1>We bring remote workers closer together</h1>
            <p className="blockquote py-4">
              Enjoy one of the best open source social media platforms for
              business owners to reunite their workers from anywhere during this
              global pandemic
            </p>
            <button className="btn btn-primary mr-3">Get It For Free</button>
            <button className="btn btn-secondary">Intro</button>
          </div>
          <div className="col-lg-6">
            <img className="w-100" src={Vector} alt="vector" />
          </div>
        </div>
      </div>
    </div>
  );
};
