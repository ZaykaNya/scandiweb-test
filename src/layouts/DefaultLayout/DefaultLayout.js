import "./DefaultLayout.css";
import React from "react";
import Header from "../../components/Header/Header";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";
import CartPage from "../../pages/CartPage/CartPage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import {Query, Field, InlineFragment, client} from '@tilework/opus';

class DefaultLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="default-container">
                <div className="default-content">
                    <Header/>
                    <CategoryPage/>
                    {/*<ProductPage/>*/}
                    {/*<CartPage/>*/}
                </div>
            </div>
        );
    }
}

export default DefaultLayout;