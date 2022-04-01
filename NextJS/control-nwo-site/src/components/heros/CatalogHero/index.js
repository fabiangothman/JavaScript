import React from 'react';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
import Header from 'baseComponents/Header';
//  Styles
import styles from './CatalogHero.module.scss';

const CatalogHero = ({
  className,
  title,
  text,
  ...props
}) => {
  // console.log(`CatalogHero title: `, title);
  // console.log(`CatalogHero text: `, text);
  // return null;


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

export default CatalogHero;
