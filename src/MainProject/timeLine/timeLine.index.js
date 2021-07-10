import React, {useState, useEffect, useRef} from "react";
import './timeLine.style.scss'
import cover from '../../assets/images/add-landscapes-default.png';
import {APIPath, RoutePath} from "../../data";
import {get, responseValidator} from "../../scripts/api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {Button, Modal, Tooltip} from "antd";
import Draggable from "react-draggable";
import Carousel from "react-elastic-carousel";
import noData from "../../assets/images/undraw_map_1r69.svg";


const TimeLine = () => {

    const [suggestion, setSuggestion] = useState(null);
    const breakPoints = [
    { width: 1, itemsToShow: 1 },
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
                                <p className="join" >اضافه شدن</p>
                                <p className="delete">حذف کردن</p>
                            </div>
                            </div>
                        </div>
                        
                )),
                    <div>
                        <img src={noData} className="no-data"></img>
                        {/* <p>متاسفانه پیشنهادی برای شما وجود ندارد</p> */}
                    </div>
                }
            </Carousel>
            </div>
        </div>
    )
}

export default TimeLine;