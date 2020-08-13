import React from "react";
import { Route, Switch } from "react-router-dom";
import Create from "../components/Create";
import View from "../components/View";

function Router() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Create} />
        <Route path="/view" component={View} />
      </Switch>
    </>
  );
}

export default Router;
