import "./CartPage.css";
import React from "react";
import CartProduct from "../../components/CartProduct/CartProduct";

class CartPage extends React.Component {


    render() {
        return (
            <div>
                <h1 className="title">CART</h1>
                {[1, 2].map((product, key) => {
                    return(
                        <CartProduct key={key}/>
                    )
                })}
            </div>
        );
    }
}

export default CartPage;