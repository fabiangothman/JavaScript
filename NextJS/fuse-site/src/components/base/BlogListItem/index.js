/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import Link from 'next/link';
import { RichTextTypes } from '~baseComponents/RichText';
import { Col, Row } from '~grid';
import styles from './BlogListItem.module.scss';

const BlogListItem = ({ content: { category, author, title, slug } }) => {
  return (
    <div className={styles.listItem}>
      <Row className={styles.blogMeta}>
        <Col>{category}</Col>
        <Col>{author}</Col>
      </Row>
      <Row>
        <Col className={styles.title}>
          <Link href={`blog/${slug}`} passHref>
            <a href="...">{title}</a>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

BlogListItem.propTypes = {
  content: PropTypes.shape({
    category: PropTypes.string,
    author: RichTextTypes,
    slug: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default BlogListItem;
