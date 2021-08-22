import "./DefaultLayout.css";
import React, {PureComponent} from "react";
import Header from "../../components/Header/Header";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";
import CartPage from "../../pages/CartPage/CartPage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import {Query, client} from '@tilework/opus';
import {AuthProvider} from "../../context/AuthProvider";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class DefaultLayout extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            categories: "",
            index: 0,
            currencyIndex: 0,
            currentProduct: {},
            total: 0,
            currencyIcon: "$",
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
        const {
            index
        } = this.state;

        let curI = index;

        if (document.URL.split("/").slice(-1).join("") === "tech" ||
            document.URL.split("/").slice(-2, -1).join("") === "tech"
        ) {
            this.handleChangeIndex(1);
            curI = 1;
        } else if (document.URL.split("/").slice(-1).join("") === "all" ||
            document.URL.split("/").slice(-2, -1).join("") === "all"
        ) {
            this.handleChangeIndex(2);
            curI = 2;
        }

        this.request().then(response => {
            const {
                categories
            } = response;
            if(curI >= 2) {
                this.setState(prev => ({
                    ...prev,
                    categories: "all",
                    index: curI
                }))
            } else {
                this.setState(prev => ({
                    ...prev,
                    categories: categories[curI].name,
                    index: curI
                }))
            }
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

        if (currencyIndex === 0) {
            this.setState(prev => ({
                ...prev,
                currencyIcon: "$"
            }));
        } else if (currencyIndex === 1) {
            this.setState(prev => ({
                ...prev,
                currencyIcon: "£"
            }));
        } else if (currencyIndex === 2) {
            this.setState(prev => ({
                ...prev,
                currencyIcon: "A$"
            }));
        } else if (currencyIndex === 3) {
            this.setState(prev => ({
                ...prev,
                currencyIcon: "¥"
            }));
        } else if (currencyIndex === 4) {
            this.setState(prev => ({
                ...prev,
                currencyIcon: "₽"
            }));
        }

        const {
            order
        } = this.state;

        if (Object.keys(order).length > 0) {
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
        const {
            order,
            order: {
                products
            }
        } = this.state;

        let newOrder = {...order};

        if (!countTotal) {
            if (products) {
                if (product.amount <= 0) {
                    const orderProducts = [...products];
                    orderProducts.splice(index, 1);
                    newOrder = {
                        products: [...orderProducts],
                        total: 0,
                        totalAmount: 0
                    }
                } else if (products.filter(orderProduct => orderProduct.product.id === product.product.id).length > 0) {
                    const orderProducts = [...products];
                    orderProducts.splice(index, 1, product);
                    newOrder = {
                        products: [...orderProducts],
                        total: 0,
                        totalAmount: 0
                    }
                } else {
                    newOrder = {
                        products: [...newOrder.products, {
                            ...product
                        }],
                        total: 0,
                        totalAmount: 0
                    }
                }
            } else {
                newOrder = {
                    products: [{...product}],
                    total: 0,
                    totalAmount: 0
                }
            }
        }

        let total = 0;
        let totalAmount = 0;
        newOrder.products.forEach(product => {
            total += product.amount * product.product.prices[currencyIndex].amount;
            totalAmount += product.amount;
        });

        newOrder.total = total.toFixed(2);
        newOrder.totalAmount = totalAmount;

        console.log(newOrder)

        this.setState(prev => ({
            ...prev,
            order: {...newOrder}
        }));

    }

    handleMakeOrder() {
        const {
            order,
            order: {
                products
            }
        } = this.state;

        if (products) {
            console.log(`You bought, ${products.length} items`);
            console.log(order);

            this.setState(prev => ({
                ...prev,
                order: {}
            }));
        }
    }

    handleChangeTotal(price) {
        const {
            total
        } = this.state;

        this.setState(prev => ({
            ...prev,
            total: total + price
        }))
    }

    request() {
        client.setEndpoint("http://localhost:4000/");

        const categoriesQuery = new Query("categories", true)
            .addField("name");

        return client.post(categoriesQuery);
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