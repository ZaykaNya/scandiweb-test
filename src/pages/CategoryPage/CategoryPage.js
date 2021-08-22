import "./CategoryPage.css";
import React, {PureComponent} from "react";
import Product from "../../components/Product/Product";
import {client, Field, Query} from "@tilework/opus";
import AuthContext from "../../context/AuthProvider";

class CategoryPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {products: [], category: "", curIndex: 0}
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.handleRequest();
        this.setState(prev => ({
            ...prev,
            curIndex: this.context.index
        }))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.curIndex !== this.context.index) {
            this.handleRequest();
            this.setState(prev => ({
                ...prev,
                curIndex: this.context.index
            }))
        }
    }

    handleRequest() {
        const {
            index
        } = this.context;

        if (index < 2) {
            this.requestCategory(document.URL.split("/").slice(-1).join("")).then(response => {
                const {
                    category: {
                        name,
                        products
                    }
                } = response;

                this.setState(prev => ({
                    ...prev,
                    products: products,
                    category: name
                }))
            })
        } else {
            this.request().then(response => {
                const {
                    categories
                } = response;

                const products = categories.reduce((acc, category) => {
                    acc.push(...category.products);
                    return acc;
                }, [])

                this.setState(prev => ({
                    ...prev,
                    products: [...products],
                    category: "all"
                }))
            })
        }
    }

    requestCategory(category) {
        client.setEndpoint("http://localhost:4000/");

        const categoryFields = ["id", "name", "inStock", "brand"];

        const categoryQuery = new Query("category", true)
            .addArgument("input", "CategoryInput", {title: category})
            .addField("name")
            .addField(new Field("products", true)
                .addFieldList(categoryFields)
                .addField(new Field("gallery", true))
                .addField(new Field("prices", true)
                    .addField("amount")
                    .addField("currency")
                )
                .addField(new Field("attributes", true)
                    .addField("name")
                    .addField("type")
                    .addField("id")
                    .addField(new Field("items", true)
                        .addFieldList(["displayValue", "value", "id"])
                    )
                )
            );

        return client.post(categoryQuery);
    }

    request() {
        client.setEndpoint("http://localhost:4000/");

        const categoriesFields = ["id", "name", "inStock", "brand"];

        const categoriesQuery = new Query("categories", true)
            .addField("name")
            .addField(new Field("products", true)
                .addFieldList(categoriesFields)
                .addField(new Field("gallery", true))
                .addField(new Field("prices", true)
                    .addField("amount")
                    .addField("currency")
                )
                .addField(new Field("attributes", true)
                    .addField("name")
                    .addField("type")
                    .addField("id")
                    .addField(new Field("items", true)
                        .addFieldList(["displayValue", "value", "id"])
                    )
                )
            );

        return client.post(categoriesQuery);
    }

    renderProduct(product) {
        return (
            <Product
                key={product.id}
                product={product}
            />
        );
    }

    renderProducts() {
        const {
            products
        } = this.state;

        return (
            <ul className="products">
                {products.map(this.renderProduct)}
            </ul>
        );
    }

    render() {
        const {
            category
        } = this.state;

        return (
            <div className="category-container">
                <h1 className="cart-container-title">{category.toUpperCase()}</h1>
                {this.renderProducts()}
            </div>
        );
    }
}

export default CategoryPage;