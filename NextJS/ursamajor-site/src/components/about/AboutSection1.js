import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import RichText from '../base/RichText'
import { Col, Row } from '../grid'
import styles from './styles/AboutSection1.module.scss'

const AboutSection1 = (props) => {
  const { headline, description, image, secondImage } = props
  return (
    <div className={styles.sectionContainer}>
      <div className="large-container-with-left-pad">
        <Row>
          <Col className="no-pad" xs={12} lg={6}>
            <div className={styles.title}>{headline}</div>
            <RichText wrapperName={styles.text} content={description} />
          </Col>
          <Col className={cx('no-pad', styles.images)} xs={12} lg={6}>
            <div className={cx(styles.imagesContainer)}>
              <div className={cx(styles.image, styles.firstImage)}>
                <ImageWrapper src={image.url} alt={image.alt} objectFit="cover" layout="fill" />
              </div>

              <div className={cx(styles.image, styles.secondImage)}>
                <ImageWrapper
                  src={secondImage.url}
                  alt={secondImage.alt}
                  objectFit="cover"
                  layout="fill"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

AboutSection1.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  headline: PropTypes.string.isRequired,
  description: PropTypes.object.isRequired
}

export default AboutSection1
