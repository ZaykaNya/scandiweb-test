import "./Size.css";
import React, {PureComponent} from "react";

class Size extends PureComponent {

    handleSetClassname() {
        const {
            modal,
            active,
            attr: {
                type
            }
        } = this.props;

        let className = "";

        modal ? className += " size-container-modal" : className += " size-container";

        if (type === "swatch") {
            if (active) {
                className += " size-color-active"
            } else {
                className += " size-color"
            }
        } else {
            if(active) {
                className += " size-text-active"
            }
        }

        return className;
    }


    handleChangeAttributes() {
        const {
            currentAttributes,
            name,
            id,
            index,
            changeProduct
        } = this.props

        let attributes = [...currentAttributes];

        if (attributes.filter(attribute => attribute.name === name).length > 0) {
            let attribute = {
                name: name,
                id: id
            }
            attributes.splice(index, 1, attribute)
        } else {
            attributes.push({
                name: name,
                id: id
            });
        }

        changeProduct(attributes);
    }

    render() {
        const {
            value,
            attr: {
                type,
            }
        } = this.props;

        let className = this.handleSetClassname();

        return (
            <button
                style={type === "swatch" ? {background: value} : {}}
                className={className}
                onClick={() => this.handleChangeAttributes()}
            >
                {value}
            </button>
        );
    }
}

export default Size;