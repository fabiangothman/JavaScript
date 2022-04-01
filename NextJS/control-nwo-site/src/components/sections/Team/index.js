import React from 'react'
import { Grid, Row, Col } from 'grid'
import SectionWrapper from 'baseComponents/SectionWrapper'
import Header from 'baseComponents/Header'
import TeamMember from 'baseComponents/TeamMember'
import styles from './Team.module.scss'

const Team = () => {

  return (
      <SectionWrapper>
        <Grid fluid className={styles.team}>
          <Row>
            <Col xs={12}>
              <Header tag="h2" gradient className={styles.header}>Team</Header>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={3} className={styles.personCell}>
              <TeamMember
                className={styles.person}
                image="sourav_headshot.jpg"
                imageWidth={1320}
                imageHeight={1872}
                name="Sourav Goswami"
                caption="Cofounder, Co-CEO"
                description="3x Founder, Real Estate PE fund manager, Walton Street MD, Goldman Sachs, Adj. Prof at NYU Schack Inst. for RE, Nominated for Smithsonian Award: Media, Arts, and Entertainment 1999, Harvard BA (Honors), Columbia MBA (Honors)."
              />
            </Col>
            <Col xs={12} lg={3} className={styles.personCell}>
            <TeamMember
                className={styles.person}
                image="imogen_headshot.jpg"
                imageWidth={1320}
                imageHeight={1872}
                name="Imogen Low"
                caption="Cofounder, Head of Data Science"
                description="Ran SAP’s Machine Learning efforts in APAC at 17, Westpac Bank Trust Scholar, Asia Pacific ICT Alliance Awardee, Australian iAward Winner, Australian Young ICT Awardee."
              />
            </Col>
            <Col xs={12} lg={3} className={styles.personCell}>
            <TeamMember
                className={styles.person}
                image="miro_headshot.jpg"
                imageWidth={1320}
                imageHeight={1872}
                name="Miroslav Dimitrov"
                caption="Chief Operating Officer"
                description="Ex SAP, led strategic digital transformation projects on 3 continents.  Former head of the flagship open innovation unit of SAP in Europe, focusing on cutting-edge Supply Chain Management and Data & Analytics solutions."
              />
            </Col>
            <Col xs={12} lg={3} className={styles.personCell}>
              <TeamMember
                className={styles.person}
                image="pulkitjaiswal_headshot.jpg"
                imageWidth={1320}
                imageHeight={1872}
                name="Pulkit Jaiswal"
                caption="Cofounder, Co-CEO"
                description="3x Founder, Drone Industry Pioneer, Featured Expert Speaker on CNBC, Youngest MIT “Technology Review Innovator Under 35” (2015), Full Stack Engineer, Developed geopolitical trading signals for hedge funds."
              />
            </Col>
          </Row>
        </Grid>
      </SectionWrapper>
  )
}

export default Team
