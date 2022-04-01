import React, { useState } from 'react'
import cx from 'classnames'
import { Grid, Row, Col } from 'grid'
import useIsMobile from 'hooks/useIsMobile'
import SectionWrapper from 'baseComponents/SectionWrapper'
import Header from 'baseComponents/Header'
import OptimizedImage from 'baseComponents/OptimizedImage'

import styles from './Description.module.scss'

const Description = () => {
  const [isMobile, setIsMobile] = useState(false)

  const updateIsMobile = (isMobile) => {
    setIsMobile(isMobile)
  }

  useIsMobile(updateIsMobile)

  return (
    <SectionWrapper className={styles.bg}>
      <Grid fluid className={styles.description}>
        <Row>
          <Col xs={12} lg={5} className={cx('last-xs', 'first-lg', styles.animationContainer)}>
            <OptimizedImage
              fluid
              height={isMobile ? 930 : 2268}
              image={isMobile ? 'animations/animation2-mobile.jpg' : 'animations/animation2-desktop.jpg'}
              width={isMobile ? 1242 : 1776}
            />
          </Col>
          <Col xs={12} lg={7} className={cx('first-xs', 'last-lg', styles.textContainer)}>
            <Header tag="h4">
              Our predictive AI platform enables leading Fortune 500 companies and government agencies to anticipate and track global cultural shifts by aggregating, analyzing, and producing actionable reports on human-generated data.
            </Header>
          </Col>
        </Row>    
      </Grid>
    </SectionWrapper>
  )
}

export default Description
