import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./MemberStyles.scss";
import { connect } from "react-redux";
import { getAllWorkplacesMembers } from "../../redux/action/workplaces";
import { Link } from "react-router-dom";

const Members = (props) => {
  const { user, workplaces, getAllWorkplacesMembers } = props;
  let [workplaceNames, setWorkplaceNames] = useState([]);
  let [activeWorkplaceNames, setActiveWorkplaceNames] = useState({ name: "" });
  useEffect(() => {
    if (user !== null) {
      if (typeof user.workplaces !== "undefined") {
        user.workplaces.forEach((workplaceObj) => {
          workplaceNames.push(workplaceObj.workplace);
        });
        setActiveWorkplaceNames(workplaceNames[0]);
      }
    }
  }, [workplaces.loading, user]);
  useEffect(() => {
    if (workplaceNames.length > 0) {
      console.log("members=", activeWorkplaceNames);
      getAllWorkplacesMembers(activeWorkplaceNames.name);
    }
  }, [activeWorkplaceNames]);

  const workplaceNamesSetData = new Set(workplaceNames);
  const workplaceNamesArray = Array.from(workplaceNamesSetData);

  if (workplaceNamesArray.length < 1) {
    return (
      <>
        <Navbar />
        <p className="text-center"> You do not have any workplace setup!</p>
      </>
    );
  }
  const MembersList = () =>
    workplaces.workplaces_members.map((member) => {
      const { name, img, _id } = member.user;
      return (
        <Link key={_id} className="memberDataRow" to={`/user/${_id}`}>
          <div className="img">
            <img src={img} alt={name} />
          </div>
          <span className="memberName">{name}</span>
        </Link>
      );
    });

  const WorkplaceList = (obj) => {
    const { name, _id } = obj;
    if (activeWorkplaceNames.name === name) {
      return (
        <li className="activeWorkplace" key={_id}>
          {name}
        </li>
      );
    }
    return (
      <li
        className="deactiveWorkplace"
        onClick={() => setActiveWorkplaceNames(obj)}
        key={_id}
      >
        {name}
      </li>
    );
  };
  const renderWorkplaceList = workplaceNamesArray.map((workplaceData) => {
    return WorkplaceList(workplaceData);
  });
  return (
    <div className="membersPage">
      <Navbar />
      {
        <div className="mainMemberSection">
          <div className="workplaceDiv">
            <h5>Workplaces:</h5>
            {workplaceNamesArray.length > 1 ? (
              renderWorkplaceList
            ) : (
              <p>No Workplace</p>
            )}
          </div>
          <div className="memberDiv">
            <div>
              <p>
                Workplace Name: <strong>{activeWorkplaceNames.name}</strong>
              </p>
              <p>
                Workplace Description:{" "}
                <strong>{activeWorkplaceNames.description}</strong>
              </p>
            </div>
            <h5>Members: </h5>
            {workplaces.workplaces_members.length < 1 ? (
              <p>Loading</p>
            ) : (
              <MembersList />
            )}
          </div>
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    workplaces: state.workplaces,
  };
};
export default connect(mapStateToProps, {
  getAllWorkplacesMembers,
})(Members);
