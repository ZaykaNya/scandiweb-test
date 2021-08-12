import "./Header.css";
import React from 'react';

class Header extends React.Component {


    render() {
        return (
            <div className="header-container">
                <div className="header-nav">
                    <a href="#" className="header-category">WOMEN</a>
                    <a href="#" className="header-category">MEN</a>
                    <a href="#" className="header-category">KIDS</a>
                </div>
                <div className="header-logo">

                </div>
                <div className="header-icons">

                </div>
            </div>
        );
    }
}

export default Header;



