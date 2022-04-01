import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
import Header from 'baseComponents/Header';
import { ArrowSlimRight } from 'components/icons';
//  Styles
import styles from './OpenPositions.module.scss';

const OpenPositions = ({
  className,
  data = [],
  ...props
}) => {
  const title = `Open Positions`;
  // Order list by post date
  data.sort((a, b) => a.date - b.date);

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        <Row>
          <Col xs={12}>
            <div className={styles.title}>
              <span>{ title }</span>
            </div>
          </Col>
        </Row>
        <Row>
          {data.map((position, index) => (
            <Col key={index} xs={12}>
              <Link href={`${position.path}/${position.slug}`} passHref>
                <div className={styles.position}>
                  <div className={styles.label}>
                    <Header tag="span" gradient>{ position.title }</Header>
                  </div>
                  <div className={styles.arrowIcon}>
                    <ArrowSlimRight width="5" />
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
}

export default OpenPositions;
