import React, {useState, useRef} from "react";
import "./profile.style.scss";
import cover from "../../assets/image/static.png";
import Input from "../../utilities/components/input/input.index";
import {connect} from "react-redux";
import Button from "../../utilities/components/button/button.index";

const Profile = (props) => {

    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [city, setCity] = useState()
    const [bio, setBio] = useState()
    const [image, setImage] = useState()
    const [isEdit, setIsEdit] = useState(true)
    const fileRef = useRef(null)


    return (
        <div className="profile-main-page">
            <div className="back-img">
                <div className="image-div">
                    <img src={cover} alt="cover"/>
                    <input type="file" ref={fileRef} className="edit-button"/>
                    {isEdit ? "" : <i className="material-icons edit-icon" onClick={() => {
                        fileRef.current.click();
                    }}>edit</i>}
                </div>
            </div>
            <div className="details">
                <div className="item-detail">
                    <Input value={username} disabled={isEdit} onChange={(e) => setUsername(e)}
                           className="item"
                           label="نام کاربری"/>
                    <Input value={city} disabled={isEdit} onChange={(e) => setCity(e)}
                           className="item"
                           label="شهر"/>
                </div>
                <div className="item-detail">
                    <Input value={firstname} disabled={isEdit} onChange={(e) => setFirstname(e)} className="item"
                           placeholder="نام خود را وارد کنید."
                           label="نام"/>
                    <Input value={lastname} disabled={isEdit} onChange={(e) => setLastname(e)} className="item"
                           placeholder="نام خانوادگی خود را وارد کنید."
                           label="نام خانوادگی"/>
                </div>
                <div className="item-detail">
                    <Input value={email} disabled={isEdit} onChange={(e) => setEmail(e)}
                           className="item"
                           label="ایمیل"/>
                </div>
                <Button
                    className={`edit-confirm-button ${isEdit ? "editable" : "not-editable"}`}
                    onClick={() => setIsEdit(!isEdit)} text={isEdit ? "ویرایش" : "تایید"}/>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    isAuth: state.authStatus,
});
const connector = connect(mapStateToProps);
export default connector(Profile);