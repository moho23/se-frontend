import React, {useRef, useState} from 'react';
import './detailsLandscapes.style.scss';
import detailsDefaultCover from '../../assets/images/landscape-details-default.png'
import useOnBlur from "../../scripts/useOnBlur";

function Details(props) {
    const [sidebar, setSidebar] = useState(true);
    const detailsRef = useRef();
    useOnBlur(detailsRef, () => {
        if (!sidebar) {
            setSidebar(true)
        }
    })
    const showSidebar = () => setSidebar(!sidebar);

    // if (sidebar === false) {
    //     return null;
    // } else {
    return (
        <div className={sidebar ? 'details-main-page is-open' : 'details-main-page'} ref={detailsRef}>
            <div className="detail-items" onClick={showSidebar}>
                <div className='toggle-button'>
                    <i onClick={() => setSidebar(!sidebar)} className="material-icons-outlined">close</i>
                </div>
                <img src={props.cover ? props.cover : detailsDefaultCover} alt="landscape-details"/>
                <div className="info">
                    <div className="info-item">
                        <i className="material-icons-outlined">title</i>
                        <p>{props.title}</p>
                    </div>
                    <div className="info-item">
                        <i className="material-icons-outlined">category</i>
                        <p>{props.category}</p>
                    </div>
                    <div className="info-item last-line">
                        <i className="material-icons-outlined">description</i>
                        <p>{props.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
    // }
}

export default Details;
