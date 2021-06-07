import React, {useState, useEffect, useRef} from "react";
import './driverTravels.style.scss'
import cover from '../../assets/images/add-landscapes-default.png';
import {APIPath, RoutePath} from "../../data";
import {get, responseValidator,del} from "../../scripts/api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import noData from "../../assets/images/undraw_not_found_60pq.svg"
import {connect} from "react-redux";
import * as Actions from "../../redux/driverTravels/actions"
import DriverModal from "../DriverModal/drivermodal.index";
import {Button, Modal, Tooltip} from "antd";
import Draggable from "react-draggable";

const DriverTravels = (props) => {

    const [travels, setTravels] = useState(null);
    const [check, setCheck] = useState(true);
    const [bounds, setBounds] = useState({left: 0, top: 0, bottom: 0, right: 0});
    const [disabled, setDisabled] = useState(true);
    const draggleRef = useRef();
    const [id,setID]=useState(null)

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

    const showModal = (id) => {
        setVisible(true);
        setID(id)
    };

    const handleOk = () => {
        setVisible(false);
        del(APIPath.hichhike.driverTravels+"?hichhike_id="+id).then((data) => {
            if (responseValidator(data.status) && data.data=="hichhike deleted"){
                toast.success("سفر موردنظر با موفقیت حذف شد.")
                window.location.reload();
                //history.push(RoutePath.dashboard.myLandscapes)
            }
        })
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
        props.setCheck(false)
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

    const set=(item)=>{
        props.setCheck(true)
        props.setItem(item)
        props.setDriverModal()
    }

    return (
        <div className='my-travels-page'>
            {props.driverModalShow ? <DriverModal/> : null}
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
                            <p className={check ? "description" : "description-no"}>{item.description}</p>
                            <i onClick={() => set(item)} className="material-icons icon">thumb_down_alt</i>
                            <p className={check ? "description" : "description-no"}>{item.description}</p> */}
                            <p className={`${isPersianOrEnglish(item.source) === false ? 'fix' : 'fix is-english'}`}>از {item.source}</p>
                            <p className={`${isPersianOrEnglish(item.destination) === false ? 'fix' : 'fix is-english'}`}>به {item.destination}</p>
                            <p className="fix">تعداد مسافر: {item.fellow_traveler_num}</p>
                            <p className="fix">{item.cities && item.cities.length > 12 ? item.cities.substring(0, 13) + '...' : item.cities}</p>
                            <Tooltip placement="right" title={item.address}>
                                <p className={`${isPersianOrEnglish(item.address) === false ? 'fix' : 'fix is-english'}`}>{item.address && item.address.length > 20 ? item.address.substring(0, 20) + '...' : item.address}</p>
                            </Tooltip>
                            <Tooltip placement="right" title={item.description}>
                                <p className={`${isPersianOrEnglish(item.description) === false ? 'description' : 'description is-english'}`}>{item.description && item.description.length > 60 ? item.description.substring(0, 60) + '...' : item.description}</p>
                            </Tooltip>
                            <span />
                            <span/>
                            <div className="end-line-button">
                                <p onClick={() => set(item)} className="edit" >ویرایش</p>
                                <p className="delete" onClick={()=>showModal(item.id)}>حذف</p>
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
                // modalRender={modal => (
                //     <Draggable
                //         disabled={disabled}
                //         bounds={bounds}
                //         onStart={(event, uiData) => onStart(event, uiData)}
                //     >
                //         <div ref={draggleRef}>{modal}</div>
                //     </Draggable>
                // )}
                className="modal"
                footer={<div style={{display: "flex", width: "100%"}}>
                    <Button
                        onClick={handleOk}
                        style={{
                            display: "flex",
                            outline: "none",
                            border: "1px solid green",
                            color:"green",
                            borderRadius: "5px",
                            fontWeight:500
                        }}>تایید</Button>
                    <Button
                        onClick={handleCancel}
                        style={{
                            display: "flex",
                            outline: "none",
                            border: "none",
                            backgroundColor: "#F05454",
                            color:"#ffffff",
                            fontWeight:500,
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
                    از حذف این سفر مطمئن هستید؟</p>
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

const mapStateToProps = (state) => ({
    driverModalShow: state.driverTravels.driverModalShow,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setCheck:(checkInput) => dispatch({type: Actions.CHECK,checkInput: checkInput}),
        setItem:(item) => dispatch({type: Actions.ITEM, item: item}),
        setDriverModal: () => dispatch({type: Actions.DRIVERMODALSHOW}),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(DriverTravels);