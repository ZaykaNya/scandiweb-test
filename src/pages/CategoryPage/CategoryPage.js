import "./CategoryPage.css";
import React, {PureComponent} from "react";
import Product from "../../components/Product/Product";
import {client, Field, Query} from "@tilework/opus";
import AuthContext from "../../context/AuthProvider";

class CategoryPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {categories: [], products: [], category: ""}
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.handleRequest();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.index !== this.context.index) {
            this.handleRequest();
        }
    }

    handleRequest() {
        const {
            index
        } = this.context;

        this.request().then(response => {
            const {
                categories
            } = response;

            this.setState(prev => ({
                ...prev,
                categories: categories,
                products: categories[index].products,
                category: categories[index].name
            }))
        });
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

    renderProducts() {
        const {
            products
        } = this.state;

        return (
            <ul className="products">
                {products.map(product => {
                    return (
                        <Product
                            key={product.id}
                            product={product}
                        />
                    );
                })}
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