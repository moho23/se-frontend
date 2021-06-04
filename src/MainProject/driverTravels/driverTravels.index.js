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


const DriverTravels = () => {

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

    return (
        <div className='my-travels-page'>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setItem:(item) => dispatch({type: Actions.ITEM, item: item}),
    }
}

const connector = connect(null, mapDispatchToProps);
export default connector(DriverTravels);