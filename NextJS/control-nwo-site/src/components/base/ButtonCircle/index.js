import React, { useState } from 'react';
import cx from 'classnames';
//  Styles
import styles from './ButtonCircle.module.scss';


const ButtonCircle = ({
  className,
  text = "Submit",
  color = "blue",
  ...props
}) => {
  
  return (
    <button
      {...props}
      className={cx(styles.component, styles[color], className)}
    >
      <span>{text}</span>
    </button>
  );
}

export default ButtonCircle;
