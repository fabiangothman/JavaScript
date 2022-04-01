const createClient = require('contentful').createClient

const ContentfulAPI = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CDA_TOKEN
})

module.exports = { ContentfulAPI }
