import "./CartPage.css";
import React from "react";
import CartProduct from "../../components/CartProduct/CartProduct";
import AuthContext from "../../context/AuthProvider";

class CartPage extends React.Component {

    static contextType = AuthContext;

    render() {
        return (
            <div className="cart-page-container">
                <h1 className="cart-page-title">CART</h1>
                {this.context.order.products && this.context.order.products.map((product, key) => {
                    return(
                        <CartProduct
                            orderProduct={product}
                            cartProduct={product.product}
                            index={this.context.currencyIndex}
                            amount={product.amount}
                            currentAtrributes={product.attributes}
                            cartIndex={key}
                            key={key}
                        />
                    )
                })}
            </div>
        );
    }
}

export default CartPage;