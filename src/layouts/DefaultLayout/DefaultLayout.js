import "./DefaultLayout.css";
import React from "react";
import Header from "../../components/Header/Header";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";
import CartPage from "../../pages/CartPage/CartPage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import {Query, client} from '@tilework/opus';
import {AuthProvider} from "../../context/AuthProvider";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class DefaultLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: "",
            index: 0,
            currencyIndex: 0,
            cartProducts: [],
            total: 0,
            order: {
                products: [{
                    product: {},
                    amount: 1,
                }],
                total: 0,
            },
            handleChangeCategory: (category, i) => this.handleChangeCategory(category, i),
            handleChangeCurrency: currencyIndex => this.handleChangeCurrency(currencyIndex),
            handleAddToCart: product => this.handleAddToCart(product),
            handleChangeTotal: price => this.handleChangeTotal(price),
        }
    }

    componentDidMount() {
        this.request().then(response => {
            this.setState(prev => ({
                ...prev,
                categories: response.categories[0].name,
                index: 0
            }))
        });
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
        console.log(cartProducts);
        this.setState(prev => ({
            ...prev,
            cartProducts: cartProducts
        }))
    }

    handleChangeOrder(product, amount) {
        let order = {...this.state.order};
        let total = this.state.total;
        let newProduct = [{
            product: {...product},
            amount: amount
        }]
        order = {
            ...order,
            products: order.products.push(newProduct),
            total: total
        }
        this.setState(prev => ({
            ...prev,
            order: order
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
                            <Header
                                category={this.state.categories}
                                cartProducts={this.state.cartProducts}
                                index={this.state.currencyIndex}
                                total={this.state.total}
                                changeCategory={(category, i) => this.handleChangeCategory(category, i)}
                                changeCurrency={(currencyIndex) => this.handleChangeCurrency(currencyIndex)}
                                changeOrder={(product, amount) => this.handleChangeOrder(product, amount)}
                            />
                            <Switch>
                                <Route path="/categories/:category/:id">
                                    <ProductPage

                                    />
                                </Route>
                                <Route path="/categories/:category">
                                    <CategoryPage
                                        currencyIndex={this.state.currencyIndex}
                                        index={this.state.index}
                                        addToCart={(product) => this.handleAddToCart(product)}
                                        changeTotal={(price) => this.handleChangeTotal(price)}
                                    />
                                </Route>
                                <Route path="/cart">
                                    <CartPage/>
                                </Route>
                                <Route path="/">
                                    <CategoryPage
                                        currencyIndex={this.state.currencyIndex}
                                        index={this.state.index}
                                        addToCart={(product) => this.handleAddToCart(product)}
                                        changeTotal={(price) => this.handleChangeTotal(price)}
                                    />
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