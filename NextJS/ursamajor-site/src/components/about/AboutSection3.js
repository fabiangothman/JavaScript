import { IconBear } from 'baseComponents/Icons'
import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { Col, Row } from '../grid'
import styles from './styles/AboutSection3.module.scss'

const AboutSection3 = (props) => {
  const { headline, description, advisors, advisorsHeadline } = props

  return (
    <div className={styles.sectionContainer}>
      <div className="large-container-with-left-pad">
        <Row>
          <Col className={styles.contentCol} xs={6}>
            <h3 className={styles.advisorsHeadline}>{advisorsHeadline}</h3>
          </Col>
          <Col className={styles.contentCol} xs={6}>
            <div className={styles.borderTopLine} />
          </Col>

          <Col className={styles.contentCol} xs={12} lg={6}>
            <p className={styles.headline}>{headline}</p>
            <p className={styles.description}>{description}</p>
          </Col>
          <Col xs={12} lg={6}>
            <div className={styles.borderTop} />
          </Col>
          <Col xs={12}>
            <div className={styles.members}>
              <Row>
                {advisors.map((advisor, index) => (
                  <Col key={`slide-${index}`} xs={12} md={4} lg={3}>
                    <div className={styles.member}>
                      <div className={styles.image}>
                        {advisor.picture && (
                          <ImageWrapper
                            src={advisor.picture.url}
                            alt={advisor.picture.alt}
                            objectFit="cover"
                            layout="fill"
                          />
                        )}
                      </div>
                      <div>
                        <h4 className={styles.name}>{advisor.name}</h4>
                        <p className={styles.title}>{advisor.title}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={cx(styles.end, 'no-pad')} xs={6}>
            <div className={styles.bearContainer}>
              <IconBear fill="#FC4C21" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

AboutSection3.propTypes = {
  headline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  advisorsHeadline: PropTypes.string.isRequired,
  advisors: PropTypes.array.isRequired
}

export default AboutSection3
