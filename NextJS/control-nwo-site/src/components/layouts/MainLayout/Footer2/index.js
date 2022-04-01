import React from 'react';
import Link from 'next/link';
import Image from 'baseComponents/CmsImage';
import { Grid, Row, Col } from 'grid';
import MENU from 'data/menu';
import SOCIAL from 'data/social';
import Subscribe from 'baseComponents/Subscribe';
import { Facebook, Instagram, LinkedIn, Twitter } from 'components/icons';
import ScrollLink from 'baseComponents/ScrollLink';
//  Styles
import styles from './Footer2.module.scss';

const Footer2 = ({
  footerMenu = [],
  privacyPolicy,
  termsConditions,
}) => {
  // console.log(`Footer2 footerMenu: `, footerMenu);
  // return null;

	const nwoImage = require(`../../../../../public/images/nwo-ai_white-logo.png`);
  const details = `Sign up for The Inflection Point, Your weekly dose of micro trends that will shape our world`;
  const rights = `${new Date().getFullYear()} © CTRL Global Inc.`;

  return (
    <footer className={styles.component}>
      <div className={styles.firstFooter}>
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <div className={styles.contImage}>
                <Image
                  alt="NWO logo"
                  src={nwoImage}
                  objectFit="cover"
                  layout="fill"
                  className={styles.image}
                />
              </div>
            </Col>
          </Row>
          <Row>
            {footerMenu.map((menuItem, index) => (
              <Col
                key={index}
                xs={index%4===0 ? 6 : 12}
                lgOffset={index%4!==0 ? 1 : 0}
                lg={index%4!==0 ? 1 : 2}
                className={index%4!==0 ? styles.showOnDesktop : ''}
              >
                <div className={styles.contPage}>
                  <div className={styles.title}>
                    {menuItem.parentLink.link ? (
                      <ScrollLink href={ menuItem.parentLink.link } passHref>
                        <a
                          className={styles.link}
                          target={menuItem.parentLink.openInANewTab ? "_blank" : "_self"}
                        >{ menuItem.parentLink.label }</a>
                      </ScrollLink>
                    ) : (
                      <span className={styles.link}>{ menuItem.parentLink.label }</span>
                    )}
                  </div>
                  {menuItem.childrenLinks.length > 0 && menuItem.childrenLinks.map((section, index) => (
                    <div key={`byNeed-${index}`} className={styles.section}>
                      {section.link ? (
                        <ScrollLink href={ section.link } passHref>
                          <a
                            className={styles.link}
                            target={section.openInANewTab ? "_blank" : "_self"}
                          >{ section.label }</a>
                        </ScrollLink>
                      ) : (
                        <span className={styles.link}>{ section.label }</span>
                      )}
                    </div>
                  ))}
                </div>
              </Col>
            ))}
            <Col xs={6} lg={12} className={styles.showOnMobile}>
              {footerMenu.slice(1).map((menuItem, index) => (
                <div key={index} className={styles.contPage}>
                  <div className={styles.title}>
                    {menuItem.parentLink.link ? (
                      <ScrollLink href={ menuItem.parentLink.link } passHref>
                        <a
                          className={styles.link}
                          target={menuItem.parentLink.openInANewTab ? "_blank" : "_self"}
                        >{ menuItem.parentLink.label }</a>
                      </ScrollLink>
                    ) : (
                      <span className={styles.link}>{ menuItem.parentLink.label }</span>
                    )}
                  </div>
                  {menuItem.childrenLinks.length > 0 && menuItem.childrenLinks.map((section, index) => (
                    <div key={`byNeed-${index}`} className={styles.section}>
                      {section.link ? (
                        <ScrollLink href={ section.link } passHref>
                          <a
                            className={styles.link}
                            target={section.openInANewTab ? "_blank" : "_self"}
                          >{ section.label }</a>
                        </ScrollLink>
                      ) : (
                        <span className={styles.link}>{ section.label }</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </Col>
            <Col xs={12} lgOffset={1} lg={3}>
              <div className={styles.subscribe}>
                <Subscribe width='14px' padding='16px' />
                <div className={styles.details}>
                  <span>{ details }</span>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
      <div className={styles.secondFooter}>
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <div className={styles.secondFooterContent}>
                <div className={styles.legalArea}>
                  <div className={styles.rights}>
                    <span>{ rights }</span>
                  </div>
                  <div className={styles.privacy}>
                    {privacyPolicy.link ? (
                      <ScrollLink href={ privacyPolicy.link } passHref>
                        <a
                          className={styles.link}
                          target={privacyPolicy.openInANewTab ? "_blank" : "_self"}
                        >{ privacyPolicy.label }</a>
                      </ScrollLink>
                    ) : (
                      <span className={styles.link}>{ privacyPolicy.label }</span>
                    )}
                  </div>
                  <div className={styles.terms}>
                    {termsConditions.link ? (
                      <ScrollLink href={ termsConditions.link } passHref>
                        <a
                          className={styles.link}
                          target={termsConditions.openInANewTab ? "_blank" : "_self"}
                        >{ termsConditions.label }</a>
                      </ScrollLink>
                    ) : (
                      <span className={styles.link}>{ termsConditions.label }</span>
                    )}
                  </div>
                </div>
                <div className={styles.socialArea}>
                  <div className={styles.social}>
                    <Link href={ SOCIAL.facebook } as={ SOCIAL.facebook }>
                      <a className={styles.link} target="_blank">
                        <Facebook width="25" height="100%" className={styles.icon} />
                      </a>
                    </Link>
                  </div>
                  <div className={styles.social}>
                    <Link href={ SOCIAL.twitter } as={ SOCIAL.twitter }>
                      <a className={styles.link} target="_blank">
                        <Twitter width="25" height="100%" className={styles.icon} />
                      </a>
                    </Link>
                  </div>
                  <div className={styles.social}>
                    <Link href={ SOCIAL.linkedin } as={ SOCIAL.linkedin }>
                      <a className={styles.link} target="_blank">
                        <LinkedIn width="25" height="100%" className={styles.icon} />
                      </a>
                    </Link>
                  </div>
                  <div className={styles.social}>
                    <Link href={ SOCIAL.instagram } as={ SOCIAL.instagram }>
                      <a className={styles.link} target="_blank">
                        <Instagram width="25" height="100%" className={styles.icon} />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </footer>
  );
}

export default Footer2;
