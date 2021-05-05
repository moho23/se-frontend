import React, {useState, useEffect} from "react";
import './myLandscapes.style.scss'
import cover from '../../assets/images/landscape-details-default.png';
import {APIPath} from "../../data";
import {get, responseValidator} from "../../scripts/api";
import {toast} from "react-toastify";
// import Button from "../../utilities/components/button/button.index";


const MyLandscapes = () => {

    const [landscapes, setLandscapes] = useState(null);
    const [check,setCheck]=useState(true)
    
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
            {/*{*/}
            {/*    landscapes !== null &&*/}
            {/*    <div className="landscapes-card">*/}
            {/*        <div className="cover-div">*/}
            {/*            <img alt='cover-landscapes' className="cover" src={cover}/>*/}
            {/*        </div>*/}
            {/*        <div className='content'>*/}
            {/*            <p className="name">نام مکان</p>*/}
            {/*            <p className="address">آدرس این مکان</p>*/}
            {/*            <p className="description">توضیحات تکمیلی در مورد این موضوعتوضیحات تکمیلی در مورد این*/}
            {/*                موضوعتوضیحات تکمیلی در مورد این موضوعتوضیحات تکمیلی در مورد این موضوعتوضیحات تکمیلی در مورد*/}
            {/*                این موضوعتوضیحات تکمیلی در مورد این موضوعتوضیحات تکمیلی در مورد این موضوعتوضیحات تکمیلی در*/}
            {/*                مورد این موضوعتوضیحات تکمیلی در مورد این موضوعتوضیحات تکمیلی در مورد این موضوعتوضیحات تکمیلی*/}
            {/*                در مورد این موضوعتوضیحات تکمیلی در مورد این موضوع</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*}*/}
            {
                landscapes ?
                    landscapes.map((item) => (
                        <div className="landscapes-card">
                            <div className="cover-div">
                                <img alt='cover-landscapes' className="cover"
                                     src={item.loc_picture ? item.loc_picture : cover}/>
                            </div>
                            <div className='content'>
                                <p className="name">{item.loc_name}</p>
                                <p className="address">{item.address}</p>
                                <p className={check? "description" : "description-no"}>{item.description}</p>
                                {/* <Button className='btn' text='اطلاعات بیشتر' onClick={setCheck}/> */}
                            </div>
                        </div>
                    )) : <p className="no-data">مکان ثبت شده ای وجود ندارد‌!</p>
            }
        </div>
    )
}

export default MyLandscapes;