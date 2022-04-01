import React from 'react';
import Head from 'next/head';
// import CookieWarning from './CookieWarning'
import GoogleAnalytics from './GoogleAnalytics';
import SEO from './SEO';
import ScrollProvider from 'baseComponents/ScrollProvider';
import PageTransition from 'baseComponents/PageTransition';
import styles from './MainLayout.module.scss';
import Footer2 from './Footer2';
import Header2 from './Header2';

const gaTrackingId = 'UA-164763705-1'

const MainLayout = ({
  headerBackground = "gray-light",
  id = "",
  headerMenu = [],
  footerMenu = [],
  privacyPolicy,
  termsConditions,
  children,
}) => {
  // console.log(`MainLayout headerMenu: `, headerMenu);
  // console.log(`MainLayout footerMenu: `, footerMenu);
  // return null;

  return (
    <PageTransition>
      <ScrollProvider>
        <div id={id} className={styles.wrapper}>
          <SEO />
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          </Head>
          <Header2
            headerMenu={headerMenu}
            headerBackground={headerBackground}
          />
          {children}
          <Footer2
            footerMenu={footerMenu}
            privacyPolicy={privacyPolicy}
            termsConditions={termsConditions}
          />

          {/* cookieWarning &&
          <CookieWarning settings={settings} onClose={handleCookieWarningClose} /> */}
          <GoogleAnalytics trackingId={gaTrackingId} />
        </div>
      </ScrollProvider>
    </PageTransition>
  )
}

export default MainLayout
