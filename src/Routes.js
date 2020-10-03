import React from "react";
import { Route, Switch } from "react-router-dom";
import Perfil from "./Pages/Perfil";
import PaginaInicio from "./Pages/Inicio";

const Routes = () => (
  <Switch>
    <Route>
      <Route exact path="/" component={Perfil} />
      <Route exact path="/Inicio" component={PaginaInicio} />
    </Route>
  </Switch>
);

export default Routes;
