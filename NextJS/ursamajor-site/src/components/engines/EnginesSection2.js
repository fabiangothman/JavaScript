import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { Col, Row } from '../grid'
import styles from './styles/Section2.module.scss'

const EnginesSection2 = (props) => {
  const { boldHeader, header, description, features, images } = props
  return (
    <div className={styles.sectionContainer}>
      <div className="large-container-with-left-pad">
        <Row>
          <Col className={styles.standardsCol} xs={12} lg={4}>
            <div className={styles.title}>
              <span className={styles.bold}>{boldHeader}</span>
              <br />
              <span>{header}</span>
            </div>
            <p className={styles.desc}>{description}</p>
            <div className={styles.shorterDivider}></div>
          </Col>

          <Col className={cx('no-pad', styles.imagesWrapper, styles.hideOnDesktop)} xs={12}>
            {images.map(({ url, alt }, index) => {
              return (
                <Row className={cx(styles.mobileRow)} key={index}>
                  <Col xs={6}>
                    <div className={styles.mobileContent}>
                      <h3 className={styles.featureTitle}>{features[index].title}</h3>
                      <p className={styles.featureDescription}>{features[index].description}</p>
                    </div>
                  </Col>
                  <Col className={cx({ [styles.mobileChangeOrder]: index === 1 })} xs={6}>
                    <div className={styles.image}>
                      <ImageWrapper src={url} alt={alt} objectFit="cover" layout="fill" />
                    </div>
                  </Col>
                </Row>
              )
            })}
          </Col>

          <Col className={cx('no-pad', styles.imagesWrapper, styles.hideOnMobile)} xs={12} lg={8}>
            <Row>
              {images.map(({ url, alt }, index) => {
                return (
                  <Col key={index} xs={4}>
                    <div className={styles.image}>
                      <ImageWrapper src={url} alt={alt} objectFit="cover" layout="fill" />
                    </div>
                  </Col>
                )
              })}
            </Row>
            <Row>
              {features.map(({ title, description }, index) => {
                return (
                  <Col className={`no-pad-right-${index}-engines`} key={index} xs={4}>
                    <div>
                      <h3 className={styles.featureTitle}>{title}</h3>
                      <p className={styles.featureDescription}>{description}</p>
                    </div>
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

EnginesSection2.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  boldHeader: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default EnginesSection2
