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
                styles: {
                    background: "#1D1F22",
                    color: "white",
                    border: "1px solid #1D1F22"
                }
            });
            if (this.props.attr.type === "swatch") {
                this.setState({
                    styles: {
                        background: this.props.value,
                        color: "transparent",
                        boxShadow: `0 0 5px 2px grey`,
                        border: 0,
                    }
                });
            }
        } else if (this.props.outOfStock) {
            this.setState({
                styles: {border: "1px solid #A6A6A6", color: "#A6A6A6"}
            });
        } else if (this.props.attr.type === "swatch") {
            this.setState({
                styles: {
                    background: this.props.value,
                    color: "transparent",
                    boxShadow: `0 0 5px 0px grey`,
                    border: 0
                }
            });
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.active !== prevProps.active) {
            if (this.props.active) {
                if (this.props.attr.type === "swatch") {
                    this.setState({
                        styles: {
                            background: this.props.value,
                            color: "transparent",
                            boxShadow: `0 0 5px 2px grey`,
                            border: 0,
                        }
                    });
                } else {
                    this.setState({
                        styles: {
                            background: "#1D1F22",
                            color: "white",
                            border: "1px solid #1D1F22"
                        }
                    });
                }
            } else if (this.props.outOfStock) {
                this.setState({
                    styles: {border: "1px solid #A6A6A6", color: "#A6A6A6"}
                });
            } else if (this.props.attr.type === "swatch") {
                this.setState({
                    styles: {
                        background: this.props.value,
                        color: "transparent",
                        boxShadow: `0 0 5px 0px grey`,
                        border: 0
                    }
                });
            } else {
                this.setState({
                    styles: {}
                });
            }

        }
    }

    //currentAttributes, size, value, name, id
    handleChangeAttributes() {
        let attributes = [...this.props.currentAtrributes];

        if (attributes.filter(attribute => attribute.name === this.props.name).length > 0) {
            let attribute = {
                name: this.props.name,
                id: this.props.id
            }
            attributes.splice(this.props.index, 1, attribute)
        } else {
            attributes.push({
                name: this.props.name,
                id: this.props.id
            });
        }

        this.props.changeProduct(attributes);
    }

    render() {
        return (
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