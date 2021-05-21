import React, {useRef, useState} from "react";
import "./signup.style.scss"
import Input from "../../../utilities/components/input/input.index"
import {emailValidation, usernameValidation} from "../../../scripts/validations";
import {toast} from "react-toastify";
import signup from "../../../assets/images/signup5.svg"
import {post, responseValidator} from "../../../scripts/api";
import {Link, useHistory} from "react-router-dom";
import {APIPath, RoutePath} from "../../../data";
import "./states";
import {Dropdown, Menu, Button} from "antd";
import {StatesList} from "./states";
import useOnBlur from "../../../scripts/useOnBlur";

const Signup = () => {
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [city, setCity] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [visible, setVisible] = useState(false);
    const [stateButton, setStateButton] = useState(null);
    const ddRef = useRef(null)
    const history = useHistory();

    function submit() {
        if (email && city && password && username) {
            if (emailValidation(email) && usernameValidation(username) && (password === confirmPassword)) {
                return new Promise((resolve) => {
                    const signup_form = {
                        username: username,
                        email: email,
                        password1: password,
                        password2: confirmPassword,
                        city: city
                    }
                    post(APIPath.register.signup, signup_form).then((data) => {
                        resolve(true);
                        if (responseValidator(data.status)) {
                            history.push(RoutePath.account.signin)
                        } else {
                            if (data.data && data.data.email) {
                                toast.error("ایمیل تکراری می باشد.")
                            }
                            if (data.data && data.data.username) {
                                toast.error("نام کاربری شما قبلا استفاده شده است.")
                            }
                        }
                    });
                });
            } else {
                toast.error("اطلاعات خود را مجددا بررسی نمایید.")
            }
        } else {
            toast.error("فیلد خالی رو پر کن.")
        }
    }

    const menu = (
        <Menu style={{maxHeight: "250px", overflow: "auto"}}>
            {
                StatesList && StatesList.map((item, index) => (
                    <div key={index} onClick={(e) => {
                        setCity(e.target?.innerText);
                        setStateButton(e.target?.innerText);
                        console.log(e.target?.innerText)
                    }}
                         style={{
                             width: "100%",
                             display: "flex",
                             justifyContent: "flex-end",
                             fontWeight: 500,
                             cursor: "pointer",
                             padding: "10px 10px",
                         }}

                    >
                        {item.slug}
                    </div>
                ))
            }
        </Menu>
    );

    useOnBlur(ddRef, () => setVisible(false))

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
                    <div className="detail-items">
                        <p>استان</p>
                        <Dropdown arrow={true} visible={visible} trigger="click" overlay={menu}
                                  placement="bottomCenter">
                            <Button ref={ddRef} onClick={() => setVisible(!visible)} dir="rtl"
                                    className={stateButton ? "state-button selected" : "state-button"}>{stateButton ? stateButton : "استان خود را انتخاب کنید."}</Button>
                        </Dropdown>
                    </div>
                    <Input className="items" label="رمز" type="password" onChange={(e) => setPassword(e)}
                           placeholder="رمز خود را وارد کنید."/>
                    <Input className="items" label="تایید رمز" type="password" onChange={(e) => setConfirmPassword(e)}
                           placeholder="رمز خود را تکرار کنید."/>
                    <Button className="last-item" onClick={submit}>ثبت نام</Button>
                    <div className="end-line">
                        <p>
                            قبلا ثبت نام کردی؟ <Link to={RoutePath.account.signin}
                                                     className="signin-button">ورود</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;