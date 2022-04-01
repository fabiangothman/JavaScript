import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

function buildTitle({ pageSEO, defaultSEO }) {
  const title = pageSEO?.title;
  const suffix = pageSEO?.suffix || defaultSEO.suffix;
  const mainTitle = defaultSEO?.title;
  const titleSegments = [];
  if (title) {
    titleSegments.push(title.trim());
  }

  if (mainTitle) {
    titleSegments.push(mainTitle.trim());
  }
  if (suffix) {
    titleSegments.push(suffix.trim());
  }

  if (titleSegments.length === 0) {
    return '';
  }

  return titleSegments.join(' ‒ ');
}

function buildDescription({ pageSEO, defaultSEO }) {
  if (pageSEO?.description?.trim().length) {
    return pageSEO.description.trim();
  }

  if (defaultSEO?.description?.trim().length) {
    return defaultSEO.description.trim();
  }

  return '';
}

function buildOpenGraphImage({ pageSEO, defaultSEO }) {
  if (pageSEO?.image?.fields?.file?.url) {
    return `https:${pageSEO.image.fields.file.url}`;
  }

  if (defaultSEO?.image?.fields?.file?.url) {
    return `https:${defaultSEO.image.fields.file.url}`;
  }

  return '';
}

const SEO = ({ defaultSEO, pageSEO, withDebug }) => {
  const title = buildTitle({ pageSEO, defaultSEO });
  const description = buildDescription({ pageSEO, defaultSEO });
  const ogImage = buildOpenGraphImage({ pageSEO, defaultSEO });
  let url = '';
  if (typeof window !== 'undefined') {
    url = window.location.href;
  }
  if (process.env.NODE_ENV !== 'production' && withDebug) {
    // eslint-disable-next-line no-console
    console.table({ title, description, ogImage });
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter.title" content={title} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/favicon.ico" />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />

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

        {/* <link rel="icon" href={`${hostname}/favicon.ico`} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${hostname}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="72x72"
          href={`${hostname}/favicon-72x72.png`}
        />
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="32x32"
          href={`${hostname}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${hostname}/favicon-16x16.png`}
        />        
        <meta
          name="msapplication-config"
          content={`${hostname}/browserconfig.xml`}
        /> */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
    </>
  );
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
  withDebug: false,
  pageSEO: SEODefaultValues,
  defaultSEO: SEODefaultValues,
};

SEO.propTypes = {
  withDebug: PropTypes.bool,
  pageSEO: PropTypes.shape(SEOType),
  defaultSEO: PropTypes.shape(SEOType),
};

export default SEO;
export { buildTitle };
