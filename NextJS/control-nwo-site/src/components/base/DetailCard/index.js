import React from 'react';
import Image from 'baseComponents/CmsImage';
import cx from 'classnames';
//  Styles
import styles from './DetailCard.module.scss';

const DetailCard = ({
  className,
  title,
  text,
  image,
  ...props
}) => {
  // console.log(`DetailCard image: `, image);
  // return null;
  
  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <div className={styles.contImage}>
        {image && <Image
          alt={image.alt}
          src={image.url}
          objectFit="cover"
          layout="fill"
          className={styles.image}
        />}
      </div>
      <div className={styles.title}>
        <span>{ title }</span>
      </div>
      <div className={styles.text}>
        <span>{ text }</span>
      </div>
    </div>
  );
}

export default DetailCard;
