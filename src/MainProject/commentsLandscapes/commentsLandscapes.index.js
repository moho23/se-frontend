import "./commentsLandscapes.style.scss"
import React, { useEffect, useState } from 'react';
import { APIPath, RoutePath } from "../../data";
import { connect } from "react-redux";
import detailsDefaultCover from '../../assets/images/default-modal-detail-land.png'
import { get, post_with_token,post, responseValidator } from "../../scripts/api";
import { toast } from "react-toastify";
import TextArea from "../../utilities/components/textarea/textarea.index";
import {Button} from 'antd';
import static_profile from "../../assets/images/static.png";
import {authToken} from "../../scripts/storage";
import {useHistory} from "react-router-dom";

//

const Comments = (props) => {
    console.log("propsss", props.props)
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState(null);
    const history=useHistory();
    console.log("comm",comments)

    const getComments=()=>{
        if(props.props){
                get(APIPath.location.getComments+`?location=${props.props.id}`).then((data) => {
                    if (responseValidator(data.status) && data.data) {
                        setComments(data.data)
                    } else {
                        toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
                    }
                })
        ;}
    }

    useEffect(() => {
        getComments();
    }, [])

    const send=()=>{
        const form={
            "location":props.props.id,
            "body":message
        }
        if(message===null){
            toast.warn("لطفا نظر خود را وارد نمایید")
        }
        else{
            post(APIPath.location.addComment+`?token=${authToken.get()}`,form).then((data)=>{
                if (responseValidator(data.status) && data.data) {
                    toast.success("پیام شما با موفقیت ارسال شد.")
                    setMessage(null);
                    getComments()
                } else {
                    toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
                }
            })
        }
    }

    return (
        <div className="comments-page">
            {props.props!==null ?
            <div className="content">
                <div className="detail-land">
                    <div className="detail-img">
                        <img src={props.props.cover!==null ? props.props.cover : detailsDefaultCover} alt="details" />
                    </div>
                    <div className="detail-info">
                        {
                            props.props.title &&
                            <div className="info-title">
                                <p>{props.props.title}</p>
                            </div>
                        }
                        <div className="info">
                            {
                                props.props.category && 
                                <div className="info-category">
                                    <i className="material-icons-outlined">category</i>
                                    <p>{props.props.category}</p>
                                </div>
                            }
                            {
                                props.props.address && 
                                <div className="info-address">
                                    <i className="material-icons">place</i>
                                    <p>{props.props.address}</p>
                                </div>
                            }
                            {
                                props.props.description && <div className="info-description last-line">
                                    <i className="material-icons">description</i>
                                    <p>{props.props.description}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="add-comment">
                        <TextArea className="add-textarea" 
                            onChange={(e) => setMessage(e)} value={message}
                            label="تبادل نظر"
                            placeholder="در این قسمت، متن پیام خود را قرار دهید."/>
                            <Button className="send" onClick={()=>send()}>ارسال</Button>                           
                </div>
                {
                    comments.length!==0 ?
                    <div className="comments">
                    <div className="comments-title">
                        <p className="title">دیدگاه کاربران</p>
                        <i className="material-icons">message</i>
                        <p className="count">{comments.length}</p>
                    </div>
                    <div className="comment">
                        {
                            comments &&
                            comments.map((comm)=>(
                                <div className="comm-card">
                                    <div className="comm-creator">
                                        <div className="creator-pro">
                                            <img src={comm.creator_profile_picture!==null ? "http://45.149.76.77:8000"+comm.creator_profile_picture : static_profile}/>
                                        </div>
                                        <div className="creator-info">
                                            <p>{comm.creator_username}</p>
                                        </div>
                                    </div>
                                    <div className="comm-body">
                                        <p>{comm.body}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                :<p className="no-comm">هیچ دیدگاهی ثبت نشده است</p>
                }
            </div>
            : history.push("/dashboard/map")}
        </div>
    )

}

const mapStateToProps = (state) => ({
    props: state.modalDetails.props,
});
const connector = connect(mapStateToProps,);
export default connector(Comments);