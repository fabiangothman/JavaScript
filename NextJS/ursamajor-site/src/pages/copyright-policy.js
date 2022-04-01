import React from 'react'

import RichText from '../components/base/RichText'
import { Col, Grid, Row } from '../components/grid'
import MainLayout from '../components/layouts/MainLayout'
import { ContentfulAPI } from '../utils/contentful'

function CopyrightPage({ page }) {
  const { settings = {}, seo, content } = page
  return (
    <MainLayout darkMode head={seo} styleType="grey" settings={settings}>
      <Grid fluid>
        <Row className="standard-pad">
          <Col className="no-pad privacy" xs={12} lg={12}>
            <RichText content={content} />
          </Col>
        </Row>
      </Grid>
    </MainLayout>
  )
}

export default CopyrightPage

export async function getStaticProps() {
  try {
    const privacyResult = await ContentfulAPI.getEntry('FhMW9h9MdzOcNbKoZvs6N')
    const globalResult = await ContentfulAPI.getEntries({ content_type: 'globalSettings' })
    const page = await privacyResult.fields
    const settings = await globalResult.items
      .map((p) => {
        return p.fields
      })
      .shift()
    return {
      props: {
        page: {
          settings,
          seo: page.seo?.fields || null,
          content: page.content
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
