import "./CategoryPage.css";
import React from "react";
import Product from "../../components/Product/Product";

class CategoryPage extends React.Component {


    render() {
        return (
            <div className="category-container">
                <h1>Category name</h1>
                <ul className="products">
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                </ul>
            </div>
        );
    }
}

export default CategoryPage;