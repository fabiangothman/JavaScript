import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const Grid = ({ children, className }) => {
  return <div className={cx('container', className)}>{children}</div>;
};

Grid.defaultProps = {
  className: null,
  children: null,
};

Grid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Grid;
