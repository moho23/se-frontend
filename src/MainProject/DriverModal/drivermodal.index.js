import React, {useEffect, useRef, useState} from 'react';
import {Button, Dropdown, Input, InputNumber, Menu, Modal, TimePicker} from 'antd';
import "./drivermodal.style.scss"
import {connect} from "react-redux";
import * as Actions from "../../redux/driverTravels/actions"
import 'antd/dist/antd.css';
import Draggable from 'react-draggable';
import {post, put, responseValidator} from "../../scripts/api";
import {APIPath} from "../../data";
import {toast} from "react-toastify";
import useOnBlur from "../../scripts/useOnBlur";
import moment from 'jalali-moment';
import {Calendar} from 'react-datepicker2';
import locale from "antd/es/date-picker/locale/de_DE";
import {AllProvinces} from "./cities.data";

const {TextArea} = Input;

const DriverModal = (props) => {
    const [bounds, setBounds] = useState({left: 0, top: 0, bottom: 0, right: 0});
    const [disabled, setDisabled] = useState(true);
    const [numOfTraveler, setNumOfTraveler] = useState(null);
    const [description, setDescription] = useState('');
    const [cities, setCities] = useState(null);
    const [date, setDate] = useState('2021-03-21');
    const [time, setTime] = useState(null);
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState("m");
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible11, setVisible11] = useState(false);
    const [visible22, setVisible22] = useState(false);
    const [visibleGender, setVisibleGender] = useState(false);
    const [genderButton, setGenderButton] = useState(null);
    const genderRef = useRef(null)
    const draggableRef = useRef();
    const calenderRef = useRef(null)
    const inputRef = useRef(null)
    const [showDescription, setShowDescription] = useState(true)
    const [status, setStatus] = useState(false)
    const [datePickerValue, setDatePickerValue] = useState(null)
    const [timePickerValue, setTimePickerValue] = useState(null)


    const [source, setSource] = useState('تهران');
    const [sourceCity, setSourceCity] = useState('شاهدشهر');


    const [destination, setDestination] = useState('آذربایجان شرقی');
    const [destinationCity, setDestinationCity] = useState('آبش احمد');


    const [sourceButton, setSourceButton] = useState('تهران');
    const [sourceCityButton, setSourceCityButton] = useState('شاهدشهر');

    const [destinationButton, setDestinationButton] = useState('آذربایجان شرقی');
    const [destinationCityButton, setDestinationCityButton] = useState('آبش احمد');

    const [sourceOrDestination, setSourceOrDestination] = useState(null);
    const [sourceCityOrDestinationCity, setSourceCityOrDestinationCity] = useState(null);


    const sourceRef = useRef(null)
    const sourceCityRef = useRef(null)
    const destinationRef = useRef(null)
    const destinationCityRef = useRef(null)

    let sourceDestinationOptions = []
    AllProvinces.map(item => {
        sourceDestinationOptions.push(item.name);
    })

    let sourceCityOptions = []
    sourceCityOptions = AllProvinces.find(item => item.name === source).cities

    let destinationCityOptions = []
    destinationCityOptions = AllProvinces.find(item => item.name === destination).cities


    useEffect(() => {
        if (datePickerValue) {
            setDate(moment(datePickerValue).format('YYYY-MM-DD'));
        }
    }, [datePickerValue]);

    useEffect(()=>{
        if(props.isupdate){
            if(props.item!=null){
                console.log(props.item)
                setDestinationButton(props.item.destination)
                setDestination(props.item.destination)
                setSourceButton(props.item.source)
                setSource(props.item.source)
                setAge(props.item.creator_age)
                setNumOfTraveler(props.item.fellow_traveler_num)
                setTime(props.item.trip_time.split("T")[1].split("Z")[0])
                setTimePickerValue(moment(props.item.trip_time.split("T")[1].split("Z")[0], 'HH:mm:ss'))
                setDate(props.item.trip_time.split("T")[0])
                if(props.item.creator_gender==="m"){
                    setGenderButton("مرد")
                } else {
                    setGenderButton("زن")
                }
                setGender(props.item.creator_gender)
                setDescription(props.item.description)
            }
        }
    },[])


    function onStart(event, uiData) {
        const {clientWidth, clientHeight} = window?.document?.documentElement;
        const targetRect = draggableRef.current?.getBoundingClientRect();
        setBounds({
            left: -targetRect?.left + uiData?.x,
            right: clientWidth - (targetRect?.right - uiData?.x),
            top: -targetRect?.top + uiData?.y,
            bottom: clientHeight - (targetRect?.bottom - uiData?.y),
        })
    }

    function onSubmitFormHandler() {
        return new Promise((resolve) => {
            if (props.isupdate) {
                console.log({
                    creator_type: 'd',
                    creator_gender: gender,
                    creator_age: age,
                    source: source,
                    destination: destination,
                    fellow_traveler_num: numOfTraveler,
                    date: date,
                    trip_time: date + 'T' + time + 'Z',
                    cities: ['cities'],
                    description: description,
                    id: props.item.id
                })
                let DriverForm = {
                    creator_type: 'd',
                    creator_gender: gender,
                    creator_age: age,
                    source: source,
                    destination: destination,
                    fellow_traveler_num: numOfTraveler,
                    trip_time: date + 'T' + time + 'Z',
                    cities: ['cities'],
                    description: description,
                    id: props.item.id
                }
                put(APIPath.hichhike.update, DriverForm).then(data => {
                    console.log(data)
                    if (responseValidator(data.status)) {
                        props.setDriverModal(false)
                        props.setIsUpdate(false)
                        toast.success("درخواست شما به عنوان سفیر با موفقیت ثبت شد")
                        window.location.reload();
                    } else {
                        if (data.status === 400) {
                            toast.error("موارد زیر را با مقادیر معتبر تکمیل فرمایید")
                        } else {
                            toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید")
                        }
                    }
                })
            } else {
                let DriverForm = {
                    creator_type: 'd',
                    creator_gender: gender,
                    creator_age: age,
                    source: source,
                    destination: destination,
                    fellow_traveler_num: numOfTraveler,
                    trip_time: date + 'T' + time + 'Z',
                    cities: ['cities'],
                    description: description
                }
                post(APIPath.hichhike.create, DriverForm).then((data) => {
                    resolve(true);
                    if (responseValidator(data.status)) {
                        toast.success("درخواست شما به عنوان سفیر با موفقیت ثبت شد")
                        props.setDriverModal(false)
                    } else {
                        if (data.status === 400) {
                            toast.error("موارد زیر را با مقادیر معتبر تکمیل فرمایید")
                        } else {
                            toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید")
                        }
                    }
                });
            }

        });
    }

    useOnBlur(sourceRef, () => setVisible1(false))
    useOnBlur(destinationRef, () => setVisible2(false))
    useOnBlur(destinationCityRef, () => setVisible22(false))
    useOnBlur(sourceCityRef, () => setVisible11(false))
    useOnBlur(genderRef, () => setVisibleGender(false))

    const menuSourceCity = (
        <Menu style={{maxHeight: "250px", overflow: "auto"}}>
            {
                sourceCityOptions.map((item, index) => (
                    <div key={index} onClick={(e) => {
                        sourceCityOrDestinationCity === 2 ? setDestinationCity(e.target.innerText) : setSourceCity(e.target.innerText)
                        sourceCityOrDestinationCity === 2 ? setDestinationCityButton(e.target.innerText) : setSourceCityButton(e.target.innerText)
                        sourceCityOrDestinationCity === 2 ? setVisible22(false) : setVisible11(false)

                    }}
                         style={{
                             width: "100%",
                             display: "flex",
                             justifyContent: "flex-end",
                             fontWeight: 500,
                             cursor: "pointer",
                             padding: "10px 10px",
                         }}

                    >
                        {item}
                    </div>
                ))
            }
        </Menu>
    );

    const menuDestinationCity = (
        <Menu style={{maxHeight: "250px", overflow: "auto"}}>
            {
                destinationCityOptions.map((item, index) => (
                    <div key={index} onClick={(e) => {
                        sourceCityOrDestinationCity === 2 ? setDestinationCity(e.target.innerText) : setSourceCity(e.target.innerText)
                        sourceCityOrDestinationCity === 2 ? setDestinationCityButton(e.target.innerText) : setSourceCityButton(e.target.innerText)
                        sourceCityOrDestinationCity === 2 ? setVisible22(false) : setVisible11(false)

                    }}
                         style={{
                             width: "100%",
                             display: "flex",
                             justifyContent: "flex-end",
                             fontWeight: 500,
                             cursor: "pointer",
                             padding: "10px 10px",
                         }}

                    >
                        {item}
                    </div>
                ))
            }
        </Menu>
    );

    const menu = (
        <Menu style={{maxHeight: "250px", overflow: "auto"}}>
            {
                sourceDestinationOptions.map((item, index) => (
                    <div key={index} onClick={(e) => {
                        sourceOrDestination === 2 ? setDestination(e.target.innerText) : setSource(e.target.innerText)
                        sourceOrDestination === 2 ? setDestinationButton(e.target.innerText) : setSourceButton(e.target.innerText)
                        sourceOrDestination === 2 ? setDestinationCityButton(AllProvinces.find(item => item.name == e.target.innerText).cities[0]) : setSourceCityButton(AllProvinces.find(item => item.name == e.target.innerText).cities[0])
                        sourceOrDestination === 2 ? setVisible2(false) : setVisible1(false)
                        sourceOrDestination === 2 ? destinationCityOptions = AllProvinces.find(item => item.name === e.target.innerText).cities : sourceCityOptions = AllProvinces.find(item => item.name === e.target.innerText).cities
                    }}
                         style={{
                             width: "100%",
                             display: "flex",
                             justifyContent: "flex-end",
                             fontWeight: 500,
                             cursor: "pointer",
                             padding: "10px 10px",
                         }}

                    >
                        {item}
                    </div>
                ))
            }
        </Menu>
    );

    const genderType = [{id: "f", title: "زن"}, {id: "m", title: "مرد"}]
    const genderMenu = (
        <Menu style={{maxHeight: "250px", overflow: "auto"}}>
            {
                genderType.map((item, index) => (
                    <div key={index} onClick={(e) => {
                        setGender(e.target?.innerText === "زن" ? "f" : "m")
                        setGenderButton(e.target?.innerText)
                        setVisibleGender(false)
                    }}
                         style={{
                             width: "100%",
                             display: "flex",
                             justifyContent: "flex-end",
                             fontWeight: 500,
                             cursor: "pointer",
                             padding: "10px 10px",
                         }}
                    >
                        {item.title}
                    </div>
                ))
            }
        </Menu>
    );


    function onDatePickChange(e) {
        setDate(e.format('YY-MM-DD'))
        setStatus(false);
        setDatePickerValue(e);
        console.log("date", date)
        console.log("datePickerValue", e)
    }

    function onFocusHandler() {
        setStatus(true);
    }

    function onClickHandler() {
        setStatus(true);
    }

    useOnBlur(calenderRef, () => {
        if (status) setStatus(false);
    });

    function onChangeTime(date, dateString) {
        setTime(dateString)
        console.log("dateString",dateString)
        console.log("date",date)
        setTimePickerValue(date)
        console.log("timePickerValue", timePickerValue)
    }


    const setCheckAndDriverModal = () => {
        props.setDriverModal(false)
        props.setIsUpdate(false)
    }

    return (
        <Modal
            title={
                <div
                    style={{cursor: "move"}}
                    onMouseOver={() => {
                        if (disabled) {
                            setDisabled(false)
                        }
                    }}
                    onMouseOut={() => {
                        setDisabled(true)
                    }}>
                    سفیر
                </div>
            }
            visible={true}
            onOk={() => setCheckAndDriverModal()}
            onCancel={() => setCheckAndDriverModal()}
            okButtonProps={{hidden: true}}
            cancelButtonProps={{hidden: true}}
            className="driver-modal-page"
            footer={
                <div className="footer">
                    <Button className="submit" onClick={onSubmitFormHandler}>ثبت</Button>
                    <Button className="cancel" onClick={() => props.setDriverModal(false)}>لغو</Button>
                </div>
            }
            modalRender={modal => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    onStart={(event, uiData) => onStart(event, uiData)}
                >
                    <div ref={draggableRef}>{modal}</div>
                </Draggable>
            )}
        >
            <div
                className="driver-modal"
            >
                <div className="first-line">
                    <div className="item">
                        <p className="label">شهر مبدا</p>
                        <Dropdown arrow={true} visible={visible11} trigger="click" overlay={menuSourceCity}
                                  placement="bottomCenter">
                            <Button ref={sourceCityRef} onClick={() => {
                                setVisible11(!visible11)
                                setSourceCityOrDestinationCity(1)
                            }} dir="rtl"
                                    className={sourceCityButton ? "places selected" : "places"}>{sourceCityButton ? sourceCityButton : "شهر مبدا"}</Button>
                        </Dropdown>
                    </div>
                    <div className="item">
                        <p className="label">مبدا</p>
                        <Dropdown arrow={true} visible={visible1} trigger="click" overlay={menu}
                                  placement="bottomCenter">
                            <Button ref={sourceRef} onClick={() => {
                                setVisible1(!visible1)
                                setSourceOrDestination(1)
                            }} dir="rtl"
                                    className={sourceButton ? "places selected" : "places"}>{sourceButton ? sourceButton : "مبدا"}</Button>
                        </Dropdown>
                    </div>
                </div>
                <div className="first-line">
                    <div className="item">
                        <p className="label">شهر مقصد</p>
                        <Dropdown arrow={true} visible={visible22} trigger="click" overlay={menuDestinationCity}
                                  placement="bottomCenter">
                            <Button ref={destinationCityRef} onClick={() => {
                                setVisible22(!visible22)
                                setSourceCityOrDestinationCity(2)
                            }} dir="rtl"
                                    className={destinationCityButton ? "places selected" : "places"}>{destinationCityButton ? destinationCityButton : "شهر مقصد"}</Button>
                        </Dropdown>
                    </div>
                    <div className="item">
                        <p className="label">مقصد</p>
                        <Dropdown arrow={true} visible={visible2} trigger="click" overlay={menu}
                                  placement="bottomCenter">
                            <Button ref={destinationRef} onClick={() => {
                                setVisible2(!visible2)
                                setSourceOrDestination(2)
                            }} dir="rtl"
                                    className={destinationButton ? "places selected" : "places"}>{destinationButton ? destinationButton : "مقصد"}</Button>
                        </Dropdown>
                    </div>
                </div>
                <div className="first-line">
                    <div className="item">
                        <p className="label">سن</p>
                        <InputNumber min={18} max={99} className="places" value={age} onChange={(e) => setAge(e)}/>
                    </div>
                    <div className="item">
                        <p className="label">جنسیت</p>
                        <Dropdown arrow={true} visible={visibleGender} trigger="click" overlay={genderMenu}
                                  placement="bottomCenter">
                            <Button ref={genderRef} onClick={() => {
                                setVisibleGender(!visibleGender)
                            }} dir="rtl"
                                    className={genderButton ? "places selected" : "places"}>{genderButton ? genderButton : "مرد"}</Button>
                        </Dropdown>
                    </div>
                    <div className="item">
                        <p className="label">مسافر</p>
                        <InputNumber min={1} max={20} className="places" value={numOfTraveler}
                                     onChange={(e) => setNumOfTraveler(e)}/>
                    </div>
                    <div className="item">
                        <p className="label">ساعت</p>
                        <TimePicker
                            showNow={true}
                            value={timePickerValue}
                            className="places"
                            placeholder='00:00:00'
                            onChange={onChangeTime}
                            locale={{
                                ...locale,
                                lang: {
                                    ...locale.lang,
                                    now: <p style={{
                                        color: "green",
                                        fontWeight: 500,
                                        fontSize: "14px",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>اکنون</p>,
                                    ok: <p style={{}}>تایید</p>,
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="first-line">
                    <div
                        className={`item  ${props.className} ${props.disabled ? ' disabled' : ''}`}>
                        <p className="label">تاریخ</p>
                        <div className={`${status}`}
                             onClick={onClickHandler} ref={calenderRef} style={{width: '100%'}}>
                            <input
                                ref={inputRef}
                                className="places"
                                style={{padding: "0 12px"}}
                                autoComplete="new-password"
                                value={(new Date(date)).toLocaleDateString('fa')}
                                disabled={props.disabled}
                                placeholder="تاریخ سفر"
                                onFocus={onFocusHandler}
                            />
                            {status &&
                            <Calendar onClickOutside={() => setStatus(false)} isGregorian={false}
                                      value={datePickerValue}
                                      onChange={onDatePickChange}/>}
                        </div>
                    </div>
                </div>
                {/*<div className="first-line">*/}
                {/*    <div className="first-line">*/}
                {/*        <div className="item">*/}
                {/*            <p className="label">مسیر شهرها</p>*/}

                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={`first-line  ${showDescription ? "" : "d-none"}`}>
                    <div className="item">
                        <div className="description">
                            <i onClick={() => setShowDescription(false)} className="material-icons">clear</i>
                            <span style={{display: "flex", flex: 1, width: "100%"}}/>
                            <p className="label">توضیحات</p>
                        </div>
                        <TextArea value={description} onChange={e => setDescription(e.target.value)} rows={2}
                                  className="places"
                                  style={{height: "60px"}}/>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    item: state.driverTravels.item,
    isupdate: state.driverTravels.isupdate
})

const mapDispatchToProps = (dispatch) => {
    return {
        setDriverModal: (isopen) => dispatch({type: Actions.DRIVERMODALSHOW, isopen: isopen}),
        setIsUpdate: (isupdate) => dispatch({type: Actions.ISUPDATE, isupdate: isupdate}),
    }
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(DriverModal);
