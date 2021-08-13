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
            <div className="cart-product-container">
                <div className="cart-product-left-side">
                    <p className="cart-product-name-1">Apollo</p>
                    <p className="cart-product-name-2">Running Short</p>
                    <p className="cart-product-price">$50.50</p>
                    <div className="cart-product-sizes">
                        <Size size="XS"/>
                        <Size size="S"/>
                    </div>
                </div>
                <div className="cart-product-right-side">
                    <div className="cart-product-number">
                        <button className="cart-product-button" onClick={() => this.handleIncreaseCounter()}>+</button>
                        <p className="cart-product-count">{this.state.counter}</p>
                        <button className="cart-product-button" onClick={() => this.handleDecreaseCounter()}>-</button>
                    </div>
                    <div className="cart-product-image">
                        <div style={{height: "100%", width: 141, background: "white"}}>
                            <img alt="" src={image} className="cart-img"/>
                        </div>
                        <div className="cart-product-left-slide">{`<`}</div>
                        <div className="cart-product-right-slide">{`>`}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartProduct;