import React, { useState, useEffect, useRef } from "react";
import './driverTravels.style.scss'
import cover from '../../assets/images/add-landscapes-default.png';
import { APIPath } from "../../data";
import { get, responseValidator, del } from "../../scripts/api";
import { toast } from "react-toastify";
import noData from "../../assets/images/undraw_off_road_9oae.svg"
import { connect } from "react-redux";
import * as Actions from "../../redux/driverTravels/actions"
import DriverModal from "../DriverModal/drivermodal.index";
import { Button, Modal, Tooltip } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const DriverTravels = (props) => {

    const [travels, setTravels] = useState(null);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const [disabled, setDisabled] = useState(true);
    const draggleRef = useRef();
    const [id, setID] = useState(null)
    const [page, setPage] = useState(1);
    const [next, setNext] = useState(false);


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

    useEffect(() => {
        props.setDriverModal(false)
        console.log("useEffect")
        props.setIsUpdate(false)
        get(APIPath.hichhike.driverTravels + "?page=" + page).then((data) => {
            if (responseValidator(data.status) && data.data) {
                if (data.data.has_next) {
                    setNext(true);
                    setPage(page + 1);
                }
                console.log(data.data.data)
                setTravels(data.data.data);
            }
            else {
                toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
            }
        });
        console.log("props.driverModalShow", props.driverModalShow)
    }, [])

    const [visible, setVisible] = React.useState(false);

    const showModal = (id) => {
        setVisible(true);
        setID(id)
    };

    const handleOk = () => {
        setVisible(false);
        del(APIPath.hichhike.driverTravels + "?hichhike_id=" + id).then((data) => {
            if (responseValidator(data.status) && data.data == "hichhike deleted") {
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

    function fetchMoreData() {
        let tempArray = [];
        get(APIPath.hichhike.driverTravels + "?page=" + page).then((data) => {
            if (responseValidator(data.status) && data.data) {
                if (data.data.has_next) {
                    setNext(true);
                    setPage(page + 1);
                }
                else {
                    setNext(false);
                }
                tempArray = travels.concat(data.data.data);
                setTravels(tempArray)
            }
            else {
                toast.error("سیستم با خطا مواجه شد، مجددا تلاش کنید");
            }
        }, []);
    }

    const set = (item) => {
        console.log("itemset")
        props.setIsUpdate(true)
        props.setItem(item)
        props.setDriverModal(true)
    }


    return (
        <div className="page">
            {travels == null || travels.length === 0 ?
                travels && travels.length === 0 &&
                <div className="no-data">
                    <img src={noData} alt="no-data" />
                    <p>!متاسفانه سفر ثبت شده ای نداری</p>
                </div>
                :
                <InfiniteScroll
                    dataLength={6}
                    next={() => fetchMoreData()}
                    hasMore={next}
                    loader={<h4>Loading...</h4>}
                    height={600}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            {/* <b>Yay! You have seen it all</b> */}
                        </p>
                    }
                >
                    <div data-testid="test" className='my-travels-page'>
                        {props.driverModalShow ? <DriverModal /> : null}
                        {
                            travels &&
                            travels.map((item) => (
                                <div className="travels-card">
                                    <div className="cover-div">
                                        <img alt='cover-travels' className="cover"
                                            src={item.creator_profile_picture ? item.creator_profile_picture : cover} />
                                        <p className={`${isPersianOrEnglish(item.creator_username) === false ? 'username' : 'username is-english'}`}>@{item.creator_username && item.creator_username.length > 12 ? item.creator_username.substring(0, 13) + '...' : item.creator_username}</p>
                                    </div>
                                    <div className='content'>
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
                                        <span />
                                        <span />
                                        <div className="end-line-button">
                                            <p onClick={() => set(item)} className="edit">ویرایش</p>
                                            <p className="delete" onClick={() => showModal(item.id)}>حذف</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="my-grid" />
                        <div className="my-grid" />
                        {/* <p></p> */}

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
                            footer={<div style={{ display: "flex", width: "100%" }}>
                                <Button
                                    onClick={handleOk}
                                    style={{
                                        display: "flex",
                                        outline: "none",
                                        border: "1px solid green",
                                        color: "green",
                                        borderRadius: "5px",
                                        fontWeight: 500
                                    }}>تایید</Button>
                                <Button
                                    onClick={handleCancel}
                                    style={{
                                        display: "flex",
                                        outline: "none",
                                        border: "none",
                                        backgroundColor: "#F05454",
                                        color: "#ffffff",
                                        fontWeight: 500,
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

                    </div>
                </InfiniteScroll>
            }
        </div>

    )
}

const mapStateToProps = (state) => ({
    driverModalShow: state.driverTravels.driverModalShow,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setIsUpdate: (isupdate) => dispatch({ type: Actions.ISUPDATE, isupdate: isupdate }),
        setItem: (item) => dispatch({ type: Actions.ITEM, item: item }),
        setDriverModal: (isopen) => dispatch({ type: Actions.DRIVERMODALSHOW, isopen: isopen }),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(DriverTravels);