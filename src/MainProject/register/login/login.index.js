import React, {useState} from "react";
import "./login.style.scss"
import Input from "../../../utilities/components/input/input.index"
import Button from "../../../utilities/components/button/button.index"
// import {toast} from "react-toastify";
import signin from "../../../assets/images/signin.svg"
import {Link, useHistory} from "react-router-dom";
import {APIPath, RoutePath} from "../../../data";

const Login = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const history = useHistory();

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
                    <Button className="last-item" text="ورود"/>
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

export default Login;