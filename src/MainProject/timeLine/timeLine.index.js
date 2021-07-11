import React, {useState, useEffect, useRef} from "react";
import './timeLine.style.scss'
import cover from '../../assets/images/add-landscapes-default.png';
import {APIPath, RoutePath} from "../../data";
import {get, responseValidator, post} from "../../scripts/api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {Button, Modal, Tooltip} from "antd";
import Draggable from "react-draggable";
import Carousel from "react-elastic-carousel";
import noData from "../../assets/images/undraw_map_1r69.svg";
import { List, Avatar, ConfigProvider } from 'antd';
import {authToken} from "../../scripts/storage";

const dataa = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
   
];

const TimeLine = () => {

    const [suggestion, setSuggestion] = useState(null);
    const [myTravels, setMyTravels] = useState(null);
    const [passengerAccepted, setPassengerAccepted] = useState(null);

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        {width:400, itemsToShow:2},
    { width: 600, itemsToShow:2 },
    { width: 900, itemsToShow:4 },
    { width: 1500, itemsToShow: 4 },
    { width: 2000, itemsToShow: 5 },
  ];

    useEffect(() => {
        get(APIPath.hichhike.timeLine).then((data) => {
            if (responseValidator(data.status) && data.data) {
                setSuggestion(data.data)
            } else {
                toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
            }
        });
    }, [])

    useEffect(() => {
        get(APIPath.hichhike.myTravels + `?token=${authToken.get()}`).then((data) => {
            if (responseValidator(data.status) && data.data) {
                setMyTravels(data.data)
                console.log(data)
            } else {
                toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
            }
        });
    }, [])

    useEffect(() => {
        driverList()
    }, [])

    const driverList = () => {
        let temp = []
        get(APIPath.hichhike.passengerAccepted + `?token=${authToken.get()}`).then((data) => {
            if (responseValidator(data.status) && data.data) {
                setPassengerAccepted(data.data)
                temp = data.data
                console.log(data)
            } else {
                toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
            }
        });
        get(APIPath.hichhike.passengerPending + `?token=${authToken.get()}`).then((data) => {
            if (responseValidator(data.status) && data.data) {
                setPassengerAccepted(temp.concat(data.data))
                console.log(data)
            } else {
                toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
            }
        });
    }

    const join = (hichhikeId) => {
        post(APIPath.hichhike.join + `?token=${authToken.get()}`,{id:hichhikeId}).then((data) => {
            if (responseValidator(data.status) && data.data) {
                toast.success("با موفقیت ثبت شد، لطفا منتظر تایید سفیر بمانید")
            } else {
                toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
            }
        });
    }
    
    const accept = (hichhikeId) => {
        post(APIPath.hichhike.passengerPending + `?token=${authToken.get()}`,{id:hichhikeId, accept:1}).then((data) => {
            if (responseValidator(data.status) && data.data) {
                toast.success("با موفقیت ثبت شد")
                driverList()
            } else {
                toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
            }
        });
    }

    const deny = (hichhikeId) => {
        post(APIPath.hichhike.passengerPending + `?token=${authToken.get()}`,{id:hichhikeId, accept:0}).then((data) => {
            if (responseValidator(data.status) && data.data) {
                toast.success("شما با موفقیت این درخواست را رد کردید")
                driverList()
            } else {
                toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
            }
        });
    }

    function isPersianOrEnglish(str) {
        const alphabet = "1234567890abcdefghijklmnopqrstuvwxyz";
        const temp = str?.toString()
        for (let i = 0; i < alphabet.length; i++) {
            if (temp?.split('')[0] === alphabet[i]) {
                return true;
            }
        }
        return false;
    }

    return (
        <div>
        <div className='time-line-page'>
            <Carousel breakPoints={breakPoints} itemPadding={[10, 10]} isRTL={true}>
                    {
                        suggestion &&
                        suggestion.map((item) => (
                            <div className="time-line-card">
                                {/* <div className="header"> */}
                                <div className="cover-div">
                                    <Tooltip placement="left" title={item.creator_username}>
                                        <img alt='cover' className="cover"
                                            src={item.creator_profile_picture} /></Tooltip>
                                    <p className={`${isPersianOrEnglish(item.creator_username) === false ? 'username' : 'username is-english'}`}>{item.creator_username && item.creator_username.length > 12 ? item.name.substring(0, 13) + '...' : item.creator_username}@</p>
                                </div>
                                {/* </div> */}
                                <div className='content'>
                                    <Tooltip placement="right">
                                        <p className="source"> مبدا: {item.source && item.source.length > 20 ? item.source.substring(0, 20) + '...' : item.source}</p>
                                        <p className="destination">مقصد: {item.destination && item.destination.length > 20 ? item.destination.substring(0, 20) + '...' : item.destination}</p>
                                    </Tooltip>
                                    <p className="cities">شهرهای بین راه: {item.cities.join()}</p>
                                    <p className="follow-traveler">تعداد مسافر: {item.fellow_traveler_num && item.fellow_traveler_num.length > 20 ? item.fellow_traveler_num.substring(0, 20) + '...' : item.fellow_traveler_num}</p>
                                    <p className="time">زمان سفر: {item.jcreated && item.jcreated > 20 ? item.jcreated.substring(0, 20) + '...' : item.jcreated}</p>
                                    <Tooltip placement="right">
                                        <p className="description">توضیحات: {item.description && item.description.length > 60 ? item.description.substring(0, 60) + '...' : item.description}</p>
                                    </Tooltip>
                            
                                    <div className="end-line-button">
                                        <p className="join" onClick={() => join(item.id)}>اضافه شدن</p>
                                    </div>
                                </div>
                            </div>
                        
                        ))
                    // <div>
                    //     <img src={noData} className="no-data"></img>
                    //     <p className="no-data-p">متاسفانه پیشنهادی برای شما وجود ندارد</p>
                    // </div>
                }
            </Carousel>
            </div>
            <div className="list">
                <div className="between"/>
                <div className="right">
                    {passengerAccepted &&
                        <ConfigProvider direction="rtl">
                            <List
                                itemLayout="horizontal"
                                header="درخواست های سفر"
                                locale={{ emptyText: "اطلاعاتی موجود نیست" }}
                                dataSource={passengerAccepted}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.passenger_profile_picture} />}
                                            title={item.passenger_username}
                                            description={" از "+item.hichhike_source+ " به "+ item.hichhike_destination}
                                        />
                                        {!item.accepted ?
                                            <div>
                                                <Button className="add-button" onClick={() => accept(item.id)}>اضافه شود</Button>
                                                <Button className="add-button-deny" onClick={() => deny(item.id)}>رد کردن</Button></div> :
                                            <Button className="add-button-accepted" disabled={true}>پذیرفته شد</Button>}
                                    </List.Item>
                                )}
                            />
                        </ConfigProvider>}
                </div>
                <div className="between"/>
                <div className="left">
                    {myTravels &&
                        <ConfigProvider direction="rtl">
                            <List
                                itemLayout="horizontal"
                                header="سفرهای شما"
                                locale={{ emptyText: "اطلاعاتی موجود نیست" }}
                                dataSource={myTravels}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.hichhike_creator_profile_picture} />}
                                            title={<p>{item.hichhike_creator_username}</p>}
                                            description={" از "+item.hichhike_source+ " به "+ item.hichhike_destination}
                                        />
                                    </List.Item>
                                )}
                            />
                        </ConfigProvider>}
                </div>
                <div className="between"/>
            </div>
        </div>
    )
}

export default TimeLine;