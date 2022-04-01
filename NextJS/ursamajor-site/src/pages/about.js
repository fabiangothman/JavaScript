import React from 'react'

import AboutSection1 from '../components/about/AboutSection1'
import AboutSection2 from '../components/about/AboutSection2'
import AboutSection3 from '../components/about/AboutSection3'
import Hero from '../components/about/Hero'
import { Grid } from '../components/grid'
import MainLayout from '../components/layouts/MainLayout'
import { ContentfulAPI } from '../utils/contentful'
import { getAttachmentParams, getImageParams } from '../utils/contentfulHelpers'

function AboutPage({ page }) {
  const { settings, seo, hero, section1, section2, section3 } = page

  return (
    <MainLayout settings={settings} head={seo}>
      <Grid fluid>
        {hero && <Hero {...hero} />}
        {section1 && <AboutSection1 {...section1} />}
        {section2 && <AboutSection2 {...section2} />}
        {section3 && <AboutSection3 {...section3} />}
      </Grid>
    </MainLayout>
  )
}

export default AboutPage

export async function getStaticProps() {
  try {
    const aboutResult = await ContentfulAPI.getEntries({
      content_type: 'aboutPage',
      include: 5
    })
    const globalResult = await ContentfulAPI.getEntries({ content_type: 'globalSettings' })
    const page = await aboutResult.items
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
          settings: { ...settings, ...page?.individualPageFooter?.fields } || null,
          seo: page.seo?.fields || null,
          hero: {
            ...page.hero.fields,
            backgroundMobileImage: getAttachmentParams(page.hero.fields.backgroundMobileImage),
            background: getAttachmentParams(page.hero.fields.background)
          },
          section1: {
            headline: page.section1Headline,
            description: page.section1Description,
            image: getImageParams(page.section1Image),
            secondImage: getImageParams(page.section1Image2)
          },
          section2: {
            headline: page.section2Headline,
            description: page.section2Description,
            firstImage: getImageParams(page.section2Image1),
            secondImage: getImageParams(page.section2Image2),
            location: page.section2UrsaLocation,
            desktopBackground: getImageParams(page.workplaceDesktopImage),
            mobileBackground: getImageParams(page.workplaceMobileImage)
          },
          section3: {
            headline: page.section3Headline,
            description: page.section3Description,
            advisorsHeadline: page.advisorsHeadline,
            advisors: page.advisors.map((a) => {
              return {
                ...a.fields,
                picture: getImageParams(a.fields.picture)
              }
            })
          },
          contact: { ...page.contactSection.fields }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
