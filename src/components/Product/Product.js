import "./Product.css"
import React from "react";

class Product extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="product">
                <a href="#" className="product-a">
                    <div className="product-image">
                        <img alt="" src={this.props.image} className="product-img" />
                        {this.props.outOfStock &&
                        <div className="out-of-stock">
                            <p className="out-of-stock-title">OUT OF STOCK</p>
                        </div>
                        }
                    </div>
                    <a href="#" className="product-cart-image"/>
                    <p className="product-name" style={this.props.outOfStock ? { color: "#8D8F9A"} : {}}>Apollo Running Short</p>
                    <p className="product-price" style={this.props.outOfStock ? { color: "#8D8F9A"} : {}}>$50.00</p>
                </a>
            </li>
        );
    }
}

export default Product;