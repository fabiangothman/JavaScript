import PropTypes from 'prop-types';
import { getPageFieldsAndSettings } from 'api/utils';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import NotFound from '~sections/NotFound';

const NotFoundPage = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <NotFound {...props} />
    </MainLayout>
  );
};

export default NotFoundPage;

NotFoundPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  const page = await getPageFieldsAndSettings({
    content_type: 'page404',
    include: 3,
  });

  return {
    props: {
      ...page,
    },
  };
}
