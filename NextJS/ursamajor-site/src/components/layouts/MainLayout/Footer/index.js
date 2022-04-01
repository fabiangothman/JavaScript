import { LinkButton } from 'baseComponents/Button'
import IconFacebook from 'baseComponents/Icons/IconFacebook'
import IconInstagram from 'baseComponents/Icons/IconInstagram'
import IconLinkedin from 'baseComponents/Icons/IconLinkedin'
import IconTwitter from 'baseComponents/Icons/IconTwitter'
import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'
import Link from 'next/link'
import React from 'react'

import { LEFT_MENU, MIDDLE_MENU, RIGHT_MENU } from '../../../../consts/MENU_FOOTER'
import PRIVACY from '../../../../consts/PRIVACY'
import { IconBear, IconLogo } from '../../../base/Icons'
import { Col, Row } from '../../../grid'
import styles from './Footer.module.scss'

const Footer = ({ footerData }) => {
  return (
    <footer className={styles.footer}>
      <div className="large-container-with-left-pad">
        <div className={styles.footerContainer}>
          <Row className={styles.removeMargin}>
            <Col xs={12} className="no-pad">
              <Row className={styles.noMargin}>
                <Col className={`${styles.content} no-pad`} xs={12}>
                  {footerData.footerGreyTitle && footerData.footerGreyTitle !== 'NONE' && (
                    <h5 className={styles.title}>{footerData.footerGreyTitle}</h5>
                  )}
                  {footerData.footerWhiteTitle && (
                    <h5 className={styles.whiteTitle}>{footerData.footerWhiteTitle}</h5>
                  )}
                  {footerData.careerBtn && (
                    <div className={styles.button}>
                      <LinkButton
                        title={footerData.footerButton.text}
                        className={cx(styles.btn, styles.longBtn)}
                        href={footerData.footerButton.link}
                        text={footerData.footerButton.text}
                      />
                    </div>
                  )}
                </Col>
              </Row>
              <Row className={styles.sectionContainer}>
                <Col className={styles.imageCol} xs={4}>
                  <div className={cx(styles.image, styles.leftImage)}>
                    <ImageWrapper
                      src={footerData.footerImages[0].url}
                      alt={footerData.footerImages[0].alt}
                      width={footerData.footerImages[0].width}
                      height={footerData.footerImages[0].height}
                    />
                  </div>
                </Col>
                <Col className={styles.imageCol} xs={4}>
                  <div className={cx(styles.image, styles.middleImage)}>
                    <ImageWrapper
                      src={footerData.footerImages[1].url}
                      alt={footerData.footerImages[1].alt}
                      width={footerData.footerImages[0].width}
                      height={footerData.footerImages[0].height}
                    />
                  </div>
                </Col>
                <Col className={styles.imageCol} xs={4}>
                  <div className={cx(styles.image, styles.rightImage)}>
                    <ImageWrapper
                      src={footerData.footerImages[2].url}
                      alt={footerData.footerImages[2].alt}
                      width={footerData.footerImages[0].width}
                      height={footerData.footerImages[0].height}
                    />
                  </div>
                </Col>
              </Row>
              <Row className={styles.noMargin}>
                <Col className="no-pad" xs={12}>
                  <div className={styles.logo}>
                    <Link title="Home" href="/">
                      <a>
                        <IconLogo fill="#FFF" />
                      </a>
                    </Link>
                  </div>
                </Col>
              </Row>
              <Row className={cx(styles.footerMenu, styles.noMargin)}>
                <Col className="no-pad" xs={6} lg={2}>
                  <nav>
                    <ul>
                      {LEFT_MENU.map((item, index) => (
                        <li key={`footer-entry-${index}`}>
                          <Link href={item.url}>
                            <a className={styles.link}>{item.label}</a>
                          </Link>
                          {item.subLinks &&
                            !isEmpty(item.subLinks) &&
                            item.subLinks.map((sub) => (
                              <Link key={`${item.label}-sublink-${sub.label}`} href={sub.url}>
                                <a className={styles.subLink}>{sub.label}</a>
                              </Link>
                            ))}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Col>
                <Col className="no-pad" xs={6} lg={8}>
                  <nav className={styles.middleMenu}>
                    <ul>
                      {MIDDLE_MENU.map((item, index) => (
                        <li key={`footer-entry-${index}`}>
                          <Link href={item.url}>
                            <a className={styles.link}>{item.label}</a>
                          </Link>
                          {item.subLinks &&
                            !isEmpty(item.subLinks) &&
                            item.subLinks.map((sub) => (
                              <Link key={`${item.label}-sublink-${sub.label}`} href={sub.url}>
                                <a className={styles.subLink}>{sub.label}</a>
                              </Link>
                            ))}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Col>
                <Col className="no-pad" xs={6} lg={2}>
                  <nav>
                    <ul>
                      {RIGHT_MENU.map((item, index) => (
                        <li key={`footer-entry-${index}`}>
                          <Link href={item.url}>
                            <a className={styles.link}>{item.label}</a>
                          </Link>
                          {item.subLinks &&
                            !isEmpty(item.subLinks) &&
                            item.subLinks.map((sub) => (
                              <Link key={`${item.label}-sublink-${sub.label}`} href={sub.url}>
                                <a target="_blank" className={cx(styles.subLink, styles.policies)}>
                                  {sub.label}
                                </a>
                              </Link>
                            ))}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Col>
              </Row>
              <Row className={styles.noMargin}>
                <Col className="no-pad" xsLast lgFirst xs={12} lg={2}>
                  <div className={styles.bearContainer}>
                    <IconBear fill="#FC4C21" />
                    <br />
                    <span className={styles.copyright}>{PRIVACY.copyright}</span>
                  </div>
                </Col>
                <Col className={styles.separator} xs={12} lg={8}>
                  <div className={styles.divider} />
                </Col>
                <Col className="no-pad" xs={12} lg={2}>
                  <div className={styles.socialLinks}>
                    {footerData.facebookUrl && (
                      <a
                        target="_blank"
                        href={footerData.facebookUrl}
                        className={styles.sideLink}
                        rel="noreferrer"
                      >
                        <IconFacebook />
                      </a>
                    )}
                    {footerData.twitterUrl && (
                      <a
                        target="_blank"
                        href={footerData.twitterUrl}
                        className={styles.sideLink}
                        rel="noreferrer"
                      >
                        <IconTwitter />
                      </a>
                    )}
                    {footerData.instagramUrl && (
                      <a
                        target="_blank"
                        href={footerData.instagramUrl}
                        className={styles.sideLink}
                        rel="noreferrer"
                      >
                        <IconInstagram />
                      </a>
                    )}
                    {footerData.linkedInUrl && (
                      <a
                        target="_blank"
                        href={footerData.linkedInUrl}
                        className={styles.sideLink}
                        rel="noreferrer"
                      >
                        <IconLinkedin />
                      </a>
                    )}
                  </div>
                  <div className={styles.address}>
                    <span>{PRIVACY.address}</span>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </footer>
  )
}

export default Footer
