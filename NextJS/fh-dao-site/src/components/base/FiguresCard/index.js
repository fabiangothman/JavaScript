import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
//  Styles
import styles from "./FiguresCard.module.scss";

const FiguresCard = ({
  className,
  icon,
  text,
  number,
  borderLeft,
  borderRight,
  ...props
}) => {
  // console.log(`FiguresCard props: `, props);
  // return null;

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.card}>
        <div className={styles.icon}>{icon}</div>
        <div
          className={cx(
            styles.content,
            borderLeft ? styles.borderLeft : "",
            borderRight ? styles.borderRight : ""
          )}
        >
          <div className={styles.text}>
            <span>{text}</span>
          </div>
          <div className={styles.number}>
            <span>{number}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiguresCard;

export const FiguresCardType = {
  className: PropTypes.string,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  borderLeft: PropTypes.bool,
  borderRight: PropTypes.bool,
};
FiguresCard.defaultProps = {
  className: "",
  borderLeft: false,
  borderRight: false,
};
FiguresCard.propTypes = FiguresCardType;
