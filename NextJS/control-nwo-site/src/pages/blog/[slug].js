import React from 'react';
import MainLayout from 'layouts/MainLayout';
import { formatPost, getPageFieldsAndSettings } from 'api/utils';
import { getAllEntries } from 'api';
import PostDetails from 'components/sections/PostDetails';

const PostTemplate = ({ settings, post, nextPost }) => {
  // console.log(`PostTemplate settings: `, settings);
  // console.log(`PostTemplate blog: `, blog);
  // return null;

  return (
    <MainLayout {...settings} headerBackground="gray-light">
      <PostDetails
        id="post-details"
        nextPost={nextPost}
        {...post}
      />
    </MainLayout>
  )
}

export default PostTemplate;

export async function getStaticPaths() {
  const data = await getAllEntries({
    content_type: 'templatePost',
  });
  const paths = data.items.map(({ fields }) => ({
    params: { slug: fields.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // console.log(`params: `, params);
  const data = await getPageFieldsAndSettings({
    content_type: 'templatePost',
    'fields.slug': params.slug,
    include: 4,
  });
  const post = formatPost(data);
  const nextPost = formatPost(data?.nextPost?.fields);

  return {
    props: {
      settings: data?.settings,
      post,
      nextPost,
    },
    revalidate: 1,
  };
}
