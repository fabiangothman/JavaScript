import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import GoogleAnalytics from '~baseComponents/GoogleAnalytics';
import SEO, { SEOType, SEODefaultValues } from '~baseComponents/SEO';
import { MenuType } from './Header';
import Footer from './Footer';
import * as styles from './MainLayout.module.scss';
import useThemeContext from '~hooks/useTheme';

const Header = dynamic(() => import('./Header'), { ssr: false });

const MainLayout = ({
  children,
  headerWithBackground,
  withoutFooter,
  withoutPortfolioFooter,
  defaultSEO,
  pageSEO,
  googleAnalyticsID,
  footer,
  isAnimationCompleted,
  className,
  header,
  ...props
}) => {
  const theme = useThemeContext();

  return (
    <>
      <SEO {...props} defaultSEO={defaultSEO} pageSEO={pageSEO} />
      <div data-theme={theme} className={cx(className, styles.component)}>
        <Header
          {...header}
          isAnimationCompleted={isAnimationCompleted}
          headerWithBackground={headerWithBackground}
        />
        {children}
        {!withoutFooter && (
          <Footer {...footer} withoutPortfolioFooter={withoutPortfolioFooter} />
        )}
      </div>
      <GoogleAnalytics trackingId={googleAnalyticsID} />
    </>
  );
};

export default MainLayout;

MainLayout.defaultProps = {
  withoutFooter: false,
  withoutPortfolioFooter: false,
  isAnimationCompleted: true,
  headerWithBackground: true,
  googleAnalyticsID: '',
  pageSEO: SEODefaultValues,
  children: null,
  className: '',
};

export const MainLayoutType = {
  headerWithBackground: PropTypes.bool,
  isAnimationCompleted: PropTypes.bool,
  withoutFooter: PropTypes.bool,
  withoutPortfolioFooter: PropTypes.bool,
  googleAnalyticsID: PropTypes.string,
  header: PropTypes.shape(MenuType).isRequired,
  footer: PropTypes.shape({}).isRequired,
  pageSEO: PropTypes.shape(SEOType),
  defaultSEO: PropTypes.shape(SEOType).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

MainLayout.propTypes = MainLayoutType;
