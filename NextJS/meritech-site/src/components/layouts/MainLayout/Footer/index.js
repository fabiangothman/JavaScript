// import { useRef, useState, useEffect } from 'react';
import {
  //   MeritechGreenLogo,
  //   Clock,
  Facebook,
  Twitter,
  Linkedin,
  //   LeftArrowBolder as UpArrow,
} from 'components/icons';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';

import SeeOurPortfolio from '~baseComponents/SeeOurPortfolio';
import * as styles from './Footer.module.scss';
import { Row, Col } from '~grid';
import Button from '~baseComponents/Button';
import RichText from '~baseComponents/RichText';
import SubscribeForm from '~baseComponents/SubscribeForm';

const Footer = ({
  links,
  socialMediaLink,
  addresses,
  contactInfo,
  withPortfolioFooter,
  greenVariant,
  ...props
}) => {
  //   const [fixedFooter, setFixedFooter] = useState(false);
  //   const footerRef = useRef(null);
  //   const handleScroll = () => {
  //     console.log('window.innerHeight', window.innerHeight);
  //     console.log(
  //       'footerRef.current?.getBoundingClientRect().bottom',
  //       footerRef.current?.getBoundingClientRect().bottom,
  //     );
  //     if (
  //       window &&
  //       window.innerHeight > footerRef.current?.getBoundingClientRect().bottom
  //     ) {
  //       setFixedFooter(true);
  //     } else {
  //       setFixedFooter(false);
  //     }
  //   };
  //   useEffect(() => {
  //     window.addEventListener('resize', handleScroll);
  //     window.addEventListener('scroll', handleScroll);
  //     window.addEventListener('click', handleScroll);
  //     handleScroll();

  //     return () => {
  //       window.removeEventListener('resize', handleScroll);
  //       window.removeEventListener('scroll', handleScroll);
  //       window.removeEventListener('click', handleScroll);
  //     };
  //   }, []);

  return (
    <>
      {withPortfolioFooter && <SeeOurPortfolio {...props} />}
      <footer
        // ref={footerRef}
        className={cx(styles.component, {
          [styles.green]: greenVariant,
          //   [styles.fixed]: fixedFooter,
        })}
      >
        <div className="container">
          <Row>
            <Col xs={12} mdOffset={1} md={10}>
              <Row>
                {/* <Col xs={12} lg={12}>
              <MeritechGreenLogo className={styles.logo} />
            </Col>
            <Col xs={12} lg={12}>
              <div>
                <ul className={styles.list}>
                  {!!links.length &&
                    links.map(({ label, slug, openInANewTab }, index) => {
                      return (
                        <li
                          style={{
                            pointerEvents:
                              slug === '/benchmarking' ? 'none' : 'initiall',
                          }}
                          key={index}
                          className={styles.listItem}
                        >
                          <Link href={slug}>
                            <a
                              target={openInANewTab ? '_blank' : '_self'}
                              rel={openInANewTab ? 'noreferrer noopener' : ''}
                              className={styles.link}
                            >
                              {label}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </Col> */}
                <Col xs={12} lg={6} className={styles.content}>
                  {/* <Clock className={styles.clockIcon} /> */}
                  <Row>
                    <Col xs={12} lg={6}>
                      <Row>
                        {contactInfo.map(({ content, sysId }, index) => {
                          return (
                            <Col key={sysId} xs={12}>
                              <div
                                className={cx(styles.box, {
                                  [styles.borderBottom]:
                                    index === addresses.length - 1,
                                })}
                              >
                                <RichText
                                  aStyle={styles.addressesLink}
                                  pStyle={styles.text}
                                  content={content}
                                />
                              </div>
                            </Col>
                          );
                        })}
                        <Col className={styles.icons} xs={12} lg={12}>
                          {!!socialMediaLink?.length &&
                            socialMediaLink.map((link, index) => {
                              const ariaLabel = (href) => {
                                if (href.includes('facebook')) {
                                  return 'Visit our facebook page.';
                                }
                                if (href.includes('twitter')) {
                                  return 'Visit our twitter page';
                                }
                                if (href.includes('linkedin')) {
                                  return 'Visit our linkedin page';
                                }
                                return '';
                              };
                              const allowedSocialMedia = [
                                'facebook',
                                'linkedin',
                                'twitter',
                              ];
                              if (
                                !allowedSocialMedia.some((social) =>
                                  link.includes(social),
                                )
                              ) {
                                return null;
                              }

                              return (
                                <Button
                                  key={index}
                                  target="_blank"
                                  href={link}
                                  rel="noreferrer noopener"
                                  aria-label={ariaLabel(link)}
                                  className={styles.socialMedia}
                                >
                                  {link.includes('facebook') && <Facebook />}
                                  {link.includes('twitter') && <Twitter />}
                                  {link.includes('linkedin') && <Linkedin />}
                                </Button>
                              );
                            })}
                        </Col>
                      </Row>
                    </Col>
                    <Col className={styles.address} xs={12} lg={6}>
                      <Row>
                        {addresses.map(({ content, sysId }) => {
                          return (
                            <Col key={sysId} xs={6} lg={12}>
                              <div className={cx(styles.box)}>
                                <RichText
                                  openInANewTab
                                  aStyle={styles.addressesLink}
                                  pStyle={styles.text}
                                  content={content}
                                />
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </Col>
                    {/* <Col className={styles.icons} xs={12} lg={6}>
                  <Clock className={styles.clockIcon} />
                </Col> */}
                  </Row>
                </Col>
                <Col xs={12} lg={6} className={styles.subscribe}>
                  <b>Subscribe to our research</b>
                  <SubscribeForm className={styles.subscribeForm} />
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <ul className={styles.list}>
                    {!!links.length &&
                      links.map(({ label, slug, openInANewTab }, index) => {
                        return (
                          <li key={index} className={styles.listItem}>
                            <Link href={slug}>
                              <a
                                target={openInANewTab ? '_blank' : '_self'}
                                rel={openInANewTab ? 'noreferrer noopener' : ''}
                                className={styles.link}
                              >
                                {label}
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                  {/* <Button
                aria-label="Go to tome of the page"
                onClick={goToTopHandler}
                className={styles.socialMedia}
              >
                <UpArrow />
              </Button> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </footer>
    </>
  );
};

export default Footer;

Footer.defaultProps = {
  withPortfolioFooter: false,
  greenVariant: false,
};

Footer.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contactInfo: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  withPortfolioFooter: PropTypes.bool,
  links: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  socialMediaLink: PropTypes.arrayOf(PropTypes.string).isRequired,
  greenVariant: PropTypes.bool,
};
