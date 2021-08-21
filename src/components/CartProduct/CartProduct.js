import "./CartProduct.css";
import React, {PureComponent} from "react";
import Size from "../Size/Size";
import AuthContext from "../../context/AuthProvider";
import chevronRight from "../../images/chevronRight.svg"
import chevronLeft from "../../images/chevronLeft.svg"
import plusSquareSmall from "../../images/plusSquareSmall.svg"
import plusSquare from "../../images/plusSquare.svg"
import minusSquareSmall from "../../images/minusSquareSmall.svg"
import minusSquare from "../../images/minusSquare.svg"

class CartProduct extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {imageIndex: 0}
    }

    static contextType = AuthContext;


    handleIncreaseAmount() {
        const {
            orderProduct: {
                product,
                attributes,
                amount,
            },
            cartIndex
        } = this.props;

        const {handleChangeOrder} = this.context;

        const orderProduct = {
            product: {...product},
            attributes: [...attributes],
            amount: amount + 1,
        }

        handleChangeOrder(orderProduct, cartIndex)
    }

    handleDecreaseAmount() {
        const {
            orderProduct: {
                product,
                attributes,
                amount,
            },
            cartIndex
        } = this.props;

        const {handleChangeOrder} = this.context;

        const orderProduct = {
            product: {...product},
            attributes: [...attributes],
            amount: amount - 1,
        }

        handleChangeOrder(orderProduct, cartIndex)
    }

    handleChangeProduct(attributes) {
        const {
            orderProduct: {
                product,
                amount,
            },
            cartIndex
        } = this.props;

        const {handleChangeOrder} = this.context;

        const orderProduct = {
            product: {...product},
            attributes: [...attributes],
            amount: amount,
        }

        handleChangeOrder(orderProduct, cartIndex)
    }

    handleChangeImage(i) {
        const {
            cartProduct: {
                gallery
            }
        } = this.props;

        let index = this.state.imageIndex;
        if (index + i < 0) {
            index = gallery.length + i;
        } else if (index + i > gallery.length - 1) {
            index = index - gallery.length + i;
        } else {
            index += i;
        }
        this.setState(prev => ({
            ...prev,
            imageIndex: index
        }))
    }

    renderItem(item, key, i, attribute) {
        const {
            id,
            value,
        } = item

        const {
            modal,
            orderProduct: {
                attributes
            }
        } = this.props;

        const {
            name
        } = attribute;

        return (
            <Size
                key={key}
                index={i}
                modal={modal}
                id={id}
                attr={attribute}
                value={value}
                name={name}
                currentAttributes={attributes}
                active={id === attributes[i].id}
                changeProduct={(attributes) => this.handleChangeProduct(attributes)}
            />
        );
    }

    renderAttribute(attribute, i) {
        const {
            modal
        } = this.props;

        const {
            name,
            items
        } = attribute;

        return (
            <React.Fragment key={i}>
                <p className={!modal ? "size-text" : "size-text-modal"}>
                    {name.toUpperCase()}:
                </p>
                <div className={!modal ? "cart-product-sizes" : "cart-product-sizes-modal"}>
                    {items.map((item, key) => this.renderItem(item, key, i, attribute))}
                </div>
            </React.Fragment>
        );
    }

    renderAttributes() {
        const {
            cartProduct: {
                attributes
            }
        } = this.props;

        return (
            <React.Fragment>
                {attributes.map((attribute, i) => this.renderAttribute(attribute, i))}
            </React.Fragment>
        );
    }

    render() {
        const {
            currencyIcon
        } = this.context;

        const {
            modal,
            index,
            amount,
            cartProduct: {
                brand,
                name,
                prices,
                gallery,
            },
            orderProduct,
        } = this.props;

        return (
            <div className={!modal ? "cart-product-container" : "cart-product-container-modal"}>
                <div className={!modal ? "cart-product-left-side" : "cart-product-left-side-modal"}>
                    <div>
                        <p className={!modal ? "cart-product-name-1" : "cart-product-name-modal"}>
                            {brand}
                        </p>
                        <p className={!modal ? "cart-product-name-2" : "cart-product-name-modal"}>
                            {name}
                        </p>
                        <p className={!modal ? "cart-product-price" : "cart-product-price-modal"}>
                            {currencyIcon}
                            &nbsp;
                            {(prices[index].amount * amount).toFixed(2)}

                        </p>
                    </div>
                    {this.renderAttributes()}
                </div>
                <div className="cart-product-right-side">
                    <div className="cart-product-number">
                        <button className={!modal ? "cart-product-button" : "cart-product-button-modal"}
                                onClick={() => this.handleIncreaseAmount()}
                        >
                            <img alt="" src={!modal ? plusSquare : plusSquareSmall}/>
                        </button>
                        <p className={!modal ? "cart-product-count" : "cart-product-count-modal"}>
                            {orderProduct.amount}
                        </p>
                        <button className={!modal ? "cart-product-button" : "cart-product-button-modal"}
                                onClick={() => this.handleDecreaseAmount()}
                        >
                            <img alt="" src={!modal ? minusSquare : minusSquareSmall}/>
                        </button>
                    </div>
                    <div className={!modal ? "cart-product-image" : "cart-product-image-modal"}>
                        <div
                            className={!modal ? "cart-product-image-container" : "cart-product-image-container-modal"}
                        >
                            <img alt="" src={gallery[this.state.imageIndex]}
                                 className="cart-product-img"/>
                        </div>
                        {(!modal && gallery.length > 1) &&
                        <React.Fragment>
                            <button onClick={() => this.handleChangeImage(-1)} className="cart-product-left-slide">
                                <img alt="" src={chevronLeft}/>
                            </button>
                            <button onClick={() => this.handleChangeImage(1)} className="cart-product-right-slide">
                                <img alt="" src={chevronRight}/>
                            </button>
                        </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default CartProduct;
