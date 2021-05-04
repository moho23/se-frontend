import React, {useEffect, useState} from 'react';
import './sidebar.style.scss';
import static_profile from "../../assets/images/static.png"
import {NavLink} from 'react-router-dom';
import {RoutePath} from "../../data";
import {authToken} from "../../scripts/storage";
import {setAuth, setUserData} from "../../redux/actions";
import {connect} from "react-redux";

const Sidebar = (props) => {
    const [status, setStatus] = useState(props.isOpen);
    const detail = props.information;

    useEffect(() => {
        setStatus(props.isOpen);
    }, [props.isOpen]);

    function logout() {
        authToken.remove();
        props.dispatch(setUserData(null));
        props.dispatch(setAuth("inValid"));
    }

    return (
        <div className={`project-sidebar-page ${status ? 'is-open' : ''}`}>
            <div className="artist-details">
                <img src={detail && detail.profile_picture ? detail.profile_picture : static_profile}
                     alt={detail.username}/>
                <p>{detail && detail.username}@</p>
            </div>
            <div className="sidebar-items">
                <NavLink
                    to={RoutePath.dashboard.profile}
                    onClick={() => setStatus(false)}
                    activeClassName="active"
                    className="row-item"
                >
                    <i className="material-icons">person</i>
                    <p>پروفایل</p>
                </NavLink>

                <NavLink
                    to={RoutePath.map.index}
                    onClick={() => setStatus(false)}
                    activeClassName="active"
                    className="row-item map"
                >
                    <i className="material-icons">map</i>
                    <p>نقشه</p>
                </NavLink>
<<<<<<< HEAD
                <NavLink
                    to={RoutePath.myLandscapes.index}
                    onClick={() => setStatus(false)}
                    activeClassName="active"
                    className="row-item"
                >
                    <i className="material-icons">my_location</i>
                    <p>مکان ‌های من</p>
                </NavLink>
                {/* <NavLink
                    to={RoutePath.dashboard.details}
=======

                <NavLink
                    to={RoutePath.dashboard.addLandscapes}
>>>>>>> 8a4f23e54e2fc5098a6d0466f4702d39c14f6c6b
                    onClick={() => setStatus(false)}
                    activeClassName="active"
                    className="row-item map"
                >
                    <i className="material-icons">add</i>
                    <p>ثبت مکان</p>
                </NavLink>

                <span/>

                <NavLink to={RoutePath.account.signin} onClick={logout} className="row-item end-item">
                    <i className="material-icons reverse-icon">logout</i>
                    <p>خروج</p>
                </NavLink>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    text: state.language,
    information: state.userData,
});

const connector = connect(mapStateToProps);
export default connector(Sidebar);