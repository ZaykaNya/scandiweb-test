import "./CartProduct.css";
import React from "react";

class CartProduct extends React.Component {


    render() {
        return (
            <div className="container">
                <div className="left-side">
                    <p className="name-1">Apollo</p>
                    <p className="name-2">Running Short</p>
                    <p className="price">$50.50</p>
                    <div className="sizes">

                    </div>
                </div>
                <div className="right-side">
                    <div className="product-number">
                        <button>+</button>
                        <p>1</p>
                        <button>-</button>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}

export default CartProduct;