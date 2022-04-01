import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import cx from "classnames";
//  Styles
import styles from "./HeroImage.module.scss";

const HeroImage = ({ className, ...props }) => {
  // console.log(`Footer footerMenu: `, footerMenu);
  // return null;
  const topLeftText = "Fig 1.";
  const topRightText = "1 of 1";
  const bottomLeftText = "Astropanthera Tigris";
  const bottomRightText = "Vanguardus";

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.imageCont}>
        <Image
          src="/images/hero/featured.png"
          alt="Future horizon featured hero image"
          objectFit="contain"
          layout="responsive"
          width={1280}
          height={1280}
        />
        <div className={styles.square}>
          <div className={styles.content}>
            <div className={styles.topArea}>
              <div className={styles.topLeftText}>
                <span>{topLeftText}</span>
              </div>
              <div className={styles.topRightText}>
                <span>{topRightText}</span>
              </div>
            </div>
            <div className={styles.externalSquare}>
              <div className={styles.internalSquare} />
            </div>
            <div className={styles.bottomArea}>
              <div className={cx(styles.bottomLeftText, styles.showOnDesktop)}>
                <span>{bottomLeftText}</span>
              </div>
              <div className={cx(styles.bottomRightText, styles.showOnDesktop)}>
                <span>{bottomRightText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx(styles.bottomText, styles.showOnMobile)}>
        <span>{bottomLeftText}</span>
      </div>
    </div>
  );
};

export default HeroImage;

export const HeroImageType = {
  className: PropTypes.string,
};
HeroImage.defaultProps = {
  className: "",
};
HeroImage.propTypes = HeroImageType;
