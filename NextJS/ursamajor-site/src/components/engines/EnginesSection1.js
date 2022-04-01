import { IconBear } from 'baseComponents/Icons'
import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { LinkButton } from '../base/Button'
import { Col, Row } from '../grid'
import styles from './styles/Section1.module.scss'

export const EngineCard = ({ engine, index }) => {
  return (
    <div className={cx(styles.engineCard, { [styles.pendingCard]: engine.isPending })}>
      <div
        className={cx(styles.engineCardImage, {
          [styles.engineCardImageLeft]: index === 0,
          [styles.engineCardImageMiddle]: index === 1,
          [styles.engineCardImageRight]: index === 2
        })}
      >
        {engine.imageFullHeight && (
          <ImageWrapper
            src={engine.imageFullHeight.url}
            alt={engine.imageFullHeight.alt}
            objectFit="contain"
            layout="fill"
          />
        )}
        <IconBear width="36" height="24" fill={engine.isPending ? '#fff' : '#FC4C21'} />
      </div>
      <div
        className={cx(styles.sliderCol, {
          [styles.first]: index === 0,
          [styles.second]: index === 1,
          [styles.last]: index === 2
        })}
      >
        <p className={cx(styles.engineCardStatus, styles.statusMobile)}>{engine.status}</p>
        <h4
          className={cx(styles.engineCardTitle, {
            [styles.engineCardFeatureTitlePending]: engine.name === 'On the way'
          })}
        >
          {engine.name}
        </h4>

        {!!engine.featureList.length && (
          <Row>
            {engine.featureList.map(({ fields, sys }, index) => {
              return (
                <Col xs={12} key={sys.id} className={styles.engineCardFeature}>
                  {index === 0 ? (
                    <div className={styles.weight}>
                      <h3
                        className={cx(styles.engineCardFeatureTitle, {
                          [styles.engineCardFeatureTitlePending]: engine.name === 'On the way'
                        })}
                      >
                        {fields.title} <p className={styles.unit}>{fields.unit}</p>
                      </h3>
                      {engine.subtitle && fields.title !== 'Multiple Thrust Classes' ? (
                        <p className={styles.oxRich}>{engine.subtitle}</p>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    <h3
                      className={cx(styles.engineCardFeatureTitle, {
                        [styles.engineCardFeatureTitlePending]: engine.name === 'On the way'
                      })}
                    >
                      {fields.title} <p className={styles.unit}>{fields.unit}</p>
                    </h3>
                  )}

                  <p
                    className={cx(styles.engineCardFeatureDescription, {
                      [styles.engineCardFeatureDescriptionReusable]: fields.title === 'Reusable',
                      [styles.onTheWayCardHeight]:
                        fields.title === 'Reusable, expendable, cost-efficient'
                    })}
                  >
                    {fields?.featureList.map((t, index) => (
                      <span
                        className={cx({
                          [styles.engineCardFeatureTitlePending]: engine.name === 'On the way',
                          [styles.engineCardFeatureTitlePendingExpendable]:
                            fields.title === 'Reusable, expendable, cost-efficient'
                        })}
                        key={index}
                      >
                        {t}
                      </span>
                    ))}
                  </p>
                </Col>
              )
            })}
          </Row>
        )}
        <p className={styles.engineCardStatus}>{engine.status}</p>
      </div>
      {!engine.isPending && (
        <div className={cx(styles.slideButtons, { [styles.second]: engine.name === 'Ripley' })}>
          <div>
            <LinkButton
              styleType="quinary"
              className={styles.btn}
              href={engine.isPending ? '/engines' : `/engines/${engine.slug}`}
              text="Learn More"
              title="Learn More"
            />
          </div>
        </div>
      )}
    </div>
  )
}

const EnginesSection1 = (props) => {
  const { title, description, slides, tabs } = props
  const [tabOpen, setTabOpen] = useState(0)
  return (
    <div className={styles.sectionContainer}>
      <div className="large-container-with-left-pad">
        <Row>
          <Col className="no-pad" xs={6}>
            <p className={styles.aboveTitle}>Our Engines</p>
          </Col>
          <Col className="no-pad" xs={6}>
            <div className="whiteBorderTopLine" />
          </Col>
          <Col className="no-pad" xs={12} lg={6}>
            <div className={styles.title}>{title}</div>
            <p className={styles.description}>{description}</p>
          </Col>
          <Col className="no-pad" xs={12} lg={6}>
            <div className={styles.features}>
              <div className={cx(styles.featuresTitles)}>
                {tabs.map((tab, i) => (
                  <div key={`feature-tab-title-${i}`}>
                    <div
                      onClick={() => setTabOpen(i)}
                      tabIndex={0}
                      role="button"
                      className={cx(styles.tabTitle, { [styles.isActive]: tabOpen === i })}
                    >
                      {tab.title}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.featuresBlocks}>
                {tabs.map((tab, i) => {
                  return (
                    <Row
                      className={cx(styles.block, { [styles.blockShow]: tabOpen === i })}
                      key={`feature-block-${i}`}
                    >
                      {tab.features.map((f, x) => (
                        <Col xs={6} sm={4} key={`feature-item-${x}`}>
                          <Row>
                            <Col>
                              {f.icon && (
                                <div className={styles.iconWrapper}>
                                  <ImageWrapper
                                    src={f.icon.url}
                                    width={f.icon.width}
                                    height={f.icon.height}
                                  />
                                </div>
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className={styles.heading}>{f.title}</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className={styles.text}>{f.description}</div>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                    </Row>
                  )
                })}
              </div>
            </div>
          </Col>
        </Row>
        <div className={cx(styles.swiper)}>
          <Row>
            {slides.map((slide, index) => (
              <Col key={`slide-${index}`} className={cx(`${styles.slide} no-pad`)} xs={12} xl={4}>
                <div>
                  <EngineCard engine={slide} index={index} />
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div className={styles.hideOnDesktop}>
          <IconBear width="36" height="24" fill={'#FC4C21'} />
        </div>
      </div>
    </div>
  )
}

EnginesSection1.propTypes = {
  topImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  sideImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  slides: PropTypes.array.isRequired,
  tabs: PropTypes.array.isRequired
}

export default EnginesSection1
