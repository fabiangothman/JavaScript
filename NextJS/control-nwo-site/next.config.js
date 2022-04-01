const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([[optimizedImages]], {
  images: {
    domains: ['images.ctfassets.net'],
    loader: 'imgix',
    path: '',
  },
})

/*const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([[withBundleAnalyzer]], {
  images: {
    domains: ['images.ctfassets.net'],
  },
});*/
