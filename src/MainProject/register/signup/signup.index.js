import React, {useState} from "react";
import "./signup.style.scss"
import Input from "../../../utilities/components/input/input.index"
import Button from "../../../utilities/components/button/button.index"
import {emailValidation, usernameValidation} from "../../../scripts/validations";
import {toast} from "react-toastify";
import signup from "../../../assets/images/signup5.svg"
import { post } from "../../../scripts/api";
import { useHistory } from "react-router";

const Signup = () => {
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [city, setCity] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    const history = useHistory();
    function submit(e) {
        
        if (email && city && password && username) {
            if (emailValidation(email) && usernameValidation(username) && (password === confirmPassword)) {
                const signup_form = {
                    username:username,
                    email:email,
                    password1:password,
                    password2:confirmPassword,
                    city:city
                }
                post("http://127.0.0.1:8000/api/rest-auth/registration/",signup_form)
                .then((data)=>{
                    history.push('/register/login')
                }
                )
                .catch(error=>console.log(error))
                
            } else {
                toast.error(".فک کنم یه چیزیو اشتباه وارد کردی سلطان")
            }
        } else {
            toast.error(" !کامل پر نکردی که عزیزم")
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
                           placeholder="شهر خود را انتخاب کنید."/>
                    <Input className="items" label="رمز" type="password" onChange={(e) => setPassword(e)}
                           placeholder="رمز خود را وارد کنید."/>
                    <Input className="items" label="تایید رمز" type="password" onChange={(e) => setConfirmPassword(e)}
                           placeholder="رمز خود را تکرار کنید."/>
                    <Button className="last-item" text="ثبت نام" onClick={submit}/>
                </div>
            </div>
        </div>
    )
}

export default Signup;