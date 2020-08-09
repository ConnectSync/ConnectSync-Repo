<<<<<<< HEAD
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { LandingPage } from "./pages/LandingPage/LandingPage";
=======
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import LandingPage from './pages/LandingPage';
>>>>>>> 13277c04eea1b5a3b180943ba9d5f9c4f56e6d02

import { loadUser } from './redux/action/auth';
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
//all routing paths goes here
const Routes = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/home" component={HomePage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Routes;
