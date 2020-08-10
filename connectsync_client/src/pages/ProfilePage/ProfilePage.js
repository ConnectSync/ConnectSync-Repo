import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { connect } from "react-redux";
import { loadUser } from "../../redux/action/auth";
import {
  addBio,
  addResidence,
  addSocialLinks,
  addProfileImage,
} from "../../redux/action/user";
import "./ProfilePageStyles.scss";

const ProfilePage = (props) => {
  const {
    auth,
    addBio,
    addResidence,
    addSocialLinks,
    addProfileImage,
    loadUser,
  } = props;

  const isLoading = auth.loading;
  const userProps = { ...auth.user };
  const AllWorkplaceData = userProps.workplaces;

  const { name, email, img } = userProps;

  const [editInfo, setEditInfo] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [userDetails, setUserDetails] = useState({
    bio: "",
    residence: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    website: "",
  });
  const { bio, residence, twitter, instagram, linkedin, website } = userDetails;

  if (typeof userProps.profile == "undefined") {
    userProps.profile = {};
  }

  const handleChange = (fieldName) => (event) => {
    setUserDetails({
      ...userDetails,
      [fieldName]: event.target.value,
    });
  };

  const onChangeHandler = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const onFileUpload = (e) => {
    if (!profileImage) {
      alert("No image selected! Please choose one before continue...");
    } else {
      const data = new FormData();
      data.append("profileImage", profileImage);
      addProfileImage(data);
      setEditInfo("");
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const workplaceList = AllWorkplaceData.map(({ workplace, _id }) => (
    <div className="workplaceNames" key={_id}>
      <p>{workplace.name}</p>
    </div>
  ));

  return (
    <div className="profilePage">
      <Navbar />
      <div className="all-center flex-column text-center mt-5">
        <div className="profile-avatar">
          <img src={img} className="profileImg" />
        </div>
        <div className="all-center flex-column w-50 p-5 bg-white detailsDiv">
          <button
            class="btn btn-light mt-1 p-1"
            onClick={() => setEditInfo("image")}
          >
            <small>Edit profile image</small>
          </button>
          {editInfo === "image" && (
            <React.Fragment>
              <input
                type="file"
                name="profileImage"
                onChange={onChangeHandler}
              />
              <button
                type="button"
                class="btn btn-success mt-1 p-1 px-3"
                onClick={onFileUpload}
              >
                Upload
              </button>
            </React.Fragment>
          )}
          <h5 className="mt-2">{name}</h5>
          <small>{email}</small>
          <div className="profileDetails">
            {userProps.profile.bio ? (
              <p className="my-1">
                <strong>Bio: </strong>
                {userProps.profile.bio}
                {"  "}
                <i
                  className="fa fa-pencil"
                  onClick={() => setEditInfo("bio")}
                ></i>
              </p>
            ) : (
              <button
                class="btn btn-secondary mt-1 p-1"
                onClick={() => setEditInfo("bio")}
              >
                <small>Add a bio</small>
              </button>
            )}

            {editInfo === "bio" && (
              <div className="my-1 w-100">
                <textarea
                  type="text"
                  class="form-control"
                  placeholder="Add bio..."
                  value={bio}
                  name="bio"
                  required
                  id="bio"
                  onChange={handleChange("bio")}
                />
                <div className="actionButtons">
                  <button
                    class="btn btn-light mt-1 p-1"
                    onClick={() => setEditInfo("")}
                  >
                    <small>Cancel</small>
                  </button>
                  <button
                    class="btn btn-secondary mt-1 p-1"
                    onClick={() => {
                      addBio(bio);
                      setEditInfo("");
                    }}
                  >
                    <small>Save</small>
                  </button>
                </div>
              </div>
            )}
            {userProps.profile.residence ? (
              <p>
                <strong>Residence: </strong>
                {userProps.profile.residence} {"  "}
                <i
                  className="fa fa-pencil"
                  onClick={() => setEditInfo("residence")}
                ></i>
              </p>
            ) : (
              <button
                class="btn btn-secondary mt-1 p-1"
                onClick={() => setEditInfo("residence")}
              >
                <small>Add residence</small>
              </button>
            )}
            {editInfo === "residence" && (
              <div className="my-1 w-100">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your residence..."
                  value={residence}
                  name="residence"
                  required
                  id="residence"
                  onChange={handleChange("residence")}
                />
                <div className="actionButtons">
                  <button
                    class="btn btn-light mt-1 p-1"
                    onClick={() => setEditInfo("")}
                  >
                    <small>Cancel</small>
                  </button>
                  <button
                    class="btn btn-secondary mt-1 p-1"
                    onClick={() => {
                      addResidence(residence);
                      setEditInfo("");
                    }}
                  >
                    <small>Save</small>
                  </button>
                </div>
              </div>
            )}
            {typeof userProps.profile.social != "undefined" ? (
              <div className="socialIcons">
                {userProps.profile.social.twitter && (
                  <i
                    className="fa fa-twitter fa-1.5x"
                    onClick={() => {
                      window.open(
                        "https://www.twitter.com/" +
                          userProps.profile.social.twitter
                      );
                    }}
                  ></i>
                )}
                {userProps.profile.social.instagram && (
                  <i
                    className="fa fa-instagram fa-1.5x"
                    onClick={() => {
                      window.open(
                        "https://www.instagram.com/" +
                          userProps.profile.social.instagram
                      );
                    }}
                  ></i>
                )}
                {userProps.profile.social.linkedin && (
                  <i
                    className="fa fa-linkedin fa-1.5x"
                    onClick={() => {
                      window.open(
                        "https://www.linkedin.com/" +
                          userProps.profile.social.linkedin
                      );
                    }}
                  ></i>
                )}
                {userProps.profile.social.website && (
                  <i
                    className="fa fa-link fa-1.5x"
                    onClick={() => {
                      window.open(userProps.profile.social.website);
                    }}
                  ></i>
                )}
                <i
                  className="fa fa-pencil"
                  onClick={() => setEditInfo("links")}
                ></i>
              </div>
            ) : (
              <button
                class="btn btn-secondary mt-1 p-1"
                onClick={() => setEditInfo("links")}
              >
                <small>Add social links</small>
              </button>
            )}
            {editInfo === "links" && (
              <div className="my-1 w-100">
                <form className="w-100">
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="twitter">Twitter handle</label>
                      <input
                        type="text"
                        class="form-control"
                        id="twitter"
                        placeholder="@johnDoe"
                        value={twitter}
                        name="twitter"
                        required
                        id="twitter"
                        onChange={handleChange("twitter")}
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="instagram">Instagram handle</label>
                      <input
                        type="text"
                        class="form-control"
                        id="instagram"
                        placeholder="@johnDoe"
                        value={instagram}
                        name="instagram"
                        required
                        id="instagram"
                        onChange={handleChange("instagram")}
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="linkedin">LinkedIn handle</label>
                      <input
                        type="text"
                        class="form-control"
                        id="linkedin"
                        placeholder="@johnDoe"
                        value={linkedin}
                        name="linkedin"
                        required
                        id="linkedin"
                        onChange={handleChange("linkedin")}
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="website">Your website</label>
                      <input
                        type="text"
                        class="form-control"
                        id="website"
                        placeholder="https://mywebsite.com"
                        value={website}
                        name="website"
                        required
                        id="website"
                        onChange={handleChange("website")}
                      />
                    </div>
                  </div>
                </form>
                <div className="actionButtons">
                  <button
                    class="btn btn-light mt-1 p-1"
                    onClick={() => setEditInfo("")}
                  >
                    <small>Cancel</small>
                  </button>
                  <button
                    class="btn btn-secondary mt-1 p-1"
                    onClick={() => {
                      let links = {
                        twitter,
                        instagram,
                        linkedin,
                        website,
                      };
                      addSocialLinks(links);
                      setEditInfo("");
                    }}
                  >
                    <small>Save</small>
                  </button>
                </div>
              </div>
            )}
            {/* Each workplace */}
            <div className="workplaces">
              <h5>Workplaces:</h5>
              {AllWorkplaceData.length > 0 ? (
                workplaceList
              ) : (
                <p>No workplace found!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadUser,
  addBio,
  addResidence,
  addSocialLinks,
  addProfileImage,
})(ProfilePage);
