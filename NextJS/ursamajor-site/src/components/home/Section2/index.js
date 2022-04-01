import IconMasterWarning from 'baseComponents/Icons/IconMasterWarning'
import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { Col, Row } from '../../grid'
import styles from './Section2.module.scss'

const Section2 = (props) => {
  const { title, subtitle, features } = props
  return (
    <div className={styles.sectionContainer}>
      <div className="large-container-with-left-pad">
        <Row className={styles.sectionName}>
          <Col className={'no-pad'} xs={6}>
            <h5>The Problem</h5>
          </Col>
          <Col className={`${styles.separator} no-pad`} xs={6}>
            <div className={styles.divider} />
          </Col>
        </Row>
        <Row className={styles.descriptions}>
          <Col className={'no-pad'} xs={12} xl={6}>
            <h2>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </Col>
          <Col className={styles.iss} xs={12} xl={6}>
            <div className={styles.satelliteContainer}>
              <ImageWrapper
                src="/gifs/satellite.gif"
                alt="satellite"
                objectFit="cover"
                layout="fill"
              />
            </div>
            <p className={cx(styles.company, styles.subtitleSatellite)}>
              companies are the only private suppliers of cargo to the ISS
            </p>
          </Col>
          <Col className={`${styles.separator} no-pad`} xs={12} xl={6} xlOffset={6}>
            <div className={styles.dividerGrey} />
          </Col>
          <Col xsLast className={styles.warning} xs={12} xl={6}>
            <Row>
              <Col xs={6}>
                <div className={styles.cometContainer}>
                  <ImageWrapper src="/gifs/comet.gif" alt="comet" objectFit="cover" layout="fill" />
                </div>
              </Col>
              <Col xs={6} className={styles.disableWarning}>
                <p className={styles.masterWarning}>Master Warning</p>
                <p className={styles.id}>E67-4531</p>
                <p className={styles.tlm}>
                  TML Fail &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No Data
                </p>
                <br />
                <span className={styles.block}></span>
                <br />
                <p className={styles.searching}>Searching...</p>
              </Col>
              <Col xs={6} className={cx('no-pad', styles.disableWarningSvg)}>
                <IconMasterWarning />
              </Col>
            </Row>
          </Col>
          <Col className="no-pad" xlLast xs={12} xl={6}>
            <div className={styles.highlights}>
              {features &&
                features.length > 0 &&
                features.map((f, i) => (
                  <Row key={`section2-feature-${i}`} className="no-pad" xs={12}>
                    <Col xs={6}>
                      <p className={styles.featureTitle}>{f.title}</p>
                    </Col>
                    <Col xs={6}>
                      <p className={cx(styles.featureText, styles.subtitle)}>{f.description}</p>
                    </Col>
                  </Row>
                ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

Section2.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  features: PropTypes.array.isRequired
}

export default Section2
