import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';

import { Row, Col } from '~grid';
import styles from './NextArticle.module.scss';
import { BlogNextLinesLeft, BlogNextLinesRight } from '~baseComponents/Icons';
import BlogNextLinesLeftMobile from '~baseComponents/Icons/BlogNextLinesLeftMobile';

const NextArticle = ({ title, category, slug }) => {
  return (
    <div className={styles.next}>
      <div className="container">
        <Row>
          <Col
            xs={3}
            lg={2}
            className={cx(styles.linesCol, styles.linesColLeft)}
          >
            <BlogNextLinesLeft className={styles.svgDesktop} />
            <BlogNextLinesLeftMobile className={styles.svgMobile} />
          </Col>
          <Col xs={9} lg={9} className={styles.content}>
            <div className={styles.wrapper}>
              <div className={styles.article}>
                <div className={styles.articleGoBack}>
                  <Link href="/blog" passHref>
                    <a href="...">Back | All Blog Posts</a>
                  </Link>
                </div>
                <div className={styles.articleInfo}>Next | {category}</div>
              </div>
              <Link href={`/blog/${slug}`} passHref>
                <h3 className={styles.title}>
                  <a href="...">{title}</a>
                </h3>
              </Link>
            </div>
          </Col>
          <Col
            xs={12}
            lg={1}
            className={cx(styles.linesCol, styles.linesColRight)}
          >
            <BlogNextLinesRight />
          </Col>
        </Row>
      </div>
    </div>
  );
};

NextArticle.defaultProps = {
  title: '',
  category: '',
  slug: '',
};

NextArticle.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  slug: PropTypes.string,
};

export default NextArticle;
