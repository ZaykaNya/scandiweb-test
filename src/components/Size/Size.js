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

    //currentAttributes, size, value, name, id
    handleChangeAttributes () {
        let attributes = [...this.props.currentAtrributes];

        if(attributes.filter(attribute => attribute.name === this.props.name).length > 0) {
            let copy = attributes.filter(attribute => attribute.name !== this.props.name);
            let attribute = {
                name: this.props.name,
                id: this.props.id
            }
            copy.push(attribute);
            attributes = [...copy];
        } else {
            attributes.push({
                name: this.props.name,
                id: this.props.id
            });
        }

        this.props.changeProduct(attributes);
    }

    render() {
        return(
            <button
                style={this.state.styles}
                className={!this.props.modal ? "size-container" : "size-container-modal"}
                onClick={() => this.handleChangeAttributes()}
            >
                {this.props.size}
            </button>
        );
    }
}

export default Size;