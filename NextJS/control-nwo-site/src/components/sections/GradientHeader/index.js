import React from 'react'
import SectionWrapper from 'baseComponents/SectionWrapper'
import { Grid, Row, Col } from 'grid'
import Header from 'baseComponents/Header'
import styles from './GradientHeader.module.scss'

const GradientHeader = ({slug}) => {
  return (
    <SectionWrapper slug={slug}>
      <Grid>
        <Row aroundXs>
          <Col xs={12} className={styles.textContainer}>
            <Header tag="h2" gradient>
              NWO.AI is a predictive platform that tracks more than 93 million microtrends, and notifies clients about trends before they become exponential.
            </Header>
          </Col>
        </Row>
      </Grid>
    </SectionWrapper>
  )
}

export default GradientHeader
