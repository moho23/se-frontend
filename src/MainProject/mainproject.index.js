import React, {useState} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "./mainproject.style.scss"
import {authToken} from "../scripts/storage";
import Sidebar from "./sidebar/sidebar.index";
import {RoutePath} from "../data";
import Profile from "./profile/profile.index";


const MainProject = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Router>
            <Switch>
                {
                    authToken.get() !== null &&
                    <Switch>
                    </Switch>
                }
                {
                    authToken.get() === null &&
                    (
                        <Switch>
                            <div className="main-project">
                                <Sidebar isOpen={isOpen}/>
                                <div
                                    onClick={() => (isOpen ? setIsOpen(false) : null)}
                                    className="project-main-sidebar-items"
                                >
                                    <div className="project-responsive-header d-flex d-md-none">
                                        <h1>!بزن بریم</h1>
                                        <i
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="material-icons three-line-menu d-block d-md-none"
                                        >
                                            dehaze
                                        </i>
                                    </div>
                                    <div className="project-content">
                                        <Switch>
                                            <Route path={RoutePath.dashboard.profile} component={Profile}/>
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                        </Switch>
                    )
                }
            </Switch>
        </Router>
    )
}


export default MainProject;




