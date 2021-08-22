import "./ProductPage.css"
import React, {PureComponent} from "react";
import Size from "../../components/Size/Size";
import {client, Field, Query} from "@tilework/opus";
import AuthContext from "../../context/AuthProvider";
import ReactHtmlParser from 'react-html-parser';
import compareAttributesById from "../../utils/compareAttributesById";

class ProductPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {product: {}, chosenImage: "", orderProduct: {}}
    }

    static contextType = AuthContext;

    componentDidMount() {
        const {
            handleChangeIndex,
        } = this.context;

        if (document.URL.split("/").slice(-2, -1).join("") === "tech") {
            handleChangeIndex(1);
        } else if (document.URL.split("/").slice(-2, -1).join("") === "all") {
            handleChangeIndex(2);
        }

        this.request().then(response => {
            const {
                order: {
                    products
                }
            } = this.context;

            let product = [];

            response.categories.forEach(category => {
                category.products.forEach(cProduct => {
                    if (cProduct.id === document.URL.split("/").slice(-1).join("")) {
                        product.push(cProduct)
                    }
                })
            })

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
                amount: 1
            }
        }))
    }

    handleChangeOrder() {
        const {
            orderProduct,
            product
        } = this.state;

        const {
            order: {
                products
            },
            handleChangeOrder
        } = this.context;

        if (orderProduct.attributes.length === product.attributes.length) {
            let index = 0;
            let oAmount = 0;

            products && products.forEach(oProduct => {
                if(oProduct.product.id === orderProduct.product.id && compareAttributesById(oProduct.attributes, orderProduct.attributes)) {
                    oAmount = oProduct.amount;
                }
            })

            console.log(oAmount)

            const p = {
                product: {...orderProduct.product},
                attributes: [...orderProduct.attributes],
                amount: oAmount + 1
            }

            products && products.forEach((product, key) => {
                if (compareAttributesById(product.attributes, p.attributes)) {
                    index = key;
                }
            })

            handleChangeOrder(p, index);
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

    renderImage(img, key) {
        return (
            <li key={key} className="cart-image">
                <button className="cart-image-button" onClick={() => this.handleChangeImage(img)}>
                    <img alt="" src={img} className="cart-img"/>
                </button>
            </li>
        );
    }

    renderGallery() {
        const {
            product: {
                gallery,
            }
        } = this.state;

        if (gallery) {
            return (
                <ul className="cart-images">
                    {gallery.map((img, key) => this.renderImage(img, key))}
                </ul>
            );
        }

    }

    renderInStock() {
        const {
            product: {
                inStock,
            }
        } = this.state;

        if (!inStock) {
            return (
                <React.Fragment>
                    <div className="out-of-stock"/>
                    <p className="out-of-stock-title">OUT OF STOCK</p>
                </React.Fragment>
            );
        }
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
        } = this.state;

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
            name,
            items
        } = attribute;

        return (
            <React.Fragment key={i}>
                <p className="size-text">{name.toUpperCase()}:</p>
                <div className="sizes">
                    {items.map((item, key) => this.renderItem(item, key, i, attribute))}
                </div>
            </React.Fragment>
        );
    }

    renderAttributes() {
        const {
            product: {
                attributes
            }
        } = this.state;

        return (
            <div>
                {attributes && attributes.map((attribute, i) => this.renderAttribute(attribute, i))}
            </div>
        );
    }

    render() {
        const {
            chosenImage,
            product: {
                inStock,
                brand,
                name,
                prices,
                description
            }
        } = this.state;

        const {
            currencyIcon,
            currencyIndex
        } = this.context;

        return (
            <div className="cart-container">
                {this.renderGallery()}
                <div className="chosen-image-container">
                    <div className="chosen-image">
                        <img alt="" src={chosenImage} className="chosen-img"/>
                        {this.renderInStock()}
                    </div>
                </div>
                <div className="cart-info">
                    <div>
                        <p className="cart-name-1">{brand}</p>
                        <p className="cart-name-2">{name}</p>
                    </div>
                    {this.renderAttributes()}
                    <div>
                        <p className="cart-price">PRICE:</p>
                        {prices &&
                        <p className="price">
                            {currencyIcon} {prices[currencyIndex].amount}
                        </p>
                        }
                    </div>
                    <button
                        disabled={!inStock}
                        className={inStock ? "add-button" : "add-button disabled"}
                        onClick={() => this.handleChangeOrder()}
                    >
                        ADD TO CART
                    </button>
                    <div className="description">
                        {ReactHtmlParser(description)}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductPage;