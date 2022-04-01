import React from 'react';
import Image from 'baseComponents/CmsImage';
import cx from 'classnames';
import { Grid, Row, Col } from 'components/grid';
import Header from 'baseComponents/Header';
import DetailCard from 'baseComponents/DetailCard';
import Button from 'baseComponents/Button';
import animateScrollTo from 'animated-scroll-to';
import ScrollLink from 'baseComponents/ScrollLink';
//  Styles
import styles from './CatalogItemDetail.module.scss';

const CatalogItemDetail = ({
  className,
  cardsInfo = [],
  detailImage = null,
  detailText = "",
  title = "",
  ...props
}) => {
  // console.log(`CatalogItemDetail itemListInfo: `, itemListInfo);
  // console.log(`CatalogItemDetail hightlightedData: `, hightlightedData);
  // return null;

  const onCTAClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(`request-demo`);
    animateScrollTo(element, {maxDuration: 1000});
  }

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
          <Col xs={12} lgOffset={1} lg={10}>
            <Row>
              {cardsInfo.map((card, index) => (
                <Col
                  key={index}
                  xs={12}
                  lg={6}
                  xl={4}
                >
                  <div className={styles.contCard}>
                    <DetailCard {...card} />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row className={styles.contExtra}>
          <Col xs={12} lgOffset={1} lg={5}>
            <div className={styles.contImage}>
              {detailImage && <Image
                alt={detailImage.alt}
                src={detailImage.url}
                width={detailImage.width}
                height={detailImage.height}
                objectFit="cover"
                layout="responsive"
                className={styles.image}
              />}
            </div>
          </Col>
          <Col xs={12} lgOffset={1} lg={4}>
            <div className={styles.contText}>
              <div className={styles.text}>
                <span>{ detailText }</span>
              </div>
              <div className={styles.button}>
                <ScrollLink href="/#request-demo">
                  <Button
                    tag="button"
                    color="blue"
                    outlined
                    rounded
                    icon="dot"
                  >
                    <span>Request demo</span>
                  </Button>
                </ScrollLink>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default CatalogItemDetail;
