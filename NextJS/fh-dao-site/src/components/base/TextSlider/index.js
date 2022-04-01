import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { LeftArrow, RightArrow } from "components/icons";
//  Styles
import styles from "./TextSlider.module.scss";

const TextSlider = ({ className, items, ...props }) => {
  // console.log(`TextSlider props: `, props);
  // return null;
  const [currentItem, setCurrentItem] = useState(0);

  const nextSlide = () => {
    setCurrentItem((prevItem) =>
      prevItem === items.length - 1 ? 0 : prevItem + 1
    );
  };
  const prevSlide = () => {
    setCurrentItem((prevItem) =>
      prevItem === 0 ? items.length - 1 : prevItem - 1
    );
  };

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.slider}>
        <div className={styles.content}>
          <div className={styles.name}>
            <span>{items[currentItem].name.toUpperCase()}</span>
          </div>
          {items[currentItem].texts.map((text, jindex) => (
            <p key={jindex} className={styles.paragraph}>
              {text}
            </p>
          ))}
        </div>
        <div className={styles.actions}>
          <LeftArrow className={styles.arrow} onClick={prevSlide} />
          <div className={styles.progress}>
            <span>{`${currentItem + 1}/${items.length}`}</span>
          </div>
          <RightArrow className={styles.arrow} onClick={nextSlide} />
        </div>
      </div>
    </div>
  );
};

export default TextSlider;

export const TextSliderType = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      texts: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
TextSlider.defaultProps = {
  className: "",
  items: [],
};
TextSlider.propTypes = TextSliderType;
