import React from 'react'

import EnginesSection1 from '../components/engines/EnginesSection1'
import EnginesSection2 from '../components/engines/EnginesSection2'
import Hero from '../components/engines/Hero'
import { Grid } from '../components/grid'
import MainLayout from '../components/layouts/MainLayout'
import { ContentfulAPI } from '../utils/contentful'
import { getAttachmentParams, getImageParams } from '../utils/contentfulHelpers'

function EnginesPage({ page }) {
  const { settings, seo, hero, section1, section2, section3 } = page

  return (
    <MainLayout settings={settings} head={seo}>
      <Grid fluid>
        {hero && <Hero {...hero} />}
        {section1 && <EnginesSection1 {...section1} />}
        {section2 && <EnginesSection2 {...section2} {...section3} />}
      </Grid>
    </MainLayout>
  )
}

export default EnginesPage

export async function getStaticProps() {
  try {
    const enginesResult = await ContentfulAPI.getEntries({
      content_type: 'enginesPage',
      include: 5
    })
    const globalResult = await ContentfulAPI.getEntries({ content_type: 'globalSettings' })
    const page = await enginesResult.items
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
            topImage: getImageParams(page.section1FullWidthImage),
            title: page.section1Title,
            description: page.section1Description,
            slides: page.enginesSlideShow.map((engine) => {
              return {
                ...engine.fields,
                imageFullHeight:
                  getImageParams(engine.fields.imageFullHeight) ||
                  getImageParams(engine.fields.engineImage) ||
                  null,
                mainImage: getImageParams(engine.fields.engineImage) || null
              }
            }),
            sideImage: getImageParams(page.section1Image),
            tabs: page.section1Features.map((tab) => {
              return {
                title: tab.fields.title,
                features: tab.fields.features.map((f) => {
                  return {
                    ...f.fields,
                    icon: getImageParams(f.fields.icon)
                  }
                })
              }
            })
          },
          section2: {
            boldHeader: page.section2BoldHeader,
            header: page.section2Header,
            description: page.section2Description,
            image: getImageParams(page.section2Image)
          },
          section3: {
            images: page.section3Images.map((image) => getImageParams(image)),
            features: page.section3Features.map((feature) => {
              return { ...feature.fields }
            })
          }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
