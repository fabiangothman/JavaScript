import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { RichTextTypes } from '~baseComponents/RichText';

import { Col, Grid, Row } from '~grid';
import styles from './BlogHero.module.scss';

const BlogHero = ({ content }) => {
  return (
    <div className={styles.hero}>
      <Grid className={styles.container}>
        <Row className="no-pad">
          <Col xs={11} lgOffset={1} lg={8} className={styles.contentWrapper}>
            <small className={styles.author}>
              {content.category} | Featured
            </small>
            <Link href={`/blog/${content.slug}`} passHref>
              <p className={styles.title}>
                <a href="..." target="_blank">
                  {content.title}
                </a>
              </p>
            </Link>
            <small className={styles.author}>{content.author}</small>
          </Col>
        </Row>
        <Row className={cx(styles.imageLayer, 'no-pad')}>
          <Col xs={4} lg={7} className={styles.linesColumn}>
            <svg
              className={styles.imageLineMobile}
              width="88"
              height="250"
              viewBox="0 0 88 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="87.75"
                y1="250"
                x2="87.75"
                y2="-1.04673e-08"
                stroke="#8F1F1B"
                strokeWidth="0.5"
              />
              <line
                x1="30.75"
                y1="250"
                x2="30.75"
                y2="-1.04673e-08"
                stroke="#8F1F1B"
                strokeWidth="0.5"
              />
            </svg>

            <svg
              className={styles.imageLineDesktop}
              width="336"
              height="379"
              viewBox="0 0 336 379"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="335.5"
                y1="379"
                x2="335.5"
                y2="-3.17368e-08"
                stroke="#8F1F1B"
              />
              <line
                x1="278.5"
                y1="379"
                x2="278.5"
                y2="-3.17368e-08"
                stroke="#8F1F1B"
              />
              <line
                x1="165.5"
                y1="379"
                x2="165.5"
                y2="-3.17368e-08"
                stroke="#8F1F1B"
              />
              <line
                x1="0.5"
                y1="379"
                x2="0.500011"
                y2="-3.17368e-08"
                stroke="#8F1F1B"
              />
            </svg>
          </Col>
          <Col xs={8} lg={5} className={styles.imageColumn}>
            {content.featuredImage?.fields?.file && (
              <div className={styles.imageWrapper}>
                <svg
                  className={styles.imageLineMobile}
                  width="1"
                  height="333"
                  viewBox="0 0 1 333"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0.5"
                    y1="333"
                    x2="0.500015"
                    y2="-2.18557e-08"
                    stroke="#8F1F1B"
                  />
                </svg>
                <svg
                  className={styles.imageLineDesktop}
                  width="2"
                  height="499"
                  viewBox="0 0 2 499"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="1"
                    y1="499"
                    x2="0.999978"
                    y2="4.37114e-08"
                    stroke="#8F1F1B"
                    strokeWidth="2"
                  />
                </svg>
                <div className={styles.imageInner}>
                  <Image
                    alt=""
                    src={`https:${content.featuredImage.fields.file.url}`}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left bottom"
                  />
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

BlogHero.propTypes = {
  content: RichTextTypes.isRequired,
};

export default BlogHero;
