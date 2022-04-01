import { getAllEntries } from 'api';
import PropTypes from 'prop-types';
import {
  getFieldsFromPage,
  getDefaultSettings,
  getFieldsFromArray,
  getImageFields,
  formatAssetFile,
  getFieldsFromObject,
} from 'api/utils';
import MainLayout, { SettingsType } from '~layouts/MainLayout';
import PortfolioSection from '~sections/Portfolio';

const Portfolio = (props) => {
  return (
    <MainLayout {...props.settings} fixedHeader>
      <PortfolioSection {...props.page} />
    </MainLayout>
  );
};

Portfolio.propTypes = {
  settings: PropTypes.shape(SettingsType).isRequired,
  page: PropTypes.shape({}).isRequired,
};

export default Portfolio;

export async function getStaticProps() {
  const data = await getAllEntries({
    content_type: 'pagePortfolio',
    include: 3,
  });

  const settings = await getDefaultSettings(data);

  const pageFields = getFieldsFromPage(data);

  const companies = getFieldsFromArray(pageFields.companies).map((company) => ({
    ...company,
    identifier: company?.companyName
      ? company.companyName.toLowerCase().split(' ')[0]
      : null,
    category: company.category || 'All',
    companyLogo: getImageFields(company.companyLogo),
    altPhotoInner: company.altPhotoInner
      ? getImageFields(company.altPhotoInner)
      : null,
    altPhotoOuter: company.altPhotoOuter
      ? getImageFields(company.altPhotoOuter)
      : null,
    testimonials: company?.testimonials
      ? company.testimonials.map((tst) => ({
          ...tst,
          ...tst.fields,
          authorPhoto: getImageFields(tst?.fields.authorPhoto),
          audio: formatAssetFile(tst?.fields.audio),
          linkToFullStory: tst?.fields.linkToFullStory
            ? getFieldsFromObject(tst?.fields.linkToFullStory).slug
            : null,
          fields: {},
        }))
      : [],
  }));

  return {
    props: {
      page: {
        hero: {
          content: companies,
        },
      },
      settings,
    },
  };
}
