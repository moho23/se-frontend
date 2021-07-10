import React, {useRef, useState} from 'react';
import {Modal,Button} from 'antd';
import "./modalDetailsLands.style.scss"
import detailsDefaultCover from '../../assets/images/default-modal-detail-land.png'
import {connect} from "react-redux";
import * as ActionsMap from "../../redux/map/actions"
import * as ActionsModalDetails from "../../redux/modalDetails/actions"
import 'antd/dist/antd.css';
import Draggable from 'react-draggable';
import {useHistory} from "react-router-dom";
import { RoutePath } from '../../data';


const ModalDetails = (props) => {
    const [bounds, setBounds] = useState({left: 0, top: 0, bottom: 0, right: 0});
    const [disabled, setDisabled] = useState(true);
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

    function Comments(detail){
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
            onOk={() => props.setModal()}
            onCancel={() => props.setModal()}
            okButtonProps={{hidden: true}}
            cancelButtonProps={{hidden: true}}
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
            footer={props.id!==null 
                ?[
                <Button key="comments" type="primary" onClick={()=>Comments(props)}>
                    نظرات
                </Button>
                
            ]
        :null}
        >

            <div className="details-img">
                <img src={props.cover ? props.cover : detailsDefaultCover} alt="landscape-details"/>
            </div>
            <div className="info">
                {
                    props.category && <div className="info-item">
                        <i className="material-icons-outlined">category</i>
                        <p>{props.category}</p>
                    </div>
                }
                {
                    props.address && <div className="info-item">
                        <i className="material-icons-outlined">place</i>
                        <p>{props.address}</p>
                    </div>
                }
                {
                    props.description && <div className="info-item last-line">
                        <i className="material-icons-outlined">description</i>
                        <p>{props.description}</p>
                    </div>
                }
            </div>
        </Modal>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProps:(props) => dispatch({type: ActionsModalDetails.PROPS, props: props}),
        setModal: () => dispatch({type: ActionsMap.MODALDETAILSHOW}),
    }
}
const connector = connect(null, mapDispatchToProps);
export default connector(ModalDetails);