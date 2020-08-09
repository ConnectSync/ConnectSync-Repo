import React, { useEffect, useState } from "react";
import Navbar from "../../components/Public/Navbar";
import { connect } from "react-redux";
import { getUserByID } from "../../redux/action/user";
import "../ProfilePage/ProfilePageStyles.scss";

const mapStateToProps = (state) => ({
  auth: state.auth,
  member: state.member,
});

export default connect(mapStateToProps, {
  getUserByID,
})(function User(props) {
  useEffect(() => {
    if (props.match.params.userId) {
      getUserByID(props.match.params.userId);
    }
  }, []);

  const { getUserByID, member } = props;
  const { user } = member;
  const isLoading = member.loading;

  if (typeof user.profile == "undefined") {
    user.profile = {};
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const workplaceList = user.workplaces.map(({ workplace, _id }) => (
    <div className="workplaceNames" key={_id}>
      <p>{workplace.name}</p>
    </div>
  ));

  return (
    <div className="userPage">
      <Navbar />

      <div className="all-center flex-column text-center mt-5">
        <div className="avatar profile-avatar">
          <img src={user.img} className="profileImg" />
        </div>
        <div className="all-center flex-column w-50 p-5 bg-white detailsDiv">
          <h5 className="pt-2">{user.name}</h5>
          <small>{user.email}</small>

          <div className="profileDetails">
            {user.profile.bio && (
              <p className="my-1">
                <strong>Bio: </strong>
                {user.profile.bio}
              </p>
            )}

            {user.profile.residence && (
              <p>
                <strong>Residence: </strong>
                {user.profile.residence}
              </p>
            )}
          </div>
          {typeof user.profile.social != "undefined" && (
            <div className="socialIcons">
              {user.profile.social.twitter && (
                <i
                  className="fa fa-twitter fa-1.5x"
                  onClick={() => {
                    window.open(
                      "https://www.twitter.com/" + user.profile.social.twitter
                    );
                  }}
                ></i>
              )}
              {user.profile.social.instagram && (
                <i
                  className="fa fa-instagram fa-1.5x"
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/" +
                        user.profile.social.instagram
                    );
                  }}
                ></i>
              )}
              {user.profile.social.linkedin && (
                <i
                  className="fa fa-linkedin fa-1.5x"
                  onClick={() => {
                    window.open(
                      "https://www.linkedin.com/" + user.profile.social.linkedin
                    );
                  }}
                ></i>
              )}
              {user.profile.social.website && (
                <i
                  className="fa fa-link fa-1.5x"
                  onClick={() => {
                    window.open(user.profile.social.website);
                  }}
                ></i>
              )}
            </div>
          )}
          {/* Each workplace */}
          <div className="workplaces">
            <h5>Workplaces:</h5>
            {user.workplaces.length > 1 ? (
              workplaceList
            ) : (
              <p>No workplace found!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
