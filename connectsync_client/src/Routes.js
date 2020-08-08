import React from "react";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//all routing paths goes here
const Routes = () => {
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
