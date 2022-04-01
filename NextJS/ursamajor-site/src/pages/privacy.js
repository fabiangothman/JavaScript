import React from 'react'

import RichText from '../components/base/RichText'
import { Col, Grid, Row } from '../components/grid'
import MainLayout from '../components/layouts/MainLayout'
import { ContentfulAPI } from '../utils/contentful'

function PrivacyPage({ page }) {
  const { settings = {}, seo, content } = page
  return (
    <MainLayout darkMode head={seo} styleType="grey" settings={settings} visibleMenu={false}>
      <Grid fluid>
        <Row>
          <div className="large-container-with-left-pad">
            <Col className="privacy" xs={12} lg={12}>
              <RichText wrapperName="wrapper" content={content} />
            </Col>
          </div>
        </Row>
      </Grid>
    </MainLayout>
  )
}

export default PrivacyPage

export async function getStaticProps() {
  try {
    const privacyResult = await ContentfulAPI.getEntry('11pavmMqn0ZEgKx43qNIfr')
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
