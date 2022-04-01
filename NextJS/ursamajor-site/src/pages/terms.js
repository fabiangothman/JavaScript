import React from 'react'

import RichText from '../components/base/RichText'
import { Col, Grid, Row } from '../components/grid'
import MainLayout from '../components/layouts/MainLayout'
import { ContentfulAPI } from '../utils/contentful'

function TermsPage({ page }) {
  const { settings = {}, seo, content } = page
  return (
    <MainLayout
      darkMode
      head={seo}
      styleType="grey"
      settings={settings}
      visibleMenu={false}
      noLeftPad={true}
    >
      <Grid fluid>
        <Row>
          <div className="large-container-with-left-pad">
            <Col className="terms" xs={12} lg={12}>
              <RichText content={content} />
            </Col>
          </div>
        </Row>
      </Grid>
    </MainLayout>
  )
}

export default TermsPage

export async function getStaticProps() {
  try {
    const privacyResult = await ContentfulAPI.getEntry('6ZNvUgrbYmiozonAI8MFIe')
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
