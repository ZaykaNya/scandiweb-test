import "./CategoryPage.css";
import React from "react";
import Product from "../../components/Product/Product";
import {client, Field, Query} from "@tilework/opus";
import AuthContext from "../../context/AuthProvider";

class CategoryPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {categories: [], products: [], category: ""}
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.request().then(response => {
            this.setState(prev => ({
                ...prev,
                categories: response.categories,
                products: response.categories[this.context.index].products,
                category: response.categories[this.context.index].name
            }))
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.index !== this.context.index) {
            this.request().then(response => {
                this.setState(prev => ({
                    ...prev,
                    categories: response.categories,
                    products: response.categories[this.context.index].products,
                    category: response.categories[this.context.index].name
                }))
            });
        }
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


    render() {
        return (
            <div className="category-container">
                <h1>{this.state.category.toUpperCase()}</h1>
                <ul className="products">
                    {this.state.products.map(product => {
                        return (
                            <Product
                                key={product.id}
                                product={product}
                            />
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default CategoryPage;