import React from 'react'
import SectionWrapper from 'baseComponents/SectionWrapper'
import { Grid, Row, Col } from 'grid'
import Header from 'baseComponents/Header'
import Text from 'baseComponents/Text'
import styles from './TechnologyHero.module.scss'

const TechnologyHero = () => {
  return (
    <SectionWrapper className={styles.mainHero}>
      <Grid>
        <Row aroundXs>
          <Col xs={12} lg={10}>
            <div className={styles.contentWrapper}>
              <Header gradient className={styles.header}>Technology</Header>
              <Text className={styles.description}>
                NWO’s proprietary ML and NLP algorithms continuously transform petabytes of unstructured narrative data into intuitive, visual metrics that anyone can understand and leverage.
              </Text>
            </div>
          </Col>
        </Row>
      </Grid>
    </SectionWrapper>
  )
}

export default TechnologyHero
