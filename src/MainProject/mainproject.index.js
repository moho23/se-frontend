import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {RoutePath} from "../data";
import "./mainproject.style.scss"
import Login from "./register/login/login.index";
import Signup from "./register/signup/signup.index"


const MainProject = () => {
    return (
        <Router>
            {/*<div className="project-header">*/}
            {/*    <p>!بزن بریم</p>*/}
            {/*</div>*/}
            <Switch>
                <Route path={RoutePath.register.signup} component={Signup}/>
                <Route path={RoutePath.register.login} component={Login}/>
            </Switch>
        </Router>
    )
}

export default MainProject;