import { getAllEntries } from 'api';
import PropTypes from 'prop-types';
import {
  getFieldsFromPage,
  getDefaultSettings,
  getFieldsFromArray,
  getImageFields,
} from 'api/utils';
import MainLayout, { SettingsType } from '~layouts/MainLayout';
import AboutUsSection from '~sections/AboutUs';

const AboutUs = (props) => {
  return (
    <MainLayout {...props.settings} fixedHeader animatedBackground>
      <AboutUsSection {...props.page} />
    </MainLayout>
  );
};

AboutUs.propTypes = {
  settings: PropTypes.shape(SettingsType).isRequired,
  page: PropTypes.shape({}).isRequired,
};

export default AboutUs;

export async function getStaticProps() {
  const data = await getAllEntries({
    content_type: 'pageAbout',
  });

  const settings = await getDefaultSettings(data);

  const pageFields = getFieldsFromPage(data);

  const testimonials = getFieldsFromArray(pageFields.motivationList);

  const ourTeam = getFieldsFromArray(pageFields.ourTeam).map((item) => ({
    ...item,
    photo: getImageFields(item?.photo),
  }));

  return {
    props: {
      page: {
        hero: {
          content: pageFields.heroContent,
        },
        testimonials: {
          content: testimonials,
        },
        ourTeam: {
          content: ourTeam,
        },
      },
      settings,
    },
  };
}
