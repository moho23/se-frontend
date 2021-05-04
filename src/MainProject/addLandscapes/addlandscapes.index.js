import React, {useRef, useState} from "react";
import "./addlandscapes.style.scss";
import {connect} from "react-redux";
import cover from '../../assets/images/landscape-details-default.png'
import Input from "../../utilities/components/input/input.index";
import Mapir from "mapir-react-component";
import Map from "../map/mapbase.index";
import Button from "../../utilities/components/button/button.index";
import {APIPath} from "../../data";
import {responseValidator, upload_post} from "../../scripts/api";
import markerUrl from "../../assets/images/mapmarker.svg";
import {toast} from "react-toastify";

const AddLandscapes = (props) => {
    const fileRef = useRef(null)
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState(null)
    const [isUploading, setIsUploading] = useState(null)
    const [lat, setLat] = useState(35.72079898251745);
    const [lng, setLang] = useState(51.41021530151241);
    const [detail, setDetail] = useState(null);
    const [markerArray, setMarkerArray] = useState();
    const [name, setName] = useState(null)
    const [category, setCategory] = useState(null)
    const [address, setAddress] = useState(null)
    const [description, setDescription] = useState(null)
    const [isChoose, setIsChoose] = useState(false)
    const uploadTools = useRef(null)

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
                    form.append("loc_picture", image)
                }
                if (name) {
                    form.append("loc_name", name)
                }
                if (address) {
                    form.append("address", address)
                }
                if (description) {
                    form.append("description", description)
                }
                if (category) {
                    form.append("email", category)
                }
                form.append("latitude", lat)
                form.append("longitude", lng)
                form.append("city", 'city')
                form.append("state", 'state')
                form.append('kinds', ['interesting_places'])
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
                                    setCategory(null)
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
                            <img src={imageName !== null ? imageName : cover}
                                 alt="picture"
                                 className="banner-image"
                            />
                        )}
                    </div>
                </div>
                <div className="items">
                    <Input onChange={(e) => setName(e)} value={name} className="item" label="نام"
                           placeholder="نام را وارد کنید."/>
                    <Input onChange={(e) => setAddress(e)} value={address} className="item" label="آدرس"
                           placeholder="آدرس را وارد کنید."/>
                    <Input onChange={(e) => setCategory(e)} value={category} className="item" label="دسته بندی"
                           placeholder="دسته بندی را وارد کنید."/>
                    <Input onChange={(e) => setDescription(e)} value={description} className="item" label="توضیحات"
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
                    <Button disabled={!isChoose || (!name || !address || !category || !description)} text="ثبت مکان"
                            className="submit"
                            onClick={onSubmitHandler}
                    />
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    user: state.userData
});
const connector = connect(mapStateToProps);
export default connector(AddLandscapes);