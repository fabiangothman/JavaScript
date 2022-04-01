import React from 'react';
import Image from 'baseComponents/CmsImage';
import Link from 'next/link';
import cx from 'classnames';
import { Col, Grid, Row } from 'components/grid';
import Header from 'baseComponents/Header';
//  Styles
import styles from './PostCardFeatured.module.scss';

const PostCardFeatured = ({
  className,
  title,
  date,
  image,
  content = null,
  slug,
  path,
  featText = "Featured",
  ...props
}) => {
  // console.log(`PostCardFeatured content: `, content);
  // return null;
  const firstParagraph = content ? content.content.find(cont => cont.nodeType === "paragraph" ) : null;
  const contMaxWords = 12;
  
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
      <div className={styles.featText}>
        <span>{ featText }</span>
      </div>
      {path && slug && (
        <Link href={ `${path}${slug}` } passHref>
          <a className={styles.link} target="_self">
            <div className={styles.title}>
              <Header tag="div" gradient>{ title }</Header>
            </div>
            <div className={styles.content}>
              {firstParagraph && (
                <span>{ `${firstParagraph.content[0].value.split(' ').slice(0, contMaxWords).join(' ')}...` }</span>
              )}
            </div>
          </a>
        </Link>
      )}      
    </div>
  );
}

export default PostCardFeatured;
