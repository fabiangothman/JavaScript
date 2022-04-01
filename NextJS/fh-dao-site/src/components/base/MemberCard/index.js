import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import cx from "classnames";
import { ProfileShadow } from "components/icons";
//  Styles
import styles from "./MemberCard.module.scss";

const MemberCard = ({ className, image, name, role, about, ...props }) => {
  // console.log(`MemberCard props: `, props);
  // return null;
  const defaultName = "Revealed soon";

  return (
    <div className={cx(styles.component, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.contImage}>
          {image && image.url && (
            <Image
              alt={image.alt}
              src={image.url}
              objectFit="cover"
              layout="fill"
              className={styles.image}
            />
          )}
          {!image && <ProfileShadow height="158" />}
        </div>
        <div className={styles.description}>
          <div className={styles.name}>
            <span>{name ? name.toUpperCase() : defaultName}</span>
          </div>
          {role && (
            <div className={styles.role}>
              <span>{role}</span>
            </div>
          )}
          {about && (
            <div className={styles.about}>
              <span>{about}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;

export const MemberCardType = {
  className: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  name: PropTypes.string,
  role: PropTypes.string,
  about: PropTypes.string,
};
MemberCard.defaultProps = {
  className: "",
  image: null,
  name: "",
  role: "",
  about: "",
};
MemberCard.propTypes = MemberCardType;
