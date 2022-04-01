import React from 'react';
import cx from 'classnames';
import Image from 'baseComponents/CmsImage';
import { Grid, Row, Col } from 'components/grid';
//  Styles
import styles from './Careers.module.scss';
import Header from 'baseComponents/Header';

const Careers = ({
  className,
  ...props
}) => {
  const banner = require(`../../../../public/images/careers-banner.jpg`);

  const sectionName = `Careers`;
  const title = `We are looking for people who want to build and disrupt`;
  const subsections = [
    {
      title: `Sales & Marketing`,
      text: `Turpis commodo ligula leo eu a. In viverra id sit mauris risus risus ornare.`,
    },
    {
      title: `Customer Success`,
      text: `Turpis commodo ligula leo eu a. In viverra id sit mauris risus risus ornare.`,
    },
    {
      title: `Marketing`,
      text: `Turpis commodo ligula leo eu a. In viverra id sit mauris risus risus ornare.`,
    },
    {
      title: `Data Science & AI`,
      text: `Turpis commodo ligula leo eu a. In viverra id sit mauris risus risus ornare.`,
    },
    {
      title: `Engineering`,
      text: `Turpis commodo ligula leo eu a. In viverra id sit mauris risus risus ornare.`,
    }
  ];

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        <Row>
          <Col xs={12}>
            <div className={styles.contBanner}>
              <Image
                alt={`Carrers featured banner image`}
                src={banner}
                objectFit="cover"
                layout="fill"
                className={styles.image}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className={styles.sectionName}>
              <span>{ sectionName }</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className={styles.title}>
              <Header tag="div" gradient>{ title }</Header>
            </div>
          </Col>
        </Row>
        <Row>
          {subsections.map((subsection, index) => (
            <Col key={index} xs={12} lg={4}>
              <div className={styles.subsection}>
                <div className={styles.title}>
                  <span>{ subsection.title }</span>
                </div>
                <div className={styles.text}>
                  <span>{ subsection.text }</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
}

export default Careers;
