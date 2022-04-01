import PropTypes from 'prop-types';
import cx from 'classnames';
import SEO, {
  SEOType,
  defaultSEOTypes,
  SEODefaultValues,
} from '~baseComponents/SEO';
import Header, { HeaderType } from './Header';
import Footer, { FooterTypes } from './Footer';
import styles from './MainLayout.module.scss';
import GoogleAnalytics from '~baseComponents/GoogleAnalytics';

const MainLayout = ({
  children,
  animatedBackground,
  header,
  fixedHeader,
  footer,
  defaultSEO,
  pageSEO,
  googleAnalyticsID,
  mailchimp,
}) => {
  return (
    <section
      className={cx(styles.wrapper, {
        [styles.animatedBackground]: animatedBackground,
      })}
    >
      <GoogleAnalytics trackingId={googleAnalyticsID} />
      <SEO defaultSEO={defaultSEO} pageSEO={pageSEO} />
      <Header
        socialLinks={footer.socialLinks}
        fixedHeader={fixedHeader}
        loginPageUrl={header.loginPageUrl}
        menu={header.menu}
      />
      {children}
      <Footer mailchimp={mailchimp} {...footer} />
    </section>
  );
};

export default MainLayout;

MainLayout.defaultProps = {
  pageSEO: SEODefaultValues,
  animatedBackground: false,
  fixedHeader: false,
};

MainLayout.propTypes = {
  googleAnalyticsID: PropTypes.string.isRequired,
  header: HeaderType.isRequired,
  animatedBackground: PropTypes.bool,
  fixedHeader: PropTypes.bool,
  footer: PropTypes.shape(FooterTypes).isRequired,
  defaultSEO: PropTypes.shape(defaultSEOTypes).isRequired,
  pageSEO: PropTypes.shape({
    fields: PropTypes.shape(SEOType),
  }),
  children: PropTypes.node.isRequired,
  mailchimp: PropTypes.shape({
    mailchimpSubscribeVariable: PropTypes.string,
    mailchimpUVariable: PropTypes.string,
    mailchimpIdVariable: PropTypes.string,
  }).isRequired,
};
