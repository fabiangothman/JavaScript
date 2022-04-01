import React from 'react';
import Image from 'baseComponents/CmsImage';
import Link from 'next/link';
import cx from 'classnames';
import Button from 'baseComponents/Button';
//  Styles
import styles from './CatalogItemCard.module.scss';

const CatalogItemCard = ({
  className,
  title = "",
  text = "",
  image = null,
  slug = "",
  path = "",
  ...props
}) => {
  // console.log(`CatalogItemCard image: `, image);
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
      <Link href={ `${path}${slug}` } as={ `${path}${slug}` }>
        <a className={styles.link} target="_self">
          <Button
            tag="button"
            color="blue"
            outlined
            rounded
          >
            <span>Learn more</span>
          </Button>
        </a>
      </Link>
    </div>
  );
}

export default CatalogItemCard;
