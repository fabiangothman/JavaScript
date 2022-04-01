import React from "react";
import PropTypes from "prop-types";

const Grid = ({ children, className, fluid = false }) => {
  return (
    <div
      className={`${fluid ? "container-fluid" : "container"} ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

Grid.defaultProps = {
  className: null,
  children: null,
  fluid: false,
};

Grid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  fluid: PropTypes.bool,
};

export default Grid;
