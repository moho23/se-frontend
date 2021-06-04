import React, {useState, useRef} from "react";
import "./profile.style.scss";
import cover from "../../assets/images/static.png";
import Input from "../../utilities/components/input/input.index";
import {connect} from "react-redux";
import {responseValidator, upload} from "../../scripts/api";
import {APIPath} from "../../data";
import {toast} from "react-toastify";
import {setUserData} from "../../redux/register/actions";
import {Button, Dropdown, Menu} from "antd";
import {StatesList} from "../register/signup/states";
import useOnBlur from "../../scripts/useOnBlur";

const Profile = (props) => {
    const userInfos = props.userData
    const [firstname, setFirstname] = useState(userInfos.firstname)
    const [lastname, setLastname] = useState(userInfos.lastname)
    const [email, setEmail] = useState(userInfos.email)
    const [username, setUsername] = useState(userInfos.username)
    const [city, setCity] = useState(userInfos.city)
    const [imageName, setImageName] = useState(userInfos.profile_picture)
    const [image, setImage] = useState()
    const [isEdit, setIsEdit] = useState(true)
    const fileRef = useRef(null)
    const uploadTools = useRef();
    const [visible, setVisible] = useState(false);
    const [stateButton, setStateButton] = useState(userInfos.city);
    const ddRef = useRef(null)
    

    function onEditHandler() {
        setIsEdit(!isEdit)
    }

    useOnBlur(ddRef, () => setVisible(false))

    function onConfirmHandler() {
        setIsEdit(!isEdit);
        if (firstname && lastname) {
            return new Promise((resolve) => {
                const form = new FormData();
                if (image) {
                    form.append("profile_picture", image)
                }
                if (username) {
                    form.append("username", username)
                }
                if (firstname) {
                    form.append("firstname", firstname)
                }
                if (lastname) {
                    form.append("lastname", lastname)
                }
                if (email) {
                    form.append("email", email)
                }
                if (city) {
                    form.append("city", city)
                }
                uploadTools.current = upload(APIPath.account.profile, form, (e) => {
                    console.log(e)
                });
                uploadTools.current.promise.then(
                    (res => {
                            if (responseValidator(res.status)) {
                                props.dispatch(setUserData(res.data))
                                toast.success("اطلاعات شما با موفقیت تغییر یافت.")
                                setTimeout(() => {
                                    resolve(true)
                                }, 1500);
                            } else if (res.data && res.data.username) {
                                setUsername(userInfos.username)
                                toast.error("نام کاربری در سیستم وجود دارد.")
                                resolve(true)
                            } else if (res.data && res.data.email) {
                                setEmail(userInfos.email)
                                toast.error("ایمیل در سیستم وجود دارد.")
                                resolve(true)
                            }
                        }
                    ))
            });
        } else {
            toast.warn("نام و نام خانوادگی خود را کامل کنید.")
        }
    }

    const menu = (
        <Menu style={{maxHeight: "250px", overflow: "auto"}}>
            {
                StatesList && StatesList.map((item, index) => (
                    <div key={index} onClick={(e) => {
                        setCity(e.target?.innerText);
                        setStateButton(e.target?.innerText);
                    }}
                         style={{
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


    return (
        <div className="profile-main-page">
            <div className="back-img">
                <div className="image-div">
                    <img src={imageName !== null ? imageName : cover} alt={firstname + ' ' + lastname}/>
                    <input type="file" accept="image/*" ref={fileRef}
                           onChange={(e) => {
                               setImage(e.target.files[0]);
                               setImageName(URL.createObjectURL(e.target.files[0]))
                               console.log(e.target.files[0])
                           }}
                           className="edit-button"/>
                    {isEdit ? "" :
                        <i onClick={() => fileRef.current?.click()} className="material-icons edit-icon">edit</i>}
                </div>
            </div>
            <div className="details">
                <div className="item-detail">
                    <Input value={username} disabled={isEdit} onChange={(e) => setUsername(e)}
                           className="item"
                           label="نام کاربری"/>
                    <div ref={ddRef} className="detail-items">
                        <p>استان</p>
                        <Dropdown arrow={true} visible={!isEdit ? visible : false} trigger="click" overlay={menu}
                                  placement="bottomCenter">
                            <Button disabled={isEdit} onClick={() => setVisible(!visible)} dir="rtl"
                                    className={stateButton ? `${isEdit ? "state-button selected disabled" : "state-button selected"}` : "state-button"}>{stateButton ? stateButton : "استان خود را انتخاب کنید."}</Button>
                        </Dropdown>
                    </div>
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
                {
                    isEdit ? <Button
                            className={`edit-confirm-button editable`}
                            onClick={onEditHandler}>ویرایش</Button> :
                        <Button
                            className={`edit-confirm-button not-editable`}
                            onClick={onConfirmHandler}>تایید</Button>
                }
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    userData: state.register.userData,
});
const connector = connect(mapStateToProps);
export default connector(Profile);