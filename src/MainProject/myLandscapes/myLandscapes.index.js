import React from "react"
import './myLandscapes.style.scss'
import Button from "../../utilities/components/button/button.index";
import { Link } from 'react-router-dom'

const myLandscapes=(props)=>{
    function landescapeHandeler(){
        //window.location = '/dashboard/map';
    }

    return(
        <div className='card'>
        <div className='card-container'>
            <div className='image-container'>
                <img src='https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/12/25/945556-two-penguins-comforting-each-other-viral-picture.jpg'/>
            </div>
            <div className='card-content'>
            <div className='card-title'>
                <h3>خانه</h3>
            </div>
            <div className="card-body">
                <p>آدرس محله دیدنی در سعادت آباد تهران در محله عمو اینا</p>
            </div>
            </div>
                <Button className='btn' text='اطلاعات بیشتر' onClick={landescapeHandeler}/>
        </div>
        </div>
        
    )
}

export default myLandscapes;