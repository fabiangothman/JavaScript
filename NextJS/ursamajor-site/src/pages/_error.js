import React from 'react'

import { IconQuestion } from '../components/base/Icons'
import { Col, Grid, Row } from '../components/grid'
import MainLayout from '../components/layouts/MainLayout'

function ErrorPage({ statusCode, settings }) {
  const head = {
    title: `${statusCode} | Ursa Major Technologies`
  }
  return (
    <MainLayout isError head={head} styleType="black" settings={settings}>
      <Grid className="errorPage" fluid>
        <Row className="standard-pad">
          <Col xs={12} lg={12}>
            <div className="errorIcon">
              <IconQuestion width={64} height={64} fill="#FC4C21" />
            </div>
          </Col>
        </Row>
        <Row className="standard-pad">
          <Col xs={12} lg={12}>
            <div className="errorPageText">{statusCode} - We’ve had a problem</div>
          </Col>
        </Row>
      </Grid>
    </MainLayout>
  )
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
