import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { Col, Row } from '../grid'
import styles from './styles/CareersSection2.module.scss'

const CareersSection2 = ({ headline, image, description, benefits, employeesImages, dogImage }) => {
  return (
    <div className={styles.sectionContainer}>
      <div className="large-container-with-left-pad">
        <Row>
          <Col xs={12} lg={6}>
            <div className={styles.headline}>{headline}</div>
            <div className={styles.description}>{description}</div>
          </Col>
          <Col xs={12} lg={6}>
            <div className={styles.borderTop} />
            <div className={styles.imageContainer}>
              <ImageWrapper src={image.url} alt={image.alt} layout="fill" />
            </div>
          </Col>

          {benefits.map((b, i) => {
            const { fields } = b
            return (
              <Col key={`benefits-section-${i}`} xs={12} lg={6}>
                <div className={styles.benefitSection}>
                  <div className={styles.benefitsTitle}>{fields.title}</div>
                  <ul className={styles.benefits}>
                    {fields.benefits.map((benefit, x) => (
                      <li
                        key={`benefits-section-${fields.title}-${x}`}
                        className={styles.benefitItem}
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            )
          })}
        </Row>
        <Row className={styles.moveUp}>
          <Col className={cx(styles.employeesImagesRow, `no-pad`)} xs={12} lg={6} lgOffset={6}>
            <Row>
              <Col xs={6}>
                <ImageWrapper
                  src={employeesImages[0].url}
                  alt={employeesImages[0].alt}
                  width={employeesImages[0].width}
                  height={employeesImages[0].height}
                />
              </Col>
              <Col xs={6}>
                <ImageWrapper
                  src={employeesImages[1].url}
                  alt={employeesImages[1].alt}
                  width={employeesImages[1].width}
                  height={employeesImages[1].height}
                />
              </Col>
            </Row>
          </Col>
          <Row>
            <Col className={cx(styles.engineerImageRow)} xs={12}>
              <ImageWrapper
                src={dogImage.url}
                alt={dogImage.alt}
                width={dogImage.width}
                height={dogImage.height}
              />
            </Col>
          </Row>
        </Row>
      </div>
    </div>
  )
}

CareersSection2.propTypes = {
  headline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  benefits: PropTypes.array.isRequired,
  image: PropTypes.object.isRequired,
  employeesImages: PropTypes.array.isRequired,
  dogImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  })
}

export default CareersSection2
