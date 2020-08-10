import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loadUser, logout } from "../../../redux/action/auth";
import { connect } from "react-redux";

const HomeNavs = ({ auth, logout }) => {
  //initail states
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownStatus, setDropdownStatus] = useState(
    `dropdown-menu dropdown-menu-right`
  );

  //dropdownhandler
  const dropdownHandler = () => {
    setMenuOpen(!menuOpen);
    setDropdownStatus(
      `dropdown-menu dropdown-menu-right ${menuOpen ? "" : "show"}`
    );
  };
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [navStatus, setNavStatus] = useState("collapse navbar-collapse");

  //navbar handler
  // const navbarHandler = () => {
  //   setNavbarOpen(!navbarOpen);
  //   setNavStatus(`collapse navbar-collapse ${navbarOpen ? "" : "show"}`);
  // };

  const userProps = { ...auth.user };

  return (
    // <nav className="header navbar navbar-expand-sm navbar-light">
    //   <div className="container">
    //   <Link to="/" className="navbar-brand text-white">
    //       <h3 className="m-0">ConnectSync</h3>
    //     </Link>
    //     <button
    //       className="navbar-toggler text-white"
    //       type="button"
    //       onClick={navbarHandler}
    //     >
    //       <span className="navbar-toggler-icon text-white" />
    //     </button>
    //     <div className={navStatus}>
    //     <ul className="navbar-nav all-center text-white ml-auto">
    //         <li className="nav-item px-2">
    //               <div className="nav-link text-white">
    //                 <Link to="/home" className="text-white">
    //                   <i className="fa fa-home mr1" aria-hidden="true"/>
    //                     {" "}
    //                   </i>
    //                 </Link>
    //               </div>
    //         </li>
    //         <li className="nav-item px-2">
    //           <div className="nav-link text-white">
    //             <Link to="/members" className="text-white">
    //               <i className="fa fa-users mr1" aria-hidden="true"/>
    //                 {" "}
    //               </i>
    //             </Link>
    //           </div>
    //         </li>
    //         <li className="nav-item px-2">
    //           <div className="nav-link text-white">
    //             <Link to="/messages" className="text-white">
    //               <i className="fa fa-comments mr1" aria-hidden="true"/>
    //                 {" "}
    //               </i>
    //             </Link>
    //           </div>
    //         </li>

    //         <li className="nav-item px-2">
    //           <div className="nav-link text-white">
    //             <Link to="/profile" className="text-white">
    //               <i className="fa fa-user mr1" aria-hidden="true"/>
    //                 {" "}
    //               </i>
    //             </Link>
    //           </div>
    //         </li>
    //         <div className="dropdown show">
    //           <li
    //             className="nav-item px-2 profile-link"
    //             role="button"
    //             onClick={dropdownHandler}
    //           >
    //             <div className="nav-link">
    //               <div className="avatar nav-avatar d-inline-block mr-2">
    //                 <img src={userProps.img} className="avatar-img" />
    //               </div>
    //               <i className="fa fa-angle-down" aria-hidden="true" />
    //             </div>
    //           </li>

    //           <div className={dropdownStatus}>
    //             {/* replace with Link */}
    //             <Link className="dropdown-item" to="/profile">
    //               Profile
    //             </Link>

    //             <span className="dropdown-item" onClick={() => logout()}>
    //               Logout
    //             </span>
    //           </div>
    //         </div>
    //     </ul>

    //     </div>
    //   </div>

    // </nav>
    <ul className="navbar-nav ml-auto">
      <li className="nav-item px-1">
        <Link to="/home" className="nav-link text-white">
          <i className="fa fa-home mr-1" aria-hidden="true" />
          Home
        </Link>
      </li>
      <li className="nav-item px-1">
        <Link to="/members" className="nav-link text-white">
          <i className="fa fa-users mr-1" aria-hidden="true" />
          Members
        </Link>
      </li>
      <li className="nav-item px-1">
        <Link to="/chats" className="nav-link text-white">
          <i className="fa fa-comments mr-1" aria-hidden="true" />
          Chats
        </Link>
      </li>

      <div className="dropdown show">
        <li
          className="nav-item px-2 profile-link"
          role="button"
          onClick={dropdownHandler}
        >
          <div className="nav-link text-white">
            <i className="fa fa-user mr-1" aria-hidden="true" />
            <i className="fa fa-angle-down" aria-hidden="true" />
          </div>
        </li>
        <div className={dropdownStatus}>
          <Link className="dropdown-item" to="/profile">
            Profile
          </Link>

          <span className="dropdown-item" onClick={() => logout()}>
            Logout
          </span>
        </div>
      </div>
    </ul>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, logout })(HomeNavs);
