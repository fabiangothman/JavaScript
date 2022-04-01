require('dotenv').config()

const URSA_DOMAIN = process.env.URSA_DOMAIN

const glob = require('glob')
const path = require('path')
const { fetchPostings } = require('./src/utils/lever.js')
const { createWriteStream, writeFileSync } = require('fs')
const { SitemapStream } = require('sitemap')

const PAGE_DIR = 'src/pages'
const SOURCE = path.join(__dirname, PAGE_DIR, '/**/!(_*).js')
const DESTINATION = path.join(__dirname, 'public', 'sitemap.xml')

async function getJobPostings() {
  try {
    const postingData = await fetchPostings()
    const paths = postingData.map((item) => {
      return {
        id: item.id
      }
    })
    return paths
  } catch (e) {
    console.log(e)
  }
}

async function generateSitemap() {
  console.log('SITEMAP START')
  const buildDate = new Date()
  const lastMod = `${buildDate.getFullYear()}-${('0' + (buildDate.getMonth() + 1)).slice(-2)}-${(
    '0' + buildDate.getDate()
  ).slice(-2)}`

  const sitemap = new SitemapStream({ hostname: URSA_DOMAIN })
  sitemap.pipe(createWriteStream(DESTINATION))

  await generateAllPages(lastMod, sitemap)
  await generatePostings(lastMod, sitemap)

  console.log('SITEMAP END')
  sitemap.end()

  const robotsTxt = `User-agent: *
    Allow: /
    Sitemap: ${URSA_DOMAIN}/sitemap.xml`

  writeFileSync('./public/robots.txt', robotsTxt)
}

async function generateAllPages(lastMod, sitemap) {
  const diskPages = glob.sync(SOURCE)
  diskPages.forEach((page) => {
    page = page.replace(path.join(__dirname, PAGE_DIR), '')

    if (page === '/404.js') {
      return
    }

    page = page.replace(/.js$/, '')

    if (page.match(/.*\/index$/)) {
      page = page.replace(/(.*)index$/, '$1')
    }

    if (page.match(/\[.*\]/)) {
      return
    }

    addPage(page, lastMod, sitemap)
  })
}

async function generatePostings(lastMod, sitemap) {
  const postings = await getJobPostings()

  postings.forEach((posting) => {
    addPage(`/careers/${posting.id}`, lastMod, sitemap)
  })
}

function addPage(url, lastMod, sitemap) {
  try {
    sitemap.write({ url, changefreq: 'daily', priority: 0.7 })
  } catch (error) {
    console.log(error)
  }
}

generateSitemap()
