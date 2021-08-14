import "./CategoryPage.css";
import React from "react";
import Product from "../../components/Product/Product";
import image from "../../clothes-1.png"
import {client, Field, Query} from "@tilework/opus";

class CategoryPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {products: [], category: ""}
    }

    componentDidMount() {
        this.request().then(response => {
            console.log(response)
            this.setState(prev => ({
                ...prev,
                products: response.categories[1].products,
                category: response.categories[1].name
            }))
        });
    }

    async request() {
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
            );

        return await client.post(categoriesQuery);
    }

    render() {
        return (
            <div className="category-container">
                <h1>{this.state.category.toUpperCase()}</h1>
                <ul className="products">
                    {this.state.products.map(product => {
                        return (
                            <Product key={product.id} product={product}/>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default CategoryPage;