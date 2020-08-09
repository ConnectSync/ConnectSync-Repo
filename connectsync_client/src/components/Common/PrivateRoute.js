import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.token !== null ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProp = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProp)(PrivateRoute);
