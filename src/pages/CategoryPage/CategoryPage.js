import "./CategoryPage.css";
import React, {PureComponent} from "react";
import Product from "../../components/Product/Product";
import {client, Field, Query} from "@tilework/opus";
import AuthContext from "../../context/AuthProvider";

class CategoryPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {categories: [], products: [], category: "", curIndex: 0}
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

        this.request().then(response => {
            const {
                categories
            } = response;

            if(index < 2) {
                this.setState(prev => ({
                    ...prev,
                    categories: categories,
                    products: categories[index].products,
                    category: categories[index].name
                }))
            } else {
                const products = categories.reduce((acc, category) => {
                    acc.push(...category.products);
                    return acc;
                }, [])
                console.log(products)
                this.setState(prev => ({
                    ...prev,
                    categories: [...categories, "all"],
                    products: [...products],
                    category: "all"
                }))
            }

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