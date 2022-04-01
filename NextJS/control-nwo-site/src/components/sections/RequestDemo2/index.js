import React from 'react';
import { Grid, Row, Col } from 'grid';
import SectionWrapper from 'baseComponents/SectionWrapper';
import Header from 'baseComponents/Header';
import ContactForm2 from 'baseComponents/ContactForm2';
//  Styles
import styles from './RequestDemo2.module.scss';

const RequestDemo2 = ({slug}) => {
  const title = `Request a demo`;
  
  return (
    <SectionWrapper slug={slug}>
      <div className={styles.component}>
        <Grid>
          <Row>
            <Col xs={12}>
              <Header tag="div" gradient className={styles.title}>
                <span>{title}</span>
              </Header>
            </Col>
            <Col xs={12} lgOffset={3} lg={6}>
              <ContactForm2 />
            </Col>
          </Row>    
        </Grid>
      </div>
    </SectionWrapper>
  )
}

export default RequestDemo2;
