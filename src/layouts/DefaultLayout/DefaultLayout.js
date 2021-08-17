import "./DefaultLayout.css";
import React from "react";
import Header from "../../components/Header/Header";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";
import CartPage from "../../pages/CartPage/CartPage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import {Query, client} from '@tilework/opus';
import {AuthProvider} from "../../context/AuthProvider";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class DefaultLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: "",
            index: 0,
            currencyIndex: 0,
            currentProduct: {},
            total: 0,
            order: {},
            handleChangeCategory: (category, i) => this.handleChangeCategory(category, i),
            handleChangeCurrency: currencyIndex => this.handleChangeCurrency(currencyIndex),
            handleChangeTotal: price => this.handleChangeTotal(price),
            handleChangeCurrentProduct: product => this.handleChangeCurrentProduct(product),
            handleChangeIndex: i => this.handleChangeIndex(i),
            handleChangeOrder: (product, index) => this.handleChangeOrder(product, index),
            handleMakeOrder: () => this.handleMakeOrder(),
        }
    }

    componentDidMount() {
        if (document.URL.split("/").slice(-1).join("") === "tech") {
            this.handleChangeIndex(1);
        }
        this.request().then(response => {
            this.setState(prev => ({
                ...prev,
                categories: response.categories[this.state.index].name,
                index: this.state.index
            }))
        });
    }

    handleChangeIndex(i) {
        this.setState(prev => ({
            ...prev,
            index: i
        }))
    }

    handleChangeCurrentProduct(product) {
        this.setState(prev => ({
            ...prev,
            currentProduct: product
        }))
    }

    handleChangeCategory(category, i) {
        this.setState(prev => ({
            ...prev,
            categories: category,
            index: i,
        }))
    }

    handleChangeCurrency(currencyIndex) {
        this.setState(prev => ({
            ...prev,
            currencyIndex: currencyIndex,
        }));

        if (Object.keys(this.state.order).length > 0) {
            this.handleChangeOrder({}, 0, true, currencyIndex)
        }
    }

    // order: {
    //     products: [{
    //         product: {},
    //         attributes: [],
    //         amount: 1,
    //     }],
    //     total: 0,
    // },

    handleChangeOrder(product, index = 0, countTotal = false, currencyIndex = this.state.currencyIndex) {
        let order = {...this.state.order};

        if (!countTotal) {
            if (this.state.order.products) {
                if (product.amount <= 0) {
                    let orderProducts = [...this.state.order.products];
                    orderProducts.splice(index, 1);
                    order = {
                        products: [...orderProducts],
                        total: 0
                    }
                } else if (this.state.order.products.filter(orderProduct => orderProduct.product.id === product.product.id).length > 0) {
                    let orderProducts = [...this.state.order.products];
                    orderProducts.splice(index, 1, product);
                    order = {
                        products: [...orderProducts],
                        total: 0
                    }
                } else {
                    order = {
                        products: [...order.products, {
                            ...product
                        }],
                        total: 0
                    }
                }
            } else {
                order = {
                    products: [{...product}],
                    total: 0,
                }
            }
        }

        let total = 0;
        order.products.forEach(product => {
            total += product.amount * product.product.prices[currencyIndex].amount;
        });

        order.total = total.toFixed(2);

        // console.log(order);

        this.setState(prev => ({
            ...prev,
            order: {...order}
        }));

    }

    handleMakeOrder() {
        console.log(`You bought, ${this.state.order.products.length} items`);
        console.log(this.state.order);
    }

    handleChangeTotal(price) {
        this.setState(prev => ({
            ...prev,
            total: this.state.total + price
        }))
    }

    async request() {
        client.setEndpoint("http://localhost:4000/");

        const categoriesQuery = new Query("categories", true)
            .addField("name");

        return await client.post(categoriesQuery);
    }

    render() {
        return (
            <div className="default-container">
                <div className="default-content">
                    <Router>
                        <AuthProvider value={this.state}>
                            <Header/>
                            <Switch>
                                <Route path="/categories/:category/:id">
                                    <ProductPage/>
                                </Route>
                                <Route path="/categories/:category">
                                    <CategoryPage/>
                                </Route>
                                <Route path="/cart">
                                    <CartPage/>
                                </Route>
                                <Route path="/">
                                    <CategoryPage/>
                                </Route>
                            </Switch>
                        </AuthProvider>
                    </Router>
                </div>
            </div>
        );
    }
}

export default DefaultLayout;