import "./Product.css"
import React from "react";

class Product extends React.Component {



    render() {
        return (
            <li className="product">
                <a href="#" className="product-a">
                    <div className="product-image">
                        <a href="#" className="product-cart-image">

                        </a>
                    </div>
                    <p className="product-name">Apollo Running Short</p>
                    <p className="product-price">$50.00</p>
                </a>
            </li>
        );
    }
}

export default Product;