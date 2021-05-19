import React, {useState, useEffect} from "react";
import './myLandscapes.style.scss'
import cover from '../../assets/images/add-landscapes-default.png';
import {APIPath, RoutePath} from "../../data";
import {get, responseValidator} from "../../scripts/api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import noData from "../../assets/images/undraw_not_found_60pq.svg"


const MyLandscapes = () => {

    const [landscapes, setLandscapes] = useState(null);
    const [check, setCheck] = useState(true)

    useEffect(() => {
        get(APIPath.map.myLandscapes).then((data) => {
            if (responseValidator(data.status) && data.data) {
                console.log(data.data)
                setLandscapes(data.data)
            } else {
                toast.error("مجددا تلاش کنید.");
            }
        });
    }, [])

    return (
        <div className='my-landscape-page'>
            {
                landscapes ?
                    landscapes.map((item) => (
                        <div className="landscapes-card">
                            <div className="cover-div">
                                <img alt='cover-landscapes' className="cover"
                                     src={item.image[0] ? item.image[0] : cover}/>
                            </div>
                            <div className='content'>
                                <p className="name">{item.name}</p>
                                <p className="address">{item.address}</p>
                                <p className={check ? "description" : "description-no"}>{item.description}</p>
                            </div>
                        </div>
                    )) : <div className="no-data">
                        <img src={noData} alt="no-data"/>
                        <p>!متاسفانه مکان ثبت شده ای نداری</p>
                        <Link className="to-add-landscape" to={RoutePath.dashboard.addLandscapes}>مکان خودتو ثبت کن</Link>
                    </div>
            }
        </div>
    )
}

export default MyLandscapes;