import React from 'react';
import Image from 'baseComponents/CmsImage';
import Link from 'next/link';
import cx from 'classnames';
//  Styles
import styles from './PostCard.module.scss';

const PostCard = ({
  className,
  title,
  date,
  image,
  content,
  slug,
  path,
  showInLine = false,
  ...props
}) => {
  // console.log(`PostCard content: `, content);
  // return null;
  const firstParagraph = content.content.find(cont => cont.nodeType === "paragraph" );
  const contMaxWords = 12;
  const dateFormat = new Date(date);
  
  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      {path && slug && (
        <Link href={ `${path}${slug}` } passHref>
          <a className={styles.link} target="_self">
            <div className={cx(
              styles.card,
              showInLine ? styles.row : styles.column
            )}>
              <div className={styles.contImage}>
                {image && <Image
                  alt={image.alt}
                  src={image.url}
                  objectFit="cover"
                  layout="fill"
                  className={styles.image}
                />}
              </div>
              <div className={styles.contInfo}>
                <div className={styles.date}>
                  {date && <span>{ `${(dateFormat.getUTCMonth()+1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                  })}.${dateFormat.getUTCDate().toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                  })}.${dateFormat.getUTCFullYear()}` }</span>}
                </div>
                <div className={styles.title}>
                  <span>{ title }</span>
                </div>
                <div className={styles.content}>
                  {firstParagraph && (
                    <span>{ `${firstParagraph.content[0].value.split(' ').slice(0, contMaxWords).join(' ')}...` }</span>
                  )}
                </div>
              </div>
            </div>
          </a>
        </Link>
      )}
    </div>
  );
}

export default PostCard;
