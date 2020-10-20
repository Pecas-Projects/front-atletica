import React from "react";
import { Route, Switch } from "react-router-dom";
import Perfil from "./Pages/Perfil";
import PaginaInicio from "./Pages/Inicio";
import Produtos from "./Pages/Produtos"
import Feed from "./Pages/Feed"
import Login from "./Pages/Login"
import Cadastro from "./Pages/Cadastro"

const Routes = () => (
  <Switch>
    <Route>
      <Route exact path="/" component={Perfil} />
      <Route exact path="/Inicio" component={PaginaInicio} />
      <Route exact path="/Produtos" component={Produtos} />
      <Route exact path="/Feed" component={Feed} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/Cadastro" component={Cadastro} />
    </Route>
  </Switch>
);

export default Routes;
