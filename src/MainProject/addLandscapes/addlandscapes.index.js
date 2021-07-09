import React, {useEffect, useRef, useState} from "react";
import "./addlandscapes.style.scss";
import {connect} from "react-redux";
import cover from '../../assets/images/add-landscapes-default.png'
import Input from "../../utilities/components/input/input.index";
import Mapir from "mapir-react-component";
import Map from "../map/mapbase.index";
import {APIPath, RoutePath} from "../../data";
import {get, responseValidator,put,update_put, upload_post} from "../../scripts/api";
import markerUrl from "../../assets/images/mapmarker.svg";
import {toast} from "react-toastify";
import TextArea from "../../utilities/components/textarea/textarea.index";
import {Checkbox, Button, Spin, Select} from 'antd';
import 'antd/dist/antd.css';
import {EnglishCategoryToPersian} from "../map/translateCategory";
import * as Actions from "../../redux/myLandscapes/actions"
import {useHistory} from "react-router-dom";

const {Option} = Select;

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
    const updateTools = useRef(null)
    const [dropDownData, setDropDownData] = useState(null);
    const [update, setUpdate] = useState(false);
    const history = useHistory()


    useEffect(() => {
        get(APIPath.map.categories).then(res => {
            if (responseValidator(res.status) && res.data) {
                setDropDownData(res.data)
            }
        })
        if(props.item&& props.update){
            setIsChoose(true)
            const array = [];
            array.push(<Mapir.Marker
                coordinates={[props.item.longitude, props.item.latitude]}
                anchor="bottom"
                Image={markerUrl}
            >
            </Mapir.Marker>);
            setMarkerArray(array);
            setLat(props.item.latitude)
            setLang(props.item.longitude)
            setName(props.item.name)
            setAddress(props.item.address)
            setDescription(props.item.description)
            setType(props.item.is_private)
            setUpdate(true)
        }
        if(props.item && props.update){
            if (props.item.image[0]!==null){
                // setImage(props.item.image[0])
                setImageName(props.item.image[0])
            }
            else {
                // setImage(cover)
                setImageName(cover)                
            }
        }
        else {
            // setImage(cover)
            setImageName(cover)
        }

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
                    category.map((item) => {
                        form.append('kinds', item)
                    })
                }
                if (type) {
                    form.append("is_private", type)
                }
                form.append("latitude", lat)
                form.append("longitude", lng)
                form.append("city", 'city')
                form.append("state", 'state')
                console.log(form)
                if (props.update){
                    console.log("update")
                    form.append("id", props.item.id)
                    updateTools.current = update_put(APIPath.location.update, form, (e) => {
                        console.log(e)
                    });
                    
                    updateTools.current.promise.then(data=>
                        {
                            if (responseValidator(data.status)){
                                console.log(data)
                                setUpdate(false)
                                toast.success("با موفقیت ثبت شد.")
                                
                            }
                                                            
                                setName(null)
                                setAddress(null)
                                setDescription(null)
                                setType(null)
                                setCategory(null)
                                setType(false)
                                setLang(51.41021530151241)
                                setLat(35.72079898251745)
                                setIsChoose(false)
                                setImageName(null)
                                props.setUpdate(false)
                                history.push(RoutePath.dashboard.myLandscapes)
                           
                            
                        }
                    )
                    props.setUpdate(false)
                }
                else{
                    console.log(form)
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
                                        setCategory(null)
                                        setType(false)
                                        setLang(51.41021530151241)
                                        setLat(35.72079898251745)
                                        setIsChoose(false)
                                        setImageName(null)
                                        history.push(RoutePath.dashboard.myLandscapes)
                                    }, 1500);
                                } else {
                                    resolve(true)
                                    setName(null)
                                    setAddress(null)
                                    setDescription(null)
                                    setCategory(null)
                                    setType(false)
                                    setLang(51.41021530151241)
                                    setLat(35.72079898251745)
                                    setIsChoose(false)
                                    setImageName(null)
                                }
                            }
                        ))
                }
            });
        } else {
            toast.warn("فیلد های خالی را کامل کنید.")
        }
    }

    function handleChange(value) {
        let temp = value
        let data = []
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < dropDownData.length; j++) {
                let object = dropDownData[j];
                if (temp[i] == object.title) {
                    data.push(object.id)
                }
            }
        }

        let category = data;
        category && category.map((item) => {
            if (1 < item && item < 8) {
                data.push(1)
            }
            if (9 < item && item < 16) {
                data.push(8)
                data.push(9)
            }
            if (17 < item && item < 22) {
                data.push(17)
                data.push(8)
            }
            if (item === 16) {
                data.push(8)
            }
            if (item === 22) {
                data.push(8)
            }
        })
        let uniqueData = [...new Set(data)];
        setCategory(uniqueData)
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
                                    console.log("files",e.target.files[0])
                                }}
                                ref={fileRef}
                                accept={`image/*`}
                                className="d-none"
                            />
                        </div>
                        {isUploading ? (
                            <i className="cfi cfi-loader banner-image spin"/>
                        ) : (
                            <img src={imageName}
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
                        <Select
                            onChange={(e) => e.length < 4 ? handleChange(e) : toast.error('تعداد مجاز انتخاب دسته بندی حداکثر ۳ است')}
                            mode="tags"
                            className="multi-select"
                            onSelect={(e) => e.length <= 3}
                            placeholder="دسته بندی را انتخاب کنید."
                            showSearch={false}
                            searchValue={''}
                            maxTagCount="responsive"
                            tokenSeparators={[',']}>
                            {
                                dropDownData ? dropDownData.map((item, index) => (
                                        <Option className="item" value={item.title}
                                                key={index}><span style={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            paddingRight: "10px",
                                            fontSize: "16px",
                                            fontWeight: 500
                                        }}>{EnglishCategoryToPersian[item.title]}</span></Option>)) :
                                    <div>
                                        <p style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>داده ای
                                            برای نمایش وجود ندارد</p>
                                    </div>
                            }
                        </Select>
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
                            }}
                            value={type}
                            className="checkbox"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.register.userData,
    item: state.myLandscapes.item,
    update: state.myLandscapes.update,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setUpdate:(bool) => dispatch({type: Actions.UPDATE, bool: bool}),
    }
}

const connector = connect(mapStateToProps,mapDispatchToProps);
export default connector(AddLandscapes);