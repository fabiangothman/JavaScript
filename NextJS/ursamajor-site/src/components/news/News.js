import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'

import { IconBear, IconLink } from '../base/Icons'
import { Col, Row } from '../grid'
import styles from './styles/NewsPage.module.scss'

const News = (props) => {
  const { newsItems } = props
  return (
    <div className={styles.sectionContainer}>
      <div className="large-container-with-left-pad">
        <Row className={`${styles.wrapper}`}>
          <Col className="no-pad" xs={12}>
            <div className={styles.newsContainer}>
              {newsItems &&
                newsItems.map((item, i) => {
                  return (
                    <div key={`news-item-${i}`} className={`${cx(styles.col)}`}>
                      <Link key={`link-item-${i}`} href={item.link}>
                        <a target="_blank" rel="noreferrer">
                          <div className={styles.cardWrapper}>
                            <div className={cx(styles.card, styles.full)}>
                              {item.image && (
                                <div className={styles.cardImage}>
                                  <ImageWrapper
                                    src={item.image.url}
                                    alt={item.image.alt}
                                    width={item.image.width}
                                    height={item.image.height}
                                  />
                                </div>
                              )}
                              <div className={styles.cardContent}>
                                <Row className={styles.sourceRow}>
                                  <Col className={styles.sourceContainer} xs={12}>
                                    <div className={styles.via}>VIA </div>
                                    <div className={styles.source}>{item.source}</div>
                                    <span className={styles.block}></span>
                                  </Col>
                                </Row>
                                <Row className={styles.headlineRow}>
                                  <Col className={styles.headlineCol} xs={12}>
                                    <div className={styles.title}>{item.headline}</div>
                                  </Col>
                                </Row>
                                <div>
                                  <Row>
                                    <Col className={styles.buttons} xs={12}>
                                      <div className={styles.buttonWrapper}>
                                        <button
                                          type="button"
                                          className={cx(styles.readMoreBtn, styles.onCardHover)}
                                        >
                                          Read More
                                        </button>
                                      </div>
                                      <div className={styles.icon}>
                                        <IconLink />
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  )
                })}
            </div>
          </Col>
          {newsItems.length && (
            <Col className="no-pad" xs={12} lg={6} lgOffset={6}>
              <div className={styles.bearCol} xs={6}>
                <div className={styles.bearContainer}>
                  <IconBear width="36" height="24" fill="#FC4C21" />
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </div>
  )
}

News.propTypes = {
  newsItems: PropTypes.array.isRequired
}

export default News
