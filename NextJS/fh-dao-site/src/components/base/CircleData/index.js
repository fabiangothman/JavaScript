import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
//  Styles
import styles from "./CircleData.module.scss";

const CircleData = ({ className, goal, value, raised, round, ...props }) => {
  // console.log(`CircleData props: `, props);
  // return null;

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.circleWrapper}>
        <div className={styles.externalCircle}>
          <div className={cx(styles.internalCircle, styles.circleBorder)}>
            <div className={styles.circleContent}>
              <div className={styles.goal}>
                <span>{goal}</span>
              </div>
              <div className={styles.value}>
                <span>{value}</span>
              </div>
              <div className={styles.raised}>
                <span>{raised}</span>
              </div>
              <div className={styles.round}>
                <span>{round}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleData;

export const CircleDataType = {
  className: PropTypes.string,
  goal: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  raised: PropTypes.string.isRequired,
  round: PropTypes.string.isRequired,
};
CircleData.defaultProps = {
  className: "",
};
CircleData.propTypes = CircleDataType;
