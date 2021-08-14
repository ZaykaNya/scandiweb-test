import "./Header.css";
import React from 'react';
import brandIcon from "../../images/brandIcon.svg";
import cartIcon from "../../images/cart.svg";
import priceIcon from "../../images/price.svg";
import {client, Field, Query} from "@tilework/opus";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {categories: [], currencyOpen: false, cartOpen: false}
    }

    componentDidMount() {
        this.request().then(response => {
            console.log(response)
            this.setState(prev => ({
                ...prev,
                categories: response.categories,
            }))
        });
    }

    async request() {
        client.setEndpoint("http://localhost:4000/");

        const categoriesQuery = new Query("categories", true)
            .addField("name")

        return await client.post(categoriesQuery);
    }

    handleOpenCart() {
        this.setState(prev => ({
            ...prev,
            cartOpen: true,
        }))
    }

    handleOpenCurrency() {
        this.setState(prev => ({
            ...prev,
            currencyOpen: true,
        }))
    }

    render() {
        return (
            <div className="header-container">
                <div className="header-nav">
                    {this.state.categories && this.state.categories.map((category, key) => {
                        return (
                            <a key={key} href="#" className="header-category">
                                {category.name.toUpperCase()}
                            </a>
                        );
                    })}
                    {/*<a href="#" className="header-category">WOMEN</a>*/}
                    {/*<a href="#" className="header-category">MEN</a>*/}
                    {/*<a href="#" className="header-category">KIDS</a>*/}
                </div>
                <div className="header-logo">
                    <a href="">
                        <img alt="" src={brandIcon}/>
                    </a>
                </div>
                <div className="header-icons">
                    <button onClick={() => this.handleOpenCurrency()} className="header-button">
                        <img alt="" src={priceIcon}/>
                    </button>
                    <button onClick={() => this.handleOpenCart()} className="header-button">
                        <img alt="" src={cartIcon}/>
                    </button>
                </div>
            </div>
        );
    }
}

export default Header;



