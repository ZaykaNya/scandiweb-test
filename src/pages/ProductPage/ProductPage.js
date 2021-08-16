import "./ProductPage.css"
import React from "react";
import Size from "../../components/Size/Size";
import {client, Field, Query} from "@tilework/opus";
import AuthContext from "../../context/AuthProvider";

class ProductPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {product: {}, chosenImage: ""}
    }

    static contextType = AuthContext;

    componentDidMount() {
        if (document.URL.split("/").slice(-2, -1).join("") === "tech") {
            this.context.handleChangeIndex(1);
        }
        this.request().then(response => {
            let product = response.categories[this.context.index].products.filter(product => product.id === document.URL.split("/").slice(-1).join(""));
            this.setState(prev => ({
                ...prev,
                product: product[0],
                chosenImage: product[0].gallery[0]
            }))
        });

    }

    async request() {
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

        return await client.post(categoriesQuery);
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
                        {this.state.product.attributes && this.state.product.attributes.map((attribute, key) => {
                            return (
                                <React.Fragment key={key}>
                                    <p className="size-text">{attribute.name}:</p>
                                    <div className="sizes">
                                        {attribute.items.map((item, key) => {
                                            return (
                                                <Size key={key} size={item.displayValue}/>
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
                            {this.state.product.prices[this.context.currencyIndex].amount} {this.state.product.prices[this.context.currencyIndex].currency}
                        </p>
                        }
                    </div>
                    <button
                        disabled={!this.state.product.inStock}
                        className="add-button"
                        onClick={() => this.context.handleAddToCart(this.state.product)}
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