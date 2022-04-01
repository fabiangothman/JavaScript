import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BlogPostType } from 'types';
import { useRouter } from 'next/router';
import * as styles from './BlogLandingPage.module.scss';
import { Col, Row, Grid } from '~grid';
import BlogPostCard from '~baseComponents/BlogPostCard';
import SubscribeForm from '~baseComponents/SubscribeForm';
import { RichTextTypes } from '~baseComponents/RichText';
import BlogLandingFilter from '~baseComponents/BlogLandingFilter';
import FeatureBlogPostCard from '~baseComponents/FeatureBlogPostCard';
import Button from '~baseComponents/Button';
import useIsMobile from '~hooks/useIsMobile';

export default function BlogLandingPage({
  message,
  featuredBlogPost,
  blogPosts,
  ...props
}) {
  const isMobile = useIsMobile();
  const [page, setPage] = useState(0);
  const [initialItemsLoad, setInitialItemsLoad] = useState(13);
  const totalItemsPerPage = 6;
  const router = useRouter();
  const category = router?.query?.category;

  useEffect(() => {
    setInitialItemsLoad(isMobile ? 8 : 13);
  }, [isMobile]);

  useEffect(() => {
    // It adds the subscribe form to the third position in the list on mobile.
    const subscribeFormEl = document.querySelector('.subscribe-form');
    const secondItem = document.querySelector('.post-item-1-col');
    if (subscribeFormEl && secondItem) {
      const newElementClass = `col-xs-12 ${styles.subscribeMobileForm}`;
      secondItem.insertAdjacentHTML(
        'afterend',
        `<div class="${newElementClass}">${subscribeFormEl.outerHTML}</div>`,
      );
    }
  }, []);

  const loadMoreHandler = () => {
    setPage((prev) => prev + 1);
  };

  let allBlog = [featuredBlogPost]
    .concat(
      blogPosts.sort((a, b) => {
        return new Date(b.publishDate) - new Date(a.publishDate);
      }),
    )
    .filter(Boolean)
    .filter((post) => {
      return category
        ? post.categories?.some(({ slug }) => slug === category)
        : true;
    });

  allBlog = allBlog.filter((post, index) => {
    return index === 0 || post?.sysId !== allBlog[0]?.sysId;
  });

  // finding the post with landingPageImage / featured post and putting it in the beginning of array
  const indexOfFeatured = allBlog.findIndex((obj) => {
    if (obj.landingPageImage?.url) {
      return true;
    }
    return false;
  });
  if (indexOfFeatured > -1) {
    const featuredPost = allBlog.splice(indexOfFeatured, 1);
    if (featuredPost?.length) {
      allBlog.unshift(featuredPost[0]);
    }
  }

  return (
    <div className={styles.component}>
      <Grid>
        <Row>
          <Col xs={12} lg={3}>
            <h2 className={styles.title}>Our Research</h2>
            <BlogLandingFilter {...props} />
            <SubscribeForm className={styles.subscribe} message={message} />
          </Col>
          <Col xs={12} lg={9}>
            <div>
              <Row>
                {allBlog
                  .slice(0, initialItemsLoad + page * totalItemsPerPage)
                  .map((post, index) => {
                    const isFirstPost =
                      index === 0 && post.landingPageImage?.url;

                    return (
                      <Col
                        xs={12}
                        className={`post-item-${index}-col`}
                        md={isFirstPost ? 12 : 6}
                        xl={isFirstPost ? 12 : 4}
                        key={index}
                      >
                        {index === 0 && post.landingPageImage?.url ? (
                          <FeatureBlogPostCard
                            className={styles.featurePost}
                            {...post}
                          />
                        ) : (
                          <BlogPostCard className={styles.card} {...post} />
                        )}
                      </Col>
                    );
                  })}
              </Row>

              {allBlog.length > initialItemsLoad + page * totalItemsPerPage && (
                <div className={styles.loadMoreArea}>
                  <Button
                    aria-label="Load more blog posts"
                    className={styles.loadMoreButton}
                    onClick={loadMoreHandler}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

BlogLandingPage.propTypes = {
  message: RichTextTypes.isRequired,
  featuredBlogPost: PropTypes.shape(BlogPostType).isRequired,
  blogPosts: PropTypes.arrayOf(PropTypes.shape(BlogPostType)).isRequired,
};
