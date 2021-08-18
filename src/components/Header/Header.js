import "./Header.css";
import React from 'react';
import brandIcon from "../../images/brandIcon.svg";
import cartIcon from "../../images/cart.svg";
import priceIcon from "../../images/price.svg";
import {client, Field, Query} from "@tilework/opus";
import CartProduct from "../CartProduct/CartProduct";
import AuthContext from "../../context/AuthProvider";
import {Link} from "react-router-dom";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            currencies: [],
            currencyOpen: false,
            cartOpen: false,
            total: 0,
        }
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.request().then(response => {
            this.setState(prev => ({
                ...prev,
                categories: response.categories,
                currencies: response.categories[0].products[0].prices,
            }))
        });

    }

    request() {
        client.setEndpoint("http://localhost:4000/");

        const categoriesQuery = new Query("categories", true)
            .addField("name")
            .addField(new Field("products", true)
                .addField(new Field("prices", true)
                    .addField("currency")
                )
            )

        return client.post(categoriesQuery);
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
        // this.handleGetPrice(this.context.total)

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

    handleCloseCartAndCurrency() {
        this.setState(prev => ({
            ...prev,
            cartOpen: false,
            currencyOpen: false,
        }))
        document.body.style.overflow = "visible";
    }

    handleChangeCurrency(currencyIndex) {
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
        this.context.handleChangeCurrency(currencyIndex);
    }

    handleGetPrice(price) {
        this.setState(prev => ({
            ...prev,
            total: this.state.total + price
        }))
    }

    handleChangeCategory(name, index) {
        this.handleCloseCartAndCurrency()
        this.context.handleChangeCategory(name, index)
    }

    render() {
        return (
            <React.Fragment>
                <div className="header-container">
                    <div className="header-nav">
                        {this.state.categories && this.state.categories.map((category, key) => {
                            return (
                                <Link
                                    to={`/categories/${category.name}`}
                                    key={key}
                                    className={(document.URL.split("/").slice(-1).join("") === category.name
                                        || document.URL.split("/").slice(-2, -1).join("") === category.name)
                                        ? "header-category header-category-active" : "header-category"}
                                    onClick={() => this.handleChangeCategory(category.name, key)}
                                >
                                    {category.name.toUpperCase()}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="header-logo">
                        <div>
                            <img alt="" src={brandIcon}/>
                        </div>
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
                            {this.context.order.products && this.context.order.products.length > 0 &&
                            <span className="cart-number-items">, {this.context.order.products.length} item</span>
                            }
                            {this.context.order.products && this.context.order.products.length > 1 &&
                            <span className="cart-number-items">s</span>
                            }
                        </div>
                        {this.context.order.products && this.context.order.products.map((cartProduct, key) => {
                            return (
                                <CartProduct
                                    key={key}
                                    cartIndex={key}
                                    index={this.context.currencyIndex}
                                    cartProduct={cartProduct.product}
                                    amount={cartProduct.amount}
                                    orderProduct={cartProduct}
                                    getPrice={(price) => this.handleGetPrice(price)}
                                    modal={true}
                                />
                            )
                        })}
                        <div className="cart-total-price">
                            <p className="cart-total-price-title">Total</p>
                            <p className="cart-total-price-amount">{this.context.currencyIcon} {this.context.order.total}</p>
                        </div>
                        <div className="cart-buttons-container">
                            <Link onClick={() => this.handleCloseCartAndCurrency()} className="button-view-bag"
                                  to={`/cart`}
                            >
                                VIEW BAG
                            </Link>
                            <button
                                className="button-check-out"
                                onClick={() => this.context.handleMakeOrder()}
                            >
                                CHECK OUT
                            </button>
                        </div>
                    </div>
                    }
                    {this.state.currencyOpen &&
                    <div id="header-currency">
                        <div className="header-currency-container">
                            {this.state.currencies.map((currency, key) => {
                                let currencies = ["$", "£", "A$", "¥", "₽"]
                                return (
                                    <button
                                        className="header-currency-button"
                                        key={key}
                                        onClick={() => this.handleChangeCurrency(key)}
                                    >
                                        {currencies[key]} {currency.currency}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    }
                </div>
                {this.state.cartOpen &&
                <div className="header-cart-container"/>
                }
            </React.Fragment>
        );
    }

}

export default Header;



