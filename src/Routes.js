import React from "react";
import { isLogin, getUserType } from "./utils/storage";
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
// import AdicionarEvento from "./Pages/AdicionarEvento";
import Notificacoes from "./Pages/Notificacoes";
import EditarPerfil from "./Pages/EditarPerfil";
import Ranking from "./Pages/Ranking";
import Jogos from "./Pages/Jogos";
import Modalidades from "./Pages/AdicionarModalidade";
import Page404 from "./Pages/404";
import EditarProduto from"./Pages/EditarProduto";
import RedefinirSenha from "./Pages/RedefinirSenha";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
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
    <Route exact path="/Perfil/:username" component={Perfil} />
    <Route exact path="/" component={PaginaInicio} />
    <Route exact path="/Produtos/:username" component={Produtos} />
    <Route exact path="/Times/:username" component={Times} />
    <Route exact path="/Feed/:username" component={Feed} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/RedefinirSenha/:token" component={RedefinirSenha} />
    <Route exact path="/Cadastro" component={Cadastro} />
    <PrivateRoute
      exact
      path="/AdicionarProduto"
      component={AdicionarProduto}
    />{" "}
    <PrivateRoute exact path="/EditarProduto/:produtoId" component={EditarProduto} />
    <PrivateRoute exact path="/AdicionarPost" component={AdicionarPost} />
    {/* <PrivateRoute exact path="/AdicionarEvento" component={AdicionarEvento} /> */}
    <PrivateRoute exact path="/Notificacoes" component={Notificacoes} />
    { getUserType() === "A" ?
      <PrivateRoute
        exact
        path="/EditarPerfil"
        component={EditarPerfil}
      />
      : null
    }
    <PrivateRoute exact path="/Ranking" component={Ranking} />
    <PrivateRoute exact path="/Jogos" component={Jogos} />
    <PrivateRoute exact path="/Modalidades" component={Modalidades} />
    <Route component={Page404} />
  </Switch>
);

export default Routes;
