/* eslint-disable no-underscore-dangle */
import { createContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import PropTypes from 'prop-types';
import cx from 'classnames';
import GoogleAnalytics from '~baseComponents/GoogleAnalytics';
import SEO, { SEOType, SEODefaultValues } from '~baseComponents/SEO';
import Header, { MenuType } from './Header';
import Footer from './Footer';
import * as styles from './MainLayout.module.scss';

export const HamburguerMenuContext = createContext({
  hamburguerMenu: false,
  setHamburguerMenu: () => {},
});

const MainLayout = ({
  children,
  defaultSEO,
  pageSEO,
  googleAnalyticsId,
  footer,
  header,
  headerType,
  headerColor,
  mailchimpIdVariable,
  mailchimpSubscribeVariable,
  mailchimpUVariable,
  introAnimation,
}) => {
  const [hamburguerMenu, setHamburguerMenu] = useState(false);
  const value = { hamburguerMenu, setHamburguerMenu };
  const mailchimp = {
    mailchimpIdVariable,
    mailchimpSubscribeVariable,
    mailchimpUVariable,
  };

  useEffect(() => {
    window._ANTOURAGE_CONFIG.widget_hidden = introAnimation;
    if (window._ANTOURAGE.hide) {
      if (introAnimation) {
        window._ANTOURAGE.hide();
      } else {
        window._ANTOURAGE.show();
      }
    }
  }, [introAnimation]);

  return (
    <div id="mainLayout">
      <SEO defaultSEO={defaultSEO} pageSEO={pageSEO} />
      <div className={cx(styles.component)}>
        <HamburguerMenuContext.Provider value={value}>
          <Header
            headerColor={headerColor}
            headerType={headerType}
            {...header}
          />
          <div className={styles.contSite}>
            <div
              className={cx(
                hamburguerMenu ? styles.enableModal : styles.disableModal,
                styles.modalLayer,
              )}
            />
            {children}
            <Footer mailchimp={mailchimp} {...footer} />
          </div>
        </HamburguerMenuContext.Provider>
      </div>
      <GoogleAnalytics trackingId={googleAnalyticsId} />
      <Script
        strategy="afterInteractive"
        src="https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js"
        type="text/javascript"
        charSet="UTF-8"
        data-domain-script="2fd8d95d-35b2-4bc6-a6fa-f60f5444d882"
        dangerouslySetInnerHTML={{
          __html: `
          function OptanonWrapper() { }
        `,
        }}
      />
      <Head>
        {/* eslint-disable react/no-danger */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            var PARTNER_ID = "789"; // Replace this with your partner ID
  
            window._ANTOURAGE_CONFIG = {
              partner_id: PARTNER_ID,
              widget_hidden: false,
            };
            
            !function(){window._ANTOURAGE=new EventTarget;const t=window,e=document,n=function(){const t=e.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://antourage-widget.vercel.app/widget.js";const n=e.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)};t.attachEvent?t.attachEvent("onload",n):t.addEventListener("load",n,!1)}();
          `,
          }}
        />
      </Head>
    </div>
  );
};

export default MainLayout;

MainLayout.defaultProps = {
  googleAnalyticsId: '',
  pageSEO: SEODefaultValues,
  children: null,
  headerType: 'static',
  headerColor: 'black',
  page: null,
  introAnimation: false,
};

export const MainLayoutType = {
  googleAnalyticsId: PropTypes.string,
  header: PropTypes.shape(MenuType).isRequired,
  footer: PropTypes.shape({}).isRequired,
  pageSEO: PropTypes.shape(SEOType),
  defaultSEO: PropTypes.shape(SEOType).isRequired,
  children: PropTypes.node,
  headerType: PropTypes.string,
  headerColor: PropTypes.string,
  mailchimpIdVariable: PropTypes.string.isRequired,
  mailchimpSubscribeVariable: PropTypes.string.isRequired,
  mailchimpUVariable: PropTypes.string.isRequired,
  page: PropTypes.string,
  introAnimation: PropTypes.bool,
};

MainLayout.propTypes = MainLayoutType;
