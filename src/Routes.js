import React from "react";
import { Route, Switch } from "react-router-dom";
import Perfil from "./Pages/Perfil";
import PaginaInicio from "./Pages/Inicio";
import Produtos from "./Pages/Produtos"
import Times from "./Pages/Times"
import AdicionarProduto from "./Pages/AdicionarProduto"
import AdicionarPost from "./Pages/AdicionarPost"

const Routes = () => (
  <Switch>
    <Route>
      <Route exact path="/" component={Perfil} />
      <Route exact path="/Inicio" component={PaginaInicio} />
      <Route exact path="/Produtos" component={Produtos} />
      <Route exact path="/Times" component={Times} />
      <Route exact path="/AdicionarProduto" component={AdicionarProduto} />
      <Route exact path="/AdicionarPost" component={AdicionarPost} />
    </Route>
  </Switch>
);

export default Routes;
