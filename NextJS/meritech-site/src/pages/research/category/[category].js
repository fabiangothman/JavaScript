import PropTypes from 'prop-types';
import {
  getFieldsFromArray,
  getImageFields,
  getPageFieldsAndSettings,
  getFieldsFromObject,
} from 'api/utils';
import { getAllEntries } from 'api';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import BlogLandingPage from '~baseComponents/BlogLandingPage';

const BlogPost = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <BlogLandingPage {...props} message={settings.header.subscribeMessage} />
    </MainLayout>
  );
};

export default BlogPost;

BlogPost.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticPaths() {
  const data = await getAllEntries({
    content_type: 'blogPostCategory',
  });

  const paths = data.items.map(({ fields }) => ({
    params: { category: fields.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps() {
  const page = await getPageFieldsAndSettings({
    content_type: 'pageBlog',
    include: 3,
  });

  const data = await getAllEntries({
    content_type: 'blogPost',
  });

  const blogPosts = getFieldsFromArray(data.items).map((posts) => {
    return {
      ...posts,
      categories: getFieldsFromArray(posts?.category),
      thumbnail: getImageFields(posts?.thumbnail),
    };
  });

  let featuredBlogPost = getFieldsFromObject(page?.featuredBlogPost);
  featuredBlogPost = {
    ...featuredBlogPost,
    thumbnail: getImageFields(featuredBlogPost?.thumbnail),
    categories: getFieldsFromArray(featuredBlogPost?.category),
  };

  const categories = getFieldsFromArray(page?.categories);

  return {
    props: {
      ...page,
      categories,
      featuredBlogPost,
      blogPosts,
    },
  };
}
