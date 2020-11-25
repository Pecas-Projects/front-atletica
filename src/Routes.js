import React from "react";
import { isLogin } from "./variables/ApiService";
import { Route, Switch, Redirect } from "react-router-dom";
import Perfil from "./Pages/Perfil";
import PaginaInicio from "./Pages/Inicio";
import Produtos from "./Pages/Produtos";
import Times from "./Pages/Times";
import Feed from "./Pages/Feed";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import AdicionarProduto from "./Pages/AdicionarProduto";
import AdicionarPost from "./Pages/AdicionarPost";
import AdicionarEvento from "./Pages/AdicionarEvento";
import Notificacoes from "./Pages/Notificacoes";
import EditarPerfil from "./Pages/EditarPerfil";
import Ranking from "./Pages/Ranking";
import Jogos from "./Pages/Jogos";
import Modalidades from "./Pages/AdicionarModalidade";
import Page404 from "./Pages/404";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
          <Component {...props} path={rest.path} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Perfil} />
    <Route exact path="/Perfil" component={PaginaInicio} />
    <Route exact path="/Produtos" component={Produtos} />
    <Route exact path="/Times" component={Times} />
    <Route exact path="/Feed" component={Feed} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/Cadastro" component={Cadastro} />
    <PrivateRoute
      exact
      path="/AdicionarProduto"
      component={AdicionarProduto}
    />{" "}
    {/* Atlteica*/}
    <PrivateRoute exact path="/AdicionarPost" component={AdicionarPost} />
    {/* Atlteica*/}
    {/* <PrivateRoute exact path="/AdicionarEvento" component={AdicionarEvento} /> */}
    <PrivateRoute exact path="/Notificacoes" component={Notificacoes} />
    <PrivateRoute exact path="/EditarPerfil" component={EditarPerfil} />
    {/* Atlteica*/}
    <PrivateRoute exact path="/Ranking" component={Ranking} />
    <PrivateRoute exact path="/Jogos" component={Jogos} />
    <PrivateRoute exact path="/Modalidades" component={Modalidades} />
    <Route component={Page404} />
  </Switch>
);

export default Routes;
