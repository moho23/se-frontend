import React, {useEffect, useState} from 'react';
import './sidebar.style.scss';
import static_profile from "../../assets/image/static.png"
import {NavLink} from 'react-router-dom';
import {APIPath, RoutePath} from "../../data";
import {authToken} from "../../scripts/storage";
import {setAuth, setUserData} from "../../redux/actions";
import {connect} from "react-redux";

const Sidebar = (props) => {
    const [status, setStatus] = useState(props.isOpen);
    const [userDetail, setUserDetail] = useState()
    const detail = props.information;

    useEffect(() => {
        setStatus(props.isOpen);
    }, [props.isOpen]);

    // useEffect(() => {
    //     get(APIPath.account.profile).then((res) => {
    //         if (responseValidator(res.status) && res.data) {
    //             setUserDetail(res.data)
    //         } else {
    //             authToken.remove();
    //         }
    //     });
    // }, [])

    function logout() {
        authToken.remove();
        props.dispatch(setUserData(null));
        props.dispatch(setAuth("inValid"));
    }


    return (
        <div className={`project-sidebar-page ${status ? 'is-open' : ''}`}>
            <div className="artist-details">
                <img src={detail && detail.profile_picture ? detail.profile_picture : static_profile} alt="static"/>
                <p>{detail && detail.username}</p>
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

const mapStateToProps = (state) => ({
    text: state.language,
    information: state.userData,
});

const connector = connect(mapStateToProps);
export default connector(Sidebar);