import React from 'react'
import { Grid } from 'grid'
import SectionWrapper from 'baseComponents/SectionWrapper'
import ReversibleRow from 'baseComponents/ReversibleRow'
import Header from 'baseComponents/Header'
import Text from 'baseComponents/Text'

import styles from './TechnologyTiles.module.scss'

const TechnologyTiles = () => {
 
  return (
      <SectionWrapper >
        <Grid fluid className={styles.tiles}>
          <ReversibleRow animation="technology-01.mp4" className={styles.row}>
            <Header tag="h2" className={styles.header}>Think Google for global trends</Header>
            <Text className={styles.text}>
              <p>Queries can be phrased in plain speech, as if posed to a human expert. We’ve examined the context surrounding millions of topics to deliver deep, actionable insights in under a minute.
              </p>
              <p>Google answers the what. NWO answers the why.</p>
            </Text>
          </ReversibleRow>
        
          <ReversibleRow inverted animation="technology-02.mp4" className={styles.row}>
            <Header tag="h2" className={styles.header}>Beautiful Machine-Generated Summaries</Header>
            <Text className={styles.text}>
              Within seconds of performing a search, NWO generates a Signal Report on the topic in question to answer the what, where, when, who, and why behind the trend. These reports serve as a one-stop shop for clients to identify, leverage, and perform forensic analysis on trends, providing a deeper understanding of the underlying factors driving their growth or decline.
            </Text>
          </ReversibleRow>

          <ReversibleRow animation="technology-03.mp4" className={styles.row}>
            <Header tag="h2" className={styles.header}>Petabyte-scale Data Coverage</Header>
            <Text className={styles.text}>
              NWO analyzes massive troves of public and proprietary data sources to capture the voice of the consumer — from search engines and social networks to online media and even TV stations. NWO’s algorithms time-shift and layer-in these sources to understand which of them would be the strongest contributors to the growth or decline of a trend.
            </Text>
          </ReversibleRow>
        </Grid>
      </SectionWrapper>
  )
}

export default TechnologyTiles
