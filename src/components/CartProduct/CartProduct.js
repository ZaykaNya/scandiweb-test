import "./CartProduct.css";
import React from "react";
import Size from "../Size/Size";
import image from "../../clothes-1.png";

class CartProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {counter: 1};
    }

    handleIncreaseCounter() {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    handleDecreaseCounter() {
        this.setState({
            counter: this.state.counter - 1
        })
    }

    render() {
        return (
            <div className={!this.props.modal ? "cart-product-container" : "cart-product-container-modal"}>
                <div className={!this.props.modal ? "cart-product-left-side" : "cart-product-left-side-modal"}>
                    <div>
                        <p className={!this.props.modal ? "cart-product-name-1" : "cart-product-name-modal"}>Apollo</p>
                        <p className={!this.props.modal ? "cart-product-name-2" : "cart-product-name-modal"}>Running
                            Short</p>
                    </div>
                    <p className={!this.props.modal ? "cart-product-price" : "cart-product-price-modal"}>$50.50</p>
                    <div className={!this.props.modal ? "cart-product-sizes" : "cart-product-sizes-modal"}>
                        <Size modal={this.props.modal} size="XS"/>
                        <Size modal={this.props.modal} size="S"/>
                    </div>
                </div>
                <div className="cart-product-right-side">
                    <div className="cart-product-number">
                        <button className={!this.props.modal ? "cart-product-button" : "cart-product-button-modal"}
                                onClick={() => this.handleIncreaseCounter()}
                        >
                            +
                        </button>
                        <p className={!this.props.modal ? "cart-product-count" : "cart-product-count-modal"}>
                            {this.state.counter}
                        </p>
                        <button className={!this.props.modal ? "cart-product-button" : "cart-product-button-modal"}
                                onClick={() => this.handleDecreaseCounter()}
                        >
                            -
                        </button>
                    </div>
                    <div className={!this.props.modal ? "cart-product-image" : "cart-product-image-modal"}>
                        <div
                            className={!this.props.modal ? "cart-product-image-container" : "cart-product-image-container-modal"}
                        >
                            <img alt="" src={image} className="cart-product-img"/>
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