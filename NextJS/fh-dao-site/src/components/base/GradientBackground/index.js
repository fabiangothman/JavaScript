import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
//  Styles
import styles from "./GradientBackground.module.scss";

const GradientBackground = ({
  id,
  className,
  includeFooter,
  extendToHeight,
  useGreen,
  useBlue,
  children,
  ...props
}) => {
  // console.log(`GradientBackground props: `, props);
  // return null;
  const [footerHeight, setFooterHeight] = useState(0);
  useEffect(() => {
    const onResize = () => {
      if (includeFooter) {
        const footer = document.getElementById("footerContainer").clientHeight;
        if (footer) setFooterHeight(footer);
      }
    };
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("scroll", onResize);
  }, [id, includeFooter]);

  return (
    <div id={id} className={cx(styles.component, className)} {...props}>
      <div
        className={cx(
          useGreen ? styles.bgGreen : "",
          useBlue ? styles.bgBlue : ""
        )}
      >
        <div
          className={cx(
            styles.background,
            useGreen ? styles.useGreen : "",
            useBlue ? styles.useBlue : "",
            extendToHeight ? styles.extendToHeight : styles.extendToWidth
          )}
          style={{
            marginBottom: `-${footerHeight}px`,
            paddingBottom: `${footerHeight}px`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default GradientBackground;

export const GradientBackgroundType = {
  id: PropTypes.string,
  className: PropTypes.string,
  includeFooter: PropTypes.bool,
  extendToHeight: PropTypes.bool,
  useGreen: PropTypes.bool,
  useBlue: PropTypes.bool,
  children: PropTypes.node,
};
GradientBackground.defaultProps = {
  id: "",
  className: "",
  includeFooter: false,
  extendToHeight: false,
  useGreen: false,
  useBlue: false,
  children: null,
};
GradientBackground.propTypes = GradientBackgroundType;
