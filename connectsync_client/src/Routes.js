import React from 'react';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';

//all routing paths goes here
const Routes = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/home" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
