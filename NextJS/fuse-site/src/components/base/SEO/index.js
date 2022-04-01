import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

function buildTitle(page = {}, settings = {}) {
  const pageTitle = page?.pageTitle;
  const mainTitle = settings?.siteTitle;
  const titleSuffix = page?.titleSuffix || settings.siteSuffix;

  const titleSegments = [];
  if (pageTitle) {
    titleSegments.push(pageTitle.trim());
  }

  if (mainTitle) {
    titleSegments.push(mainTitle.trim());
  }
  if (titleSuffix) {
    titleSegments.push(titleSuffix.trim());
  }

  if (titleSegments.length === 0) {
    return '';
  }

  return titleSegments.join(' ‒ ');
}

function buildDescription({ pageSEO, defaultSEO }) {
  if (pageSEO?.pageDescription?.trim().length) {
    return pageSEO.pageDescription.trim();
  }

  if (defaultSEO?.siteDescription?.trim().length) {
    return defaultSEO.siteDescription.trim();
  }

  return '';
}

function buildOpenGraphImage({ pageSEO, defaultSEO }) {
  if (pageSEO?.thumbnail?.fields?.file?.url) {
    return `https:${pageSEO.thumbnail.fields.file.url}`;
  }

  if (defaultSEO?.thumbnail?.fields?.file?.url) {
    return `https:${defaultSEO.thumbnail.fields.file.url}`;
  }

  return '';
}

const SEO = ({ defaultSEO, pageSEO }) => {
  const title = buildTitle(pageSEO, defaultSEO);
  const description = buildDescription({ pageSEO, defaultSEO });
  const ogImage = buildOpenGraphImage({ pageSEO, defaultSEO });
  // eslint-disable-next-line no-unused-vars
  const hostname = defaultSEO.hostname.endsWith('/')
    ? defaultSEO.hostname.substring(0, defaultSEO.hostname.length - 1)
    : defaultSEO.hostname;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter.title" content={title} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/favicons/32px.png" />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter.description" content={description} />
        {!!ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:type" content="website" />
        <meta name="twitter.card" content="summary" />
        {defaultSEO.metaContentCreator && (
          <meta
            name="twitter.creator"
            content={defaultSEO.metaContentCreator}
          />
        )}
        <meta name="pinterest" content="nopin" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicons/512x.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/192x.png"
        />
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/32x.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/16x.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/16x.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
    </>
  );
};

export const defaultSEOTypes = {
  siteDescription: PropTypes.string,
  hostname: PropTypes.string,
  siteTitle: PropTypes.string,
  siteSuffix: PropTypes.string,
  thumbnail: PropTypes.shape({
    fields: PropTypes.shape({
      file: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }),
};

export const SEOType = {
  suffix: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.shape({
    fields: PropTypes.shape({
      file: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }),
};

export const SEODefaultValues = {
  suffix: '',
  title: '',
  description: '',
  thumbnail: {
    fields: {
      file: {
        url: '',
      },
    },
  },
};

SEO.defaultProps = {
  pageSEO: SEODefaultValues,
  defaultSEO: SEODefaultValues,
};

SEO.propTypes = {
  pageSEO: PropTypes.shape(SEOType),
  defaultSEO: PropTypes.shape(SEOType),
};

export default SEO;
export { buildTitle };
