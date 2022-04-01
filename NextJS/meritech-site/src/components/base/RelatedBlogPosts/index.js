import PropTypes from 'prop-types';
import { BlogPostType } from 'types';
import { Col, Row } from '~grid';
import BlogPostCard from '~baseComponents/BlogPostCard';
import * as styles from './RelatedBlogPosts.module.scss';

export default function RelatedBlogPosts({ relatedBlogPosts }) {
  // console.log(`RelatedBlogPosts relatedBlogPosts: `, relatedBlogPosts);

  if (!relatedBlogPosts.length) {
    return null;
  }
  return (
    <div className={styles.component}>
      <h3 className={styles.title}>More</h3>
      <Row className={styles.finalRow}>
        {relatedBlogPosts.map((post, index) => (
          <Col xs={12} md={6} xl={3} key={index}>
            <BlogPostCard {...post} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

RelatedBlogPosts.propTypes = {
  relatedBlogPosts: PropTypes.arrayOf(PropTypes.shape(BlogPostType)).isRequired,
};
