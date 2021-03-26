import React, { useState } from "react";
import "./signup.style.scss"
import Input from "../../../utilities/components/input/input.index"
import Button from "../../../utilities/components/button/button.index"
import { emailValidation, usernameValidation } from "../../../scripts/validations";
import { toast } from "react-toastify";

const Signup = () => {
    const [email,setEmail]=useState(null)
    const [username,setUsername]=useState(null)
    const [city,setCity]=useState(null)
    const [password,setPassword]=useState(null)
    const [cnfrmPassword,setCnfrmPassword]=useState(null)
    
   

    function submit(event) {
        if(email && city && password && username){
            if(emailValidation(email)&&usernameValidation(username)&&(password===cnfrmPassword)){
                //post api
            }
            else{
                toast.error("RIDI!")
            }
        }
        else{
            toast.error("BAD RIDI!")
        }
    }
    
    return (
        <div className={"signup-main-page"}>
            <Input label={"ایمیل"} onChange={(event)=>setEmail(event)} placeholder={"ایمیل خود را وارد کنید"}/>
            <Input label={"نام کاربری"} onChange={(event)=>setUsername(event)} placeholder={"نام کاربری خود را وارد کنید"}/>
            <Input label={"شهر"} onChange={(event)=>setCity(event)} placeholder={"شهر خود را وارد کنید"}/>
            <Input label={"رمز"} type={"password"} onChange={(event)=>setPassword(event)} placeholder={"رمز خود را وارد کنید"}/>
            <Input label={"تایید رمز"} type={"password"} onChange={(event)=>setCnfrmPassword(event)} placeholder={"رمز خود را مجددن وارد کنید"}/>
            <Button text={"ثبت نام"} onClick={()=>submit()}/>
        </div>
    )
}

export default Signup;