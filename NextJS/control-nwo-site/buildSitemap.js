#! /usr/bin/env node
// https://gist.github.com/evantahler/ba75e277c756fce337b7370035b298e7
// I am ./bin/buildSitemap.js

const path = require('path')
const glob = require('glob')
const fs = require('fs')

const SITE_ROOT = 'https://nwo.ai/'
const SOURCE = path.join(__dirname, 'src/pages', '/**/!(_*).js')
const DESTINATION = path.join(__dirname, 'public', 'sitemap.xml')

let diskPages = glob.sync(SOURCE)

let xml = ''
xml += '<?xml version="1.0" encoding="UTF-8"?>'
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

diskPages.forEach(page => {
  let stats = fs.statSync(page)
  let modDate = new Date(stats.mtime)
  let lastMod = `${modDate.getFullYear()}-${('0' + (modDate.getMonth() + 1)).slice(-2)}-${(
    '0' + modDate.getDate()
  ).slice(-2)}`

  page = page.replace(path.join(__dirname, 'src/pages'), '')
  if (page.startsWith('/api')) {
    return
  }

  page = page.replace(/.js$/, '')
  page = `${SITE_ROOT}${page}`

  if (page.match(/.*\/index$/)) {
    page = page.replace(/(.*)index$/, '$1')
  }

  if (page.match(/\[.*\]/)) {
    return
  }

  xml += '<url>'
  xml += `<loc>${page}</loc>`
  xml += `<lastmod>${lastMod}</lastmod>`
  xml += `<changefreq>always</changefreq>`
  xml += `<priority>0.5</priority>`
  xml += '</url>'
})

xml += '</urlset>'

fs.writeFileSync(DESTINATION, xml)

console.log(`Wrote sitemap for ${diskPages.length} pages to ${DESTINATION}`)