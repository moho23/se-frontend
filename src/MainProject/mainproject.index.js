import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { RoutePath } from "../data";
import "./mainproject.style.scss"
import Signup from "./register/signup/signup.index"


const MainProject = () => {
    return (
        <Router>
            <Switch>
                <Route path={RoutePath.register.signup} component={Signup} />
            </Switch>
        </Router>
    )
}

export default MainProject;