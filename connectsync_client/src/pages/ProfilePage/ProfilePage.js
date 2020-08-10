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
                <div className="actionButtons text-right">
                  <button
                    class="btn btn-light btn-sm m-2"
                    onClick={() => setEditInfo("")}
                  >
                    <small>Cancel</small>
                  </button>
                  <button
                    class="btn btn-secondary btn-sm m-2"
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
                  list="country"
                  onChange={handleChange("residence")}
                />

                {/* country data list start */}
                <datalist id="country">
                  <option value="Afghanistan" />
                  <option value="Albania" />
                  <option value="Algeria" />
                  <option value="American Samoa" />
                  <option value="Andorra" />
                  <option value="Angola" />
                  <option value="Anguilla" />
                  <option value="Antarctica" />
                  <option value="Antigua and Barbuda" />
                  <option value="Argentina" />
                  <option value="Armenia" />
                  <option value="Aruba" />
                  <option value="Australia" />
                  <option value="Austria" />
                  <option value="Azerbaijan" />
                  <option value="Bahamas" />
                  <option value="Bahrain" />
                  <option value="Bangladesh" />
                  <option value="Barbados" />
                  <option value="Belarus" />
                  <option value="Belgium" />
                  <option value="Belize" />
                  <option value="Benin" />
                  <option value="Bermuda" />
                  <option value="Bhutan" />
                  <option value="Bolivia" />
                  <option value="Bosnia and Herzegovina" />
                  <option value="Botswana" />
                  <option value="Bouvet Island" />
                  <option value="Brazil" />
                  <option value="British Indian Ocean Territory" />
                  <option value="Brunei Darussalam" />
                  <option value="Bulgaria" />
                  <option value="Burkina Faso" />
                  <option value="Burundi" />
                  <option value="Cambodia" />
                  <option value="Cameroon" />
                  <option value="Canada" />
                  <option value="Cape Verde" />
                  <option value="Cayman Islands" />
                  <option value="Central African Republic" />
                  <option value="Chad" />
                  <option value="Chile" />
                  <option value="China" />
                  <option value="Christmas Island" />
                  <option value="Cocos (Keeling) Islands" />
                  <option value="Colombia" />
                  <option value="Comoros" />
                  <option value="Congo" />
                  <option value="Congo, The Democratic Republic of The" />
                  <option value="Cook Islands" />
                  <option value="Costa Rica" />
                  <option value="Cote D'ivoire" />
                  <option value="Croatia" />
                  <option value="Cuba" />
                  <option value="Cyprus" />
                  <option value="Czech Republic" />
                  <option value="Denmark" />
                  <option value="Djibouti" />
                  <option value="Dominica" />
                  <option value="Dominican Republic" />
                  <option value="Ecuador" />
                  <option value="Egypt" />
                  <option value="El Salvador" />
                  <option value="Equatorial Guinea" />
                  <option value="Eritrea" />
                  <option value="Estonia" />
                  <option value="Ethiopia" />
                  <option value="Falkland Islands (Malvinas)" />
                  <option value="Faroe Islands" />
                  <option value="Fiji" />
                  <option value="Finland" />
                  <option value="France" />
                  <option value="French Guiana" />
                  <option value="French Polynesia" />
                  <option value="French Southern Territories" />
                  <option value="Gabon" />
                  <option value="Gambia" />
                  <option value="Georgia" />
                  <option value="Germany" />
                  <option value="Ghana" />
                  <option value="Gibraltar" />
                  <option value="Greece" />
                  <option value="Greenland" />
                  <option value="Grenada" />
                  <option value="Guadeloupe" />
                  <option value="Guam" />
                  <option value="Guatemala" />
                  <option value="Guinea" />
                  <option value="Guinea-bissau" />
                  <option value="Guyana" />
                  <option value="Haiti" />
                  <option value="Heard Island and Mcdonald Islands" />
                  <option value="Holy See (Vatican City State)" />
                  <option value="Honduras" />
                  <option value="Hong Kong" />
                  <option value="Hungary" />
                  <option value="Iceland" />
                  <option value="India" />
                  <option value="Indonesia" />
                  <option value="Iran, Islamic Republic of" />
                  <option value="Iraq" />
                  <option value="Ireland" />
                  <option value="Israel" />
                  <option value="Italy" />
                  <option value="Jamaica" />
                  <option value="Japan" />
                  <option value="Jordan" />
                  <option value="Kazakhstan" />
                  <option value="Kenya" />
                  <option value="Kiribati" />
                  <option value="Korea, Democratic People's Republic of" />
                  <option value="Korea, Republic of" />
                  <option value="Kuwait" />
                  <option value="Kyrgyzstan" />
                  <option value="Lao People's Democratic Republic" />
                  <option value="Latvia" />
                  <option value="Lebanon" />
                  <option value="Lesotho" />
                  <option value="Liberia" />
                  <option value="Libyan Arab Jamahiriya" />
                  <option value="Liechtenstein" />
                  <option value="Lithuania" />
                  <option value="Luxembourg" />
                  <option value="Macao" />
                  <option value="Macedonia, The Former Yugoslav Republic of" />
                  <option value="Madagascar" />
                  <option value="Malawi" />
                  <option value="Malaysia" />
                  <option value="Maldives" />
                  <option value="Mali" />
                  <option value="Malta" />
                  <option value="Marshall Islands" />
                  <option value="Martinique" />
                  <option value="Mauritania" />
                  <option value="Mauritius" />
                  <option value="Mayotte" />
                  <option value="Mexico" />
                  <option value="Micronesia, Federated States of" />
                  <option value="Moldova, Republic of" />
                  <option value="Monaco" />
                  <option value="Mongolia" />
                  <option value="Montserrat" />
                  <option value="Morocco" />
                  <option value="Mozambique" />
                  <option value="Myanmar" />
                  <option value="Namibia" />
                  <option value="Nauru" />
                  <option value="Nepal" />
                  <option value="Netherlands" />
                  <option value="Netherlands Antilles" />
                  <option value="New Caledonia" />
                  <option value="New Zealand" />
                  <option value="Nicaragua" />
                  <option value="Niger" />
                  <option value="Nigeria" />
                  <option value="Niue" />
                  <option value="Norfolk Island" />
                  <option value="Northern Mariana Islands" />
                  <option value="Norway" />
                  <option value="Oman" />
                  <option value="Pakistan" />
                  <option value="Palau" />
                  <option value="Palestinian Territory, Occupied" />
                  <option value="Panama" />
                  <option value="Papua New Guinea" />
                  <option value="Paraguay" />
                  <option value="Peru" />
                  <option value="Philippines" />
                  <option value="Pitcairn" />
                  <option value="Poland" />
                  <option value="Portugal" />
                  <option value="Puerto Rico" />
                  <option value="Qatar" />
                  <option value="Reunion" />
                  <option value="Romania" />
                  <option value="Russian Federation" />
                  <option value="Rwanda" />
                  <option value="Saint Helena" />
                  <option value="Saint Kitts and Nevis" />
                  <option value="Saint Lucia" />
                  <option value="Saint Pierre and Miquelon" />
                  <option value="Saint Vincent and The Grenadines" />
                  <option value="Samoa" />
                  <option value="San Marino" />
                  <option value="Sao Tome and Principe" />
                  <option value="Saudi Arabia" />
                  <option value="Senegal" />
                  <option value="Serbia and Montenegro" />
                  <option value="Seychelles" />
                  <option value="Sierra Leone" />
                  <option value="Singapore" />
                  <option value="Slovakia" />
                  <option value="Slovenia" />
                  <option value="Solomon Islands" />
                  <option value="Somalia" />
                  <option value="South Africa" />
                  <option value="South Georgia and The South Sandwich Islands" />
                  <option value="Spain" />
                  <option value="Sri Lanka" />
                  <option value="Sudan" />
                  <option value="Suriname" />
                  <option value="Svalbard and Jan Mayen" />
                  <option value="Swaziland" />
                  <option value="Sweden" />
                  <option value="Switzerland" />
                  <option value="Syrian Arab Republic" />
                  <option value="Taiwan, Province of China" />
                  <option value="Tajikistan" />
                  <option value="Tanzania, United Republic of" />
                  <option value="Thailand" />
                  <option value="Timor-leste" />
                  <option value="Togo" />
                  <option value="Tokelau" />
                  <option value="Tonga" />
                  <option value="Trinidad and Tobago" />
                  <option value="Tunisia" />
                  <option value="Turkey" />
                  <option value="Turkmenistan" />
                  <option value="Turks and Caicos Islands" />
                  <option value="Tuvalu" />
                  <option value="Uganda" />
                  <option value="Ukraine" />
                  <option value="United Arab Emirates" />
                  <option value="United Kingdom" />
                  <option value="United States" />
                  <option value="United States Minor Outlying Islands" />
                  <option value="Uruguay" />
                  <option value="Uzbekistan" />
                  <option value="Vanuatu" />
                  <option value="Venezuela" />
                  <option value="Viet Nam" />
                  <option value="Virgin Islands, British" />
                  <option value="Virgin Islands, U.S" />
                  <option value="Wallis and Futuna" />
                  <option value="Western Sahara" />
                  <option value="Yemen" />
                  <option value="Zambia" />
                  <option value="Zimbabwe" />
                </datalist>
                {/* country data list end */}

                <div className="actionButtons text-right">
                  <button
                    class="btn btn-light btn-sm m-2"
                    onClick={() => setEditInfo("")}
                  >
                    <small>Cancel</small>
                  </button>
                  <button
                    class="btn btn-secondary btn-sm m-2"
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
              <div className="my-3 w-100">
                <form className="w-100 p-3 border">
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
                <div className="actionButtons text-center">
                  <button
                    class="btn btn-light btn-sm m-2"
                    onClick={() => setEditInfo("")}
                  >
                    <small>Cancel</small>
                  </button>
                  <button
                    class="btn btn-secondary btn-sm m-2"
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
