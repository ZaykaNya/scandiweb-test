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
            cartProducts: [],
            currentProduct: {},
            total: 0,
            order: {},
            handleChangeCategory: (category, i) => this.handleChangeCategory(category, i),
            handleChangeCurrency: currencyIndex => this.handleChangeCurrency(currencyIndex),
            handleAddToCart: product => this.handleAddToCart(product),
            handleChangeTotal: price => this.handleChangeTotal(price),
            handleChangeCurrentProduct: product => this.handleChangeCurrentProduct(product),
            handleChangeIndex: i => this.handleChangeIndex(i),
            handleChangeOrder: (product, amount, attributes) => this.handleChangeOrder(product, amount, attributes),
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
        }))
    }

    handleAddToCart(product) {
        let cartProducts = [...this.state.cartProducts];
        cartProducts.push(product)
        this.setState(prev => ({
            ...prev,
            cartProducts: cartProducts
        }))
    }

    // order: {
    //     products: [{
    //         product: {},
    //         attributes: [],
    //         amount: 1,
    //     }],
    //     total: 0,
    // },
    handleChangeOrder(product) {
        let order = {...this.state.order};
        let total = this.state.total;

        if(this.state.order.products) {
            order = {
                products: [...order.products, {
                    ...product
                }],
                total: total
            }
        } else {
            order = {
                products: [{...product}],
                total: total,
            }
        }

        console.log(order);

        this.setState(prev => ({
            ...prev,
            order: {...order}
        }));

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