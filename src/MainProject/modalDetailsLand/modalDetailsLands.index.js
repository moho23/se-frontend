import React, {useRef, useState, useEffect} from 'react';
import {Modal,Rate} from 'antd';
import {Button} from 'antd';
import "./modalDetailsLands.style.scss"
import detailsDefaultCover from '../../assets/images/default-modal-detail-land.png'
import {connect} from "react-redux";
import * as ActionsMap from "../../redux/map/actions"
import * as ActionsModalDetails from "../../redux/modalDetails/actions"
import 'antd/dist/antd.css';
import Draggable from 'react-draggable';
import { APIPath } from "../../data";
import { post, responseValidator } from "../../scripts/api";
import {authToken} from "../../scripts/storage";
import {useHistory} from "react-router-dom";
import { RoutePath } from '../../data';


const ModalDetails = (props) => {
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const [disabled, setDisabled] = useState(true);
    const draggleRef = useRef();
    const [rate, setRate] = useState(props.rate);

    const history = useHistory()

    function onStart(event, uiData) {
        const { clientWidth, clientHeight } = window?.document?.documentElement;
        const targetRect = draggleRef?.current?.getBoundingClientRect();
        setBounds({
            left: -targetRect?.left + uiData?.x,
            right: clientWidth - (targetRect?.right - uiData?.x),
            top: -targetRect?.top + uiData?.y,
            bottom: clientHeight - (targetRect?.bottom - uiData?.y),
        })
    }
    useEffect(()=>{
        setRate(props.rate)
        console.log(props.rate)
        console.log(props.id)
        console.log(props.title)
    },[props.rate])
    
    const rateHadler = (e) => {
        console.log(e)
        setRate(e)
        
        const form = {
            rating: e,
            location: props.id
        }
        post(APIPath.map.rate + `?token=${authToken.get()}`, form).then((data) => {
            if (responseValidator(data.status)) {
                console.log(data)
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
        function Comments(detail) {
            props.setProps(detail)
            history.push(RoutePath.commentsLand.comments)
        }

        return (
            <Modal
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                            color: 'white'
                        }}
                        onMouseOver={() => {
                            if (disabled) {
                                setDisabled(false)
                            }
                        }}
                        onMouseOut={() => {
                            setDisabled(true)
                        }}
                    >
                        {props.title}
                    </div>
                }
                visible={true}
                onOk={() => props.setModal(false)}
                onCancel={() => props.setModal(false)}
                okButtonProps={{ hidden: true }}
                cancelButtonProps={{ hidden: true }}
                className="modal-detail-page"
                footer={false}
                modalRender={modal => (
                    <Draggable
                        disabled={disabled}
                        bounds={bounds}
                        onStart={(event, uiData) => onStart(event, uiData)}
                    >
                        <div ref={draggleRef}>{modal}</div>
                    </Draggable>
                )}
                footer={props.id !== null
                    ? [
                        <Button key="comments" type="primary" onClick={() => Comments(props)}>
                            نظرات
                        </Button>
                
                    ]
                    : null}
            >

                <div className="details-img">
                    <img src={props.cover ? props.cover : detailsDefaultCover} alt="landscape-details" />
                </div>
                <div className="info">
                    {
                        props.id ? <Rate value={rate} onChange={rateHadler} /> : null
                    }
                
                    {
                        props.category && <div
                            className={`${isPersianOrEnglish(props.category) === false ? 'info-item' : 'info-item is-english'}`}>
                            <i className="material-icons">category</i>
                            <p>{props.category}</p>
                        </div>
                    }
                    {
                        props.address && <div
                            className={`${isPersianOrEnglish(props.address) === false ? 'info-item' : 'info-item is-english'}`}>
                            <i className="material-icons">place</i>
                            <p>{props.address}</p>
                        </div>
                    }
                    {
                        props.description && <div className={`${isPersianOrEnglish(props.description) === false ?
                            'info-item last-line' : 'info-item last-line is-english'}`}>
                            <i className="material-icons">description</i>
                            <p >{props.description}</p>
                        </div>
                    }
                </div>
            </Modal>
        );
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            setProps: (props) => dispatch({ type: ActionsModalDetails.PROPS, props: props }),
            setModal: (isOpen) => dispatch({ type: ActionsMap.MODALDETAILSHOW, isOpen: isOpen }),
        }
    }
    const connector = connect(null, mapDispatchToProps);
    export default connector(ModalDetails);
