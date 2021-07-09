import React, {useState, useEffect, useRef} from "react";
import './myLandscapes.style.scss'
import cover from '../../assets/images/add-landscapes-default.png';
import {APIPath, RoutePath} from "../../data";
import {get, responseValidator,del} from "../../scripts/api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import noData from "../../assets/images/undraw_not_found_60pq.svg"
import {Button, Modal, Tooltip} from "antd";
import Draggable from "react-draggable";
import {connect} from "react-redux";
import * as Actions from "../../redux/myLandscapes/actions"
import {useHistory} from "react-router-dom";



const MyLandscapes = (props) => {

    const [landscapes, setLandscapes] = useState(null);
    const [bounds, setBounds] = useState({left: 0, top: 0, bottom: 0, right: 0});
    const [disabled, setDisabled] = useState(true);
    const[id,setId]=useState(null)
    const draggleRef = useRef();
    const history=useHistory()

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
        props.setUpdate(false)
        get(APIPath.map.myLandscapes).then((data) => {
            if (responseValidator(data.status) && data.data) {
                setLandscapes(data.data)
                console.log(data.data)
            } else {
                toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
            }
        });
    }, [])

    const [visible, setVisible] = React.useState(false);

    const showModal = (id) => {
        setVisible(true);
        setId(id)
    };

    const handleOk = () => {
        setVisible(false);
        del(APIPath.map.myLandscapes+"?location_id="+id).then((data) => {
            if (responseValidator(data.status) && data.data=="Location deleted"){
                toast.success("مکان موردنظر با موفقیت حذف شد.")
                window.location.reload();
            }
        })
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const editMyLand=(item)=>{
        props.setItem(item)
        props.setUpdate(true)
        history.push(RoutePath.dashboard.addLandscapes)
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
                            <div className="end-line-button">
                                <p className="edit" onClick={()=>{editMyLand(item)}}>ویرایش</p>
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
                        className="submit"
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

const mapDispatchToProps = (dispatch) => {
    return {
        setItem:(item) => dispatch({type: Actions.ITEM, item: item}),
        setUpdate:(bool) => dispatch({type: Actions.UPDATE, bool: bool}),
    }
}

const connector = connect(null, mapDispatchToProps);
export default connector(MyLandscapes);