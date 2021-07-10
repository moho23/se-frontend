import React, {useEffect, useRef, useState} from 'react';
import {Button, Dropdown, Input, InputNumber, Menu, Modal, TimePicker, Select} from 'antd';
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
import {AllCityInIran} from "./allCitiesInIran.data";

const {Option} = Select;
const {TextArea} = Input;

const DriverModal = (props) => {
    const [bounds, setBounds] = useState({left: 0, top: 0, bottom: 0, right: 0});
    const [disabled, setDisabled] = useState(true);
    const [numOfTraveler, setNumOfTraveler] = useState(null);
    const [description, setDescription] = useState('');
    const [cities, setCities] = useState([]);
    const [tempCity, setTempCity] = useState([])
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
    const [sourceArrow, setSourceArrow] = useState(false)
    const [destArrow, setDestArrow] = useState(false)
    const [sourceCityArrow, setSourceCityArrow] = useState(false)
    const [destCityArrow, setDestCityArrow] = useState(false)
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

    useEffect(() => {
        if (props.isupdate) {
            if (props.item != null) {
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
                if (props.item.creator_gender === "m") {
                    setGenderButton("مرد")
                } else {
                    setGenderButton("زن")
                }
                setGender(props.item.creator_gender)
                setDescription(props.item.description)
            }
        }
    }, [])


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
                let passengerOrDriverForm;
                if (driver) {
                    passengerOrDriverForm = {
                        creator_type: 'd',
                        creator_gender: gender,
                        creator_age: age,
                        source: sourceCity,
                        source_state: source,
                        destination: destinationCity,
                        destination_state: destination,
                        fellow_traveler_num: numOfTraveler,
                        description: description,
                        cities: cities,
                        trip_time: date + 'T' + time + 'Z',
                    }
                } else {
                    passengerOrDriverForm = {
                        creator_type: 'p',
                        creator_gender: gender,
                        creator_age: age,
                        source: sourceCity,
                        source_state: source,
                        destination: destinationCity,
                        destination_state: destination,
                        description: description,
                    }
                }
                post(APIPath.hichhike.create, passengerOrDriverForm).then((data) => {
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

    useOnBlur(sourceRef, () => {
        setVisible1(false)
        setSourceArrow(false)
    })
    useOnBlur(destinationRef, () => {
        setVisible2(false)
        setDestArrow(false)
    })
    useOnBlur(destinationCityRef, () => {
        setVisible22(false)
        setDestCityArrow(false)
    })
    useOnBlur(sourceCityRef, () => {
        setVisible11(false)
        setSourceCityArrow(false)
    })
    useOnBlur(genderRef, () => {
        setVisibleGender(false)
        setGenderArrow(false)
    })

    const [genderArrow, setGenderArrow] = useState(false)

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
        console.log("dateString", dateString)
        console.log("date", date)
        setTimePickerValue(date)
        console.log("timePickerValue", timePickerValue)
    }

    const setCheckAndDriverModal = () => {
        props.setDriverModal(false)
        props.setIsUpdate(false)
    }

    const [driver, setDriver] = useState(true);
    const [passenger, setPassenger] = useState(false);

    const cityOptions = ["شاهدشهر", "پیشوا", "جوادآباد", "ارجمند", "ری", "نصیرشهر", "رودهن", "اندیشه", "نسیم شهر", "صباشهر", "ملارد", "شمشک", "پاکدشت", "باقرشهر", "احمد آباد مستوفی", "کیلان", "قرچک", "فردوسیه", "گلستان", "ورامین", "فیروزکوه", "فشم", "پرند", "آبعلی", "چهاردانگه", "تهران", "بومهن", "وحیدیه", "صفادشت", "لواسان", "فرون اباد", "کهریزک", "رباطکریم", "آبسرد", "باغستان", "صالحیه", "شهریار", "قدس", "تجریش", "شریف آباد", "حسن آباد", "اسلامشهر", "دماوند", "پردیس"];


    function onChange(e) {
        if (!cities.includes(e)) {
            setTempCity([...cities, e])
        } else {
            toast.warn('شهر قبلا انتخاب شده است.')
        }
    }

    function onAddCityHandler() {
        setCities(tempCity)
    }

    function handleDeleteCities(item) {
        if (cities.includes(item)) {
            setCities(cities.filter(data => data !== item))
        }
    }

    return (
        <Modal
            title={
                <div className="title-div">
                    <Button className={driver ? "active driver-passenger" : "driver-passenger"} onClick={() => {
                        setDriver(!driver)
                        setPassenger(false)
                    }}>سفیر</Button>
                    <Button className={passenger ? "active driver-passenger" : "driver-passenger"} onClick={() => {
                        setPassenger(!passenger)
                        setDriver(false)
                    }}>مسافر</Button>
                    <span />
                    <div className="draggable-place"
                         onMouseEnter={() => {
                             if (disabled) {
                                 setDisabled(false)
                             }
                         }}
                         onMouseOut={() => {
                             setDisabled(true)
                         }} >
                        .
                    </div>
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
                                setVisible1(false)
                                setVisible22(false)
                                setVisible2(false)
                                setSourceCityOrDestinationCity(1)
                                setSourceCityArrow(!sourceCityArrow)
                                setSourceArrow(false)
                                setDestCityArrow(false)
                                setDestArrow(false)
                                setGenderArrow(false)
                                setVisibleGender(false)
                            }} dir="rtl"
                                    className={sourceCityButton ? "places selected" : "places"}>{sourceCityButton ? sourceCityButton : "شهر مبدا"}
                                <span
                                    style={{display: "flex", flex: 1, width: "100%"}}/>
                                <i className="material-icons">{sourceCityArrow ? 'expand_less' : 'expand_more'}</i></Button>
                        </Dropdown>
                    </div>
                    <div className="item">
                        <p className="label">مبدا</p>
                        <Dropdown arrow={true} visible={visible1} trigger="click" overlay={menu}
                                  placement="bottomCenter">
                            <Button ref={sourceRef} onClick={() => {
                                setVisible1(!visible1)
                                setVisible11(false)
                                setVisible22(false)
                                setVisible2(false)
                                setSourceOrDestination(1)
                                setSourceArrow(!sourceArrow)
                                setDestCityArrow(false)
                                setDestArrow(false)
                                setSourceCityArrow(false)
                                setGenderArrow(false)
                                setVisibleGender(false)
                            }} dir="rtl"
                                    className={sourceButton ? "places selected" : "places"}>{sourceButton ? sourceButton : "مبدا"}
                                <span
                                    style={{display: "flex", flex: 1, width: "100%"}}/>
                                <i className="material-icons">{sourceArrow ? 'expand_less' : 'expand_more'}</i>
                            </Button>
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
                                setVisible2(false)
                                setVisible11(false)
                                setVisible1(false)
                                setSourceCityOrDestinationCity(2)
                                setDestCityArrow(!destCityArrow)
                                setDestArrow(false)
                                setSourceArrow(false)
                                setSourceCityArrow(false)
                                setGenderArrow(false)
                                setVisibleGender(false)
                            }} dir="rtl"
                                    className={destinationCityButton ? "places selected" : "places"}>
                                {destinationCityButton ? destinationCityButton : "شهر مقصد"}
                                <span
                                    style={{display: "flex", flex: 1, width: "100%"}}/>
                                <i className="material-icons">{destCityArrow ? 'expand_less' : 'expand_more'}</i>
                            </Button>
                        </Dropdown>
                    </div>
                    <div className="item">
                        <p className="label">مقصد</p>
                        <Dropdown arrow={true} visible={visible2} trigger="click" overlay={menu}
                                  placement="bottomCenter">
                            <Button ref={destinationRef} onClick={() => {
                                setVisible2(!visible2)
                                setVisible22(false)
                                setVisible11(false)
                                setVisible1(false)
                                setSourceOrDestination(2)
                                setDestArrow(!destArrow)
                                setDestCityArrow(false)
                                setSourceArrow(false)
                                setSourceCityArrow(false)
                                setGenderArrow(false)
                                setVisibleGender(false)
                            }} dir="rtl"
                                    className={destinationButton ? "places selected" : "places"}>
                                {destinationButton ? destinationButton : "مقصد"}
                                <span
                                    style={{display: "flex", flex: 1, width: "100%"}}/>
                                <i className="material-icons">{destArrow ? 'expand_less' : 'expand_more'}</i>
                            </Button>
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
                                setVisible22(false)
                                setVisible11(false)
                                setVisible2(false)
                                setVisible1(false)
                                setGenderArrow(!genderArrow)
                                setDestArrow(false)
                                setDestCityArrow(false)
                                setSourceArrow(false)
                                setSourceCityArrow(false)
                            }} dir="rtl"
                                    className={genderButton ? "places selected" : "places"}>{genderButton ? genderButton : "مرد"}
                                <span
                                    style={{display: "flex", flex: 1, width: "100%"}}/>
                                <i className="material-icons">{genderArrow ? 'expand_less' : 'expand_more'}</i>
                            </Button>
                        </Dropdown>
                    </div>
                </div>
                <div className="first-line">
                    {
                        driver && <>
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
                        </>
                    }
                </div>
                {
                    driver && <div className="first-line">
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
                }
                {
                    driver && <div className="first-line">
                        <div className="item">
                            <p className="label">شهر های بین مسیر</p>
                            <div className="add-city">
                                <Button disabled={cities && cities.length === 3} className="add-city-button"
                                        onClick={onAddCityHandler}>اضافه کردن</Button>
                                <span className="add-city-span"/>
                                <Select
                                    showSearch
                                    showArrow={false}
                                    disabled={cities && cities.length === 3}
                                    className="between-cities"
                                    placeholder="حداکثر ۳ شهر"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {
                                        AllCityInIran.map(item => (
                                            <Option style={{
                                                direction: "rtl",
                                                display: "flex",
                                                width: "100%",
                                                fontWeight: 500,
                                                cursor: "pointer",
                                                padding: "10px 15px",
                                            }} value={item.name}>{item.name}</Option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className="show-cities">
                                {
                                    cities && cities.map((item) => (
                                        <p onClick={() => handleDeleteCities(item)}>{item}<i
                                            className="material-icons">close</i></p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                }
                <div className={`first-line  ${showDescription ? "" : "d-none"}`}>
                    <div className="item">
                        <div className="description">
                            <i onClick={() => setShowDescription(false)} className="material-icons">clear</i>
                            <span style={{display: "flex", flex: 1, width: "100%"}}/>
                            <p className="label">توضیحات</p>
                        </div>
                        <TextArea dir="rtl" value={description} onChange={e => setDescription(e.target.value)} rows={2}
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
