import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "./mainproject.style.scss"
import Profile from "./profile/profile.index";


const MainProject = () => {
    return (
        <Router>
            <Switch>
                <Profile/>
            </Switch>
        </Router>
    )
}

export default MainProject;