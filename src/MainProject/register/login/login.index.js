import React, {useState} from "react";
import "./login.style.scss"
import Input from "../../../utilities/components/input/input.index"
import Button from "../../../utilities/components/button/button.index"
import signin from "../../../assets/images/signin.svg"
import {Link} from "react-router-dom";
import {APIPath, RoutePath} from "../../../data";
import {emailValidation} from "../../../scripts/validations";
import {post, get, responseValidator} from "../../../scripts/api";
import {toast} from "react-toastify";
import {authToken} from "../../../scripts/storage";
import {connect} from "react-redux";
import {setAuth, setUserData} from "../../../redux/register/actions";

const Login = (props) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    function onLoginHandler() {
        if (email && password) {
            if (emailValidation(email)) {
                return new Promise((resolve) => {
                    authToken.remove();
                    post(APIPath.register.signin, {
                        email: email,
                        password: password,
                    }).then((data) => {
                        resolve(true);
                        if (responseValidator(data.status) && data.data) {
                            authToken.set(data.data.key);
                            get(APIPath.account.profile).then((data) => {
                                if (responseValidator(data.status) && data.data) {
                                    props.dispatch(setUserData(data.data));
                                    props.dispatch(setAuth("valid"));
                                } else {
                                    toast.error("مجددا تلاش نمایید.");
                                    authToken.remove();
                                    props.dispatch(setAuth("inValid"));
                                }
                            });
                        } else {
                            toast.error("مجددا تلاش کنید.");
                        }
                    });
                });
            } else {
                toast.error("فرمت ایمیل وارد شده اشتباه است.")
            }
        } else {
            toast.warn("فیلد خالی رو پر کن.")
        }
    }

    return (
        <div className="signin-main-page">
            <div className="signin-image d-md-block d-none">
                <img src={signin} alt="signin"/>
            </div>
            <div className="signin-div">
                <div className="signin">
                    <div className="header">
                        <p>بزن بریم تو!</p>
                    </div>
                    <Input className="items" label="ایمیل" onChange={(e) => setEmail(e)}
                           placeholder="ایمیل خود را وارد کنید."/>
                    <Input className="items" label="رمز" type="password" onChange={(e) => setPassword(e)}
                           placeholder="رمز خود را وارد کنید."/>
                    <Button className="last-item" text="ورود" onClick={onLoginHandler}/>
                    <div className="end-line">
                        <p>
                            حساب نداری؟ <Link to={RoutePath.account.signup}
                                              className="signin-button">ثبت نام کن</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    information: state.register.userData,
});

const connector = connect(mapStateToProps);
export default connector(Login);