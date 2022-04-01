import { IconBear } from 'baseComponents/Icons'
import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { LinkButton } from '../../base/Button'
import { Col, Row } from '../../grid'
import styles from './Section3.module.scss'

const EngineCard = ({ engine }) => {
  return (
    <div className={cx(styles.engineCard, { [styles.pendingCard]: engine.isPending })}>
      <div>
        <div className={styles.cardTitle}>
          <h4 className={cx(styles.engineCardTitle)}>{engine.name}</h4>
          <p className={styles.engineCardStatus}>{engine.status}</p>
        </div>
        {!!engine.featureList.length && (
          <div>
            {engine.featureList.map(({ fields, sys }, index) => {
              return (
                <div key={sys.id} className={styles.engineCardFeature}>
                  {index === 0 ? (
                    <div className={styles.weight}>
                      <h3 className={styles.engineCardFeatureTitle}>
                        {fields.title} <p className={styles.unit}>{fields.unit}</p>
                      </h3>
                      {engine.subtitle && fields.title !== 'Multiple Thrust Classes' ? (
                        <p className={styles.oxRich}>{engine.subtitle}</p>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    <h3 className={styles.engineCardFeatureTitle}>{fields.title}</h3>
                  )}
                  <p
                    className={cx(styles.engineCardFeatureDescription, {
                      [styles.engineCardReusableDescription]: index === 2
                    })}
                  >
                    {fields?.featureList?.join('\u00A0\u00A0\u00A0')}
                  </p>
                </div>
              )
            })}
          </div>
        )}
        {!engine.isPending && (
          <div className={styles.slideButtons}>
            <div>
              <LinkButton
                styleType="tertiary"
                className={cx(styles.btn, styles.learnMore, styles.longBtn)}
                href={engine.isPending ? '/engines' : `/engines/${engine.slug}`}
                text="Learn More"
                title="Learn More"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Section3 = (props) => {
  const { boldTitle, title, description, buttons, slides } = props
  return (
    <div className={styles.sectionContainer}>
      <div className="large-container-with-left-pad">
        <Row className={`${styles.sectionName} standard-pad`}>
          <Col className={'no-pad'} xs={6}>
            <h5>{boldTitle}</h5>
          </Col>
          <Col className={`${styles.separator} no-pad`} xs={6}>
            <div className={styles.divider} />
          </Col>
        </Row>
        <Row className={styles.mainTitleSection}>
          <Col className={'no-pad'} xs={12} lg={6}>
            <h3 className={styles.mainTitle}>{title}</h3>
          </Col>
        </Row>
        <Row>
          <Col className="no-pad" xs={12} lg={6}>
            <div className={styles.contentContainer}>
              <p className={styles.contentDescription}>{description}</p>
              <div className={styles.buttons}>
                <div>
                  <LinkButton
                    title={buttons[0].text}
                    className={cx(styles.btn, styles.longBtn)}
                    styleType="primary"
                    href={buttons[0].link}
                    isExternal={buttons[0].isExternalLink}
                    text={buttons[0].text}
                  />
                </div>
                <div>
                  <LinkButton
                    title={buttons[1].text}
                    className={cx(styles.btn, styles.learnMore, styles.longBtn)}
                    styleType="tertiary"
                    href={buttons[1].link}
                    isExternal={buttons[1].isExternalLink}
                    text={buttons[1].text}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {slides.map((slide, index) => (
          <Row key={`slide-${index}`}>
            <Col
              className={cx(styles.slide, styles.mainPad, {
                [styles.middleSectionPadding]: index === 1,
                [styles.endSectionPadding]: index === 2
              })}
              xs={12}
              lg={6}
              lgFirst
            >
              <div>
                <EngineCard engine={slide} />
              </div>
            </Col>
            <Col className={styles.imageCol} xs={12} lg={5} xsFirst>
              <div
                className={cx(styles.engineCardImage, {
                  [styles.engineCardImageFirst]: index === 0,
                  [styles.engineCardImageSecond]: index === 1,
                  [styles.engineCardImageThird]: index === 2
                })}
              >
                {slide.mainImage && (
                  <ImageWrapper
                    src={slide.mainImage.url}
                    alt={slide.mainImage.alt}
                    height={slide.mainImage.height}
                    width={slide.mainImage.width}
                  />
                )}
                <IconBear width="36" height="24" fill="#FC4C21" />
              </div>
            </Col>
          </Row>
        ))}
      </div>
    </div>
  )
}

Section3.propTypes = {
  boldTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttons: PropTypes.array.isRequired,
  slides: PropTypes.array.isRequired
}

export default Section3
