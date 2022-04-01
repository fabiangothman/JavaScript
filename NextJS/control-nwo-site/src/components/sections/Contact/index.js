import React from 'react'
import { Grid, Row, Col } from 'grid'
import SectionWrapper from 'baseComponents/SectionWrapper'
import Header from 'baseComponents/Header'
import ContactForm from 'baseComponents/ContactForm'
import styles from './Contact.module.scss'

const Contact = ({slug}) => {
  
  return (
    <SectionWrapper slug={slug}>
      <Grid fluid className={styles.description}>
        <Row>
          <Col xs={12} lg={6} className={styles.textContainer}>
            <Header tag="h2" gradient className={styles.header}>Contact</Header>
          </Col>
          <Col xs={12} lg={6} className={styles.formContainer}>
            <ContactForm />
          </Col>
        </Row>    
      </Grid>
    </SectionWrapper>
  )
}

export default Contact
