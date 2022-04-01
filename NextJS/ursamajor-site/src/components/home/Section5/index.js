import { IconBear } from 'baseComponents/Icons'
import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { Col, Row } from '../../grid'
import styles from './Section5.module.scss'

const Section5 = (props) => {
  const {
    title,
    description,
    mainImage,
    mainImageMobile,
    workersImages,
    engineerImages,
    engineImage
  } = props
  return (
    <div className={styles.sectionContainer}>
      <div className="large-container-with-left-pad">
        <Row className={styles.industry}>
          <Col className={'no-pad'} xs={6}>
            <h5>Industry Leaders</h5>
          </Col>
          <Col className={`${styles.separator} no-pad`} xs={6}>
            <div className={styles.divider} />
          </Col>
        </Row>
        <Row>
          <Col className={'no-pad'} xs={12} lg={6}>
            <div className={styles.mainTitle}>{title}</div>
            <p className={styles.contentDescription}>{description}</p>
          </Col>
          <Col className={styles.sectionMainImage} xs={12} lg={6}>
            <div className={cx(styles.mainImageContainer)}>
              <div className={cx(styles.image)}>
                <ImageWrapper
                  src={mainImage.url}
                  alt={mainImage.alt}
                  width={mainImage.width}
                  height={mainImage.height}
                />
              </div>
              <div className={styles.imageMobile}>
                <ImageWrapper
                  src={mainImageMobile.url}
                  alt={mainImageMobile.alt}
                  width={mainImageMobile.width}
                  height={mainImageMobile.height}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={cx(styles.moveUp, 'no-pad')} xs={12} lg={6}>
            <Row className={styles.workersImagesRow}>
              <Col xs={6}>
                <ImageWrapper
                  src={workersImages[0].url}
                  alt={workersImages[0].alt}
                  width={workersImages[0].width}
                  height={workersImages[0].height}
                />
              </Col>
              <Col xs={6}>
                <ImageWrapper
                  src={workersImages[1].url}
                  alt={workersImages[1].alt}
                  width={workersImages[1].width}
                  height={workersImages[1].height}
                />
              </Col>
            </Row>
          </Col>
          <Col className={cx(styles.moveUp, 'no-pad')} xs={12} lg={6}>
            <Row className={styles.engineerImagesRow}>
              <Col xs={6}>
                <ImageWrapper
                  src={engineerImages[0].url}
                  alt={engineerImages[0].alt}
                  width={engineerImages[0].width}
                  height={engineerImages[0].height}
                />
              </Col>
              <Col xs={6}>
                <ImageWrapper
                  src={engineerImages[1].url}
                  alt={engineerImages[1].alt}
                  width={engineerImages[1].width}
                  height={engineerImages[1].height}
                />
              </Col>
              <Col className={styles.engineImagesRow} xs={12} xsFirst lgLast>
                <ImageWrapper
                  src={engineImage.url}
                  alt={engineImage.alt}
                  width={engineImage.width}
                  height={engineImage.height}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={`${styles.bearLine}`}>
          <Col className={styles.bear} xs={12}>
            <IconBear width="36" height="24" fill="#FC4C21" />
          </Col>
        </Row>
      </div>
    </div>
  )
}

Section5.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  mainImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }).isRequired,
  mainImageMobile: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }).isRequired,
  workersImages: PropTypes.array.isRequired,
  engineerImages: PropTypes.array.isRequired,
  engineImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }).isRequired
}

export default Section5
