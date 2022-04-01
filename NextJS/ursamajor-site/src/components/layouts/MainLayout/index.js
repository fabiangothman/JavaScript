import Head from 'next/head'
import React from 'react'
import { getImageParams } from 'utils/contentfulHelpers'

import GoogleAnalytics from '../../base/GoogleAnalytics'
import SEO from '../../base/SEO'
import ScrollProvider from '../../base/ScrollProvider'
import Footer from './Footer'
import Header from './Header'
import styles from './MainLayout.module.scss'
import Menu from './StickyMenu'

const MainLayout = (props) => {
  const {
    darkMode,
    head,
    children,
    styleType = 'grey',
    settings,
    isError,
    visibleMenu = true,
    visibleHeader = true
  } = props

  const footerData = {
    facebookUrl: settings?.facebookUrl || null,
    twitterUrl: settings?.twitterUrl || null,
    instagramUrl: settings?.instagramUrl || null,
    linkedInUrl: settings?.linkedInUrl || null,
    footerImages: settings?.footerImages.map((image) => getImageParams(image)),
    footerButton: settings?.footerButton?.fields || null,
    footerGreyTitle: settings?.grayText || settings?.footerTitle || null,
    footerWhiteTitle: settings?.whiteText || settings?.footerTitleWhite || null,
    careerBtn: settings?.showCareersLink != undefined ? settings?.showCareersLink : true
  }
  return (
    <ScrollProvider>
      <SEO head={head} />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      {visibleHeader && <Header darkMode={darkMode} isError={isError} />}
      {visibleMenu && <Menu isError={isError} />}
      <div className={styles[styleType]}>{children}</div>
      <Footer footerData={footerData} />
      <GoogleAnalytics trackingId={settings?.googleAnalytics} />
    </ScrollProvider>
  )
}

export default MainLayout
