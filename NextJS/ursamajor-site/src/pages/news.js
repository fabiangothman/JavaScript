import React from 'react'

import { Grid } from '../components/grid'
import MainLayout from '../components/layouts/MainLayout'
import Hero from '../components/news/Hero'
import News from '../components/news/News'
import { ContentfulAPI } from '../utils/contentful'
import { getAttachmentParams, getImageParams } from '../utils/contentfulHelpers'

function NewsPage({ page }) {
  const { settings, seo, hero, news } = page
  return (
    <MainLayout styleType="darkGrey" settings={settings} head={seo}>
      <Grid fluid>
        {hero && <Hero {...hero} />}
        {news && <News {...news} />}
      </Grid>
    </MainLayout>
  )
}

export default NewsPage

export async function getStaticProps() {
  try {
    const newsResult = await ContentfulAPI.getEntries({
      content_type: 'newsPage',
      include: 5
    })
    const globalResult = await ContentfulAPI.getEntries({ content_type: 'globalSettings' })
    const page = await newsResult.items
      .map((p) => {
        return p.fields
      })
      .shift()
    const settings = await globalResult.items
      .map((p) => {
        return p.fields
      })
      .shift()
    return {
      props: {
        page: {
          settings: {
            ...settings,
            footerTitle: null,
            footerTitleWhite: page?.footerWhiteTitle || settings?.footerTitleWhite
          },
          seo: page.seo?.fields || null,
          hero: {
            ...page?.hero?.fields,
            backgroundMobileImage: getAttachmentParams(page.hero.fields.backgroundMobileImage),
            background: getAttachmentParams(page?.hero?.fields.background)
          },
          news: {
            headline: page?.headline,
            newsItems: page?.newsItems?.map((n) => {
              return {
                ...n?.fields,
                image: getImageParams(n?.fields?.image) || null
              }
            })
          }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
