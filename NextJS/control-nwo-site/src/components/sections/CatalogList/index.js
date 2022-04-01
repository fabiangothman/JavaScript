import React from 'react';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
import CatalogItemCard from 'baseComponents/CatalogItemCard';
//  Styles
import styles from './CatalogList.module.scss';

const CatalogList = ({
  className,
  itemsList = [],
  ...props
}) => {
  // console.log(`CatalogList itemsList: `, itemsList);
  // return null;
  
  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        <Row>
          {itemsList.map((item, index) => (
            <Col
              key={index}
              xs={12}
              lgOffset={index%2 === 0 ? 1 : 0}
              lg={5}
            >
              <div className={styles.contCard}>
                <CatalogItemCard
                  title={item.title}
                  text={item.featuredCardText}
                  image={item.featuredCardImage}
                  slug={item.slug}
                  path={item.path}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
}

export default CatalogList;
