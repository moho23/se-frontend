import "./commentsLandscapes.style.scss"
import React, {useEffect, useState} from 'react';
import {APIPath} from "../../data";
import {connect} from "react-redux";
import detailsDefaultCover from '../../assets/images/default-modal-detail-land.png'
import {get, responseValidator} from "../../scripts/api";
import {toast} from "react-toastify";


const Comments=(props)=>{
    console.log("propsss",props.props)
    const [commets, setComment] = useState(null);

    useEffect(() => {
        get(APIPath.location.comment).then((data) => {
            console.log("dataaa",data.data)
            if (responseValidator(data.status) && data.data) {
                setComment(data.data)
            } else {
                toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
            }
        });
    }, [])

    return(
        <div className="comments-page">
            <div className="content">
            <div className="title">
                    {props.props.title && 
                    <p>{props.props.title}</p>}
            </div>
            <div class="line"></div>
            <div className="details-img">
                <img src={props.props.cover ? props.props.cover : detailsDefaultCover} alt="landscape-details"/>
            </div>
            <div class="line"></div>
            <div className="info">
                {
                    props.props.category && <div className="info-item">
                        <i className="material-icons">category</i>
                        <p>{props.props.category}</p>
                    </div>
                }
                {
                    props.props.address && <div className="info-item">
                        <i className="material-icons">place</i>
                        <p>{props.props.address}</p>
                    </div>
                }
                {
                    props.props.description && <div className="info-item last-line">
                        <i className="material-icons">description</i>
                        <p>{props.props.description}</p>
                    </div>
                }
            </div>
            <div class="line"></div>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => ({
    props: state.modalDetails.props,
});
const connector = connect(mapStateToProps,);
export default connector(Comments);