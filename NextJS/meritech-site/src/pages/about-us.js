import PropTypes from 'prop-types';
import { getPageFieldsAndSettings } from 'api/utils';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import AboutContent from '~baseComponents/AboutContent';

const AboutPage = ({ settings, ...props }) => {
  // console.log(settings);
  // return null;
  return (
    <MainLayout {...settings}>
      <AboutContent {...props} />
    </MainLayout>
  );
};

export default AboutPage;

AboutPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageAbout',
  });

  return {
    props: {
      ...data,
    },
  };
}
