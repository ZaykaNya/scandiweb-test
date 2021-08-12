import "./DefaultLayout.css";
import React from "react";
import Header from "../../components/Header/Header";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";
import CartPage from "../../pages/CartPage/CartPage";
import ProductPage from "../../pages/ProductPage/ProductPage";

class DefaultLayout extends React.Component {


    render() {
        return (
            <div className="default-container">
                <div className="default-content">
                    <Header/>
                    {/*<CategoryPage/>*/}
                    {/*<ProductPage/>*/}
                    <CartPage/>
                </div>
            </div>
        );
    }
}

export default DefaultLayout;