import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { LinkButton } from '../base/Button'
import { Col, Row } from '../grid'
import styles from './styles/Section4.module.scss'

const EnginesSection4 = (props) => {
  const ref = useRef()
  const { headline, images, button } = props
  return (
    <div className={styles.sectionContainer}>
      <Row className="standard-pad">
        <Col className={styles.swiperCol} lgHidden xlHidden xs={12}>
          <Swiper slidesPerView="auto" ref={ref} className={styles.swiper} spaceBetween={16}>
            {images.map((slide, index) => (
              <SwiperSlide key={`slide-${index}`} className={styles.slide}>
                <div className={styles.image}>
                  <ImageWrapper src={slide.url} alt={slide.alt} objectFit="cover" layout="fill" />
                </div>
                <div className={styles.caption}>{slide.alt}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
        <Col className={cx('no-pad', styles.imagesCol)} xsHidden smHidden mdHidden lg={6}>
          <Row>
            {images.map((image, i) => (
              <Col key={`gallery-image-${i}`} className={styles.imageCol} lg={4}>
                <div className={styles.image}>
                  <ImageWrapper src={image.url} alt={image.alt} objectFit="cover" layout="fill" />
                </div>
                <div className={styles.caption}>{image.alt}</div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col className={styles.swiperCol} lgOffset={1} xs={12} lg={5}>
          <div className={styles.headline}>{headline}</div>
          <div>
            <LinkButton
              styleType="quinary"
              className={styles.btn}
              href={button.link}
              text={button.text}
              title={button.text}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

EnginesSection4.propTypes = {
  headline: PropTypes.string.isRequired,
  button: PropTypes.object.isRequired,
  images: PropTypes.array.isRequired
}

export default EnginesSection4
