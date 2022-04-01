import React, {useState} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Link from "next/link";
//  Styles
import styles from "./Button.module.scss";

const Button = ({
                  className,
                  url,
                  label,
                  openInNewTab,
                  backgroundColor,
                  textColor,
                  shadow,
                  borderColor,
                  hoverLabel,
                  hoverBackgroundColor,
                  hoverTextColor,
                  hoverBorderColor,
                  extraClassName,
                  ...props
                }) => {
  // console.log(`Button label: `, label);
  // return null;
  const [_label, setLabel] = useState(label);
  const [_backgroundColor, setBackgroundColor] = useState(backgroundColor);
  const [_textColor, setTextColor] = useState(textColor);
  const [_borderColor, setBorderColor] = useState(borderColor);

  const mouseEnter = () => {
    if (hoverLabel) setLabel(hoverLabel);
    if (hoverBackgroundColor) setBackgroundColor(hoverBackgroundColor);
    if (hoverTextColor) setTextColor(hoverTextColor);
    if (hoverBorderColor) setBorderColor(hoverBorderColor);
  };
  const mouseLeave = () => {
    setLabel(label);
    setBackgroundColor(backgroundColor);
    setTextColor(textColor);
    setBorderColor(borderColor);
  };

  return (
    <div className={cx(styles.component, className)} {...props}>
      <Link href={url}>
        <a target={openInNewTab ? "_blank" : "_self"} className={styles.button}>
          <div
            className={cx(
              styles.content,
              styles[`bg_${_backgroundColor}`],
              styles[`txt_${_textColor}`],
              styles[`bor_${_borderColor}`],
              styles[`${extraClassName}`],
              {
                [styles.shadow]: shadow, 
              }
            )}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          >
            <span>{_label.toUpperCase()}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Button;

export const ButtonType = {
  className: PropTypes.string,
  url: PropTypes.string,
  label: PropTypes.string.isRequired,
  openInNewTab: PropTypes.bool,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  hoverLabel: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  hoverTextColor: PropTypes.string,
  hoverBorderColor: PropTypes.string,
  extraClassName: PropTypes.string,
};
Button.defaultProps = {
  className: "",
  url: "/",
  openInNewTab: true,
  backgroundColor: "black",
  textColor: "blue-white",
  borderColor: "transparent",
  hoverLabel: "",
  hoverBackgroundColor: "transparent",
  hoverTextColor: "black",
  hoverBorderColor: "black",
  extraClassName: "",
};
Button.propTypes = ButtonType;
