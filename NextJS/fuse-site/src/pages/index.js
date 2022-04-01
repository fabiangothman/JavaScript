import '@fontsource/poppins';
import { getFieldsFromPage, getDefaultSettings } from 'api/utils';
import PropTypes from 'prop-types';
import { getAllEntries } from '~api';

import MainLayout, { SettingsType } from '~layouts/MainLayout';
import HomeSection, { HomePageType } from '~sections/Home';

const IndexPage = (props) => {
  return (
    <MainLayout {...props.settings} animatedBackground>
      <HomeSection {...props.page} />
    </MainLayout>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  settings: PropTypes.shape(SettingsType).isRequired,
  page: PropTypes.shape(HomePageType).isRequired,
};

export async function getStaticProps() {
  const homePage = await getAllEntries({
    content_type: 'pageHome',
  });

  const settings = await getDefaultSettings(homePage);

  const pageFields = getFieldsFromPage(homePage);

  return {
    props: {
      page: {
        ...pageFields,
        hero: {
          title: pageFields.heroTitle,
          description: pageFields.heroDescription,
        },
        moreIsMore: {
          content: pageFields.moreIsMore,
          wordsToReplace: pageFields.wordsToReplace,
        },
      },
      settings,
    },
  };
}
