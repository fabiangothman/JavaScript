import React from 'react';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
import Header from 'baseComponents/Header';
//  Styles
import styles from './TechnologyHero2.module.scss';

const TechnologyHero2 = ({
  className,
  ...props
}) => {
  const title = `Technology`;
  const text = `NWO’s proprietary ML and NLP algorithms continuously transform petabytes of unstructured narrative data into intuitive, visual metrics that anyone can understand and leverage.`;

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        <Row>
          <Col xs={12}>
            <div className={styles.title}>
              <Header tag="span" gradient>{ title }</Header>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lgOffset={2} lg={8}>
            <div className={styles.text}>
              <span>{ text }</span>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default TechnologyHero2;
