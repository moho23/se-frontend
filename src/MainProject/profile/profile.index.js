import React, {useState} from "react";
import "./profile.style.scss";
import cover from "../../assets/image/static.png";
import Input from "../../utilities/components/input/input.index";
import Button from "../../utilities/components/button/button.index";

function Profile() {

    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [bio, setBio] = useState()
    const [image, setImage] = useState()
    const [isEdit, setIsEdit] = useState(true)


    return (
        <div className="profile-main-page">
            <div className="title">
                <h2>پروفایل</h2>
            </div>
            <div className="image-div"><img src={cover} alt="cover"/></div>
            <div className="details">
                <div className="item-detail">
                    <Input value="Ahmad@gmail.com" disabled={isEdit} onChange={(e) => setLastname(e)}
                           className="item"
                           label="ایمیل"/>
                    <Input value="ahamadYakooza" disabled={isEdit} onChange={(e) => setFirstname(e)}
                           className="item"
                           label="نام کاربری"/>
                </div>
                <div className="item-detail">
                    <Input value="شجریان" disabled={isEdit} onChange={(e) => setLastname(e)} className="item"
                           label="نام خانوادگی"/>
                    <Input value="محمدرضا" disabled={isEdit} onChange={(e) => setFirstname(e)} className="item"
                           label="نام"/>
                </div>
                <Button className="edit-button" onClick={() => setIsEdit(!isEdit)} text={isEdit ? "ویرایش" : "تایید"}/>
            </div>
        </div>
    )
}

export default Profile;