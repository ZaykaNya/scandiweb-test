import "./CartProduct.css";
import React from "react";
import Size from "../Size/Size";
import AuthContext from "../../context/AuthProvider";

class CartProduct extends React.Component {

    static contextType = AuthContext;

    handleIncreaseAmount() {
        const orderProduct = {
            product: {...this.props.orderProduct.product},
            attributes: [...this.props.orderProduct.attributes],
            amount: this.props.orderProduct.amount + 1,
        }

        this.context.handleChangeOrder(orderProduct, this.props.cartIndex)
    }

    handleDecreaseAmount() {
        const orderProduct = {
            product: {...this.props.orderProduct.product},
            attributes: [...this.props.orderProduct.attributes],
            amount: this.props.orderProduct.amount - 1,
        }

        this.context.handleChangeOrder(orderProduct, this.props.cartIndex)
    }

    handleChangeProduct(attributes) {

        const orderProduct = {
            product: {...this.props.orderProduct.product},
            attributes: [...attributes],
            amount: this.props.orderProduct.amount,
        }

        this.context.handleChangeOrder(orderProduct, this.props.cartIndex)
    }

    render() {
        return (
            <div className={!this.props.modal ? "cart-product-container" : "cart-product-container-modal"}>
                <div className={!this.props.modal ? "cart-product-left-side" : "cart-product-left-side-modal"}>
                    <div>
                        <p className={!this.props.modal ? "cart-product-name-1" : "cart-product-name-modal"}>
                            {this.props.cartProduct.brand}
                        </p>
                        <p className={!this.props.modal ? "cart-product-name-2" : "cart-product-name-modal"}>
                            {this.props.cartProduct.name}
                        </p>
                    </div>
                    <p className={!this.props.modal ? "cart-product-price" : "cart-product-price-modal"}>
                        {(this.props.cartProduct.prices[this.props.index].amount * this.props.amount).toFixed(2)}
                        &nbsp;{this.props.cartProduct.prices[this.props.index].currency}
                    </p>
                    {this.props.cartProduct.attributes.map((attribute, i) => {
                        return (
                            <div key={i}
                                 className={!this.props.modal ? "cart-product-sizes" : "cart-product-sizes-modal"}>
                                {attribute.items.map((item, key) => {
                                    return (
                                        <Size
                                            key={key}
                                            index={i}
                                            modal={this.props.modal}
                                            size={item.displayValue}
                                            id={item.id}
                                            value={item.value}
                                            name={attribute.name}
                                            currentAtrributes={this.props.orderProduct.attributes}
                                            active={item.id === this.props.orderProduct.attributes[i].id}
                                            changeProduct={(attributes) => this.handleChangeProduct(attributes)}
                                        />
                                    );
                                })}
                            </div>
                        )
                    })}
                </div>
                <div className="cart-product-right-side">
                    <div className="cart-product-number">
                        <button className={!this.props.modal ? "cart-product-button" : "cart-product-button-modal"}
                                onClick={() => this.handleIncreaseAmount()}
                        >
                            +
                        </button>
                        <p className={!this.props.modal ? "cart-product-count" : "cart-product-count-modal"}>
                            {this.props.orderProduct.amount}
                        </p>
                        <button className={!this.props.modal ? "cart-product-button" : "cart-product-button-modal"}
                                onClick={() => this.handleDecreaseAmount()}
                        >
                            -
                        </button>
                    </div>
                    <div className={!this.props.modal ? "cart-product-image" : "cart-product-image-modal"}>
                        <div
                            className={!this.props.modal ? "cart-product-image-container" : "cart-product-image-container-modal"}
                        >
                            <img alt="" src={this.props.cartProduct.gallery[0]} className="cart-product-img"/>
                        </div>
                        {!this.props.modal &&
                        <React.Fragment>
                            <div className="cart-product-left-slide">{`<`}</div>
                            <div className="cart-product-right-slide">{`>`}</div>
                        </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default CartProduct;
