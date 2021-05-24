import React, {useState, useEffect} from "react";
import './myLandscapes.style.scss'
import cover from '../../assets/images/add-landscapes-default.png';
import {APIPath, RoutePath} from "../../data";
import {get, responseValidator} from "../../scripts/api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import noData from "../../assets/images/undraw_not_found_60pq.svg"
import {Button, Modal, Tooltip} from "antd";


const MyLandscapes = () => {

    const [landscapes, setLandscapes] = useState(null);

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
        <div className='my-landscape-page'>
            {
                landscapes &&
                landscapes.map((item) => (
                    <div className="landscapes-card">
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
                            <p className="delete" onClick={showModal}>حذف</p>
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
                className="modal"
                footer={<div style={{display: "flex", width: "100%"}}>
                    <Button style={{
                        outline: "none",
                        border: "none",
                        color: "white",
                        backgroundColor: "green",
                        borderRadius: "5px"
                    }}>تایید</Button>
                    <Button style={{
                        outline: "none",
                        border: "none",
                        backgroundColor: "orange",
                        borderRadius: "5px"
                    }}>لغو</Button>
                </div>}
            >
                <p style={{
                    marginTop: "25px",
                    marginBottom: "-10px",
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                    fontWeight: 500
                }} className="modal-text">آیا
                    از حذف این مکان مطمئن هستید؟</p>
            </Modal>
            {
                landscapes &&
                landscapes.length === 0 && <div className="no-data">
                    <img src={noData} alt="no-data"/>
                    <p>متاسفانه مکان ثبت شده ای نداری</p>
                    <Link className="to-add-landscape" to={RoutePath.dashboard.addLandscapes}>مکان خودتو ثبت کن</Link>
                </div>
            }
        </div>
    )
}

export default MyLandscapes;