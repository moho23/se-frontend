import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import 'antd/dist/antd.css';
import "./modalDetailsLands.style.scss"
import detailsDefaultCover from '../../assets/images/landscape-details-default.png'

const ModalDetails = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(props.show);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal title={props.title}
                   visible={isModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}
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

export default ModalDetails;