import "./CartPage.css";
import React from "react";
import CartProduct from "../../components/CartProduct/CartProduct";
import AuthContext from "../../context/AuthProvider";
import {PureComponent} from "react/cjs/react.production.min";

class CartPage extends PureComponent {

    static contextType = AuthContext;

    renderProducts() {
        const {
            order: {
                products
            },
            currencyIndex
        } = this.context;

        if (products) {
            return (
                <React.Fragment>
                    {products.map((orderProduct, key) => {
                        const {
                            product,
                            amount,
                            attributes
                        } = orderProduct;

                        return (
                            <CartProduct
                                orderProduct={orderProduct}
                                cartProduct={product}
                                index={currencyIndex}
                                amount={amount}
                                currentAtrributes={attributes}
                                cartIndex={key}
                                key={key}
                            />
                        );
                    })}
                </React.Fragment>
            );
        }

    }

    render() {
        return (
            <div className="cart-page-container">
                <h1 className="cart-page-title">CART</h1>
                {this.renderProducts()}
            </div>
        );
    }
}

export default CartPage;