const withPlugins = require('next-compose-plugins')
const withVideos = require('next-videos')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withPlugins([[withVideos], [withBundleAnalyzer]], {
  images: {
    domains: ['images.ctfassets.net']
  }
})
