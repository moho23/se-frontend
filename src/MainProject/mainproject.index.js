import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "./mainproject.style.scss"


const MainProject = () => {
    return (
        <Router>
            <Switch>
                <Route path="*">
                    <div className="main-project-page">
                        سلام پوریا
                    </div>
                </Route>
            </Switch>
        </Router>
    )
}

export default MainProject;