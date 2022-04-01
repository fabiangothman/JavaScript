import React from "react";
import Head from "next/head";

const SEO = () => {
  const hostname = process.env.NEXT_PUBLIC_URL;
  const title = "Future Quest";
  const metaTitle =
    "Future Quest DAO accelerates exponential progress towards a regenerative future.";
  const description =
    "The first massively climate saving NFT game. Future Quest DAO accelerates exponential progress towards a regenerative future.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key="ogTitle" property="og:title" content={metaTitle} />
        <meta key="twitterTitle" name="twitter.title" content={metaTitle} />

        <meta key="description" name="description" content={description} />
        <meta
          key="ogDescription"
          property="og:description"
          content={description}
        />
        <meta
          key="twitterDescription"
          name="twitter.description"
          content={description}
        />

        <meta property="og:image" content={`${hostname}/ogimage.png`} />

        <meta property="og:type" content="website" />
        <meta name="twitter.card" content="summary" />
        <meta name="pinterest" content="nopin" />

        <link
          rel="icon"
          type="image/x-icon"
          sizes="72x72"
          href={`${hostname}/favicon.ico?v=2`}
        />
        <link rel="manifest" href={`${hostname}/manifest/manifest.json`} />
        <meta name="msapplication-TileColor" content="#3684FD" />
        <meta name="theme-color" content="#3684FD" />
      </Head>
    </>
  );
};

export default SEO;
