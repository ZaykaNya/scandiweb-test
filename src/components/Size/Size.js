import "./Size.css";
import React from "react";

class Size extends React.Component {

    constructor(props) {
        super(props);
        this.state = {styles: {}};
    }

    componentDidMount() {
        if (this.props.active) {
            this.setState({
                styles: {background: "#1D1F22", color: "white"}
            });
        } else if(this.props.outOfStock) {
            this.setState({
                styles: {border: "1px solid #A6A6A6", color: "#A6A6A6"}
            });
        }
    }

    render() {
        return(
            <button style={this.state.styles} className="size-container">
                {this.props.size}
            </button>
        );
    }
}

export default Size;