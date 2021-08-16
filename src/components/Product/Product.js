import "./Product.css"
import React from "react";
import cartIcon from "../../images/whiteCart.svg";
import AuthContext from "../../context/AuthProvider";
import {Link} from "react-router-dom";

class Product extends React.Component {

    constructor(props) {
        super(props);
    }

    static contextType = AuthContext;

    handleAddToCart (product) {
        this.context.handleAddToCart(product)
        this.context.handleChangeTotal(product.prices[this.context.currencyIndex].amount)
    }

    render() {
        return (
            <li className="product">
                <Link
                    to={`/categories/${this.context.categories}/${this.props.product.id}`}
                    className="product-a"
                    onClick={() => this.context.handleChangeCurrentProduct(this.props.product.id)}
                >
                    <div className="product-image">
                        <img alt="" src={this.props.product.gallery[0]} className="product-img"/>
                        {!this.props.product.inStock &&
                        <div className="out-of-stock">
                            <p className="out-of-stock-title">OUT OF STOCK</p>
                        </div>
                        }
                        {this.props.product.inStock &&
                        <button
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
                            {this.props.product.prices[this.context.currencyIndex].amount} {this.props.product.prices[this.context.currencyIndex].currency}
                        </p>
                        {!this.props.product.inStock &&
                        <div className="out-of-stock"/>
                        }
                    </div>
                </Link>
            </li>
        );
    }
}

export default Product;