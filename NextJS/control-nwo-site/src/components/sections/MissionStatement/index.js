import React from 'react';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
//  Styles
import styles from './MissionStatement.module.scss';

const MissionStatement = ({
  className,
  ...props
}) => {
  const title = `Mission Statement`;
  const text = `COVID-19 has created a new social, political, and economic world order — one that is increasingly driven by cultural narratives and online discourse. NWO’s bleeding-edge technology enables clients to surface the fears, motivations, and demand drivers underlying various Signals, providing them with unprecedented access to the why behind a narrative. NWO’s platform is already in use by several Fortune 500 brands to empower key resource allocation decisions.`;

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <div className={styles.hero}>
        <Grid fluid>
          <Row>
            <Col xs={12} lgOffset={1} lg={7}>
              <div className={styles.title}>
                <span>{ title }</span>
              </div>
              <div className={styles.text}>
                <span>{ text }</span>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}

export default MissionStatement;
