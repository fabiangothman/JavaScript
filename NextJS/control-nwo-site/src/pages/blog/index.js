import React from 'react';
import MainLayout from 'layouts/MainLayout';
import { formatPost, getPageFieldsAndSettings } from 'api/utils';
import PostsHero from 'components/heros/PostsHero';
import PostCardFeatured from 'baseComponents/PostCardFeatured';
import PostsList from 'components/sections/PostsList';
import { Col, Grid, Row } from 'components/grid';
//  Styles
import styles from './Blog.module.scss';

const BlogTemplate = ({ settings, blog }) => {
  // console.log(`BlogTemplate settings: `, settings);
  // console.log(`BlogTemplate blog: `, blog);
  // return null;

  return (
    <MainLayout {...settings} headerBackground="gray-light">
      {blog.title && (
        <PostsHero id="hero" title={blog.title} />
      )}
      <div className={styles.background}>
        <Grid>
          <Row>
            <Col xs={12} lgOffset={2} lg={8}>
              {blog.featuredPost && (
                <PostCardFeatured
                  id="featured-post"
                  featText="Featured"
                  {...blog.featuredPost}
                />
              )}
            </Col>
          </Row>
        </Grid>
      </div>
      {blog.posts && (
        <PostsList
          id="posts-list"
          listText={blog.listText}
          posts={blog.posts}
        />
      )}
    </MainLayout>
  )
}

export default BlogTemplate;

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageBlog',
    include: 4,
  });
  const blog = {
    title: data?.title,
    featuredPost: formatPost(data?.featuredPost?.fields),
    listText: data?.listText,
    posts: data?.posts.map(post => formatPost(post?.fields)),
  };

  return {
    props: {
      settings: data?.settings,
      blog,
    },
  };
}