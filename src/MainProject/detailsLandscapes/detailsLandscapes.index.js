import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './detailsLandscapes.style.scss';

function Details() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div>
                <button className="test" onClick={showSidebar}>negar</button>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <div className="img">
                            <div className='navbar-toggle'>
                                <Link to='#' className='menu-bars'>
                                    <span class="material-icons-outlined">
                                        close
                                    </span>
                                </Link>
                            </div>
                            <img src="https://chicagobuzzmarketing.com/wp-content/uploads/2017/06/skyline-dark2.png" />
                        </div>
                        <div className="info">
                            <div className="title">
                                <i class="material-icons-outlined">title</i>
                                <p>Title</p>
                            </div>
                            <div className="category">
                                <span class="material-icons-outlined">category</span>
                                <p>cotegory</p>
                            </div>
                            <div className="description">
                                <span class="material-icons-outlined">description</span>
                                <p>description</p>
                            </div>
                        </div>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Details;
