import React from 'react'

import { Grid } from '../components/grid'
import Hero from '../components/home/Hero'
import Section1 from '../components/home/Section1'
import Section2 from '../components/home/Section2'
import Section3 from '../components/home/Section3'
import Section4 from '../components/home/Section4'
import Section5 from '../components/home/Section5'
import MainLayout from '../components/layouts/MainLayout'
import { ContentfulAPI } from '../utils/contentful'
import { getAttachmentParams, getImageParams, getRefParams } from '../utils/contentfulHelpers'

function IndexPage({ page }) {
  const { settings, seo, hero, section1, section2, section3, section4, section5 } = page
  return (
    <MainLayout settings={settings} head={seo}>
      <Grid fluid>
        {hero && <Hero {...hero} />}
        {section1 && <Section1 {...section1} />}
        {section2 && <Section2 {...section2} />}
        {section3 && <Section3 {...section3} />}
        {section4 && <Section4 {...section4} />}
        {section5 && <Section5 {...section5} />}
      </Grid>
    </MainLayout>
  )
}

export default IndexPage

export async function getStaticProps() {
  try {
    const homepageResult = await ContentfulAPI.getEntries({ include: 3, content_type: 'homepage' })
    const globalResult = await ContentfulAPI.getEntries({ content_type: 'globalSettings' })
    const page = await homepageResult.items
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
            mobileBackground: getAttachmentParams(page.hero.fields.backgroundMobileImage),
            background: getAttachmentParams(page.hero.fields.background)
          },
          section1: {
            title: page.section1Title,
            topImage: getImageParams(page.section1Image),
            topImageMobile: getImageParams(page.section1ImageMobile),
            buttons: getRefParams(page.section1Buttons),
            engineImages: page?.section1EngineColumn.map((image) => getImageParams(image))
          },
          section2: {
            title: page.section2Title,
            subtitle: page.section2Description,
            features: getRefParams(page?.section2Features)
          },
          section3: {
            boldTitle: page.section3TitleBold,
            title: page.section3Title,
            description: page.section3Description,
            buttons: getRefParams(page.section3Buttons),
            slides: page.section3Engines.map((engine) => {
              return {
                ...engine.fields,
                mainImage: getImageParams(engine.fields.engineImage)
              }
            })
          },
          section4: {
            bottomImage: getImageParams(page.section4FullWidthImage),
            title: page.section4Title,
            description: page.section4Description,
            button: {
              ...page.section4Button.fields
            }
          },
          section5: {
            title: page.section5Title,
            description: page.section5Description,
            mainImage: getImageParams(page.section5MainImage),
            mainImageMobile: getImageParams(page.section5MainImageMobile),
            workersImages: page?.section5WorkersImages?.map((image) => getImageParams(image)),
            engineerImages: page?.section5EngineerImages?.map((image) => getImageParams(image)),
            engineImage: getImageParams(page.section5Engine)
          }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
