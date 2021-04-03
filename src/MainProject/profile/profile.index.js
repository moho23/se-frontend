import React, {useEffect, useState} from "react";
import "./profile.style.scss";
import cover from "../../assets/image/static.png";
import Input from "../../utilities/components/input/input.index";
import Button from "../../utilities/components/button/button.index";
import {get} from "../../scripts/api"
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {

    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [city, setCity] = useState()
    const [bio, setBio] = useState()
    const [image, setImage] = useState()
    const [isEdit, setIsEdit] = useState(true)

    var url="/api/profile";
    var token="";
    get(url,token).then((data)=> {
        console.log("data of profile",data)
        for(var key in data){
            switch(key){
                case "username":
                    setUsername(data[key])
                    break;

                case "city":
                    setCity(data[key]);
                    break;

                case "firstname":
                    setFirstname(data[key])
                    break;

                case "lastname":
                    setLastname(data[key])
                    break;
                
                case "email":
                    setEmail(data[key])
                    break;  
            }
        }
    })
    

    return (
        <div className="profile-main-page">
            <div class="back-img">
                {/* <div className="title">
                    <h2>پروفایل</h2>
                </div> */}
                <div className="image-div">
                    <img src={cover} alt="cover"/>
                    {/* <input type="file" id="file">
                    <label for="file" class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"> */}
                    {isEdit ? "" : <i class="material-icons" >edit</i>}
                    {/* </label>
                    </input> */}
                </div>
            </div>
            <div className="details">
                <div className="item-detail">
                    <Input value={username} disabled={isEdit} onChange={(e) => setFirstname(e)}
                           className="item"
                           label="نام کاربری"/>
                    <Input value={city} disabled={isEdit} onChange={(e) => setLastname(e)}
                           className="item"
                           label="شهر"/>
                </div>
                <div className="item-detail">
                    <Input value={firstname} disabled={isEdit} onChange={(e) => setFirstname(e)} className="item"
                           placeholder="نام خود را وارد کنید..."
                           label="نام"/>
                    <Input value={lastname} disabled={isEdit} onChange={(e) => setLastname(e)} className="item"
                           placeholder="نام خانوادگی خود را وارد کنید..."
                           label="نام خانوادگی"/>
                </div>
                <div className="item-detail">
                <Input value={email} disabled={isEdit} onChange={(e) => setLastname(e)}
                           className="item"
                           label="ایمیل"/>
                </div>
                {/* <Button className="edit-button" onClick={() => setIsEdit(!isEdit)} text={isEdit ? "ویرایش" : "تایید"}/> */}
                <button type="button" class={isEdit? "btn btn-outline-info" : "btn btn-success"} onClick={() => setIsEdit(!isEdit)}>{isEdit ? "ویرایش" : "تایید"}</button>
            </div>
        </div>
    )
}

export default Profile;