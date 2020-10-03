import React from "react";
import { Route, Switch } from "react-router-dom";
import Perfil from "./Pages/Perfil"
import NavBar from "./Components/NavBar";

const Routes = () => (
    <Switch>
        <NavBar />
        <Route>
            <Route exact path="/" component={Perfil} />
        </Route>
    </Switch>
)

export default Routes;