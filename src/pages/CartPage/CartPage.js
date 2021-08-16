import "./CartPage.css";
import React from "react";
import CartProduct from "../../components/CartProduct/CartProduct";
import {client, Field, Query} from "@tilework/opus";

class CartPage extends React.Component {

    render() {
        return (
            <div className="cart-page-container">
                <h1 className="cart-page-title">CART</h1>
                {[].map((product, key) => {
                    return(
                        <CartProduct key={key}/>
                    )
                })}
            </div>
        );
    }
}

export default CartPage;