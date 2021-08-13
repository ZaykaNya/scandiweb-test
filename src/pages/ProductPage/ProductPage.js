import "./ProductPage.css"
import React from "react";
import image from "../../clothes-1.png";

class ProductPage extends React.Component {


    render() {
        return (
            <div className="cart-container">
                <ul className="cart-images">
                    <li className="cart-image">
                        <img alt="" src={image} className="cart-img"/>
                    </li>
                    <li className="cart-image">
                        <img alt="" src={image} className="cart-img"/>
                    </li>
                    <li className="cart-image">
                        <img alt="" src={image} className="cart-img"/>
                    </li>
                </ul>
                <div className="test">
                    <div className="chosen-image">
                        <img alt="" src={image} className="chosen-img"/>
                    </div>
                </div>
                <div className="cart-info">
                    <p className="cart-name-1">Apollo</p>
                    <p className="cart-name-2">Running Short</p>
                    <p className="size-text">SIZE:</p>
                    <div className="sizes">
                        <div style={{height: 45, width: 63, background: "black"}}></div>
                        <div style={{height: 45, width: 63, background: "black"}}></div>
                        <div style={{height: 45, width: 63, background: "black"}}></div>
                        <div style={{height: 45, width: 63, background: "black"}}></div>
                    </div>
                    <p className="cart-price">PRICE:</p>
                    <p className="price">$50.50</p>
                    <button className="add-button">ADD TO CART</button>
                    <p className="description">Find stunning women's cocktail dresses and party dresses.
                        Stand out in lace and metallic cocktail dresses and party dresses from all your
                        favorite brands.
                    </p>
                </div>
            </div>
        );
    }
}

export default ProductPage;