import { ImageWrapper } from 'baseComponents/ImageWrapper'
import PropTypes from 'prop-types'
import React from 'react'

import { Col, Row } from '../grid'
import styles from './styles/Section3.module.scss'

const EnginesSection3 = (props) => {
  const { features, images } = props
  return (
    <div className={styles.sectionContainer}>
      <Row className="standard-pad">
        <Col className={styles.imageCol} xsHidden smHidden mdHidden lg={2}>
          <div className={styles.image}>
            <ImageWrapper src={images[0].url} alt={images[0].alt} objectFit="cover" layout="fill" />
          </div>
        </Col>
        <Col className={styles.imageCol} xsHidden smHidden mdHidden lg={2}>
          <div className={styles.image}>
            <ImageWrapper src={images[1].url} alt={images[1].alt} objectFit="cover" layout="fill" />
          </div>
        </Col>
        <Col className={styles.imageCol} xs={3} lg={2}>
          <div className={styles.image}>
            <ImageWrapper src={images[2].url} alt={images[2].alt} objectFit="cover" layout="fill" />
          </div>
        </Col>
        <Col className="no-pad" xs={9} lg={2}>
          {features.map((f, x) => (
            <div className={styles.item} key={`feature-item-${x}`}>
              <div className={styles.heading}>{f.title}</div>
              <div className={styles.text}>{f.description}</div>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  )
}

EnginesSection3.propTypes = {
  images: PropTypes.array.isRequired,
  features: PropTypes.array.isRequired
}

export default EnginesSection3
