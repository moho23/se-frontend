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


const TimeLine = () => {

    const [landscapes, setLandscapes] = useState(null);
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
        get(APIPath.map.myLandscapes).then((data) => {
            if (responseValidator(data.status) && data.data) {
                setLandscapes(data.data)
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
            {
                landscapes &&
                landscapes.map((item) => (
                    <div className="time-line-card">
                        <div className="cover-div">
                            <img alt='cover-landscapes' className="cover"
                                 src={item.image[0] ? item.image[0] : cover}/>
                        </div>
                        <div className='content'>
                            <p className={`${isPersianOrEnglish(item.name) === false ? 'name-address' : 'name-address is-english'}`}>{item.name && item.name.length > 12 ? item.name.substring(0, 13) + '...' : item.name}</p>
                            <Tooltip placement="right" title={item.address}>
                                <p className={`${isPersianOrEnglish(item.address) === false ? 'name-address' : 'name-address is-english'}`}>{item.address && item.address.length > 20 ? item.address.substring(0, 20) + '...' : item.address}</p>
                            </Tooltip>
                            <Tooltip placement="right" title={item.description}>
                                <p className={`${isPersianOrEnglish(item.description) === false ? 'description' : 'description is-english'}`}>{item.description && item.description.length > 60 ? item.description.substring(0, 60) + '...' : item.description}</p>
                            </Tooltip>
                            <span/>
                            <div className="end-line-button">
                                <p className="edit" >اضافه شدن</p>
                                <p className="detail" onClick={showModal}>جزییات</p>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className="my-grid"/>
            <div className="my-grid" />
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
        </div>
    )
}

export default TimeLine;