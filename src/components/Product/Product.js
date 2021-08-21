import "./Product.css"
import React, {PureComponent} from "react";
import cartIcon from "../../images/whiteCart.svg";
import AuthContext from "../../context/AuthProvider";
import {Link} from "react-router-dom";
import compareArrays from "../../utils/compareArrays";

class Product extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {product: {}}
    }

    static contextType = AuthContext;

    handleAddToCart(product) {
        const {
            order: {
                products
            },
            handleChangeOrder
        } = this.context;

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

        products && products.forEach((product, key) => {
            if (compareArrays(product.attributes, orderProduct.attributes)) {
                index = key;
            }
        })

        handleChangeOrder(orderProduct, index);
    }

    renderOutOfStockButton() {
        const {
            product,
            product: {
                inStock,
            }
        } = this.props;

        if (!inStock) {
            return (
                <React.Fragment>
                    <div className="out-of-stock"/>
                    <p className="out-of-stock-title">OUT OF STOCK</p>
                </React.Fragment>
            );
        } else {
            return (
                <button
                    className="product-cart-image"
                    onClick={e => {
                        e.preventDefault();
                        this.handleAddToCart(product);
                        return false
                    }}
                >
                    <img alt="" src={cartIcon}/>
                </button>
            );
        }
    }

    renderOutOfStockImage() {
        const {
            product: {
                inStock,
            }
        } = this.props;

        if (!inStock) {
            return (
                <div className="out-of-stock"/>
            );
        }
    }

    render() {
        const {
            categories,
            currencyIndex,
            currencyIcon,
            handleChangeCurrentProduct
        } = this.context;

        const {
            product: {
                id,
                gallery,
                brand,
                name,
                prices,
            }
        } = this.props;

        return (
            <li className="product">
                <Link
                    to={`/categories/${categories}/${id}`}
                    className="product-a"
                    onClick={() => handleChangeCurrentProduct(id)}
                >
                    <div className="product-image">
                        <img alt="" src={gallery[0]} className="product-img"/>
                        {this.renderOutOfStockButton()}
                    </div>
                    <div className="product-info">
                        <p className="product-name">
                            {brand} {name}
                        </p>
                        <p className="product-price">
                            {currencyIcon} {prices[currencyIndex].amount}
                        </p>
                        {this.renderOutOfStockImage()}
                    </div>
                </Link>
            </li>
        );
    }
}

export default Product;