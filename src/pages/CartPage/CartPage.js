import "./CartPage.css";
import React from "react";
import CartProduct from "../../components/CartProduct/CartProduct";
import {client, Field, Query} from "@tilework/opus";
import AuthContext from "../../context/AuthProvider";

class CartPage extends React.Component {

    static contextType = AuthContext;

    render() {
        return (
            <div className="cart-page-container">
                <h1 className="cart-page-title">CART</h1>
                {this.context.cartProducts.map((product, key) => {
                    return(
                        <CartProduct
                            cartProduct={product}
                            index={this.context.index}
                            key={key}
                        />
                    )
                })}
            </div>
        );
    }
}

export default CartPage;