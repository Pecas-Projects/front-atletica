import React from "react";
import { Route, Switch } from "react-router-dom";
import Perfil from "./Pages/Perfil";
import PaginaInicio from "./Pages/Inicio";
import Produtos from "./Pages/Produtos";
import Calendario from "./Pages/Calendario";

const Routes = () => (
  <Switch>
    <Route>
      <Route exact path="/" component={Perfil} />
      <Route exact path="/Inicio" component={PaginaInicio} />
      <Route exact path="/Produtos" component={Produtos} />
      <Route exact path="/Calendario" component={Calendario} />
    </Route>
  </Switch>
);

export default Routes;
