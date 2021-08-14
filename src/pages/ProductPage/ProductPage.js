import "./ProductPage.css"
import React from "react";
import Size from "../../components/Size/Size";
import {client, Field, Query} from "@tilework/opus";

class ProductPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {product: {}, chosenImage: ""}
    }

    componentDidMount() {
        this.request().then(response => {
            console.log(response.categories[1].products[0])
            this.setState(prev => ({
                ...prev,
                product: response.categories[1].products[0],
                chosenImage: response.categories[1].products[0].gallery[0]
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

    render() {
        return (
            <div className="cart-container">
                <ul className="cart-images">
                    {this.state.product.gallery && this.state.product.gallery.map((img, key) => {
                        return (
                            <li key={key} className="cart-image">
                                <img alt="" src={img} className="cart-img"/>
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
                        {this.state.product.attributes && this.state.product.attributes.map(attribute => {
                            return (
                                <React.Fragment>
                                    <p className="size-text">{attribute.name}:</p>
                                    <div className="sizes">
                                        {attribute.items.map(item => {
                                            return (
                                                <Size size={item.displayValue}/>
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
                            {this.state.product.prices[0].amount} {this.state.product.prices[0].currency}
                        </p>
                        }
                    </div>
                    <button
                        disabled={!this.state.product.inStock}
                        className="add-button">ADD TO CART
                    </button>
                    <p className="description">
                        {this.state.product.description}
                    </p>
                </div>
            </div>
        );
    }
}

export default ProductPage;