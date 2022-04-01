import PropTypes from 'prop-types';
import {
  getPageFieldsAndSettings,
  getImageFields,
  getFieldsFromArray,
} from 'api/utils';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import PortfolioList from '~baseComponents/PortfolioList';

const PortfolioPage = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <PortfolioList {...props} />
    </MainLayout>
  );
};

export default PortfolioPage;

PortfolioPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pagePortfolio',
  });

  const portfolio = getFieldsFromArray(data?.portfolio).map((company) => ({
    ...company,
    logo: getImageFields(company?.logo),
  }));

  return {
    props: {
      ...data,
      portfolio,
    },
  };
}
