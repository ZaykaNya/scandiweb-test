import "./Product.css"
import React from "react";
import cartIcon from "../../images/whiteCart.svg";

class Product extends React.Component {

    constructor(props) {
        super(props);
    }

    handleAddToCart (product) {
        this.props.addToCart(product)
        this.props.changeTotal(product.prices[this.props.currencyIndex].amount)
    }

    render() {
        return (
            <li className="product">
                <a href="#" className="product-a">
                    <div className="product-image">
                        <img alt="" src={this.props.product.gallery[0]} className="product-img"/>
                        {!this.props.product.inStock &&
                        <div className="out-of-stock">
                            <p className="out-of-stock-title">OUT OF STOCK</p>
                        </div>
                        }
                        {this.props.product.inStock &&
                        <button
                            href="#"
                            className="product-cart-image"
                            onClick={() => this.handleAddToCart(this.props.product)}
                        >
                            <img alt="" src={cartIcon}/>
                        </button>
                        }
                    </div>
                    <div className="product-info">
                        <p className="product-name" style={this.props.outOfStock ? {color: "#8D8F9A"} : {}}>
                            {this.props.product.brand} {this.props.product.name}
                        </p>
                        <p className="product-price" style={this.props.outOfStock ? {color: "#8D8F9A"} : {}}>
                            {this.props.product.prices[this.props.currencyIndex].amount} {this.props.product.prices[this.props.currencyIndex].currency}
                        </p>
                        {!this.props.product.inStock &&
                        <div className="out-of-stock"/>
                        }
                    </div>

                </a>
            </li>
        );
    }
}

export default Product;