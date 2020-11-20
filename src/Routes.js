import React from "react";
import { Route, Switch } from "react-router-dom";
import Perfil from "./Pages/Perfil";
import PaginaInicio from "./Pages/Inicio";
import Produtos from "./Pages/Produtos"
import Times from "./Pages/Times"
import Feed from "./Pages/Feed"
import Login from "./Pages/Login"
import Cadastro from "./Pages/Cadastro"
import AdicionarProduto from "./Pages/AdicionarProduto"
import AdicionarPost from "./Pages/AdicionarPost"
import AdicionarEvento from "./Pages/AdicionarEvento"
import Notificacoes from "./Pages/Notificacoes"
import EditarPerfil from "./Pages/EditarPerfil"
import Ranking from "./Pages/Ranking"
import Jogos from "./Pages/Jogos"
import Modalidades from "./Pages/AdicionarModalidade"
import Page404 from "./Pages/404"
import EditarProduto from "./Pages/EditarProduto"

const Routes = () => (
  <Switch>

    <Route exact path="/" component={Perfil} />
    <Route exact path="/Inicio" component={PaginaInicio} />
    <Route exact path="/Produtos" component={Produtos} />
    <Route exact path="/Times" component={Times} />
    <Route exact path="/Feed" component={Feed} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/Cadastro" component={Cadastro} />
    <Route exact path="/AdicionarProduto" component={AdicionarProduto} />
    <Route exact path="/AdicionarPost" component={AdicionarPost} />
    <Route exact path="/AdicionarEvento" component={AdicionarEvento} />
    <Route exact path="/Notificacoes" component={Notificacoes} />
    <Route exact path="/EditarPerfil" component={EditarPerfil} />
    <Route exact path="/Ranking" component={Ranking} />
    <Route exact path="/Jogos" component={Jogos} />
    <Route exact path="/Modalidades" component={Modalidades} />
    <Route exact path="/EditarProduto" component={EditarProduto} />
    <Route component={Page404} />

  </Switch>
);

export default Routes;
