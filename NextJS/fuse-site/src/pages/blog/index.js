import { getAllEntries } from 'api';
import PropTypes from 'prop-types';
import {
  getFieldsFromPage,
  getDefaultSettings,
  getFieldsFromArray,
  removeCircularDepsInBlog,
} from 'api/utils';
import MainLayout, { SettingsType } from '~layouts/MainLayout';
import BlogSection from '~sections/Blog';

const Blog = (props) => {
  return (
    <MainLayout {...props.settings} fixedHeader>
      <BlogSection {...props.page} />
    </MainLayout>
  );
};

Blog.propTypes = {
  settings: PropTypes.shape(SettingsType).isRequired,
  page: PropTypes.shape({}).isRequired,
};

export default Blog;

export async function getStaticProps() {
  const data = await getAllEntries({
    content_type: 'pageBlog',
  });

  const settings = await getDefaultSettings(data);

  const pageFields = getFieldsFromPage(data);

  const fullBlog = getFieldsFromArray(pageFields.blog).filter(
    (blog) => blog.title,
  );

  const blog = fullBlog.map((item) => removeCircularDepsInBlog(item));

  return {
    props: {
      page: {
        articles: {
          content: blog,
        },
      },
      settings,
    },
  };
}
