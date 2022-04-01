import React from 'react';
import cx from 'classnames';
import Image from 'next/image';
import { DiagonalArrow, Stain4, Stain5 } from 'components/icons';
import { Col, Grid, Row } from '~grid';
import styles from './CareerModule.module.scss';
import Button from '~baseComponents/Button';
import { CareerModulePropTypes } from './Types';

function CareerModule({
  className,
  eyebrow,
  headline,
  items,
  body,
  ctaLink,
  ctaText,
  openLinkInNewTab,
  sysId,
  ...props
}) {
  // console.log(`CareerModule props: `, props);
  // return null;
  return (
    <div
      {...props}
      id="careerModule"
      className={cx(styles.component, className)}
    >
      <Stain4 className={styles.leftStain} />
      <Stain5 className={styles.rightStain} />
      <div className={styles.content}>
        <Grid>
          <Row>
            <Col xs={12} lgOffset={1} lg={5}>
              {eyebrow && (
                <p className={styles.eyebrow}>{eyebrow.toUpperCase()}</p>
              )}
              {headline && <h3 className={styles.headline}>{headline}</h3>}
            </Col>
          </Row>
          <Row>
            <Col xs={12} lgOffset={1} lg={8}>
              <Row>
                {items.map((item, index) => {
                  const { text, image } = item;
                  return (
                    <Col key={index} xs={12} lg={6}>
                      <div className={styles.contImage}>
                        <Image
                          alt={image.alt}
                          src={image.url}
                          objectFit="cover"
                          layout="fill"
                        />
                      </div>
                      <p className={styles.itemText}>{text}</p>
                    </Col>
                  );
                })}
              </Row>
              <Row>
                <Col xs={12}>
                  {body && <p className={styles.body}>{body}</p>}
                  {ctaLink && ctaText ? (
                    <Button
                      baseColors="GreenBlack_Hover"
                      target={openLinkInNewTab ? '_blank' : '_self'}
                      href={ctaLink}
                    >
                      {ctaText}
                      <span className={styles.ctaArrowIcon}>
                        <DiagonalArrow />
                      </span>
                    </Button>
                  ) : null}
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}
CareerModule.defaultProps = {
  className: '',
};
CareerModule.propTypes = CareerModulePropTypes;

export default CareerModule;
