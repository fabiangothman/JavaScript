import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import {
  TopNature1,
  TopNature2,
  TopNature3,
  TopNature4,
} from "components/icons";
// Styles
import styles from "./NatureBackground.module.scss";

const NatureBackground = ({ className, children, ...props }) => {
  // console.log(`NatureBackground props: `, props);
  // return null;

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={cx(styles.topNature1, styles.showOnDesktop)}>
        <TopNature1 />
      </div>
      <div className={cx(styles.topNature2, styles.showOnDesktop)}>
        <TopNature2 />
      </div>
      <div className={cx(styles.topNature3, styles.showOnDesktop)}>
        <TopNature3 />
      </div>
      <div className={cx(styles.topNature4, styles.showOnMobile)}>
        <TopNature4 />
      </div>
      {children}
    </div>
  );
};

export default NatureBackground;

export const NatureBackgroundType = {
  className: PropTypes.string,
  children: PropTypes.node,
};
NatureBackground.defaultProps = {
  className: "",
  children: null,
};
NatureBackground.propTypes = NatureBackgroundType;
