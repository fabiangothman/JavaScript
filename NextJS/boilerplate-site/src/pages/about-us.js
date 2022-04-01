import _get from 'lodash/get';
import { getAllEntries } from 'api';
import { getSettings } from 'api/utils';
import MainLayout from '~layouts/MainLayout';
import AboutUsSection from '~sections/AboutUs';

const AboutUs = (props) => {
  return (
    <MainLayout {...props}>
      <AboutUsSection {...props} />
    </MainLayout>
  );
};

export default AboutUs;

export async function getStaticProps() {
  const data = await getAllEntries({
    content_type: 'pageAboutUs',
  });
  const { defaultSEO, menu, GoogleAnalyticsID } = await getSettings();

  const aboutUsPage = _get(data, 'items[0].fields');

  return {
    props: {
      ...aboutUsPage,
      GoogleAnalyticsID,
      defaultSEO,
      menu,
    },
  };
}
