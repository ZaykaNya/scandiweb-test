import "./Product.css"
import React from "react";
import cartIcon from "../../images/whiteCart.svg";
import AuthContext from "../../context/AuthProvider";
import {Link} from "react-router-dom";

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {product: {}}
    }

    static contextType = AuthContext;

    handleAddToCart(product) {
        console.log(product);
        const attributes = product.attributes.map(attribute => {
            return ({
                name: attribute.name,
                id: attribute.items[0].id
            });
        });

        const orderProduct = {
            product: {...product},
            attributes: [...attributes],
            amount: 1,
        }

        let index = 0;

        this.context.order.products && this.context.order.products.forEach((product, key) => {
            if (product.product.id === orderProduct.product.id) {
                index = key;
            }
        })

        this.context.handleChangeOrder(orderProduct, index);
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
                        <React.Fragment>
                            <div className="out-of-stock"/>
                            <p className="out-of-stock-title">OUT OF STOCK</p>
                        </React.Fragment>
                        }
                        {this.props.product.inStock &&
                        <button
                            className="product-cart-image"
                            onClick={e => {
                                e.preventDefault();
                                this.handleAddToCart(this.props.product);
                                return false
                            }}
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
                            {this.context.currencyIcon} {this.props.product.prices[this.context.currencyIndex].amount}
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