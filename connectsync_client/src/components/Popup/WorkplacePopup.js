import React, { useEffect } from "react";
import PopupContainer from "./PopupContainer";
import { connect } from "react-redux";
import { getAllPublicWorkplaces } from "../../redux/action/workplaces";
import { openChangePopup } from "../../redux/action/popup";

const mapStateToProps = (state) => ({
  workplaceProps: state.workplaces,
  popup: state.popup,
});

export default connect(mapStateToProps, { getAllPublicWorkplaces })(
  function WorkplacePopup({
    create,
    join,
    handleChange,
    name,
    description,
    type,
    workplace_type,
    workplaceProps,
    getAllPublicWorkplaces,
  }) {
    useEffect(() => {
      getAllPublicWorkplaces();
    }, []);
    const {
      loading: workplaceLoading,
      all_public_workplaces: publicWorkplaces,
    } = workplaceProps;
    console.log("type=", type);

    if (workplaceLoading) {
      return (
        <PopupContainer>
          <div className="text-center">
            {type === "CREATE" ? (
              <h3>Initializing 'Create Workplace'...</h3>
            ) : (
              <h3>Initializing 'Join Workplace'...</h3>
            )}
          </div>
        </PopupContainer>
      );
    } else {
      console.log(publicWorkplaces);

      return (
        <PopupContainer title="Create/Join a workplace">
          <div>
            <div className="text-center">
              {type === "CREATE" ? (
                <h3>Create Workplace</h3>
              ) : (
                <h3>Join Workplace</h3>
              )}
            </div>
            <form className="">
              <div className="form-group">
                <label htmlFor="name">Name*</label>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Give your workplace a suitable name"
                  name="name"
                  required
                  id="name"
                  list="workplaceNames"
                  autoComplete="off"
                  onChange={handleChange("name")}
                />
                <datalist id="workplaceNames">
                  {publicWorkplaces.map((publicWorkplace) => (
                    <option
                      key={publicWorkplace._id}
                      value={publicWorkplace.name}
                    />
                  ))}
                </datalist>
              </div>
              {type === "CREATE" && (
                <React.Fragment>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="A short description for your new workplace"
                      value={description}
                      name="description"
                      id="description"
                      onChange={handleChange("description")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Type*</label>
                    <select
                      onChange={handleChange("type")}
                      className="custom-select"
                      id="type"
                      value={workplace_type}
                      required
                    >
                      <option selected disabled value="">
                        Choose...
                      </option>
                      <option value="PUBLIC">PUBLIC</option>
                      <option value="PRIVATE">PRIVATE</option>
                    </select>
                  </div>
                </React.Fragment>
              )}

              <div className="text-center">
                {type === "CREATE" ? (
                  <button
                    onClick={create}
                    className="btn-style text-center mt-3 px-5 btn btn-primary bg-primary"
                  >
                    Create
                  </button>
                ) : (
                  <button
                    onClick={join}
                    className="btn-style text-center mt-3 px-5 btn btn-primary bg-primary"
                  >
                    Join
                  </button>
                )}
              </div>
            </form>
          </div>
        </PopupContainer>
      );
    }
  }
);
