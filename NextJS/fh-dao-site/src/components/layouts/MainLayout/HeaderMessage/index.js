import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
//  Styles
import styles from "./HeaderMessage.module.scss";

const HeaderMessage = ({ className, headerMessage, ...props }) => {
  // console.log(`Footer headerMessage: `, headerMessage);
  // return null;

  if (!headerMessage) return null;

  return (
    <header className={cx(styles.component, className)} {...props}>
      <div className={styles.contMessage}>
        <span className={styles.message}>{headerMessage}</span>
      </div>
    </header>
  );
};

export default HeaderMessage;

export const HeaderMessageType = {
  className: PropTypes.string,
  headerMessage: PropTypes.string,
};
HeaderMessage.defaultProps = {
  className: "",
  headerMessage: "",
};
HeaderMessage.propTypes = HeaderMessageType;
