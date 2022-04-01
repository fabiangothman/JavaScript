import { IconBear } from 'baseComponents/Icons'
import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { LinkButton } from '../../base/Button'
import RichText from '../../base/RichText'
import { Col, Row } from '../../grid'
import styles from './Section4.module.scss'

const Section4 = (props) => {
  const { title, description, button, bottomImage } = props
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.imageContainer}>
        <ImageWrapper
          src={bottomImage.url}
          alt={bottomImage.title}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className={`${styles.content} large-container-with-left-pad`}>
        <Row className={styles.partnerWithUs}>
          <Col className={`no-pad`} xs={6}>
            <h5>Partner With Us</h5>
          </Col>
          <Col className={styles.separator} xs={6}>
            <div className={styles.divider} />
          </Col>
        </Row>
        <Row className={styles.partnersRow}>
          <Col className={`no-pad`} xs={12} lg={6}>
            <div className={styles.mainTitle}>{title}</div>
          </Col>
        </Row>
        <Row className={styles.detailsRow}>
          <Col className={`no-pad`} xs={12} lg={6}>
            <RichText
              content={description}
              wrapperName={styles.contentDescription}
              className={styles.parag}
            />
          </Col>
          <Col className={`no-pad`} xs={12} lg={6}>
            <Row className={styles.buttonRow}>
              <Col className={styles.partnerBtn} xs={12}>
                <LinkButton
                  styleType="quarnary"
                  className={cx(styles.btn, styles.smallBtn)}
                  href={button.link}
                  text={button.text}
                  title={button.text}
                />
                <div className={styles.bearContainer}>
                  <div className={styles.line} />
                  <IconBear width="36" height="24" fill="#FC4C21" />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={styles.endLine}>
          <Col className={'no-pad'} xs={12} lg={6}></Col>
          <Col className={`${styles.separator} no-pad`} xs={12} lg={6}>
            <div className={styles.divider} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

Section4.propTypes = {
  bottomImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.object.isRequired
}

export default Section4
