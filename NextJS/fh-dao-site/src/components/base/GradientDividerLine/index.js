import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
//  Styles
import styles from "./GradientDividerLine.module.scss";

const GradientDividerLine = ({ className, showOnlyOnMobile, ...props }) => {
  // console.log(`GradientDividerLine props: `, props);
  // return null;

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div
        className={cx(
          styles.divider,
          showOnlyOnMobile ? styles.showOnMobile : ""
        )}
      />
    </div>
  );
};

export default GradientDividerLine;

export const GradientDividerLineType = {
  className: PropTypes.string,
  showOnlyOnMobile: PropTypes.bool,
};
GradientDividerLine.defaultProps = {
  className: "",
  showOnlyOnMobile: false,
};
GradientDividerLine.propTypes = GradientDividerLineType;
