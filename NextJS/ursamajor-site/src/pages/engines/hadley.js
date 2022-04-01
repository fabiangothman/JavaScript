import React from 'react'

import EngineDetail from '../../components/engines/EngineDetail.js'
import { Grid } from '../../components/grid'
import MainLayout from '../../components/layouts/MainLayout'
import { ContentfulAPI } from '../../utils/contentful'
import { getAttachmentParams, getImageParams } from '../../utils/contentfulHelpers'

function Hadley({ page }) {
  const { settings = {}, seo = {}, engine, featuredImage, gallery = [], contact } = page
  return (
    <MainLayout styleType="darkGrey" settings={settings} head={seo}>
      <Grid fluid>
        <EngineDetail
          engine={engine}
          featuredImage={featuredImage}
          gallery={gallery}
          contact={contact}
        />
      </Grid>
    </MainLayout>
  )
}

export default Hadley

export async function getStaticProps() {
  try {
    const enginesResult = await ContentfulAPI.getEntries({
      content_type: 'enginesPage',
      include: 5
    })
    const enginesPage = await enginesResult.items
      .map((p) => {
        return p.fields
      })
      .shift()

    const enginePageResult = await ContentfulAPI.getEntry('5MGK0WP5y9ZPx1H3ncnHRv')
    const globalResult = await ContentfulAPI.getEntries({ content_type: 'globalSettings' })
    const page = await enginePageResult.fields
    const featureList = await Promise.all(
      page.engine.fields.featureList.map(({ sys }) => ContentfulAPI.getEntry(sys.id))
    )
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
          engine: {
            ...page.engine.fields,
            heroImage: getImageParams(page.heroImage),
            backgroundMobileImage: getAttachmentParams(page.heroMobileImage),
            engineFullHeight:
              getImageParams(page.engine.fields.imageFullHeight) ||
              getImageParams(page.engine.fields.engineImage) ||
              null,
            engineImage: getImageParams(page.engine.fields.engineImage),
            features: page.features.map((f) => {
              return { ...f.fields }
            }),
            featureList: featureList.map(({ fields }) => ({ ...fields })),
            slides: enginesPage.enginesSlideShow.map((engine) => {
              return {
                ...engine.fields,
                imageFullHeight:
                  getImageParams(engine.fields.imageFullHeight) ||
                  getImageParams(engine.fields.engineImage) ||
                  null,
                mainImage: getImageParams(engine.fields.engineImage) || null
              }
            })
          },
          featuredImage: getAttachmentParams(page.fullWidthDetailImage),
          gallery: page.gallery.map((image) => getImageParams(image)),
          contact: { ...page.contactSection.fields }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
