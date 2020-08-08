import React from "react";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//all routing paths goes here
const Routes = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={LandingPage} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
