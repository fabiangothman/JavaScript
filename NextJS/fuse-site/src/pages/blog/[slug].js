import PropTypes from 'prop-types';
import {
  getDefaultSettings,
  getFieldsFromPage,
  removeCircularDepsInBlog,
} from 'api/utils';
import { getAllEntries } from 'api';
import MainLayout, { settingsTypes } from '~layouts/MainLayout';
import SingleArticleSection from '~sections/Blog/SingleArticle';

const SingleArticlePage = ({ settings, page }) => {
  return (
    <MainLayout {...settings} fixedHeader>
      <SingleArticleSection {...page} />
    </MainLayout>
  );
};

SingleArticlePage.propTypes = {
  page: PropTypes.shape({}).isRequired,
  settings: PropTypes.shape(settingsTypes).isRequired,
};

export default SingleArticlePage;

export async function getStaticProps({ params }) {
  const page = await getAllEntries({
    content_type: 'blog',
    'fields.slug': params.slug,
  });

  const settings = await getDefaultSettings(page);
  const fullFields = getFieldsFromPage(page);

  const fields = removeCircularDepsInBlog(fullFields);

  return {
    props: {
      settings,
      page: {
        ...fields,
        slug: `blog/${fields.slug}`,
      },
    },
  };
}

export async function getStaticPaths() {
  const singleArticlePage = await getAllEntries({
    content_type: 'blog',
  });

  return {
    paths: singleArticlePage.items.map(({ fields }) => ({
      params: { slug: fields.slug },
    })),
    fallback: false,
  };
}
