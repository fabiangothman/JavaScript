require('dotenv-flow').config();
const glob = require('glob');
const path = require('path');
const { createWriteStream, writeFileSync } = require('fs');
const { SitemapStream } = require('sitemap');

const HOSTNAME = process.env.NEXT_PUBLIC_URL;
const PAGE_DIR = 'src/pages';
const SOURCE = path.join(__dirname, PAGE_DIR, '/**/!(_*).js');
const DESTINATION = path.join(__dirname, 'public', 'sitemap.xml');

function addPage(url, lastMod, sitemap) {
  sitemap.write({ url, changefreq: 'daily', priority: 0.7 });
}

async function generateDiskPages(lastMod, sitemap) {
  const diskPages = glob.sync(SOURCE);
  diskPages.forEach((el) => {
    let page = el.replace(path.join(__dirname, PAGE_DIR), '');
    if (page.startsWith('/api')) {
      return;
    }

    if (page === '/404.js') {
      return;
    }

    page = page.replace(/.js$/, '');

    if (page.match(/.*\/index$/)) {
      page = page.replace(/(.*)index$/, '$1');
    }

    if (page.match(/\[.*\]/)) {
      return;
    }

    addPage(page, lastMod, sitemap);
  });
}

async function buildSitemap() {
  console.log('SITEMAP START');
  const buildDate = new Date();
  const lastMod = `${buildDate.getFullYear()}-${(`0${buildDate.getMonth() + 1}`).slice(-2)}-${(
    `0${buildDate.getDate()}`
  ).slice(-2)}`;

  const sitemap = new SitemapStream({ hostname: HOSTNAME });
  sitemap.pipe(createWriteStream(DESTINATION));

  await generateDiskPages(lastMod, sitemap);

  console.log('SITEMAP END');
  sitemap.end();

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${HOSTNAME}/sitemap.xml`;
  writeFileSync('./public/robots.txt', robotsTxt);
}

buildSitemap();
