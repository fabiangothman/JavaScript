import { IconBear } from 'baseComponents/Icons'
import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { LinkButton } from '../../base/Button'
import { Col, Row } from '../../grid'
import styles from './Section1.module.scss'

const Section1 = (props) => {
  const { topImage, topImageMobile, engineImages, title, buttons } = props
  return (
    <div className={styles.sectionContainer}>
      <div className="large-container-with-left-pad">
        <Row className={`${styles.sectionName}`}>
          <Col className={'no-pad'} xs={6}>
            <h5>The Mission</h5>
          </Col>
          <Col className={`${styles.separator} no-pad`} xs={6}>
            <div className={styles.divider} />
          </Col>
        </Row>
        <Row className={`${styles.content}`}>
          <Col className={`${styles.textCol} no-pad`} xs={12} lg={6}>
            <h2>{title}</h2>
            <div className={styles.buttons}>
              <LinkButton
                styleType="secondary"
                className={cx(styles.btn, styles.join, styles.longBtn)}
                isExternal={buttons[0].isExternalLink}
                href={buttons[0].link}
                text={buttons[0].text}
                title={buttons[0].text}
              />
              <LinkButton
                styleType="senary"
                className={cx(styles.btn, styles.longBtn, styles.lineHeight)}
                isExternal={buttons[1].isExternalLink}
                href={buttons[1].link}
                text={buttons[1].text}
                title={buttons[1].text}
              />
            </div>
          </Col>
          <Col className={`${styles.imageColLeft} no-pad ${styles.marginCheck}`} xs={6} lg={3}>
            <div className={styles.imageLeft}>
              <ImageWrapper
                src={engineImages[0].url}
                alt={engineImages[0].alt}
                objectFit="cover"
                layout="fill"
              />
            </div>
          </Col>
          <Col className={styles.imageColRight} xs={6} lg={3}>
            <div className={styles.imageRight}>
              <ImageWrapper
                src={engineImages[1].url}
                alt={engineImages[1].alt}
                objectFit="cover"
                layout="fill"
              />
            </div>
          </Col>
        </Row>
        <Row className={`${styles.imageRow}`}>
          <Col className={`${styles.bottomCol} no-pad`} xs={6}>
            <div className={styles.bottomImage}>
              <ImageWrapper src={topImage.url} alt={topImage.alt} objectFit="cover" layout="fill" />
            </div>
            <div className={styles.bottomImageMobile}>
              <ImageWrapper
                src={topImageMobile.url}
                alt={topImageMobile.alt}
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className={styles.content}>
              <Row className={styles.rowDiv}>
                <Col className="no-pad" xs={6}></Col>
                <Col className={styles.divider} />
                <Col className="no-pad" xs={5}></Col>
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

Section1.propTypes = {
  title: PropTypes.string.isRequired,
  topImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  topImageMobile: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  bottomImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  buttons: PropTypes.array.isRequired
}

export default Section1
