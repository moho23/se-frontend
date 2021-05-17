import React, {useEffect, useRef, useState} from "react";
import "./addlandscapes.style.scss";
import {connect} from "react-redux";
import cover from '../../assets/images/add-landscapes-default.png'
import Input from "../../utilities/components/input/input.index";
import Mapir from "mapir-react-component";
import Map from "../map/mapbase.index";
import {APIPath} from "../../data";
import {get, responseValidator, upload_post} from "../../scripts/api";
import markerUrl from "../../assets/images/mapmarker.svg";
import {toast} from "react-toastify";
import TextArea from "../../utilities/components/textarea/textarea.index";
import {Checkbox, Dropdown, Menu, Progress, Button} from 'antd';
import 'antd/dist/antd.css';

const AddLandscapes = (props) => {
    const fileRef = useRef(null)
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState(null)
    const [isUploading, setIsUploading] = useState(null)
    const [lat, setLat] = useState(35.72079898251745);
    const [lng, setLang] = useState(51.41021530151241);
    const [markerArray, setMarkerArray] = useState();
    const [name, setName] = useState(null)
    const [category, setCategory] = useState(null)
    const [address, setAddress] = useState(null)
    const [description, setDescription] = useState(null)
    const [type, setType] = useState(false)
    const [isChoose, setIsChoose] = useState(false)
    const uploadTools = useRef(null)
    const [dropDownData, setDropDownData] = useState(null);
    const [visible, setVisible] = useState(false);
    const [catButton, setCatButton] = useState(null)


    useEffect(() => {
        get(APIPath.map.categories).then(res => {
            if (responseValidator(res.status) && res.data) {
                setDropDownData(res.data)
            }
        })
    }, [])

    const reverseFunction = (map, e) => {
        setIsChoose(true)
        const array = [];
        array.push(<Mapir.Marker
            coordinates={[e.lngLat.lng, e.lngLat.lat]}
            anchor="bottom"
            Image={markerUrl}
        >
        </Mapir.Marker>);
        setMarkerArray(array);
        setLat(e.lngLat.lat);
        setLang(e.lngLat.lng);
    }

    function onSubmitHandler() {
        if (name && address && isChoose && description && category) {
            return new Promise((resolve) => {
                const form = new FormData();
                if (image) {
                    form.append("image", image)
                }
                if (name) {
                    form.append("name", name)
                }
                if (address) {
                    form.append("address", address)
                }
                if (description) {
                    form.append("description", description)
                }
                if (category) {
                    form.append('kinds', [category])
                }
                if (type) {
                    form.append("type", type)
                }
                form.append("latitude", lat)
                form.append("longitude", lng)
                form.append("city", 'city')
                form.append("state", 'state')
                uploadTools.current = upload_post(APIPath.location.create, form, (e) => {
                    console.log(e)
                });
                uploadTools.current.promise.then(
                    (res => {
                            if (responseValidator(res.status)) {
                                setTimeout(() => {
                                    resolve(true)
                                    toast.success("با موفقیت ثبت شد.")
                                    setName(null)
                                    setAddress(null)
                                    setDescription(null)
                                    setType(null)
                                    setCatButton(null)
                                    setCategory(null)
                                    setType(false)
                                    setLang(51.41021530151241)
                                    setLat(35.72079898251745)
                                    setIsChoose(false)
                                    setImageName(null)
                                }, 1500);
                            } else {
                                resolve(true)
                                setName(null)
                                setAddress(null)
                                setDescription(null)
                                setCategory(null)
                                setType(false)
                                setCatButton(null)
                                setLang(51.41021530151241)
                                setLat(35.72079898251745)
                                setIsChoose(false)
                                setImageName(null)
                            }
                        }
                    ))
            });
        } else {
            toast.warn("فیلد های خالی را کامل کنید.")
        }
    }

    const menu = (
        <Menu style={{maxHeight: "200px", overflow: "auto"}}>
            {
                dropDownData && dropDownData.map((item, index) => (
                    <div key={index} onClick={(e) => {
                        setCategory([index]);
                        setCatButton(e.target.innerText);
                        setVisible(false)
                    }}
                         style={{
                             width: "100%",
                             display: "flex",
                             justifyContent: "flex-end",
                             fontWeight: 500,
                             cursor: "pointer",
                             padding: "5px 10px 5px 5px"
                         }}>
                        {item.title}
                    </div>
                ))
            }
        </Menu>
    );

    return (
        <div className="add-landscapes-page">
            <div className="content">
                <div className="item-column">
                    <div onClick={() => fileRef.current.click()} className="banner">
                        <div className="edit-banner">
                            <div className="text-upload-banner">
                                {isUploading ? (
                                    <i className="cfi cfi-loader spin"/>
                                ) : (
                                    <p className="d-none d-md-block">اضافه کردن عکس</p>
                                )}
                            </div>
                            {!isUploading && <i className="cfi cfi-edit-2"/>}
                            <input
                                disabled={isUploading}
                                type="file"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                    setImageName(URL.createObjectURL(e.target.files[0]))
                                    console.log(e.target.files[0])
                                }}
                                ref={fileRef}
                                accept={`image/*`}
                                className="d-none"
                            />
                        </div>
                        {isUploading ? (
                            <i className="cfi cfi-loader banner-image spin"/>
                        ) : (
                            <img src={imageName ? imageName : cover}
                                 alt="picture"
                                 className="banner-image"
                            />
                        )}
                    </div>
                </div>
                <div className="items">
                    <Input onChange={(e) => setName(e)} value={name} className="item" label="نام"
                           placeholder="نام را وارد کنید."/>
                    <div className="detail-items">
                        <p>دسته بندی</p>
                        <Dropdown arrow={true} visible={visible} trigger="click" overlay={menu}
                                  placement="bottomCenter">
                            <Button onClick={() => setVisible(!visible)} dir="rtl"
                                    className={catButton ? "cat-button selected" : "cat-button"}>{catButton ? catButton : "دسته بندی را انتخاب کنید."}</Button>
                        </Dropdown>
                    </div>
                    <Input onChange={(e) => setAddress(e)} value={address} className="item" label="آدرس"
                           placeholder="آدرس را وارد کنید."/>
                    <TextArea onChange={(e) => setDescription(e)} value={description} className="item"
                              label="توضیحات"
                              placeholder="توضیحات را وارد کنید."/>
                    <div className="map-div">
                        <Mapir
                            center={[lng, lat]}
                            Map={Map}
                            userLocation
                            onClick={reverseFunction}
                            className="map"
                        >
                            <Mapir.Layer
                                type="symbol"
                                layout={{"icon-image": "harbor-15"}}>
                            </Mapir.Layer>
                            {markerArray}
                            <Mapir.RotationControl/>
                            <Mapir.ScaleControl/>
                            <Mapir.ZoomControl position={'bottom-left'}/>
                        </Mapir>
                    </div>
                    <div className="end-line">
                        <Button disabled={!isChoose || (!name || !address || !category || !description)}
                                onClick={onSubmitHandler} className="submit">ثبت مکان</Button>
                        <span/>
                        <div className="check-box">
                            <p>این مکان به صورت خصوصی ثبت شود</p>
                            <Checkbox checked={type} onChange={(e) => {
                                setType(e.target.checked);
                            }} className="checkbox"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    user: state.register.userData
});
const connector = connect(mapStateToProps);
export default connector(AddLandscapes);