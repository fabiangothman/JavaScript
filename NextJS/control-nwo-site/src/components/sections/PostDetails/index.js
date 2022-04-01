import React from 'react';
import Image from 'baseComponents/CmsImage';
import Link from 'next/link';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
import Header from 'baseComponents/Header';
import RichText from 'baseComponents/RichText';
import { Facebook, Twitter } from 'components/icons';
import PostCardFeatured from 'baseComponents/PostCardFeatured';
import SOCIAL from 'data/social';
//  Styles
import styles from './PostDetails.module.scss';

const PostDetails = ({
  className,
  title,
  date,
  image,
  content,
  slug,
  path,
  nextPost = null,
  ...props
}) => {
  // console.log(`PostDetails title: `, title);
  // return null;
  const dateFormat = new Date(date);

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        <Row>
          <Col xs={12} lgOffset={2} lg={8}>
            <div className={styles.contImage}>
              {image && <Image
                alt={image.alt}
                src={image.url}
                objectFit="cover"
                layout="fill"
                className={styles.image}
              />}
            </div>
          </Col>
        </Row>
        <Row className={styles.reverse}>
          <Col xs={12} lgOffset={2} lg={6}>
            <div className={styles.title}>
              <Header tag="div" gradient>{ title }</Header>
            </div>
          </Col>
          <Col xs={12} lg={2}>
            <div className={styles.date}>
              {date && <span>{ `${(dateFormat.getUTCMonth()+1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
              })}.${dateFormat.getUTCDate().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
              })}.${dateFormat.getUTCFullYear()}` }</span>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lgOffset={2} lg={8}>
            <div className={styles.content}>
              <RichText
                headingStyle={styles.heading}
                h1Style={styles.h1}
                h2Style={styles.h2}
                imageStyle={styles.image}
                pStyle={styles.text}
                content={content}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className={styles.socialArea}>
              <div className={styles.social}>
                <Link href={ SOCIAL.facebook } as={ SOCIAL.facebook }>
                  <a className={styles.link} target="_blank">
                    <Facebook width="25" height="100%" className={styles.icon} />
                  </a>
                </Link>
              </div>
              <div className={styles.social}>
                <Link href={ SOCIAL.twitter } as={ SOCIAL.twitter }>
                  <a className={styles.link} target="_blank">
                    <Twitter width="25" height="100%" className={styles.icon} />
                  </a>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lgOffset={2} lg={8}>
            {nextPost && <PostCardFeatured {...nextPost} featText="Read Next" />}
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default PostDetails;
