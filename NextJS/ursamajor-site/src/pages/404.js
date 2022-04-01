import Gradient from 'baseComponents/Gradient'
import { IconBear } from 'baseComponents/Icons'
import React from 'react'
import { ContentfulAPI } from 'utils/contentful'

import { Col, Row } from '../components/grid'
import MainLayout from '../components/layouts/MainLayout'

function ErrorPage({ page, statusCode = '404' }) {
  const { settings } = page

  const head = {
    title: `${statusCode} | Ursa Major Technologies`
  }

  return (
    <MainLayout isError head={head} styleType="black" settings={settings}>
      <Row className="errorRow no-pad">
        <div className="errorContainer">
          <Col className="errorCol no-pad" xs={12}>
            <div className="textContainer">
              <div className="large-container-with-left-pad">
                <Row className="standard-pad">
                  <Col xs={12}>
                    <div className="blockContainer">
                      <h5 className="title">{statusCode}</h5>
                      <span className="block"></span>
                    </div>
                    <h5 className="text">We’ve had a problem</h5>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="errorBearContainer">
              <IconBear fill="#fff" />
            </div>
          </Col>
        </div>
      </Row>
      <Gradient />
    </MainLayout>
  )
}

export async function getStaticProps() {
  try {
    const globalResult = await ContentfulAPI.getEntries({ content_type: 'globalSettings' })
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
            footerTitleWhite: 'Crafted by experts from every discipline'
          },
          seo: null
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export default ErrorPage
