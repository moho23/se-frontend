import React, {useEffect, useState} from 'react';
import './sidebar.style.scss';
import static_profile from "../../assets/image/static.png"
import {NavLink} from 'react-router-dom';
import {RoutePath} from "../../data";
import {authToken} from "../../scripts/storage";
// import {setAuth, setUserData} from '../../redux/actions';

const Sidebar = (props) => {
    const [status, setStatus] = useState(props.isOpen);

    useEffect(() => {
        setStatus(props.isOpen);
    }, [props.isOpen]);

    function logout() {
        authToken.remove();
        // props.dispatch(setUserData(null));
        // props.dispatch(setAuth(AuthStatus.inValid));
    }

    // const detail = props.artistInfo;

    return (
        <div className={`project-sidebar-page ${status ? 'is-open' : ''}`}>
            <div className="artist-details">
                <img src={static_profile} alt="static"/>
                <p>نام و نام خانوادگی</p>
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

                <span/>

                <NavLink to={RoutePath.account.signin} onClick={logout} className="row-item end-item">
                    <i className="material-icons reverse-icon">logout</i>
                    <p>خروج</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
