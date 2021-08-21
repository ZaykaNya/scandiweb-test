import "./Header.css";
import React from 'react';
import brandIcon from "../../images/brandIcon.svg";
import cartIcon from "../../images/cart.svg";
import open from "../../images/open.svg";
import {client, Field, Query} from "@tilework/opus";
import CartProduct from "../CartProduct/CartProduct";
import AuthContext from "../../context/AuthProvider";
import {Link} from "react-router-dom";
import {PureComponent} from "react/cjs/react.production.min";

class Header extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            currencies: [],
            allCurrencies: ["$", "£", "A$", "¥", "₽"],
            currencyOpen: false,
            cartOpen: false,
            total: 0,
        }
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.request().then(response => {
            const {
                categories,
            } = response;

            this.setState(prev => ({
                ...prev,
                categories: [...categories],
                currencies: [...categories[0].products[0].prices],
            }))
        });

        document.onclick = event => {
            if (event.target.id === "closeCart" || event.target.id === "closeCurrency") {
                this.handleCloseCartAndCurrency()
            }
        }
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
        const {
            cartOpen
        } = this.state;

        this.setState(prev => ({
            ...prev,
            cartOpen: !cartOpen,
            currencyOpen: false,
        }))
        if (!cartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }

    handleOpenCurrency() {
        const {
            currencyOpen
        } = this.state;

        this.setState(prev => ({
            ...prev,
            currencyOpen: !currencyOpen,
            cartOpen: false,
        }))
        if (!currencyOpen) {
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
        const {
            currencyOpen
        } = this.state;

        const {
            handleChangeCurrency
        } = this.context;

        this.setState(prev => ({
            ...prev,
            currencyOpen: !currencyOpen,
            cartOpen: false,
        }))
        if (!currencyOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }

        handleChangeCurrency(currencyIndex);
    }

    handleGetPrice(price) {
        this.setState(prev => ({
            ...prev,
            total: prev.total + price
        }))
    }

    handleChangeCategory(name, index) {
        const {
            handleChangeCategory
        } = this.context;

        this.handleCloseCartAndCurrency()
        handleChangeCategory(name, index)
    }

    renderCategory(category, key) {
        const {
            name
        } = category;

        // console.log(document.URL.split("/").slice(-1).join(""), name)
        // console.log(this.context.index)


        return (
            <Link
                to={`/categories/${name}`}
                key={key}
                className={
                    (document.URL.split("/").slice(-1).join("") === name
                        || document.URL.split("/").slice(-2, -1).join("") === name
                        || name === this.context.categories)
                        ? "header-category header-category-active" : "header-category"}
                onClick={() => this.handleChangeCategory(name, key)}
            >
                {name.toUpperCase()}
            </Link>
        );
    }

    renderCategories() {
        const {
            categories,
        } = this.state;

        if (categories) {
            return (
                <div className="header-nav">
                    {categories.map((category, key) => this.renderCategory(category, key))}
                </div>
            );
        }
    }

    renderNumberOfProducts() {
        const {
            order: {
                products,
            },
        } = this.context;

        if (products) {
            return (
                <React.Fragment>
                    {products.length > 0 &&
                    <span className="cart-number-items">, {this.context.order.products.length} item</span>
                    }
                    {products.length > 1 &&
                    <span className="cart-number-items">s</span>
                    }
                </React.Fragment>
            );
        }
    }

    renderCartProducts() {
        const {
            order: {
                products,
            },
            currencyIndex,
        } = this.context;

        if (products) {
            return (
                <React.Fragment>
                    {products.map((cartProduct, key) => {
                        const {
                            product,
                            amount
                        } = cartProduct;

                        return (
                            <CartProduct
                                key={key}
                                cartIndex={key}
                                index={currencyIndex}
                                cartProduct={product}
                                amount={amount}
                                orderProduct={cartProduct}
                                getPrice={(price) => this.handleGetPrice(price)}
                                modal={true}
                            />
                        )
                    })}
                </React.Fragment>
            );
        }

    }

    renderCartOpen() {
        const {
            cartOpen
        } = this.state;

        const {
            order: {
                total
            },
            currencyIcon,
            handleMakeOrder
        } = this.context;

        if (cartOpen) {
            return (
                <div id="header-cart">
                    <div className="cart-title-container">
                        <span className="cart-title">My Bag</span>
                        {this.renderNumberOfProducts()}
                    </div>
                    {this.renderCartProducts()}
                    <div className="cart-total-price">
                        <p className="cart-total-price-title">Total</p>
                        <p className="cart-total-price-amount">{currencyIcon} {total}</p>
                    </div>
                    <div className="cart-buttons-container">
                        <Link onClick={() => this.handleCloseCartAndCurrency()} className="button-view-bag"
                              to={`/cart`}
                        >
                            VIEW BAG
                        </Link>
                        <button
                            className="button-check-out"
                            onClick={() => handleMakeOrder()}
                        >
                            CHECK OUT
                        </button>
                    </div>
                </div>
            );
        }
    }

    renderTotalAmount() {
        const {
            order: {
                products,
                totalAmount
            },
        } = this.context;

        if (totalAmount && products.length > 0) {
            return (
                <div className="header-cart-amount">
                    {totalAmount}
                </div>
            );
        }
    }

    renderCurrency(currency, key) {
        const {
            allCurrencies
        } = this.state;
        return (
            <button
                className="header-currency-button"
                key={key}
                onClick={() => this.handleChangeCurrency(key)}
            >
                {allCurrencies[key]} {currency.currency}
            </button>
        );
    }

    renderCurrencies() {
        const {
            currencies,
        } = this.state;

        return (
            <div className="header-currency-container">
                {currencies.map((currency, key) => this.renderCurrency(currency, key))}
            </div>
        );
    }

    renderCurrencyOpen() {
        const {
            currencyOpen,
        } = this.state;

        if (currencyOpen) {
            return (
                <div id="header-currency">
                    {this.renderCurrencies()}
                </div>
            );
        }
    }

    renderOpenBackground() {
        const {
            cartOpen,
            currencyOpen
        } = this.state;

        if (cartOpen) {
            return (
                <div id="closeCart" className="header-cart-container"/>
            );
        }

        if (currencyOpen) {
            return (
                <div id="closeCurrency" className="header-cart-container-currency"/>
            );
        }
    }


    render() {
        const {
            allCurrencies
        } = this.state;

        const {
            currencyIndex
        } = this.context;
        return (
            <React.Fragment>
                <div className="header-container">
                    {this.renderCategories()}
                    <div className="header-logo">
                        <div>
                            <img alt="" src={brandIcon}/>
                        </div>
                    </div>
                    <div className="header-icons">
                        <button id="btn1" onClick={() => this.handleOpenCurrency()} className="header-button">
                            {allCurrencies[currencyIndex]}
                            <img className="header-currency-image" alt="" src={open}/>
                        </button>
                        <div className="header-cart-button-container">
                            <button id="btn2" onClick={() => this.handleOpenCart()} className="header-button">
                                {this.renderTotalAmount()}
                                <img alt="" src={cartIcon}/>
                            </button>
                        </div>
                    </div>
                    {this.renderCartOpen()}
                    {this.renderCurrencyOpen()}
                </div>
                {this.renderOpenBackground()}
            </React.Fragment>
        );
    }

}

export default Header;



