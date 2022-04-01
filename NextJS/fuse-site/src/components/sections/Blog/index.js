/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { groupBy } from 'lodash';

import BlogHero from '~baseComponents/BlogHero';
import BlogListItem from '~baseComponents/BlogListItem';
import { Col, Grid, Row } from '~grid';
import { FilterIcon } from '~baseComponents/Icons';
import styles from './Blog.module.scss';
import { RichTextTypes } from '~baseComponents/RichText';
import BlogDividerBackground from '~sections/Blog/BlogDividerBackground';

const BlogSection = ({ articles: { content } }) => {
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});
  const [activeFilterOption, setActiveFilter] = useState('All');
  const [filteredContent, setFilteredContent] = useState([]);

  const groupContentByKey = useCallback(() => {
    const tags = {
      All: content,
      ...groupBy(content, 'category'),
      ...groupBy(content, 'author'),
    };
    setFilterOptions(tags);
  }, [content]);

  const handleFilterOptionClick = (option) => {
    setActiveFilter(option);
    setFilteredContent(filterOptions[option]);
  };

  useEffect(() => {
    groupContentByKey();
    setFilteredContent(content);
  }, [groupContentByKey, content]);

  return (
    <>
      {content[0] && <BlogHero content={content[0]} />}
      <BlogDividerBackground />
      <Grid className={styles.blogSectionWrapper}>
        <Row>
          <Col xs={12} lg={11} lgOffset={1}>
            <div className={styles.listHeader}>
              <span>Latest</span>
              <span onClick={() => setShowFilterRow(!showFilterRow)}>
                <FilterIcon />
                <span className={styles.listHeaderFilter}>Filter</span>
              </span>
            </div>
            {showFilterRow && (
              <>
                <hr />
                <div className={styles.tags}>
                  <p>Tags</p>
                  <div className={styles.tagsWrapper}>
                    {Object.keys(filterOptions).map((item, index) => (
                      <span
                        key={`${index}-tag-${item}`}
                        onClick={() => handleFilterOptionClick(item)}
                        className={cx(styles.tagsItem, {
                          [styles.tagsItemActive]: item === activeFilterOption,
                        })}
                      >
                        {item} ({filterOptions[item].length})
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </Col>
        </Row>

        <Row className="no-pad">
          <Col className={styles.listWrapper} xs={12} lg={11} lgOffset={1}>
            {filteredContent.map((article, index) => (
              <BlogListItem
                key={`blog-list-item-${article.slug}-${index}`}
                content={article}
              />
            ))}
          </Col>
        </Row>
      </Grid>
    </>
  );
};

BlogSection.propTypes = {
  articles: PropTypes.shape({
    content: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string,
        body: PropTypes.shape({
          content: PropTypes.arrayOf(RichTextTypes),
        }),
        category: PropTypes.string,
        hero: RichTextTypes,
        postedOn: PropTypes.string,
        slug: PropTypes.string,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};

export default BlogSection;
