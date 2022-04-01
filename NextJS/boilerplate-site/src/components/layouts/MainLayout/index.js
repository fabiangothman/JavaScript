import PropTypes from 'prop-types';
import GoogleAnalytics from '~baseComponents/GoogleAnalytics';
import SEO, { SEOType, SEODefaultValues } from '~baseComponents/SEO';
import Header, { MenuType } from './Header';

const MainLayout = ({
  children,
  menu,
  defaultSEO,
  pageSeo,
  GoogleAnalyticsID,
}) => {
  return (
    <>
      <SEO defaultSEO={defaultSEO} pageSEO={pageSeo?.fields} />
      <Header menu={menu} />
      {children}
      <GoogleAnalytics trackingId={GoogleAnalyticsID} />
    </>
  );
};

export default MainLayout;

MainLayout.defaultProps = {
  pageSeo: SEODefaultValues,
};

MainLayout.propTypes = {
  GoogleAnalyticsID: PropTypes.string.isRequired,
  menu: MenuType.isRequired,
  pageSeo: PropTypes.shape({
    fields: PropTypes.shape(SEOType),
  }),
  defaultSEO: PropTypes.shape({
    description: PropTypes.string,
    hostname: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};
