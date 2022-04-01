import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

function buildTitle({ pageSEO, defaultSEO, blogPostSEO }) {
  const title = blogPostSEO?.title || pageSEO?.title;
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

function buildDescription({ pageSEO, defaultSEO, blogPostSEO }) {
  if (blogPostSEO?.description) {
    return blogPostSEO.description;
  }
  if (pageSEO?.description?.trim().length) {
    return pageSEO.description.trim();
  }

  if (defaultSEO?.description?.trim().length) {
    return defaultSEO.description.trim();
  }

  return '';
}

function buildOpenGraphImage({ pageSEO, defaultSEO, blogPostSEO }) {
  if (blogPostSEO?.featuredPostImage?.url) {
    return blogPostSEO.thumbnail.url;
  }

  if (pageSEO?.thumbnail?.fields?.file?.url) {
    return `https:${pageSEO.thumbnail.fields.file.url}`;
  }

  if (defaultSEO?.image?.fields?.file?.url) {
    return `https:${defaultSEO.image.fields.file.url}`;
  }

  return '';
}

const SEO = ({ defaultSEO, pageSEO, blogPostSEO, withDebug }) => {
  const title = buildTitle({ pageSEO, defaultSEO, blogPostSEO });
  const description = buildDescription({ blogPostSEO, pageSEO, defaultSEO });
  let url = '';
  if (typeof window !== 'undefined') {
    url = window.location.href;
  }
  const ogImage = buildOpenGraphImage({ blogPostSEO, pageSEO, defaultSEO });

  if (process.env.NODE_ENV !== 'production' && withDebug) {
    // eslint-disable-next-line no-console
    console.table({ title, description, ogImage });
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/favicons/72.png" />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />

        {/* Twitter */}
        <meta name="twitter.card" content="summary_large_image" />
        <meta name="twitter.title" content={title} />
        <meta name="twitter.description" content={description} />
        {!!ogImage && <meta property="twitter:image" content={ogImage} />}

        {!!ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:type" content="website" />
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
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#000000" />
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
  blogPostSEO: SEODefaultValues,
  defaultSEO: SEODefaultValues,
};

SEO.propTypes = {
  withDebug: PropTypes.bool,
  blogPostSEO: PropTypes.shape(SEOType),
  pageSEO: PropTypes.shape(SEOType),
  defaultSEO: PropTypes.shape(SEOType),
};

export default SEO;
export { buildTitle };
