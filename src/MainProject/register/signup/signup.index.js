import React, {useState} from "react";
import "./signup.style.scss"
import Input from "../../../utilities/components/input/input.index"
import Button from "../../../utilities/components/button/button.index"
import {emailValidation, usernameValidation} from "../../../scripts/validations";
import {toast} from "react-toastify";
import signup from "../../../assets/images/signup5.svg"
import {post} from "../../../scripts/api";
import {Link, Route, useHistory} from "react-router-dom";
import {APIPath, RoutePath} from "../../../data";

const Signup = () => {
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [city, setCity] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    const history = useHistory();

    function submit() {
        if (email && city && password && username) {
            if (emailValidation(email) && usernameValidation(username) && (password === confirmPassword)) {
                const signup_form = {
                    username: username,
                    email: email,
                    password1: password,
                    password2: confirmPassword,
                    city: city
                }
                post(APIPath.register.signup, signup_form)
                    .then((data) => {
                            if (data.data.key) {
                                history.push(RoutePath.account.signin)
                            } else {
                                if (data.data.email) {
                                    toast.warn("ایمیل تکراری می باشد.")
                                }
                                if (data.data.username) {
                                    toast.warn("نام کاربری شما قبلا استفاده شده است.")
                                }
                            }
                        }
                    )

            } else {
                toast.error("اطلاعات خود را مجددا بررسی نمایید.")
            }
        } else {
            toast.error("فیلد خالی را پر کنید.")
        }
    }

    return (
        <div className="signup-main-page">
            <div className="signup-image d-md-block d-none">
                <img src={signup} alt="signup"/>
            </div>
            <div className="signup-div">
                <div className="signup">
                    <div className="header">
                        <p>خوش اومدی :)</p>
                    </div>
                    <Input className="items" label="ایمیل" onChange={(e) => setEmail(e)}
                           placeholder="ایمیل خود را وارد کنید."/>
                    <Input className="items" label="نام کاربری" onChange={(e) => setUsername(e)}
                           placeholder="نام کاربری خود را وارد کنید."/>
                    <Input className="items" label="شهر" onChange={(e) => setCity(e)}
                           placeholder="شهر خود را وارد کنید."/>
                    <Input className="items" label="رمز" type="password" onChange={(e) => setPassword(e)}
                           placeholder="رمز خود را وارد کنید."/>
                    <Input className="items" label="تایید رمز" type="password" onChange={(e) => setConfirmPassword(e)}
                           placeholder="رمز خود را تکرار کنید."/>
                    <Button className="last-item" text="ثبت نام" onClick={submit}/>
                    <div className="end-line">
                        <p>
                            قبلا ثبت نام کردید؟ <Link to={RoutePath.account.signin}
                                                      className="signin-button">ورود</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;