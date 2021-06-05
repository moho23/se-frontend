import React, {useState, useEffect, useRef} from "react";
import './driverTravels.style.scss'
import cover from '../../assets/images/add-landscapes-default.png';
import {APIPath, RoutePath} from "../../data";
import {get, responseValidator} from "../../scripts/api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import noData from "../../assets/images/undraw_not_found_60pq.svg"
import {Button, Modal, Tooltip} from "antd";
import Draggable from "react-draggable";

const DriverTravels = () => {

    const [travels, setTravels] = useState(null);
    const [check, setCheck] = useState(true);
    const [bounds, setBounds] = useState({left: 0, top: 0, bottom: 0, right: 0});
    const [disabled, setDisabled] = useState(true);
    const draggleRef = useRef();

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
        get(APIPath.hichhike.driverTravels).then((data) => {
            if (responseValidator(data.status) && data.data) {
                setTravels(data.data)
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

    useEffect(() => {
        get(APIPath.hichhike.driverTravels).then((data) => {
            console.log("1", data)
            if (responseValidator(data.status) && data.data) {
                console.log("2", data.data)
                setTravels(data.data)
            } else {
                toast.error("مجددا تلاش کنید.");
            }
        });
    }, [])

    return (
        <div className='my-travels-page'>
            {
                travels &&
                travels.map((item) => (
                    <div className="travels-card">
                        <div className="cover-div">
                            <img alt='cover-travels' className="cover"
                                 src={item.creator_profile_picture ? item.creator_profile_picture : cover}/>
                        </div>

                        <div className='content'>
                             {/* <p className="source">از {item.source}</p>
                            <p className="destination">به {item.destination}</p>
                            <p className="traveler">تعداد مسافر: {item.fellow_traveler_num}</p>
                            <p className="cities">{item.cities.join()}</p>
                            {item.creator_gender == "f" ? <p className="gender">زن</p> :
                                <p className="gender">مرد</p>}
                            <p className={check ? "description" : "description-no"}>{item.description}</p> */}
                            <p className={`${isPersianOrEnglish(item.source) === false ? 'fix' : 'fix is-english'}`}>از {item.source}</p>
                            <p className={`${isPersianOrEnglish(item.destination) === false ? 'fix' : 'fix is-english'}`}>به {item.destination}</p>
                            <p className="fix">تعداد مسافر: {item.fellow_traveler_num}</p>
                            <p className={`${isPersianOrEnglish(item.cities) === false ? 'fix' : 'fix is-english'}`}>{item.cities && item.cities.length > 12 ? item.cities.substring(0, 13) + '...' : item.cities}</p>
                            <Tooltip placement="right" title={item.address}>
                                <p className={`${isPersianOrEnglish(item.address) === false ? 'fix' : 'fix is-english'}`}>{item.address && item.address.length > 20 ? item.address.substring(0, 20) + '...' : item.address}</p>
                            </Tooltip>
                            <Tooltip placement="right" title={item.description}>
                                <p className={`${isPersianOrEnglish(item.description) === false ? 'description' : 'description is-english'}`}>{item.description && item.description.length > 60 ? item.description.substring(0, 60) + '...' : item.description}</p>
                            </Tooltip>
                            <span/>
                            <div className="end-line-button">
                                <p className="edit" >ویرایش</p>
                                <p className="delete" onClick={showModal}>حذف</p>
                            </div>
                            
                           
                        </div>

                    </div>
                ))
            }
            <div className="my-grid"/>
            <div className="my-grid"/>
            
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
                    <Button
                        onClick={handleOk}
                        style={{
                            outline: "none",
                            border: "none",
                            color: "white",
                            backgroundColor: "green",
                            borderRadius: "5px"
                        }}>تایید</Button>
                    <Button
                        onClick={handleCancel}
                        style={{
                            outline: "none",
                            border: "none",
                            backgroundColor: "orange",
                            borderRadius: "5px",
                        }}>لغو</Button>
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
                    }} className="modal-text">آیا
                    از حذف این مکان مطمئن هستید؟</p>
            </Modal>
            {
                travels && travels.length === 0 && <div className="no-data">
                    <img src={noData} alt="no-data"/>
                    <p>!متاسفانه سفر ثبت شده ای نداری</p>
                </div>
            }
        </div>
    )
}

export default DriverTravels;