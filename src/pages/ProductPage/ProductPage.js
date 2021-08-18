import "./ProductPage.css"
import React from "react";
import Size from "../../components/Size/Size";
import {client, Field, Query} from "@tilework/opus";
import AuthContext from "../../context/AuthProvider";

class ProductPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {product: {}, chosenImage: "", orderProduct: {}}
    }

    static contextType = AuthContext;

    componentDidMount() {
        if (document.URL.split("/").slice(-2, -1).join("") === "tech") {
            this.context.handleChangeIndex(1);
        }

        this.request().then(response => {
            let product = response.categories[this.context.index].products.filter(product =>
                product.id === document.URL.split("/").slice(-1).join("")
            );
            let attributes = [];

            attributes = product[0].attributes.map(attribute => {
                return ({
                    name: attribute.name,
                    id: attribute.items[0].id,
                });
            });

            this.setState(prev => ({
                ...prev,
                product: product[0],
                chosenImage: product[0].gallery[0],
                orderProduct: {
                    product: product[0],
                    attributes: [...attributes],
                    amount: 1,
                }
            }))
        });
    }

    handleChangeProduct(attributes) {
        this.setState(prev => ({
            ...prev,
            orderProduct: {
                product: this.state.product,
                attributes: [...attributes],
                amount: 1,
            }
        }))
    }

    handleChangeOrder() {
        if (this.state.orderProduct.attributes.length === this.state.product.attributes.length) {

            let index = 0;

            this.context.order.products && this.context.order.products.forEach((product, key) => {
                if(product.product.id === this.state.orderProduct.product.id) {
                    index = key;
                }
            })

            this.context.handleChangeOrder(this.state.orderProduct, index);
        }
    }

    request() {
        client.setEndpoint("http://localhost:4000/");

        const categoriesFields = ["id", "name", "inStock", "brand", "description"];
        const attributeSet = ["id", "name", "type"];

        const categoriesQuery = new Query("categories", true)
            .addField(new Field("products", true)
                .addFieldList(categoriesFields)
                .addField(new Field("gallery", true))
                .addField(new Field("prices", true)
                    .addField("amount")
                    .addField("currency")
                )
                .addField(new Field("attributes", true)
                    .addFieldList(attributeSet)
                    .addField(new Field("items", true)
                        .addFieldList(["displayValue", "value", "id"])
                    )
                )
            );

        return client.post(categoriesQuery);
    }

    handleChangeImage(image) {
        this.setState(prev => ({
            ...prev,
            chosenImage: image
        }))
    }

    render() {
        return (
            <div className="cart-container">
                <ul className="cart-images">
                    {this.state.product.gallery && this.state.product.gallery.map((img, key) => {
                        return (
                            <li key={key} className="cart-image">
                                <button className="cart-image-button" onClick={() => this.handleChangeImage(img)}>
                                    <img alt="" src={img} className="cart-img"/>
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div className="test">
                    <div className="chosen-image">
                        <img alt="" src={this.state.chosenImage} className="chosen-img"/>
                    </div>
                </div>
                <div className="cart-info">
                    <div>
                        <p className="cart-name-1">{this.state.product.brand}</p>
                        <p className="cart-name-2">{this.state.product.name}</p>
                    </div>
                    <div>
                        {this.state.product.attributes && this.state.product.attributes.map((attribute, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <p className="size-text">{attribute.name.toUpperCase()}:</p>
                                    <div className="sizes">
                                        {attribute.items.map((item, key) => {
                                            return (
                                                <Size
                                                    key={key}
                                                    index={i}
                                                    i={key}
                                                    size={item.displayValue}
                                                    id={item.id}
                                                    value={item.value}
                                                    name={attribute.name}
                                                    attr={attribute}
                                                    currentAtrributes={this.state.orderProduct.attributes}
                                                    attribute={this.state.orderProduct.attributes[0]}
                                                    active={item.id === this.state.orderProduct.attributes[i].id}
                                                    changeProduct={(attributes) => this.handleChangeProduct(attributes)}
                                                />
                                            );
                                        })}
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                    <div>
                        <p className="cart-price">PRICE:</p>
                        {this.state.product.prices &&
                        <p className="price">
                            {this.context.currencyIcon} {this.state.product.prices[this.context.currencyIndex].amount}
                        </p>
                        }
                    </div>
                    <button
                        disabled={!this.state.product.inStock}
                        className="add-button"
                        onClick={() => this.handleChangeOrder()}
                    >
                        ADD TO CART
                    </button>
                    <div className="description" dangerouslySetInnerHTML={{__html: this.state.product.description}}/>
                </div>
            </div>
        );
    }
}

export default ProductPage;