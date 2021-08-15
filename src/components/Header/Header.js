import "./Header.css";
import React from 'react';
import brandIcon from "../../images/brandIcon.svg";
import cartIcon from "../../images/cart.svg";
import priceIcon from "../../images/price.svg";
import {client, Field, Query} from "@tilework/opus";
import CartProduct from "../CartProduct/CartProduct";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {categories: [], currencies: [], currencyOpen: false, cartOpen: false}
    }

    componentDidMount() {
        this.request().then(response => {
            console.log(response)
            this.setState(prev => ({
                ...prev,
                categories: response.categories,
                currencies: response.categories[0].products[0].prices
            }))
        });
    }

    async request() {
        client.setEndpoint("http://localhost:4000/");

        const categoriesQuery = new Query("categories", true)
            .addField("name")
            .addField(new Field("products", true)
                .addField(new Field("prices", true)
                    .addField("currency")
                )
            )

        return await client.post(categoriesQuery);
    }

    handleOpenCart() {
        this.setState(prev => ({
            ...prev,
            cartOpen: !prev.cartOpen,
            currencyOpen: false,
        }))
        if (!this.state.cartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }

    handleOpenCurrency() {
        this.setState(prev => ({
            ...prev,
            currencyOpen: !prev.currencyOpen,
            cartOpen: false,
        }))
        if (!this.state.currencyOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="header-container">
                    <div className="header-nav">
                        {this.state.categories && this.state.categories.map((category, key) => {
                            return (
                                <a key={key} href="#" className="header-category">
                                    {category.name.toUpperCase()}
                                </a>
                            );
                        })}
                    </div>
                    <div className="header-logo">
                        <a href="">
                            <img alt="" src={brandIcon}/>
                        </a>
                    </div>
                    <div className="header-icons">
                        <button id="btn1" onClick={() => this.handleOpenCurrency()} className="header-button">
                            <img alt="" src={priceIcon}/>
                        </button>
                        <button id="btn2" onClick={() => this.handleOpenCart()} className="header-button">
                            <img alt="" src={cartIcon}/>
                        </button>
                    </div>
                    {this.state.cartOpen &&
                    <div id="header-cart">
                        <div className="cart-title-container">
                            <span className="cart-title">My Bag</span>
                            <span className="cart-number-items">, 2 items</span>
                        </div>
                        <CartProduct modal={true} />
                        <CartProduct modal={true} />
                        <div className="cart-total-price">
                            <p className="cart-total-price-title">Total</p>
                            <p className="cart-total-price-amount">$ 100.00</p>
                        </div>
                        <div className="cart-buttons-container">
                            <button className="button-view-bag">VIEW BAG</button>
                            <button className="button-check-out">CHECK OUT</button>
                        </div>
                    </div>
                    }
                    {this.state.currencyOpen &&
                    <div id="header-currency">
                        <div className="header-currency-container">
                            {this.state.currencies.map((currency, key) => {
                                return(
                                  <button className="header-currency-button" key={key}>$ {currency.currency}</button>
                                );
                            })}
                        </div>
                    </div>
                    }
                </div>
                {this.state.cartOpen &&
                <div className="header-cart-container">

                </div>
                }
            </React.Fragment>
        );
    }
}

export default Header;



