const withPlugins = require('next-compose-plugins');

const withTM = require('next-transpile-modules')([
  'd3',
  'internmap',
  'delaunator',
  'robust-predicates',
]);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([[withBundleAnalyzer], [withTM]], {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  async redirects() {
    return [
      {
        source: '/benchmarking',
        destination: '/benchmarking/valuation-metrics/regression-analysis',
        permanent: true,
      },
      {
        source: '/public-comparables/enterprise',
        destination: '/benchmarking/valuation-metrics/regression-analysis',
        permanent: true,
      },
      {
        source: '/public-comparables/consumer-fintech-healthtech',
        destination: '/benchmarking/valuation-metrics/regression-analysis',
        permanent: true,
      },
      {
        source: '/insights',
        destination: '/benchmarking/valuation-metrics/regression-analysis',
        permanent: true,
      },
      {
        source: '/blog/welcome-ashley-paston',
        destination: '/blog/welcoming-ashley-paston-to-meritech',
        permanent: true,
      },
    ];
  },
});
