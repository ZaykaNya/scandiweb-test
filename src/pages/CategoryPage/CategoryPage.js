import "./CategoryPage.css";
import React from "react";
import Product from "../../components/Product/Product";
import image from "../../clothes-1.png"

class CategoryPage extends React.Component {


    render() {
        return (
            <div className="category-container">
                <h1>Category name</h1>
                <ul className="products">
                    <Product outOfStock={false} image={image}/>
                    <Product outOfStock={false} image={image}/>
                    <Product outOfStock={true} image={image}/>
                    <Product outOfStock={false} image={image}/>
                    <Product outOfStock={false} image={image}/>
                    <Product outOfStock={false} image={image}/>
                </ul>
            </div>
        );
    }
}

export default CategoryPage;