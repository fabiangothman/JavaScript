import React from 'react'
import Head from 'next/head'

const SEO = () => {
  const hostname = process.env.NEXT_PUBLIC_OWN_URL
  const title = 'We track microtrends to predict evolutionary cultural shifts'
  const metaTitle = 'nwo.ai is a predictive platform that tracks more than 93 million microtrends, and notifies clients about trends before they become exponential.'
  const description = 'Our predictive AI platform enables leading Fortune 500 companies and government agencies to anticipate and track global cultural shifts by aggregating, analyzing, and producing actionable reports on human-generated data.NWO’s proprietary machine learning and natural language processing algorithms continuously transform petabytes of unstructured narrative data into intuitive, visual metrics that anyone can understand and leverage.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key="ogTitle" property="og:title" content={metaTitle} />
        <meta key="twitterTitle" name="twitter.title" content={metaTitle} />

        <meta key="description" name="description" content={description} />
        <meta key="ogDescription" property="og:description" content={description} />
        <meta key="twitterDescription" name="twitter.description" content={description} />

        <meta property="og:image" content={`${hostname}/ogimage.jpg`} />

        <meta property="og:type" content="website" />
        <meta name="twitter.card" content="summary" />
        <meta name="pinterest" content="nopin" />

        <link rel="icon" type="image/png" sizes="72x72" href={`${hostname}/manifest/nwo_72x72.png`} />
        <link rel="manifest" href={`${hostname}/manifest/manifest.json`} />
        <meta name="msapplication-TileColor" content="#3684FD"/>
        <meta name="theme-color" content="#3684FD" />
      </Head>
    </>
  )
}

export default SEO
