import "./Header.css";
import React from 'react';
import brandIcon from "../../images/brandIcon.svg";
import cartIcon from "../../images/cart.svg";
import priceIcon from "../../images/price.svg";

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
                    <a href="">
                        <img alt="" src={brandIcon}/>
                    </a>
                </div>
                <div className="header-icons">
                    <button>
                        <img alt="" src={priceIcon}/>
                    </button>
                    <button>
                        <img alt="" src={cartIcon}/>
                    </button>
                </div>
            </div>
        );
    }
}

export default Header;



