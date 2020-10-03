import React from "react";
import { Route, Switch } from "react-router-dom";
import Perfil from "./Pages/Perfil";

const Routes = () => (
  <Switch>
    <Route>
      <Route exact path="/" component={Perfil} />
    </Route>
  </Switch>
);

export default Routes;
