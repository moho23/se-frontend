import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {RoutePath} from "../data";
import "./mainproject.style.scss"
import Login from "./register/login/login.index";
import Signup from "./register/signup/signup.index"
import Sidebar from "./sidebar/sidebar.index";
import {connect} from "react-redux";
import {projectInitialize} from "./mainproject.scripts";
import Profile from "./profile/profile.index";
import MapContainer from "./map/mapcontainer.index";
import ModalDetails from "./modalDetailsLand/modalDetailsLands.index"
import myLandscapes from "./myLandscapes/myLandscapes.index";
import AddLandscapes from "./addLandscapes/addlandscapes.index";
import DriverTravels from "./driverTravels/driverTravels.index";
import timeLine from "./timeLine/timeLine.index"
import Comments from "./commentsLandscapes/commentsLandscapes.index"



const MainProject = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const isAuth = props.isAuth;

    useEffect(() => {
        projectInitialize(props.dispatch);
    }, []);

    return (
        <Router>
            <Switch>
                {
                    isAuth === "inValid" &&
                    <Switch>
                        <Route path={RoutePath.account.signup} component={Signup}/>
                        <Route path={RoutePath.account.signin} component={Login}/>
                        <Route path="*">
                            <Redirect to={RoutePath.account.signin}/>
                        </Route>
                    </Switch>
                }
                {
                    isAuth === "valid" &&
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
                                            <Route path={RoutePath.dashboard.details} component={ModalDetails}/>
                                            <Route path={RoutePath.dashboard.myLandscapes} component={myLandscapes}/>
                                            <Route path={RoutePath.dashboard.driverTravels} component={DriverTravels} />
                                            <Route path={RoutePath.dashboard.timeLine} component={timeLine}/>
                                            <Route path={RoutePath.dashboard.addLandscapes}component={AddLandscapes}/>
                                            <Route path={RoutePath.map.index} component={MapContainer} />
                                            <Route path={RoutePath.commentsLand.comments} component={Comments}/>
                                            {/*<Route path={RoutePath.dashboard.details} component={Details}/>*/}
                                            <Route path="*">
                                                <Redirect to={RoutePath.dashboard.timeLine}/>
                                                {/* <Redirect to={RoutePath.dashboard.index}/> */}
                                            </Route>
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


const mapStateToProps = (state) => ({
    isAuth: state.register.authStatus,
});
const connector = connect(mapStateToProps);
export default connector(MainProject);




