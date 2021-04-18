import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "./mainproject.style.scss"
import {toast} from "react-toastify";


const MainProject = () => {
    return (
        <Router>
            <Switch>
                <Route path="*">
                    <div  onClick={()=>toast.success("salam")} className="main-project-page">
                        Hello World!
                    </div>
                </Route>
            </Switch>
        </Router>
    )
}

export default MainProject;