import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import "./modalDetailsLands.style.scss"
import detailsDefaultCover from '../../assets/images/landscape-details-default.png'
import {connect} from "react-redux";
import * as Actions from "../../redux/map/actions"

const ModalDetails = (props) => {

    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal title={props.title}
                   visible={true}
                   onOk={()=>props.setModal()}
                   onCancel={()=>props.setModal()}
                   okButtonProps={{hidden: true}}
                   cancelButtonProps={{hidden: true}}>

                <div className="details-img">
                    <img src={props.cover ? props.cover : detailsDefaultCover} alt="landscape-details"/>
                </div>
                <div className="info">
                    <div className="info-item">
                        <i className="material-icons-outlined">category</i>
                        <p>{props.category}</p>
                    </div>

                    <div className="info-item">
                        <i className="material-icons-outlined">place</i>
                        <p>{props.address}</p>
                    </div>

                    <div className="info-item last-line">
                        <i className="material-icons-outlined">description</i>
                        <p>{props.description}</p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

const mapDispatchToProps=(dispatch)=>{
    return{
        setModal:()=>dispatch({type:Actions.MODALDETAILSHOW}),
        
    }
}


const connector = connect(null,mapDispatchToProps);
export default connector(ModalDetails);