import "./CategoryPage.css";
import React from "react";
import Product from "../../components/Product/Product";
import {client, Field, Query} from "@tilework/opus";

class CategoryPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {categories: [], products: [], category: ""}
    }

    componentDidMount() {
        this.request().then(response => {
            console.log(response)
            this.setState(prev => ({
                ...prev,
                categories: response.categories,
                products: response.categories[this.props.index].products,
                category: response.categories[this.props.index].name
            }))
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.index !== this.props.index) {
            this.setState(prev => ({
                ...prev,
                products: this.state.categories[this.props.index].products,
                category: this.state.categories[this.props.index].name
            }))
        }
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
                .addField(new Field("attributes", true)
                    .addField(new Field("items", true)
                        .addFieldList(["displayValue", "value", "id"])
                    )
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
                            <Product
                                key={product.id}
                                currencyIndex={this.props.currencyIndex}
                                product={product}
                                addToCart={(product) => this.props.addToCart(product)}
                                changeTotal={(price) => this.props.changeTotal(price)}
                            />
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default CategoryPage;