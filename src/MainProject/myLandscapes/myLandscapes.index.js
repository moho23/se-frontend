import React, { useState } from "react";
import './myLandscapes.style.scss'
import Button from "../../utilities/components/button/button.index";
import {get} from "../../scripts/api"
import { APIPath } from "../../data";
import { authToken } from '../scripts/storage';


const MyLandscapes = (props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddres] = useState("");
    const [check, setCheck] = useState(true)

    const showLoc = () => {
        let url = APIPath.map.myLandscapes
        return get(url, authToken).then((data) => {
            console.log("data", data)
        })
    }

    return (
        <>
            <div className='card'>
                <div className='card-container'>
                    {/* <div className='image-container'> */}
                    <img className="image-container" src='https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/12/25/945556-two-penguins-comforting-each-other-viral-picture.jpg' />
                    {/* </div> */}
                    <div className='card-content'>
                        <div className='card-title'>
                            <h3>خانه</h3>
                        </div>
                        <div className="card-addres">
                            <p>hi..i am addres</p>
                        </div>
                        <div className="card-body">
                            {
                                check ?
                                    <p className="txt-notcomplete">آدرس محله دیدنی در سعادت آباد تهران در محله عمو اینآدرس محله دیدنی در سعادت آباد تهران در محله عمو اینآدرس محله دیدنی ا</p> :
                                    <p className="txt-complete">آدرس محله دیدنی در سعادت آباد تهران در محله عمو اینآدرس محله دیدنی در سعادت آباد تهران در محله عمو اینآدرس محله دیدنی در سعادت آباد تهران در محله عمو اینآدرنتهران در محله عآدرنتهران در محله عآدرنتهران در محله عآدرنتهران در محله عآدرنتهران در محله عآدرنتهران در محله عمو اینا</p>
                            }
                        </div>
                        <div className="card-btn">
                            <Button className='btn' text='اطلاعات بیشتر' onClick={setCheck} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MyLandscapes;