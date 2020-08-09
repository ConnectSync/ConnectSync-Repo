import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PopupContainer from './PopupContainer';
import { setError } from '../../redux/action/error';
import { register, signInWithGoogle, login } from '../../redux/action/auth';
import { openChangePopup } from '../../redux/action/popup';

const AuthPop = (props) => {
  const {
    setError,
    register,
    isAuthenticated,
    signInWithGoogle,
    login,
    type,
    data,
    openChangePopup,
    user,
  } = props;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    type === 'REGISTER' ? registerUser() : loginUser();
  };

  const registerUser = () => {
    register(formData);
    openChangePopup('CREATE_PROFILE');
  };

  const loginUser = async () => {
    await login(formData);

    if (user !== null) {
      if (typeof user !== 'undefined' && typeof user.profile !== 'undefined') {
        return <Redirect to="/home" />;
      }
    }
  };

  const responseGoogle = async (response) => {
    const authData = {
      name: response.profileObj.name,
      email: response.profileObj.email,
    };
    signInWithGoogle(authData);

    type === 'REGISTER' && openChangePopup('CREATE_PROFILE');
  };

  const responseGoogleFail = async (response) => {
    console.log('error', response);
    setError('Signing in with Google failed', 'danger');
  };

  return (
    <PopupContainer title={data}>
      <form onSubmit={(e) => submitHandler(e)}>
        {type === 'REGISTER' && (
          <div className="form-group">
            <label htmlFor="name">Full Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              value={formData.name}
              name="name"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            className="form-control"
            placeholder="example@domain.com"
            value={formData.email}
            name="email"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            className="form-control"
            value={formData.password}
            placeholder="password"
            name="password"
            min="6"
            autoComplete="off"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="text-center my-3">
          <p className="lead small">
            Field marked as <span>*</span> is required
          </p>
        </div>
        <div className="text-center my-4">
          <button type="submit" className="btn btn-secondary w-50">
            {type === 'REGISTER' ? 'Register' : 'Log in'}
          </button>
        </div>
        <div className="form-row">
          <div className="col text-center">
            <p className="m-0">-- OR --</p>
          </div>
        </div>
        <div className="form-row my-2">
          <div className="col text-center">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onSuccess={responseGoogle}
              onFailure={responseGoogleFail}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>

        {type === 'REGISTER' ? (
          <small className="form-text text-muted text-center mt-4">
            Already have an account?
            <p
              className="pl-2 pointer"
              onClick={() => openChangePopup('LOGIN')}
            >
              Login
            </p>
          </small>
        ) : (
          <small className="form-text text-muted text-center mt-4">
            New user?
            <p
              className="pl-2 pointer"
              onClick={() => openChangePopup('REGISTER')}
            >
              Register
            </p>
          </small>
        )}
      </form>
    </PopupContainer>
  );
};

AuthPop.propTypes = {
  setError: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  openChangePopup: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  setError,
  register,
  signInWithGoogle,
  login,
  openChangePopup,
})(AuthPop);
