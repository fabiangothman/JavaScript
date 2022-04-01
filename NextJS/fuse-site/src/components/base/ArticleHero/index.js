/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import cx from 'classnames';
import { Row, Col, Grid } from '~grid';
import styles from './ArticleHero.module.scss';
import {
  BlogHeroArticleLinesLeft,
  BlogHeroArticleLinesRight,
} from '~baseComponents/Icons';
import backgroundImage from '~assets/images/blog-article-bg.jpg';
import BlogHeroArticleLinesRightMobile from '~baseComponents/Icons/BlogHeroArticleLinesRightMobile';

const ArticleHero = ({ title, postedOn, author, category }) => {
  return (
    <div className={styles.hero}>
      <BlogHeroArticleLinesLeft
        className={cx(styles.linesCol, styles.linesColLeft)}
      />
      <Grid>
        <Row className="no-pad">
          <Col xs={9} lg={8} lgOffset={1} className={styles.higherColumn}>
            <div>
              <h2 className={styles.title}>{title}</h2>
            </div>
          </Col>
        </Row>
        <Row className="no-pad">
          <Col xs={9} lg={8} lgOffset={1} className={styles.higherColumn}>
            <div className={styles.article}>
              <div className={styles.articleInfo}>
                {category} | By {author}
              </div>
              <div className={styles.articleDate}>
                {format(new Date(postedOn), 'MMMM d, yyyy')}
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
      <BlogHeroArticleLinesRight
        className={cx(styles.linesCol, styles.linesColRight, styles.svgDesktop)}
      />
      <BlogHeroArticleLinesRightMobile
        className={cx(styles.linesCol, styles.linesColRight, styles.svgMobile)}
      />
      <img src={backgroundImage.src} className={styles.heroBackground} alt="" />
    </div>
  );
};

ArticleHero.propTypes = {
  title: PropTypes.string.isRequired,
  postedOn: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ArticleHero;
