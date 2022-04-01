import React from 'react';
import cx from 'classnames';
import Image from 'baseComponents/CmsImage';
//  Styles
import styles from './ProfileCard.module.scss';

const ProfileCard = ({
  className,
  profile,
  ...props
}) => {
  const image = require(`../../../../public/${profile.image}`);

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <div className={styles.card}>
        <div className={styles.contImage}>
          <Image
            alt={`Profile image of ${profile.name}`}
            src={image}
            objectFit="cover"
            layout="fill"
            className={styles.image}
          />
        </div>
        <div className={styles.role}>
          <span>{ profile.role }</span>
        </div>
        <div className={styles.name}>
          <span>{ profile.name }</span>
        </div>
        <div className={styles.description}>
          <span>{ profile.description }</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
