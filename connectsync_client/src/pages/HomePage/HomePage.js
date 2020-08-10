import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile/Profile";
import Posts from "../../components/Posts/Posts";
import PostTextarea from "../../components/Posts/PostTextarea";
import "./HomePage.scss";
import Loader from "../../components/Loader";
import {
  createWorkplace,
  joinWorkplace,
  getAllPublicWorkplaces,
  getAllWorkplacesMembers,
  setActiveWorkplaces,
} from "../../redux/action/workplaces";
import { getAllPosts } from "../../redux/action/posts";
import WorkplacePopup from "../../components/Popup/WorkplacePopup";
import AuthPopup from "../../components/Popup/AuthPopup";

import { Redirect } from "react-router-dom";
import { openChangePopup } from "../../redux/action/popup";
import { connect } from "react-redux";
import { loadUser } from "../../redux/action/auth";

const HomePage = ({
  isAuthenticated,
  user,
  loading,
  createWorkplace,
  joinWorkplace,
  setActiveWorkplaces,
  getAllPosts,
  popup,
  openChangePopup,
  loadUser,
  workplaces: { active_workplaces },
}) => {
  const [worlplaceDetails, setWorkPlaceDetails] = useState({
    name: "",
    description: "",
    type: "",
    success: false,
  });

  const { name, type, success, description } = worlplaceDetails;

  const handleChange = (fieldName) => (event) => {
    setWorkPlaceDetails({
      ...worlplaceDetails,
      [fieldName]: event.target.value,
    });
  };

  // Create workplace
  const create = async (e) => {
    e.preventDefault();
    await createWorkplace(worlplaceDetails);
    popup.activePopup === "CREATE" && openChangePopup("");
  };
  // Join workplace
  const join = async (e) => {
    e.preventDefault();
    console.log("joining...");
    await joinWorkplace(worlplaceDetails.name);
    popup.activePopup === "JOIN" && openChangePopup("");
  };

  const conditionalRender = () => {
    if (loading) {
      return <Loader />;
    } else {
      const { workplaces, profile } = user;
      console.log("Work ", user);
      console.log("profile ", profile);

      if (Array.isArray(workplaces) && workplaces.length) {
        const data = [];
        if (active_workplaces.length === 0) {
          workplaces.map(({ workplace }) => {
            data.push(workplace.name);
          });
          setActiveWorkplaces(data);
          getAllPosts(data);
        }
        return (
          <>
            <div className="col-lg-3 mb-5 p-0 w-75 mx-lg-0 mx-auto">
              {/* */}

              <Profile
                handleChange={handleChange}
                create={create}
                join={join}
                workplace_name={name}
                workplace_description={description}
                workplace_type={type}
              />
            </div>
            <div className="col-lg-6 ml-lg-4 px-5">
              <PostTextarea />
              <Posts />
            </div>
          </>
        );
      } else {
        return (
          <div className="d-flex flex-column align-items-center justify-content-center col-lg-6 px-5">
            <div>
              <h3 className="text-center mb-5">
                You do not have any Workplace setup, Create or Join a Workplace
                to continue
              </h3>
            </div>
            <div>
              <button
                onClick={() => openChangePopup("CREATE")}
                className="btn btn-style btn-primary bg-primary px-5"
              >
                Create
              </button>
              <button
                onClick={() => openChangePopup("JOIN")}
                className="btn btn-style btn-primary bg-warning px-5 mx-2"
              >
                Join
              </button>
            </div>
            {(popup.activePopup === "CREATE" ||
              popup.activePopup === "JOIN") && (
              //<AuthPopup type={popup.activePopup} data={popup.data} />
              <WorkplacePopup
                type={popup.activePopup}
                handleChange={handleChange}
                create={create}
                join={join}
                name={name}
                description={description}
                workplace_type={type}
                success={success}
              />
            )}
          </div>
        );
      }
    }
  };
  // const performRedirect = () => {
  //   if (success) {
  //     modelRef.current.closeModal();
  //     return <Redirect to="/home" />;
  //   }
  // };
  if (loading) {
    return <Loader />;
  } else {
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="public">
          <Navbar currentPage="HomePage" />
          <div className="container">
            <div className="row mt-5 px-4 no-workplace-render">
              {conditionalRender()}
            </div>
          </div>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.error,
    loading: state.auth.loading,
    workplaces: state.workplaces,
    popup: state.popup,
  };
};

export default connect(mapStateToProps, {
  createWorkplace,
  joinWorkplace,
  getAllPublicWorkplaces,
  getAllWorkplacesMembers,
  setActiveWorkplaces,
  getAllPosts,
  openChangePopup,
  loadUser,
})(HomePage);
