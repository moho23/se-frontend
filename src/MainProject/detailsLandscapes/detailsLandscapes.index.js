import React, {useRef, useState} from 'react';
import './detailsLandscapes.style.scss';
import detailsDefaultCover from '../../assets/images/landscape-details-default.png'
import useOnBlur from "../../scripts/useOnBlur";

function Details() {
    const [sidebar, setSidebar] = useState(false);
    const detailsRef = useRef();
    useOnBlur(detailsRef, () => setSidebar(!sidebar))
    const showSidebar = () => setSidebar(!sidebar);

    if (sidebar === false) {
        return (
            <div>
                <button onClick={showSidebar}>salam</button>
            </div>
        )
    }

    return (
        <div className={sidebar ? 'details-main-page is_open' : 'details-main-page'} ref={detailsRef}>
            <div className="detail-items" onClick={showSidebar}>
                <div className='toggle-button'>
                    <i onClick={() => setSidebar(!sidebar)} className="material-icons-outlined">close</i>
                </div>
                <img src={detailsDefaultCover} alt="landscape-details"/>
                <div className="info">
                    <div className="info-item">
                        <i className="material-icons-outlined">title</i>
                        <p>رستوران مسلم</p>
                    </div>
                    <div className="info-item">
                        <i className="material-icons-outlined">category</i>
                        <p>گردشگری</p>
                    </div>
                    <div className="info-item last-line">
                        <i className="material-icons-outlined">description</i>
                        <p>
                            کوروش دوم، کوروش بزرگ یا کوروش کبیر، که کورش هم نوشته می‌شود، همچنین سیروس و کورُس (برگردان آن از تلفظ‌های اروپایی)، بنیان‌گذار و نخستین شاه شاهنشاهی هخامنشی بود که به مدت سی سال، در بین سال‌های ۵۵۹ تا ۵۲۹ پیش از میلاد، بر نواحی گسترده‌ای از آسیا حکومت می‌کرد. کوروش در استوانهٔ خود که در بابل کشف شده، خودش را «فرزند کمبوجیه، شاه بزرگ انشان، نوادهٔ کوروش، شاه بزرگ انشان، نوادهٔ چیش‌پیش، شاه بزرگ انشان، از خانواده‌ای که همیشه پادشاه بوده‌است».
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
