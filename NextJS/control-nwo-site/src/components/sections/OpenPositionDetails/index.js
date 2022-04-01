import React from 'react';
import cx from 'classnames';
import animateScrollTo from 'animated-scroll-to';
import { Col, Grid, Row } from 'components/grid';
import RichText from 'baseComponents/RichText';
import Header from 'baseComponents/Header';
import Button from 'baseComponents/Button';
//  Styles
import * as styles from './OpenPositionDetails.module.scss';

const OpenPositionDetails = ({
  className,
  description,
  mailto = "",
  title,
  ...props
}) => {

  const onCTAClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(`request-demo`);
    animateScrollTo(element, {maxDuration: 1000});
  }

  if (!description) {
    return null;
  }
  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        <Row>
          <Col xs={12} lgOffset={1} lg={10}>
            <div className={styles.title}>
              <Header tag="span" gradient>{ title }</Header>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lgOffset={1} lg={10}>
            <div className={styles.button}>
              <Button
                tag="a"
                href={`mailto: ${mailto}`}
                color="blue"
                outlined
                rounded
                icon="dot"
              >
                <span>APPLY THIS POSITION</span>
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lgOffset={1} lg={7}>
            <div className={styles.description}>
              <RichText
                headingStyle={styles.heading}
                h1Style={styles.heading}
                h2Style={styles.heading}
                h6Style={styles.heading}
                pStyle={styles.text}
                content={description}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lgOffset={1} lg={10}>
            <div className={styles.button}>
              <Button
                tag="a"
                href={`mailto: ${mailto}`}
                color="blue"
                outlined
                rounded
                icon="dot"
              >
                <span>APPLY THIS POSITION</span>
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default OpenPositionDetails;
