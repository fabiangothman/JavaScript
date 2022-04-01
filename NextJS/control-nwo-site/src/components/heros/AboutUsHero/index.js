import React from 'react'
import SectionWrapper from 'baseComponents/SectionWrapper'
import { Grid, Row, Col } from 'grid'
import Header from 'baseComponents/Header'
import Text from 'baseComponents/Text'
import styles from './AboutUsHero.module.scss'

const AboutUsHero = () => {
  return (
    <SectionWrapper className={styles.mainHero}>
      <Grid>
        <Row startXs>
          <Col xs={12} lg={9}>
            <div className={styles.contentWrapper}>
              <Header className={styles.header}>Mission Statement</Header>
              <Text className={styles.description}>
                COVID-19 has created a new social, political, and economic world order — one that is increasingly driven by cultural narratives and online discourse. NWO’s bleeding-edge technology enables clients to surface the fears, motivations, and demand drivers underlying various Signals, providing them with unprecedented access to the why behind a narrative. NWO’s platform is already in use by several Fortune 500 brands to empower key resource allocation decisions.
              </Text>
            </div>
          </Col>
        </Row>
      </Grid>
    </SectionWrapper>
  )
}

export default AboutUsHero
