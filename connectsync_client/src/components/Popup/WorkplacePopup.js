import React from "react";
import PopupContainer from "./PopupContainer";
import { connect } from "react-redux";
import { getAllPublicWorkplaces } from "../../redux/action/workplaces";

const mapStateToProps = (state) => ({
  workplaceProps: state.workplaces,
});

export default connect(mapStateToProps, { getAllPublicWorkplaces })(
  function WorkplacePopup({
    create,
    join,
    handleChange,
    modalView,
    name,
    description,
    type,
    modelRef,
    workplaceProps,
  }) {
    const {
      loading: workplaceLoading,
      all_public_workplaces: publicWorkplaces,
    } = workplaceProps;

    if (workplaceLoading) {
      return (
        <PopupContainer ref={modelRef}>
          <div className="text-center">
            {modalView === "create" ? (
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
        <PopupContainer ref={modelRef}>
          <div>
            <div className="text-center">
              {modalView === "create" ? (
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
              {modalView === "create" && (
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
                      value={type}
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
                {modalView === "create" ? (
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
