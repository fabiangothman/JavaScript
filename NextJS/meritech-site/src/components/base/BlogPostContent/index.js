import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import * as styles from './BlogPostContent.module.scss';
import RichText, { RichTextTypes } from '~baseComponents/RichText';

export default function BlogPostContent({ blogContent, slug }) {
  // console.log("BlogPostContent slug: ", slug);

  const [leftMargin, setLeftMargin] = useState(false);
  useEffect(() => {
    const h2s = document.querySelectorAll('.blog-content h2');
    // if h2s, then add margin where Table Of Contents can show up. Table Of Contents also uses the same condition so it is consitent
    if (h2s?.length) {
      setLeftMargin(true);
    } else {
      setLeftMargin(false);
    }
  }, [slug]);
  return (
    <article className={cx(styles.component, 'blog-content')}>
      <RichText
        className={styles.blogContent}
        imageStyle={cx(styles.thumbnail, leftMargin && styles.smallContainer)}
        headingStyle={cx(styles.subtitle, leftMargin && styles.smallContainer)}
        h2Style={cx(styles.title, leftMargin && styles.smallContainer)}
        pStyle={cx(styles.text, leftMargin && styles.smallContainer)}
        content={blogContent}
      />
    </article>
  );
}

BlogPostContent.propTypes = {
  blogContent: RichTextTypes.isRequired,
  slug: PropTypes.string.isRequired,
};
