import React from "react";
import PropTypes from "prop-types";

const ItemContainer = props => {
    const {onDoubleClick, onClick, style, children} = props;
    return (
        <div
            style={{width: 'auto', height: 'auto', display: 'inline-block', margin: 0, ...style}}
            onDoubleClick={onDoubleClick}
            onClick={onClick}>
            {children}
        </div>
    )
}

ItemContainer.propTypes = {
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.any
}

ItemContainer.defaultProps = {
    onDoubleClick: () => {},
    onClick: () => {},
    style: {},
    children: null,
}

export default ItemContainer;