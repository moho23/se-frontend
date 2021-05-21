import React, {useState, useEffect} from "react";
import './driverTravels.style.scss'
import cover from '../../assets/images/add-landscapes-default.png';
import {APIPath, RoutePath} from "../../data";
import {get, responseValidator} from "../../scripts/api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import noData from "../../assets/images/undraw_not_found_60pq.svg"


const DriverTravels = () => {

    const [travels, setTravels] = useState(null);
    const [check, setCheck] = useState(true);
    

    useEffect(() => {
        get(APIPath.hichhike.driverTravels).then((data) => {
            console.log("1",data)
            if (responseValidator(data.status) && data.data) {
                console.log("2",data.data)
                setTravels(data.data)
            } else {
                toast.error("مجددا تلاش کنید.");
            }
        });
    }, [])
    
    return (
        <div className='my-travels-page'>
            {
                travels ?
                    travels.map((item) => (
                        <div className="travels-card">
                            <div className="cover-div">
                                <img alt='cover-travels' className="cover"
                                     src={item.creator_profile_picture ? item.creator_profile_picture : cover}/>
                            </div>
                            
                            <div className='content'>
                                <p className="source">{item.source}</p>
                                
                                <p className="destination">{item.destination}</p>
                                <p className="traveler">تعداد مسافر: {item.fellow_traveler_num}</p>
                                <p className="cities">{item.cities.join()}</p>
                                {item.creator_gender == "f" ? <p className="gender">خانم</p> : <p className="gender">آقا</p>}
                                <p className={check ? "description" : "description-no"}>{item.description}</p>
                            </div>
                            
                        </div>
                    )) : <div className="no-data">
                        <img src={noData} alt="no-data"/>
                        <p>!متاسفانه سفر ثبت شده ای نداری</p>
                        {/* <Link className="to-add-travels" to={RoutePath.dashboard.index}>سفر خودتو ثبت کن</Link> */}
                    </div>
            }
        </div>
    )
}

export default DriverTravels;