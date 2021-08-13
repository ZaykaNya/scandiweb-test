import "./ProductPage.css"
import React from "react";
import image from "../../clothes-1.png";
import Size from "../../components/Size/Size";

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
                    <div>
                        <p className="cart-name-1">Apollo</p>
                        <p className="cart-name-2">Running Short</p>
                    </div>
                    <div>
                        <p className="size-text">SIZE:</p>
                        <div className="sizes">
                            <Size size="XS" outOfStock={true}/>
                            <Size size="S" active={true}/>
                            <Size size="M"/>
                            <Size size="L"/>
                        </div>
                    </div>
                    <div>
                        <p className="cart-price">PRICE:</p>
                        <p className="price">$50.50</p>
                    </div>
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