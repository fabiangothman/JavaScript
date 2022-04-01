import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { FutureHorizon } from "components/icons";
//  Styles
import styles from "./LogoDivider.module.scss";

const LogoDivider = ({ className, ...props }) => {
  // console.log(`LogoDivider props: `, props);
  // return null;

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.leftLine} />
        <div className={styles.logo}>
          <FutureHorizon width="37" />
        </div>
        <div className={styles.rightLine} />
      </div>
    </div>
  );
};

export default LogoDivider;

export const LogoDividerType = {
  className: PropTypes.string,
};
LogoDivider.defaultProps = {
  className: "",
};
LogoDivider.propTypes = LogoDividerType;
