import React from 'react';
import MainLayout from 'layouts/MainLayout';
import { formatPost, getPageFieldsAndSettings } from 'api/utils';
import PostsHero from 'components/heros/PostsHero';
import PostsBlocks from 'components/sections/PostsBlocks';

const NewsPage = ({ settings, news }) => {
  // console.log(`NewsPage news: `, news);
  // return null;

  return (
    <MainLayout {...settings} headerBackground="gray-light">
      {news.title && (
        <PostsHero id="hero" title={news.title} />
      )}
      {news.posts && (
        <PostsBlocks
          id="posts"
          listText={news.listText}
          posts={news.posts}
        />
      )}
    </MainLayout>
  )
}

export default NewsPage;

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageNews',
    include: 4,
  });
  const news = {
    title: data?.title,
    posts: data?.posts.map(post => formatPost(post?.fields)),
  };

  return {
    props: {
      settings: data?.settings,
      news,
    },
  };
}