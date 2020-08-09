import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom"

import { openChangePopup } from '../../../redux/action/popup';

const LandingNavs = ({ openChangePopup, isAuthenticated }) =>
  isAuthenticated ? (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item px-1">
        <button className="btn btn-primary text-dark">Logout</button>
      </li>
      <li className="nav-item px-1">
        <Link to="/home" className="btn btn-primary text-dark">Home</Link>
        {/* <button className="btn btn-primary text-dark">Home</button> */}
      </li>
    </ul>
  ) : (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item px-1">
        <button
          onClick={() => openChangePopup('REGISTER')}
          className="btn btn-primary text-dark"
        >
          Register
        </button>
      </li>
      <li className="nav-item px-1">
        <button
          onClick={() => openChangePopup('LOGIN')}
          className="btn btn-primary text-dark"
        >
          Login
        </button>
      </li>
    </ul>
  );

LandingNavs.propTypes = {
  openChangePopup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { openChangePopup })(LandingNavs);
