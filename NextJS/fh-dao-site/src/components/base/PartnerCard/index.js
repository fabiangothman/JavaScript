import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import cx from "classnames";
//  Styles
import styles from "./PartnerCard.module.scss";

const PartnerCard = ({ className, image, ...props }) => {
  // console.log(`PartnerCard props: `, props);
  // return null;

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.content}>
        <div
          className={cx(
            styles.contImage,
            image ? styles.bgTransparent : styles.bgGreen
          )}
        >
          {image && image.url && (
            <Image
              alt={image.alt}
              src={image.url}
              width={image.width}
              height={image.height}
              objectFit="contain"
              layout="intrinsic"
              className={styles.image}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;

export const PartnerCardType = {
  className: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};
PartnerCard.defaultProps = {
  className: "",
  image: null,
};
PartnerCard.propTypes = PartnerCardType;
