import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import useIsMobile from '../../hooks/useIsMobile'
import RichText from '../base/RichText'
import { Col, Row } from '../grid'
import styles from './styles/AboutSection2.module.scss'

const AboutSection2 = (props) => {
  const ref = useRef()
  const {
    desktopBackground,
    mobileBackground,
    location,
    headline,
    description,
    firstImage,
    secondImage
  } = props

  const [isMobile, setIsMobile] = React.useState(false)

  useIsMobile(setIsMobile)
  const backgroundImage = isMobile ? mobileBackground.url : desktopBackground.url

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.extraBg} />
      <div className={styles.bgContainer} style={{ backgroundImage: `url("${backgroundImage}")` }}>
        <div className="large-container-with-left-pad">
          <Row>
            <Col className="no-pad" xs={6}>
              <p className={styles.workPlace}>Workplace</p>
            </Col>

            <Col className="no-pad" xs={6}>
              <div className={styles.borderTopLine} />
            </Col>

            <Col className="no-pad" xs={12} lg={6}>
              <div className={styles.content}>
                <div className={styles.title}>{headline}</div>
                <RichText wrapperName={styles.text} content={description} />
              </div>
            </Col>

            <Col className={styles.images} xs={12} lg={6}>
              <Swiper ref={ref} className={styles.swiperContainer} slidesPerView={1.3}>
                <SwiperSlide className={styles.slide}>
                  <div className={cx(styles.image)}>
                    <ImageWrapper
                      src={firstImage.url}
                      alt={firstImage.alt}
                      width={firstImage.width}
                      height={firstImage.height}
                      layout="responsive"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                  <div className={cx(styles.image)}>
                    <ImageWrapper
                      src={secondImage.url}
                      alt={secondImage.alt}
                      width={secondImage.width}
                      height={secondImage.height}
                      layout="responsive"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>

              <div className={styles.imagesContainer}>
                <div className={styles.imagesWrapper}>
                  <div className={cx(styles.image, styles.firstImage)}>
                    <ImageWrapper
                      src={firstImage.url}
                      alt={firstImage.alt}
                      objectFit="fill"
                      layout="fill"
                    />
                  </div>
                  <div className={cx(styles.image, styles.secondImage)}>
                    <ImageWrapper
                      src={secondImage.url}
                      alt={secondImage.alt}
                      objectFit="fill"
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
              <RichText wrapperName={styles.location} content={location} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

AboutSection2.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  headline: PropTypes.string.isRequired,
  description: PropTypes.object.isRequired
}

export default AboutSection2
