import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/Common/PrivateRoute';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Members from './pages/Members/Members';
import Messages from './pages/Messages';
import User from './pages/User/UserPage';
import CommentPage from './pages/Comment/CommentPage';

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
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute exact path="/home" component={HomePage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute exact path="/members" component={Members} />
          <PrivateRoute path="/chats" exact component={Messages} />
          <PrivateRoute exact path="/user/:userId" component={User} />
          <PrivateRoute
            exact
            path="/posts/:postId/comment"
            component={CommentPage}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Routes;
