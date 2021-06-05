import React, {useState, useEffect} from "react";
import './driverTravels.style.scss'
import cover from '../../assets/images/add-landscapes-default.png';
import {APIPath, RoutePath} from "../../data";
import {get, responseValidator} from "../../scripts/api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import noData from "../../assets/images/undraw_not_found_60pq.svg"
import {connect} from "react-redux";
import * as Actions from "../../redux/driverTravels/actions"
import DriverModal from "../DriverModal/drivermodal.index";


const DriverTravels = (props) => {

    const [travels, setTravels] = useState(null);
    const [check, setCheck] = useState(true);

    useEffect(() => {
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
                            <p className="source">از {item.source}</p>
                            <p className="destination">به {item.destination}</p>
                            <p className="traveler">تعداد مسافر: {item.fellow_traveler_num}</p>
                            <p className="cities">{item.cities.join()}</p>
                            {item.creator_gender == "f" ? <p className="gender">زن</p> :
                                <p className="gender">مرد</p>}
                            <p className={check ? "description" : "description-no"}>{item.description}</p>
                            <i onClick={() => set(item)} className="material-icons icon">thumb_down_alt</i>
                        </div>
                    </div>
                ))
            }
            <div className="grid"/>
            <div className="grid"/>
            <div className="grid"/>
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
        setCheck:() => dispatch({type: Actions.CHECK}),
        setItem:(item) => dispatch({type: Actions.ITEM, item: item}),
        setDriverModal: () => dispatch({type: Actions.DRIVERMODALSHOW}),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(DriverTravels);