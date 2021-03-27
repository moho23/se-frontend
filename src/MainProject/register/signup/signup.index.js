import React, {useState} from "react";
import "./signup.style.scss"
import Input from "../../../utilities/components/input/input.index"
import Button from "../../../utilities/components/button/button.index"
import {emailValidation, usernameValidation} from "../../../scripts/validations";
import {toast} from "react-toastify";

const Signup = () => {
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [city, setCity] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)


    function submit(e) {
        if (email && city && password && username) {
            if (emailValidation(email) && usernameValidation(username) && (password === confirmPassword)) {
                //post api
            } else {
                // toast.error("validation")
            }
        } else {
            // toast.error("empty")
        }
    }

    return (
        <div className={"signup-main-page"}>
            <div className="signup">
                <div className="header">
                    <p>ثبت نام</p>
                </div>
                <Input className="items" label="ایمیل" onChange={(e) => setEmail(e)}
                       placeholder="ایمیل خود را وارد کنید."/>
                <Input className="items" label="نام کاربری" onChange={(e) => setUsername(e)}
                       placeholder="نام کاربری خود را وارد کنید."/>
                <Input className="items" label="شهر" onChange={(e) => setCity(e)} placeholder="شهر خود را انتخاب کنید."/>
                <Input className="items" label="رمز" type="password" onChange={(e) => setPassword(e)}
                       placeholder="رمز خود را وارد کنید."/>
                <Input className="items" label="تایید رمز" type="password" onChange={(e) => setConfirmPassword(e)}
                       placeholder="رمز خود را تکرار کنید."/>
                <Button className="last-item" text="ثبت نام" onClick={submit}/>
            </div>
        </div>
    )
}

export default Signup;