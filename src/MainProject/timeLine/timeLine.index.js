import React, {useState, useEffect, useRef} from "react";
import './timeLine.style.scss'
import cover from '../../assets/images/add-landscapes-default.png';
import {APIPath, RoutePath} from "../../data";
import {get, responseValidator} from "../../scripts/api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import noData from "../../assets/images/undraw_not_found_60pq.svg"
import {Button, Modal, Tooltip} from "antd";
import Draggable from "react-draggable";
import Carousel from "react-elastic-carousel";


const TimeLine = () => {

    const [suggestion, setSuggestion] = useState(null);
    const [bounds, setBounds] = useState({left: 0, top: 0, bottom: 0, right: 0});
    const [disabled, setDisabled] = useState(true);
    const draggleRef = useRef();
    const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 600, itemsToShow:2 },
    { width: 900, itemsToShow:3 },
    { width: 1500, itemsToShow: 4 },
    { width: 2000, itemsToShow: 5 },
  ];

    function onStart(event, uiData) {
        const {clientWidth, clientHeight} = window?.document?.documentElement;
        const targetRect = draggleRef?.current?.getBoundingClientRect();
        setBounds({
            left: -targetRect?.left + uiData?.x,
            right: clientWidth - (targetRect?.right - uiData?.x),
            top: -targetRect?.top + uiData?.y,
            bottom: clientHeight - (targetRect?.bottom - uiData?.y),
        })
    }

    useEffect(() => {
        get(APIPath.hichhike.timeLine).then((data) => {
            if (responseValidator(data.status) && data.data) {
                setSuggestion(data.data)
            } else {
                toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
            }
        });
    }, [])

    const [visible, setVisible] = React.useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

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
        <div className='time-line-page'>
            <Carousel breakPoints={breakPoints} itemPadding={[10, 27]} isRTL={true}>
            {
                suggestion &&
                suggestion.map((item) => (
                    <div className="time-line-card">
                        <div className="cover-div">
                            <Tooltip placement="left" title={item.creator_username}>
                                <img alt='cover-landscapes' className="cover"
                                    src={item.creator_profile_picture} /></Tooltip>
                                <p className={`${isPersianOrEnglish(item.creator_username) === false ? 'username' : 'username is-english'}`}>{item.creator_username && item.creator_username.length > 12 ? item.name.substring(0, 13) + '...' : item.creator_username}@</p>
                            
                        </div>
                        <div className='content'>
                            <Tooltip placement="right">
                                <p className="name-address">مبدا: {item.source && item.source.length > 20 ? item.source.substring(0, 20) + '...' : item.source}</p>
                                <p className="name-address">مقصد: {item.destination && item.destination.length > 20 ? item.destination.substring(0, 20) + '...' : item.destination}</p>
                            </Tooltip>
                            <p className="name-address">شهرهای بین راه: {item.cities.join()}</p>
                            <p className="name-address">تعداد مسافر: {item.fellow_traveler_num && item.fellow_traveler_num.length > 20 ? item.fellow_traveler_num.substring(0, 20) + '...' : item.fellow_traveler_num}</p>
                            <p className="name-address">زمان سفر: {item.jcreated && item.jcreated > 20 ? item.jcreated.substring(0, 20) + '...' : item.jcreated}</p>
                            <Tooltip placement="right">
                                <p className="description">توضیحات: {item.description && item.description.length > 60 ? item.description.substring(0, 60) + '...' : item.description}</p>
                            </Tooltip>
                            <span/>
                            {/* <div className="end-line-button">
                                <p className="edit" >اضافه شدن</p>
                                <p className="detail" onClick={showModal}>جزییات</p>
                            </div> */}
                            </div>
                        </div>
                        
                ))
                }
                {/* <p></p> */}
            {/* <div className="my-grid"/>
                <div className="my-grid" /> */}
                </Carousel>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                modalRender={modal => (
                    <Draggable
                        disabled={disabled}
                        bounds={bounds}
                        onStart={(event, uiData) => onStart(event, uiData)}
                    >
                        <div ref={draggleRef}>{modal}</div>
                    </Draggable>
                )}
                className="modal"
                footer={<div style={{display: "flex", width: "100%"}}>
                </div>}
            >
                <p
                    onMouseOver={() => {
                        if (disabled) {
                            setDisabled(false)
                        }
                    }}
                    onMouseOut={() => {
                        setDisabled(true)
                    }}
                    style={{
                        marginTop: "25px",
                        marginBottom: "-10px",
                        display: "flex",
                        width: "100%",
                        cursor: 'move',
                        justifyContent: "flex-end",
                        fontWeight: 500
                    }} className="modal-text">جزییات بیشتر این سفر</p>
            </Modal>
            {/* {
                suggestion &&
                suggestion.length === 0 && <div className="no-data">
                    <p>متاسفانه پیشنهادی برای شما وجود ندارد </p>
                </div>
            } */}
            </div>
    )
}

export default TimeLine;